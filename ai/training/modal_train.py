"""
Modal Serverless Turkish QLoRA Training for Senkron
Model: unsloth/Llama-3.2-3B-Instruct-bnb-4bit
Target: Fine-tuned Turkish NSosyal short-form generation LoRA adapter (r=32, alpha=64)
"""

import os
import modal

app = modal.App("senkron-turkish-llm-train")
volume = modal.Volume.from_name("senkron-model-store", create_if_missing=True)

train_image = (
    modal.Image.debian_slim(python_version="3.11")
    .pip_install(
        "torch>=2.5.0",
        "triton",
        index_url="https://download.pytorch.org/whl/cu124",
        extra_index_url="https://pypi.org/simple",
    )
    .pip_install(
        "transformers>=4.45.0",
        "accelerate>=0.34.0",
        "bitsandbytes>=0.44.0",
        "peft>=0.13.0",
        "trl>=0.11.0",
        "datasets",
        "sentencepiece",
        "protobuf"
    )
)

@app.function(
    image=train_image,
    gpu="A10G",
    timeout=3600,
    volumes={"/models": volume}
)
def run_training(
    max_seq_length: int = 384,
    epochs: int = 2,
    batch_size: int = 4,
    learning_rate: float = 2e-4,
):
    import json
    import torch
    from datasets import Dataset
    from transformers import AutoModelForCausalLM, AutoTokenizer
    from peft import LoraConfig, get_peft_model, prepare_model_for_kbit_training
    from trl import SFTTrainer, SFTConfig

    model_name = "unsloth/Llama-3.2-3B-Instruct-bnb-4bit"
    print(f"[Modal Train] Loading base model {model_name}...")
    
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    if tokenizer.pad_token is None:
        tokenizer.pad_token = tokenizer.eos_token
        
    model = AutoModelForCausalLM.from_pretrained(
        model_name,
        device_map="auto",
        trust_remote_code=True
    )
    
    model = prepare_model_for_kbit_training(model)
    
    lora_config = LoraConfig(
        r=32,
        lora_alpha=64,
        target_modules=["q_proj", "k_proj", "v_proj", "o_proj", "gate_proj", "up_proj", "down_proj"],
        lora_dropout=0.05,
        bias="none",
        task_type="CAUSAL_LM"
    )
    
    model = get_peft_model(model, lora_config)
    model.print_trainable_parameters()

    dataset_file = "/models/dataset/turkish_nsosyal_dataset.json"
    print(f"[Modal Train] Loading dataset from {dataset_file}...")
    with open(dataset_file, "r", encoding="utf-8") as f:
        raw_data = json.load(f)
        
    formatted_texts = []
    for item in raw_data:
        convos = item["conversations"]
        messages = []
        for c in convos:
            role = "user" if c["from"] == "human" else "assistant" if c["from"] == "gpt" else "system"
            messages.append({"role": role, "content": c["value"]})
        text = tokenizer.apply_chat_template(messages, tokenize=False)
        formatted_texts.append(text)
        
    dataset = Dataset.from_dict({"text": formatted_texts})
    print(f"[Modal Train] Prepared dataset with {len(dataset)} training samples.")

    training_args = SFTConfig(
        output_dir="/models/checkpoints",
        per_device_train_batch_size=batch_size,
        gradient_accumulation_steps=4,
        learning_rate=learning_rate,
        num_train_epochs=epochs,
        logging_steps=25,
        save_strategy="no",
        fp16=False,
        bf16=True,
        dataset_text_field="text",
        max_length=max_seq_length,
        lr_scheduler_type="cosine",
        report_to="none"
    )

    trainer = SFTTrainer(
        model=model,
        train_dataset=dataset,
        args=training_args,
    )

    print("[Modal Train] Starting QLoRA Turkish fine-tuning on A10G GPU...")
    trainer.train()
    print("[Modal Train] Fine-tuning completed successfully!")

    output_adapter_dir = "/models/senkron-turkish-lora"
    print(f"[Modal Train] Saving fine-tuned LoRA adapter to {output_adapter_dir}...")
    trainer.model.save_pretrained(output_adapter_dir)
    tokenizer.save_pretrained(output_adapter_dir)
    
    volume.commit()
    print(f"[Modal Train] Successfully committed Turkish LoRA weights to Modal Volume: {output_adapter_dir}")
    return output_adapter_dir

@app.local_entrypoint()
def main():
    print("Launching Senkron Turkish Llama 3.2 Fine-Tuning Job on Modal GPU...")
    res = run_training.remote()
    print(f"Fine-tuning job completed successfully! Adapter saved at: {res}")

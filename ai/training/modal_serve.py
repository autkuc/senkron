"""
Modal Serverless LLM Deployment Endpoint for Senkron
Single GPU ASGI FastAPI service with Turkish LoRA fine-tuning adapter and lexical guardrails.
"""

import os
import re
import modal
import traceback
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

app = modal.App("senkron-turkish-llm-service")
volume = modal.Volume.from_name("senkron-model-store", create_if_missing=True)

serve_image = (
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
        "fastapi",
        "uvicorn",
        "pydantic",
        "sentencepiece",
        "protobuf"
    )
)

web_app = FastAPI(title="Senkron Turkish LLM Service")

web_app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

_model = None
_tokenizer = None

# Lexical mapping for English leakages to natural Turkish
LEXICAL_MAP = {
    r"\bclean\b": "temiz",
    r"\bkeepers\b": "tutucular",
    r"\bshouldnır\b": "olmamalıdır",
    r"\bshould\b": "gerekir",
    r"\bwait\b": "bekle",
    r"\breference\b": "referans",
    r"\bperformanceunu\b": "performansını",
    r"\bperformance\b": "performans",
    r"\baffect\b": "etkilemek",
    r"\bproper\b": "uygun",
    r"\bevaluation\b": "değerlendirme",
    r"\bpermanent\b": "kalıcı",
    r"\bpartisyonları\b": "bölümleri",
    r"\bpartisyon\b": "bölüm",
    r"\bdata\b": "veri",
    r"\bmetric\b": "metrik",
    r"\bmetrics\b": "metrikler",
    r"\bfeature\b": "özellik",
    r"\bfeaturelar\b": "özellikler",
    r"\bdevelopment\b": "geliştirme",
}

def clean_turkish_output(text: str) -> str:
    # 1. Strip non-Turkish unicode ranges
    text = re.sub(r'[\u0900-\u097F\u0400-\u04FF\u4E00-\u9FFF\u0100-\u0111\u0114-\u011F\u0122-\u012F\u0132-\u0137\u013C-\u014B\u0150-\u015D\u0160-\u016F\u0172-\u017D]', '', text)
    
    # 2. Fix English loanword leaks
    for pattern, replacement in LEXICAL_MAP.items():
        text = re.sub(pattern, replacement, text, flags=re.IGNORECASE)
        
    # 3. Clean up broken pseudo-Turkish grammatical artifacts
    text = re.sub(r'\b(\w+)ır\b', r'\1dır', text)
    text = re.sub(r' +', ' ', text)
    return text.strip()

def get_model():
    global _model, _tokenizer
    if _model is None:
        import torch
        from transformers import AutoModelForCausalLM, AutoTokenizer
        from peft import PeftModel
        
        base_model_id = "unsloth/Llama-3.2-3B-Instruct-bnb-4bit"
        lora_path = "/models/senkron-turkish-lora"
        
        tokenizer_src = lora_path if os.path.exists(os.path.join(lora_path, "tokenizer_config.json")) else base_model_id
        print(f"[Modal Serve] Loading tokenizer from {tokenizer_src}...")
        _tokenizer = AutoTokenizer.from_pretrained(tokenizer_src)
        if _tokenizer.pad_token is None:
            _tokenizer.pad_token = _tokenizer.eos_token
            
        print(f"[Modal Serve] Loading base model {base_model_id} onto GPU...")
        base_model = AutoModelForCausalLM.from_pretrained(
            base_model_id,
            device_map="auto",
            trust_remote_code=True
        )
        
        if os.path.exists(os.path.join(lora_path, "adapter_config.json")):
            print(f"[Modal Serve] Attaching fine-tuned Turkish LoRA adapter from {lora_path}...")
            _model = PeftModel.from_pretrained(base_model, lora_path)
            print("[Modal Serve] Fine-tuned Turkish LoRA adapter active and ready!")
        else:
            _model = base_model
            print("[Modal Serve] Base model loaded into GPU memory.")
            
    return _model, _tokenizer

@web_app.post("/chat/completions")
@web_app.post("/")
async def chat_completions(request: Request):
    try:
        import torch
        body = await request.json()
        model, tokenizer = get_model()
        messages = body.get("messages", [])
        temperature = float(body.get("temperature", 0.20))
        max_tokens = int(body.get("max_tokens", 250))
        
        prompt = tokenizer.apply_chat_template(
            messages,
            tokenize=False,
            add_generation_prompt=True
        )
        
        inputs = tokenizer(prompt, return_tensors="pt").to("cuda")
        
        with torch.no_grad():
            output_tokens = model.generate(
                **inputs,
                max_new_tokens=max_tokens,
                temperature=temperature,
                top_p=0.85,
                repetition_penalty=1.15,
                do_sample=temperature > 0.0,
                pad_token_id=tokenizer.eos_token_id
            )
            
        generated_tokens = output_tokens[0][inputs.input_ids.shape[1]:]
        raw_text = tokenizer.decode(generated_tokens, skip_special_tokens=True).strip()
        response_text = clean_turkish_output(raw_text)
        
        prompt_tokens = len(inputs.input_ids[0])
        completion_tokens = len(generated_tokens)
        
        return {
            "id": f"chatcmpl-modal-{torch.randint(1000, 9999, (1,)).item()}",
            "object": "chat.completion",
            "model": "senkron-turkish-llama3.2:3b",
            "choices": [
                {
                    "index": 0,
                    "message": {
                        "role": "assistant",
                        "content": response_text
                    },
                    "finish_reason": "stop"
                }
            ],
            "usage": {
                "prompt_tokens": prompt_tokens,
                "completion_tokens": completion_tokens,
                "total_tokens": prompt_tokens + completion_tokens
            }
        }
    except Exception as e:
        tb = traceback.format_exc()
        print(f"[Modal Serve Error]:\n{tb}")
        return JSONResponse(status_code=500, content={"error": str(e), "traceback": tb})

@app.function(
    image=serve_image,
    gpu="A10G",
    scaledown_window=120,
    volumes={"/models": volume},
    timeout=300
)
@modal.asgi_app()
def api():
    return web_app

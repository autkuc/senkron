"""
Modal Volume Pre-Cacher for Llama 3.2 3B using snapshot_download
Downloads model repository files directly into Modal Volume for instant loading.
"""

import modal

app = modal.App("senkron-model-precacher")
volume = modal.Volume.from_name("senkron-model-store", create_if_missing=True)

image = (
    modal.Image.debian_slim(python_version="3.11")
    .pip_install("huggingface_hub")
)

@app.function(
    image=image,
    volumes={"/models": volume},
    timeout=600
)
def precache_model():
    import os
    from huggingface_hub import snapshot_download
    
    target_dir = "/models/llama3_2_3b_instruct"
    model_id = "unsloth/Llama-3.2-3B-Instruct-bnb-4bit"
    
    print(f"[Pre-cache] Checking target directory {target_dir}...")
    if os.path.exists(os.path.join(target_dir, "config.json")):
        print("[Pre-cache] Model already cached in volume!")
        return
        
    print(f"[Pre-cache] Downloading {model_id} via snapshot_download into Modal Volume...")
    snapshot_download(
        repo_id=model_id,
        local_dir=target_dir
    )
    volume.commit()
    print("[Pre-cache] Model snapshot successfully downloaded and committed to volume!")

if __name__ == "__main__":
    with app.run():
        precache_model.remote()

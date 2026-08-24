"""
Helper script to download fine-tuned GGUF model from Modal Volume to local machine.
"""

import os
import subprocess
import sys

def download_model_from_modal(output_dir: str = "./models"):
    os.makedirs(output_dir, exist_ok=True)
    print(f"[*] Downloading GGUF models from Modal volume 'senkron-model-store' to {output_dir}...")
    
    cmd = [
        "modal", "volume", "get",
        "senkron-model-store",
        "exported",
        output_dir
    ]
    
    try:
        subprocess.run(cmd, check=True)
        print(f"[✓] GGUF model downloaded to {output_dir}/exported/")
        print("[*] To register model with local Ollama, run:")
        print("    ollama create senkron-turkish-llama3.2:3b -f Senkron/ai/training/Modelfile")
    except subprocess.CalledProcessError as e:
        print(f"[!] Error downloading volume from Modal: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    download_model_from_modal()

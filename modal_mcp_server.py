#!/usr/bin/env python3
"""
Modal MCP Server for Senkron AI

Provides Model Context Protocol (MCP) tools to:
1. Manage Modal cloud volumes (list, upload, download, delete)
2. Monitor and manage Modal applications & jobs
3. Execute remote fine-tuning and inference tasks on Modal GPUs
"""

import sys
import subprocess
from typing import Optional, List, Dict, Any
from fastmcp import FastMCP

# Initialize FastMCP Server
mcp = FastMCP("Modal-MCP-Server")

@mcp.tool()
def modal_status() -> str:
    """Check Modal CLI authentication status and configuration."""
    try:
        res = subprocess.run(["modal", "profile", "current"], capture_output=True, text=True, timeout=10)
        if res.returncode == 0:
            return f"Modal authenticated. Current profile: {res.stdout.strip()}"
        return f"Modal not authenticated. Output: {res.stderr.strip() or res.stdout.strip()}"
    except Exception as e:
        return f"Error checking Modal status: {str(e)}"

@mcp.tool()
def list_modal_volumes() -> str:
    """List all Modal cloud storage volumes."""
    try:
        res = subprocess.run(["modal", "volume", "list"], capture_output=True, text=True, timeout=15)
        return res.stdout or res.stderr or "No volumes found."
    except Exception as e:
        return f"Error listing volumes: {str(e)}"

@mcp.tool()
def list_modal_apps() -> str:
    """List all Modal applications and their status."""
    try:
        res = subprocess.run(["modal", "app", "list"], capture_output=True, text=True, timeout=15)
        return res.stdout or res.stderr or "No apps found."
    except Exception as e:
        return f"Error listing apps: {str(e)}"

@mcp.tool()
def run_modal_script(script_path: str, detach: bool = False) -> str:
    """
    Run a Python Modal script remotely on Modal infrastructure.
    
    Args:
        script_path: Path to the modal script (e.g., 'Senkron/ai/training/modal_train.py')
        detach: Whether to run the app detached in the background
    """
    cmd = ["modal", "run"]
    if detach:
        cmd.append("--detach")
    cmd.append(script_path)
    
    try:
        res = subprocess.run(cmd, capture_output=True, text=True, timeout=120)
        return f"STDOUT:\n{res.stdout}\n\nSTDERR:\n{res.stderr}"
    except Exception as e:
        return f"Error executing Modal script: {str(e)}"

@mcp.tool()
def download_modal_volume(volume_name: str, remote_path: str, local_path: str) -> str:
    """
    Download files from a Modal cloud volume to local disk.
    
    Args:
        volume_name: Name of Modal volume (e.g., 'senkron-model-weights')
        remote_path: Path inside volume (e.g., 'Llama-3.2-3B-Turkish-Q4_K_M.gguf')
        local_path: Local target filepath
    """
    cmd = ["modal", "volume", "get", volume_name, remote_path, local_path]
    try:
        res = subprocess.run(cmd, capture_output=True, text=True, timeout=300)
        return f"Download completed:\n{res.stdout or res.stderr}"
    except Exception as e:
        return f"Error downloading volume data: {str(e)}"

if __name__ == "__main__":
    mcp.run()

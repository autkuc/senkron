import { css } from 'lit';

export const videoEditorStyles = css`
  :host {
    display: block;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    background: #090d16;
    color: #f1f5f9;
    border-radius: 12px;
    overflow: hidden;
    box-sizing: border-box;
    user-select: none;
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }

  .editor-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 480px;
    background: #090d16;
  }

  /* Header Toolbar */
  .editor-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 18px;
    background: #0f1624;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    gap: 12px;
    flex-wrap: wrap;
  }

  .editor-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    font-weight: 600;
    color: #f1f5f9;
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .upload-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(7, 208, 224, 0.12);
    border: 1px solid rgba(7, 208, 224, 0.35);
    color: #07d0e0;
    padding: 5px 12px;
    font-size: 12px;
    font-weight: 600;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .upload-btn:hover {
    background: rgba(7, 208, 224, 0.22);
    border-color: #07d0e0;
    color: #ffffff;
  }

  .file-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    font-family: ui-monospace, SFMono-Regular, monospace;
    color: #94a3b8;
    background: rgba(255, 255, 255, 0.06);
    padding: 3px 8px;
    border-radius: 4px;
    max-width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  .aspect-selector {
    display: flex;
    gap: 4px;
    background: #090d16;
    padding: 3px;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  .aspect-btn {
    background: transparent;
    border: none;
    color: #94a3b8;
    padding: 4px 8px;
    font-size: 11px;
    font-weight: 500;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .aspect-btn:hover {
    color: #ffffff;
  }

  .aspect-btn.active {
    background: #1e293b;
    color: #38bdf8;
    font-weight: 600;
  }

  /* Main Stage / Video Preview */
  .preview-stage {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #000000;
    position: relative;
    overflow: hidden;
    min-height: 280px;
    padding: 12px;
  }

  .video-preview-wrapper {
    position: relative;
    max-height: 320px;
    max-width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    overflow: hidden;
    background: #070a12;
  }

  .video-preview-wrapper video {
    display: block;
    max-height: 320px;
    max-width: 100%;
    object-fit: contain;
    border-radius: 8px;
  }

  .video-preview-wrapper canvas.overlay-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .empty-stage-dropzone {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 32px;
    border: 2px dashed rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: center;
  }

  .empty-stage-dropzone:hover {
    border-color: #07d0e0;
    background: rgba(7, 208, 224, 0.05);
  }

  .drop-overlay {
    position: absolute;
    inset: 12px;
    border: 2px dashed #07d0e0;
    background: rgba(7, 208, 224, 0.15);
    backdrop-filter: blur(2px);
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    z-index: 20;
    pointer-events: none;
  }

  .drop-overlay span {
    font-size: 14px;
    font-weight: 600;
    color: #07d0e0;
  }

  /* Timeline & Scrubber Section */
  .timeline-section {
    background: #0f1624;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    padding: 12px 18px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .timecode-display {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: ui-monospace, SFMono-Regular, monospace;
    font-size: 12px;
    color: #94a3b8;
  }

  .timeline-scrubber-track {
    position: relative;
    height: 36px;
    background: #1e293b;
    border-radius: 6px;
    cursor: pointer;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.06);
  }

  .timeline-trim-region {
    position: absolute;
    top: 0;
    bottom: 0;
    background: rgba(2, 132, 199, 0.3);
    border-left: 3px solid #07d0e0;
    border-right: 3px solid #07d0e0;
  }

  .timeline-overlay-marker {
    position: absolute;
    top: 2px;
    height: 6px;
    background: #eab308;
    border-radius: 2px;
    z-index: 5;
    opacity: 0.85;
  }

  .playhead {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 2px;
    background: #ffffff;
    pointer-events: none;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.8);
    z-index: 10;
  }

  /* Controls Bar */
  .controls-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 18px;
    background: #090d16;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    gap: 8px;
    flex-wrap: wrap;
  }

  .playback-group {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .btn {
    background: #1e293b;
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #f8fafc;
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    transition: background 0.15s ease;
  }

  .btn:hover {
    background: #334155;
  }

  .btn-primary {
    background: #0284c7;
    border: none;
    color: #ffffff;
    font-weight: 600;
  }

  .btn-primary:hover:not(:disabled) {
    background: #0369a1;
  }

  .btn-primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Overlays Manager */
  .overlays-panel {
    background: #0f1624;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    padding: 10px 18px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .overlay-input-group {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .overlay-input {
    flex: 1;
    background: #1e293b;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    color: #f1f5f9;
    padding: 6px 12px;
    font-size: 12px;
    outline: none;
  }

  .overlay-input:focus {
    border-color: #07d0e0;
  }

  .overlays-list {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .overlay-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(234, 179, 8, 0.15);
    border: 1px solid rgba(234, 179, 8, 0.3);
    color: #fef08a;
    padding: 3px 8px;
    border-radius: 4px;
    font-size: 11px;
  }

  .overlay-tag-delete {
    background: transparent;
    border: none;
    color: #fef08a;
    cursor: pointer;
    font-size: 11px;
    padding: 0 2px;
  }

  /* Modal Base */
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(6px);
    z-index: 99999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
  }

  .modal-dialog {
    background: #090d16;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 14px;
    width: 100%;
    max-width: 860px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
    overflow: hidden;
  }

  .modal-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 18px;
    background: #0f1624;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .modal-close-btn {
    background: #1e293b;
    border: none;
    color: #94a3b8;
    width: 28px;
    height: 28px;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    transition: background 0.15s ease;
  }

  .modal-close-btn:hover {
    background: #334155;
    color: #ffffff;
  }
`;

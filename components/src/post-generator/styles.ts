import { css } from 'lit';

export const postGeneratorStyles = css`
  :host {
    display: block;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    background: #090d16;
    color: #f1f5f9;
    border-radius: 12px;
    overflow: hidden;
    box-sizing: border-box;
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }

  .generator-container {
    display: grid;
    grid-template-columns: 1.1fr 1fr;
    min-height: 460px;
    background: #090d16;
  }

  @media (max-width: 768px) {
    .generator-container {
      grid-template-columns: 1fr;
    }
  }

  /* Control Panel */
  .control-panel {
    padding: 18px;
    background: #0f1624;
    border-right: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .panel-header {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 600;
    color: #f1f5f9;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .form-label {
    font-size: 11px;
    font-weight: 600;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .text-area {
    background: #090d16;
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: #f1f5f9;
    padding: 10px 12px;
    border-radius: 8px;
    font-size: 13px;
    resize: vertical;
    min-height: 80px;
    font-family: inherit;
    transition: border-color 0.15s ease;
  }

  .text-area:focus {
    outline: none;
    border-color: #0284c7;
  }

  /* Tone Pills */
  .tone-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .tone-chip {
    background: #090d16;
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: #94a3b8;
    padding: 5px 10px;
    border-radius: 6px;
    font-size: 11px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .tone-chip:hover {
    color: #ffffff;
    border-color: rgba(255, 255, 255, 0.25);
  }

  .tone-chip.active {
    background: #1e293b;
    border-color: #0284c7;
    color: #38bdf8;
    font-weight: 600;
  }

  .btn {
    background: #1e293b;
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #f8fafc;
    padding: 8px 14px;
    border-radius: 8px;
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

  /* Preview Panel */
  .preview-panel {
    padding: 18px;
    background: #090d16;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  /* Preview Cards */
  .preview-card {
    background: #0f1624;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 10px;
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .card-author-header {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .avatar {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: #334155;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 12px;
    color: #ffffff;
  }

  .author-info {
    display: flex;
    flex-direction: column;
  }

  .author-name {
    font-size: 13px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .author-handle {
    font-size: 11px;
    color: #64748b;
  }

  .card-content {
    font-size: 13px;
    line-height: 1.5;
    white-space: pre-wrap;
    word-break: break-word;
    color: #cbd5e1;
  }

  .hashtag-pill {
    color: #38bdf8;
    font-weight: 500;
    font-size: 12px;
  }

  .char-counter {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 11px;
    color: #94a3b8;
    padding-top: 8px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  /* Modal Base */
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.65);
    backdrop-filter: blur(4px);
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
    max-width: 780px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
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

  @media (max-width: 640px) {
    .modal-backdrop {
      padding: 6px;
    }

    .modal-dialog {
      max-height: 96vh;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
    }

    .generator-container {
      min-height: 0;
      max-height: calc(96vh - 48px);
      overflow-y: auto;
      grid-template-columns: 1fr;
    }

    .control-panel {
      padding: 12px 14px;
      gap: 10px;
    }

    .preview-panel {
      padding: 12px 14px;
      gap: 10px;
    }

    .text-area {
      min-height: 60px;
      font-size: 12px;
      padding: 8px 10px;
    }

    .tone-chip {
      padding: 4px 8px;
      font-size: 10px;
    }

    .modal-topbar {
      padding: 10px 14px;
    }
  }
`;

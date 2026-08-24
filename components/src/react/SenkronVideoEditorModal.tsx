import React, { useEffect, useRef, useState } from 'react';
import type { VideoAttachedDetail, ExportProgressDetail } from '../video-editor/types';

export interface SenkronVideoEditorModalProps {
  isOpen: boolean;
  src?: string;
  aspectRatio?: '16:9' | '9:16' | '1:1' | '4:5';
  theme?: 'dark' | 'light';
  onClose?: () => void;
  onVideoAttached?: (detail: VideoAttachedDetail) => void;
  onExportProgress?: (detail: ExportProgressDetail) => void;
}

export const SenkronVideoEditorModal: React.FC<SenkronVideoEditorModalProps> = ({
  isOpen,
  src = '',
  aspectRatio = '16:9',
  theme = 'dark',
  onClose,
  onVideoAttached,
  onExportProgress,
}) => {
  const elementRef = useRef<HTMLElement | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    import('../video-editor').then(() => {
      setIsMounted(true);
    });
  }, []);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const handleClose = () => onClose?.();
    const handleAttached = (e: Event) => {
      const customEvent = e as CustomEvent<VideoAttachedDetail>;
      onVideoAttached?.(customEvent.detail);
    };
    const handleProgress = (e: Event) => {
      const customEvent = e as CustomEvent<ExportProgressDetail>;
      onExportProgress?.(customEvent.detail);
    };

    el.addEventListener('senkron:modal-close', handleClose);
    el.addEventListener('senkron:video-attached', handleAttached);
    el.addEventListener('senkron:export-progress', handleProgress);

    return () => {
      el.removeEventListener('senkron:modal-close', handleClose);
      el.removeEventListener('senkron:video-attached', handleAttached);
      el.removeEventListener('senkron:export-progress', handleProgress);
    };
  }, [isMounted, onClose, onVideoAttached, onExportProgress]);

  if (!isMounted || !isOpen) {
    return null;
  }

  return React.createElement('senkron-video-editor-modal', {
    ref: elementRef,
    open: isOpen ? '' : undefined,
    src,
    'aspect-ratio': aspectRatio,
    theme,
  });
};

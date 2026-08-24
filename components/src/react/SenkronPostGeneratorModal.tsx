import React, { useEffect, useRef, useState } from 'react';
import type { ContentTone, PostAppliedDetail } from '../post-generator/types';

export interface SenkronPostGeneratorModalProps {
  isOpen: boolean;
  apiUrl?: string;
  defaultTone?: ContentTone;
  topic?: string;
  onClose?: () => void;
  onPostApplied?: (detail: PostAppliedDetail) => void;
}

export const SenkronPostGeneratorModal: React.FC<SenkronPostGeneratorModalProps> = ({
  isOpen,
  apiUrl = '',
  defaultTone = 'viral',
  topic = '',
  onClose,
  onPostApplied,
}) => {
  const elementRef = useRef<HTMLElement | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    import('../post-generator').then(() => {
      setIsMounted(true);
    });
  }, []);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const handleClose = () => onClose?.();
    const handleApplied = (e: Event) => {
      const customEvent = e as CustomEvent<PostAppliedDetail>;
      onPostApplied?.(customEvent.detail);
    };

    if (apiUrl) {
      (el as any).apiUrl = apiUrl;
    }

    el.addEventListener('senkron:modal-close', handleClose);
    el.addEventListener('senkron:post-applied', handleApplied);

    return () => {
      el.removeEventListener('senkron:modal-close', handleClose);
      el.removeEventListener('senkron:post-applied', handleApplied);
    };
  }, [isMounted, isOpen, apiUrl, onClose, onPostApplied]);

  if (!isMounted || !isOpen) {
    return null;
  }

  return React.createElement('senkron-post-generator-modal', {
    ref: elementRef,
    open: isOpen ? '' : undefined,
    'api-url': apiUrl,
    'default-tone': defaultTone,
    topic,
  });
};

import React, { useEffect, useRef, useState } from 'react';
import type { ExportProgressDetail, TextOverlay } from '../video-editor/types';

export interface SenkronVideoEditorProps {
  src?: string;
  aspectRatio?: '16:9' | '9:16' | '1:1' | '4:5';
  theme?: 'dark' | 'light';
  autoplay?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onReady?: (e: CustomEvent<{ duration: number }>) => void;
  onTimeUpdate?: (e: CustomEvent<{ currentTime: number }>) => void;
  onExportProgress?: (e: CustomEvent<ExportProgressDetail>) => void;
  onExportComplete?: (e: CustomEvent<{ outputBlobUrl: string; duration: number }>) => void;
  onError?: (e: CustomEvent<{ message: string; error?: unknown }>) => void;
}

export const SenkronVideoEditor: React.FC<SenkronVideoEditorProps> = ({
  src = '',
  aspectRatio = '16:9',
  theme = 'dark',
  autoplay = false,
  className,
  style,
  onReady,
  onTimeUpdate,
  onExportProgress,
  onExportComplete,
  onError,
}) => {
  const elementRef = useRef<HTMLElement | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Dynamic client-side registration
    import('../video-editor').then(() => {
      setIsMounted(true);
    });
  }, []);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const handleReady = (e: Event) => onReady?.(e as CustomEvent<{ duration: number }>);
    const handleTimeUpdate = (e: Event) => onTimeUpdate?.(e as CustomEvent<{ currentTime: number }>);
    const handleProgress = (e: Event) => onExportProgress?.(e as CustomEvent<ExportProgressDetail>);
    const handleComplete = (e: Event) => onExportComplete?.(e as CustomEvent<{ outputBlobUrl: string; duration: number }>);
    const handleError = (e: Event) => onError?.(e as CustomEvent<{ message: string; error?: unknown }>);

    el.addEventListener('senkron:ready', handleReady);
    el.addEventListener('senkron:timeupdate', handleTimeUpdate);
    el.addEventListener('senkron:export-progress', handleProgress);
    el.addEventListener('senkron:export-complete', handleComplete);
    el.addEventListener('senkron:error', handleError);

    return () => {
      el.removeEventListener('senkron:ready', handleReady);
      el.removeEventListener('senkron:timeupdate', handleTimeUpdate);
      el.removeEventListener('senkron:export-progress', handleProgress);
      el.removeEventListener('senkron:export-complete', handleComplete);
      el.removeEventListener('senkron:error', handleError);
    };
  }, [isMounted, onReady, onTimeUpdate, onExportProgress, onExportComplete, onError]);

  // If SSR / pre-hydration, return placeholder container
  if (!isMounted) {
    return (
      <div
        className={className}
        style={{
          minHeight: '580px',
          background: '#0f172a',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#64748b',
          ...style,
        }}
      >
        <span>Loading Senkron Video Editor...</span>
      </div>
    );
  }

  return React.createElement('senkron-video-editor', {
    ref: elementRef,
    src,
    'aspect-ratio': aspectRatio,
    theme,
    autoplay: autoplay ? '' : undefined,
    class: className,
    style,
  });
};

import React, { useEffect, useRef, useState } from 'react';
import type { SocialPlatform, ContentTone, PostDraft } from '../post-generator/types';

export interface SenkronPostGeneratorProps {
  apiUrl?: string;
  graphqlUrl?: string;
  defaultTone?: ContentTone;
  topic?: string;
  className?: string;
  style?: React.CSSProperties;
  onPostGenerated?: (e: CustomEvent<{ platform: SocialPlatform; draft: PostDraft }>) => void;
  onPostCopied?: (e: CustomEvent<{ platform: SocialPlatform; text: string }>) => void;
  onPostError?: (e: CustomEvent<{ message: string }>) => void;
}

export const SenkronPostGenerator: React.FC<SenkronPostGeneratorProps> = ({
  apiUrl = '',
  graphqlUrl = '',
  defaultTone = 'viral',
  topic = '',
  className,
  style,
  onPostGenerated,
  onPostCopied,
  onPostError,
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

    const handleGenerated = (e: Event) =>
      onPostGenerated?.(e as CustomEvent<{ platform: SocialPlatform; draft: PostDraft }>);
    const handleCopied = (e: Event) =>
      onPostCopied?.(e as CustomEvent<{ platform: SocialPlatform; text: string }>);
    const handleError = (e: Event) =>
      onPostError?.(e as CustomEvent<{ message: string }>);

    el.addEventListener('senkron:post-generated', handleGenerated);
    el.addEventListener('senkron:post-copied', handleCopied);
    el.addEventListener('senkron:post-error', handleError);

    return () => {
      el.removeEventListener('senkron:post-generated', handleGenerated);
      el.removeEventListener('senkron:post-copied', handleCopied);
      el.removeEventListener('senkron:post-error', handleError);
    };
  }, [isMounted, onPostGenerated, onPostCopied, onPostError]);

  if (!isMounted) {
    return (
      <div
        className={className}
        style={{
          minHeight: '500px',
          background: '#0b0f19',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#64748b',
          ...style,
        }}
      >
        <span>Loading Senkron Post Generator...</span>
      </div>
    );
  }

  return React.createElement('senkron-post-generator', {
    ref: elementRef,
    'api-url': apiUrl,
    'graphql-url': graphqlUrl,
    'default-tone': defaultTone,
    topic,
    class: className,
    style,
  });
};

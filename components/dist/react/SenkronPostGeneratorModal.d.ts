import { default as React } from 'react';
import { ContentTone, PostAppliedDetail } from '../post-generator/types';

export interface SenkronPostGeneratorModalProps {
    isOpen: boolean;
    apiUrl?: string;
    defaultTone?: ContentTone;
    topic?: string;
    onClose?: () => void;
    onPostApplied?: (detail: PostAppliedDetail) => void;
}
export declare const SenkronPostGeneratorModal: React.FC<SenkronPostGeneratorModalProps>;

import { default as React } from 'react';
import { SocialPlatform, ContentTone, PostDraft } from '../post-generator/types';

export interface SenkronPostGeneratorProps {
    apiUrl?: string;
    graphqlUrl?: string;
    defaultTone?: ContentTone;
    topic?: string;
    className?: string;
    style?: React.CSSProperties;
    onPostGenerated?: (e: CustomEvent<{
        platform: SocialPlatform;
        draft: PostDraft;
    }>) => void;
    onPostCopied?: (e: CustomEvent<{
        platform: SocialPlatform;
        text: string;
    }>) => void;
    onPostError?: (e: CustomEvent<{
        message: string;
    }>) => void;
}
export declare const SenkronPostGenerator: React.FC<SenkronPostGeneratorProps>;

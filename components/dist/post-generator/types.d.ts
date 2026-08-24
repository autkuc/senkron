export type SocialPlatform = 'nsosyal';
export type ContentTone = 'viral' | 'professional' | 'educational' | 'casual' | 'witty';
export interface PostDraft {
    platform: SocialPlatform;
    content: string;
    hashtags: string[];
    characterCount: number;
    maxCharacters: number;
}
export interface PostGenerationRequest {
    topic: string;
    platform: SocialPlatform;
    tone: ContentTone;
    targetAudience?: string;
    mediaDescription?: string;
}
export interface PostGenerationResponse {
    drafts: Record<SocialPlatform, PostDraft>;
    generatedAt: string;
}
export interface PostAppliedDetail {
    platform: SocialPlatform;
    content: string;
    hashtags: string[];
    fullText: string;
}
export interface PostGeneratorEvents {
    'senkron:post-generated': CustomEvent<{
        platform: SocialPlatform;
        draft: PostDraft;
    }>;
    'senkron:post-copied': CustomEvent<{
        platform: SocialPlatform;
        text: string;
    }>;
    'senkron:post-applied': CustomEvent<PostAppliedDetail>;
    'senkron:modal-close': CustomEvent<void>;
    'senkron:post-error': CustomEvent<{
        message: string;
    }>;
}

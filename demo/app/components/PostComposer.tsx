'use client';

import React from 'react';
import type { VideoAttachedDetail } from '@senkron/components';

interface PostComposerProps {
  onOpenVideoModal: () => void;
  onOpenAiModal: () => void;
  attachedVideo: VideoAttachedDetail | null;
  onRemoveVideo: () => void;
  postText: string;
  onPostTextChange: (text: string) => void;
  onPublish: (post: { text: string; video?: VideoAttachedDetail }) => void;
}

export const PostComposer: React.FC<PostComposerProps> = ({
  onOpenVideoModal,
  onOpenAiModal,
  attachedVideo,
  onRemoveVideo,
  postText,
  onPostTextChange,
  onPublish,
}) => {
  const handleSubmit = () => {
    if (!postText.trim() && !attachedVideo) return;
    onPublish({
      text: postText.trim(),
      video: attachedVideo || undefined,
    });
    onPostTextChange('');
  };

  return (
    <div className="p-4 rounded-xl bg-[#0f1624] border border-slate-800 space-y-3">
      <div className="flex gap-3">
        {/* User Avatar */}
        <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center font-semibold text-xs text-white flex-shrink-0">
          KA
        </div>

        {/* Textarea */}
        <div className="flex-1 space-y-3">
          <textarea
            value={postText}
            onChange={(e) => onPostTextChange(e.target.value)}
            placeholder="Aklında ne var?"
            className="w-full bg-transparent border-none outline-none text-slate-200 placeholder-slate-500 text-sm resize-none min-h-[60px] font-normal leading-relaxed"
          ></textarea>

          {/* Attached Video Card Preview */}
          {attachedVideo && (
            <div className="rounded-lg overflow-hidden border border-slate-700 bg-[#090d16] p-2 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-sky-400">
                    Video Eklendi
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                    {attachedVideo.duration.toFixed(1)}s • {attachedVideo.aspectRatio}
                  </span>
                </div>
                <button
                  onClick={onRemoveVideo}
                  className="w-5 h-5 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 flex items-center justify-center text-xs transition"
                  title="Videoyu Kaldır"
                >
                  ✕
                </button>
              </div>

              <video
                src={attachedVideo.videoUrl}
                controls
                className="w-full max-h-56 rounded bg-black object-contain border border-slate-800"
              />
            </div>
          )}
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Video Studio Trigger */}
          <button
            type="button"
            onClick={onOpenVideoModal}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition"
            title="Video Düzenle"
          >
            <svg className="w-3.5 h-3.5 text-sky-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <polygon points="23 7 16 12 23 17 23 7" />
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg>
            <span>Video Düzenle</span>
          </button>

          {/* AI Post Assistant Trigger */}
          <button
            type="button"
            onClick={onOpenAiModal}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition"
            title="Taslak Asistanı"
          >
            <svg className="w-3.5 h-3.5 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
            <span>Taslak Önerisi</span>
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!postText.trim() && !attachedVideo}
          className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold shadow-md shadow-sky-500/10 transition"
        >
          Paylaş
        </button>
      </div>
    </div>
  );
};

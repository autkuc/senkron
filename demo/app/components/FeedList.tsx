'use client';

import React, { useState } from 'react';

export interface FeedPost {
  id: string;
  authorName: string;
  authorHandle: string;
  avatarText: string;
  avatarGradient: string;
  verified: boolean;
  timeAgo: string;
  content: string;
  hashtags: string[];
  videoUrl?: string;
  likesCount: number;
  repostsCount: number;
  repliesCount: number;
  isLiked?: boolean;
  isReposted?: boolean;
}

interface FeedListProps {
  posts: FeedPost[];
  onToggleLike: (id: string) => void;
  onToggleRepost: (id: string) => void;
}

export const FeedList: React.FC<FeedListProps> = ({
  posts,
  onToggleLike,
  onToggleRepost,
}) => {
  const [activeTab, setActiveTab] = useState<'flow' | 'trending' | 'following'>('flow');

  return (
    <div className="space-y-3">
      {/* Feed Tabs */}
      <div className="flex border-b border-slate-800/80 bg-[#090d16]/95 backdrop-blur-md sticky top-[53px] md:top-[57px] z-10">
        {[
          { id: 'flow', label: 'Akış' },
          { id: 'trending', label: 'Trendler' },
          { id: 'following', label: 'Takip Edilenler' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'flow' | 'trending' | 'following')}
            className={`flex-1 py-2.5 sm:py-3 text-xs sm:text-sm font-medium transition-colors relative ${
              activeTab === tab.id
                ? 'text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>{tab.label}</span>
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-gradient-to-r from-sky-400 to-blue-500"></div>
            )}
          </button>
        ))}
      </div>

      {/* Posts Stream */}
      <div className="space-y-3">
        {posts.map((post) => (
          <article
            key={post.id}
            className="p-3.5 sm:p-4 rounded-2xl bg-[#0f1624] border border-slate-800/80 hover:border-slate-700/60 transition-colors space-y-2.5 sm:space-y-3"
          >
            {/* Post Header */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                <div
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-semibold text-xs text-white flex-shrink-0"
                  style={{ background: post.avatarGradient }}
                >
                  {post.avatarText}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center flex-wrap gap-x-1.5 gap-y-0.5">
                    <span className="font-semibold text-xs sm:text-sm text-slate-100 truncate">{post.authorName}</span>
                    {post.verified && (
                      <svg className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    )}
                    <span className="text-slate-500 text-[11px] sm:text-xs font-mono">{post.authorHandle}</span>
                    <span className="text-slate-600 text-[11px] sm:text-xs">• {post.timeAgo}</span>
                  </div>
                </div>
              </div>

              <button className="text-slate-500 hover:text-slate-300 text-xs p-1 flex-shrink-0" aria-label="Daha fazla">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="12" cy="5" r="1" />
                  <circle cx="12" cy="19" r="1" />
                </svg>
              </button>
            </div>

            {/* Post Content */}
            <div className="text-slate-300 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-words pl-0.5">
              {post.content}
            </div>

            {/* Hashtag Pills */}
            {post.hashtags && post.hashtags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pl-0.5">
                {post.hashtags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] sm:text-xs font-medium text-sky-400 hover:underline cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Embedded Video Player */}
            {post.videoUrl && (
              <div className="rounded-xl overflow-hidden border border-slate-800 bg-black mt-2">
                <video
                  src={post.videoUrl}
                  controls
                  playsInline
                  className="w-full max-h-60 sm:max-h-80 object-contain"
                />
              </div>
            )}

            {/* Post Interaction Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-slate-400 text-xs">
              <button
                onClick={() => onToggleLike(post.id)}
                className={`flex items-center gap-1.5 py-1 px-2 rounded-lg hover:bg-slate-800/60 active:scale-95 transition-all ${
                  post.isLiked ? 'text-rose-500 font-semibold' : 'hover:text-rose-400'
                }`}
              >
                <svg
                  className="w-[16px] h-[16px] sm:w-[17px] sm:h-[17px]"
                  fill={post.isLiked ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                <span className="text-[11px] sm:text-xs">{post.likesCount}</span>
              </button>

              <button
                onClick={() => onToggleRepost(post.id)}
                className={`flex items-center gap-1.5 py-1 px-2 rounded-lg hover:bg-slate-800/60 active:scale-95 transition-all ${
                  post.isReposted ? 'text-emerald-400 font-semibold' : 'hover:text-emerald-400'
                }`}
              >
                <svg className="w-[16px] h-[16px] sm:w-[17px] sm:h-[17px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <polyline points="17 1 21 5 17 9" />
                  <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                  <polyline points="7 23 3 19 7 15" />
                  <path d="M21 13v2a4 4 0 0 1-4 4H3" />
                </svg>
                <span className="text-[11px] sm:text-xs">{post.repostsCount}</span>
              </button>

              <button className="flex items-center gap-1.5 py-1 px-2 rounded-lg hover:bg-slate-800/60 active:scale-95 hover:text-sky-400 transition-all">
                <svg className="w-[16px] h-[16px] sm:w-[17px] sm:h-[17px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                <span className="text-[11px] sm:text-xs">{post.repliesCount}</span>
              </button>

              <button className="flex items-center gap-1.5 py-1 px-2 rounded-lg hover:bg-slate-800/60 active:scale-95 hover:text-slate-200 transition-all">
                <svg className="w-[16px] h-[16px] sm:w-[17px] sm:h-[17px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
                <span className="hidden xs:inline text-[11px] sm:text-xs">Paylaş</span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

'use client';

import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { StoryBar } from './components/StoryBar';
import { PostComposer } from './components/PostComposer';
import { FeedList, FeedPost } from './components/FeedList';
import { RightSidebar } from './components/RightSidebar';
import {
  SenkronVideoEditorModal,
  SenkronPostGeneratorModal,
} from '@senkron/components/react';
import type { VideoAttachedDetail, PostAppliedDetail } from '@senkron/components';

const INITIAL_POSTS: FeedPost[] = [
  {
    id: 'post-1',
    authorName: 'NSosyal Ekibi',
    authorHandle: '@nsosyal',
    avatarText: 'NS',
    avatarGradient: 'linear-gradient(135deg, #0284c7, #2563eb)',
    verified: true,
    timeAgo: '15 dk',
    content: 'Yeni nesil istemci taraflı video kırpma ve yapay zeka asistanı Senkron modülü yayında.\n\nVideolarınızı sunucuya göndermeden doğrudan tarayıcınızda saniyeler içinde düzenleyip paylaşabilirsiniz.',
    hashtags: ['#NSosyal', '#Yazılım', '#VideoDüzenleme'],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    likesCount: 38,
    repostsCount: 12,
    repliesCount: 6,
    isLiked: false,
  },
  {
    id: 'post-2',
    authorName: 'Emre Karaca',
    authorHandle: '@emre_k',
    avatarText: 'EK',
    avatarGradient: 'linear-gradient(135deg, #475569, #334155)',
    verified: false,
    timeAgo: '45 dk',
    content: 'WebAssembly ile tarayıcıda video işleme performansı gayet akıcı. 1080p kesme ve altyazı işlemlerinde hiç takılma yaşanmıyor.',
    hashtags: ['#WebDev', '#Teknoloji'],
    likesCount: 19,
    repostsCount: 4,
    repliesCount: 2,
  },
  {
    id: 'post-3',
    authorName: 'Büşra Demir',
    authorHandle: '@busra_d',
    avatarText: 'BD',
    avatarGradient: 'linear-gradient(135deg, #0d9488, #0f766e)',
    verified: true,
    timeAgo: '2 sa',
    content: 'Gönderi oluştururken taslak önerileri almak pratik olmuş. Özellikle farklı üsluplarda hızlıca fikir vermesi zaman kazandırıyor.',
    hashtags: ['#SosyalMedya', '#İçerik'],
    likesCount: 27,
    repostsCount: 5,
    repliesCount: 3,
  },
];

export default function NSosyalDemoPage() {
  const [posts, setPosts] = useState<FeedPost[]>(INITIAL_POSTS);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [attachedVideo, setAttachedVideo] = useState<VideoAttachedDetail | null>(null);
  const [postText, setPostText] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleVideoAttached = (detail: VideoAttachedDetail) => {
    setAttachedVideo(detail);
    setIsVideoModalOpen(false);
    showToast(`Video eklendi (${detail.duration.toFixed(1)} sn)`);
  };

  const handlePostApplied = (detail: PostAppliedDetail) => {
    setPostText(detail.fullText);
    setIsAiModalOpen(false);
    showToast('Taslak metin gönderi kutusuna aktarıldı');
  };

  const handlePublishPost = ({
    text,
    video,
  }: {
    text: string;
    video?: VideoAttachedDetail;
  }) => {
    const newPost: FeedPost = {
      id: `post-${Date.now()}`,
      authorName: 'Kaan Arslan',
      authorHandle: '@kaan_dev',
      avatarText: 'KA',
      avatarGradient: 'linear-gradient(135deg, #0284c7, #2563eb)',
      verified: true,
      timeAgo: 'Şimdi',
      content: text,
      hashtags: [],
      videoUrl: video?.videoUrl,
      likesCount: 0,
      repostsCount: 0,
      repliesCount: 0,
    };

    setPosts([newPost, ...posts]);
    setAttachedVideo(null);
    setPostText('');
    showToast('Gönderi paylaşıldı');
  };

  const handleToggleLike = (id: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              isLiked: !p.isLiked,
              likesCount: p.isLiked ? p.likesCount - 1 : p.likesCount + 1,
            }
          : p
      )
    );
  };

  const handleToggleRepost = (id: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              isReposted: !p.isReposted,
              repostsCount: p.isReposted ? p.repostsCount - 1 : p.repostsCount + 1,
            }
          : p
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#090d16] flex justify-center text-slate-200">
      {/* Subtle Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[999999] px-4 py-2 rounded-lg bg-[#141c2e] border border-slate-700 text-slate-200 text-xs font-medium shadow-lg flex items-center gap-2">
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white ml-1">
            ✕
          </button>
        </div>
      )}

      {/* Main 3-Column Container */}
      <div className="w-full max-w-7xl flex justify-between">
        {/* Column 1: Left Navigation Sidebar */}
        <Sidebar onOpenComposer={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />

        {/* Column 2: Center Main Feed */}
        <main className="flex-1 max-w-2xl border-r border-slate-800/80 min-h-screen">
          {/* Clean Top Header Bar */}
          <div className="sticky top-0 z-20 bg-[#090d16]/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-3.5 flex items-center justify-between">
            <h1 className="font-semibold text-sm text-slate-100">
              Ana Sayfa
            </h1>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="text-slate-400 text-xs font-normal">
                Akış
              </span>
            </div>
          </div>

          {/* Stories Carousel */}
          <StoryBar />

          {/* Post Creation Composer */}
          <div className="p-4 border-b border-slate-800/80">
            <PostComposer
              onOpenVideoModal={() => setIsVideoModalOpen(true)}
              onOpenAiModal={() => setIsAiModalOpen(true)}
              attachedVideo={attachedVideo}
              onRemoveVideo={() => setAttachedVideo(null)}
              postText={postText}
              onPostTextChange={setPostText}
              onPublish={handlePublishPost}
            />
          </div>

          {/* Social Feed Stream */}
          <div className="p-4">
            <FeedList
              posts={posts}
              onToggleLike={handleToggleLike}
              onToggleRepost={handleToggleRepost}
            />
          </div>
        </main>

        {/* Column 3: Right Sidebar */}
        <RightSidebar />
      </div>

      {/* Video Editor Modal */}
      <SenkronVideoEditorModal
        isOpen={isVideoModalOpen}
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        aspectRatio="16:9"
        onClose={() => setIsVideoModalOpen(false)}
        onVideoAttached={handleVideoAttached}
      />

      {/* Post Generator Modal */}
      <SenkronPostGeneratorModal
        isOpen={isAiModalOpen}
        apiUrl="/api/ai/generate"
        defaultTone="viral"
        topic={postText || 'NSosyal platform güncellemesi'}
        onClose={() => setIsAiModalOpen(false)}
        onPostApplied={handlePostApplied}
      />
    </div>
  );
}

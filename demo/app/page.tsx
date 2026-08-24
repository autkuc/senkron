'use client';

import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { StoryBar } from './components/StoryBar';
import { PostComposer } from './components/PostComposer';
import { FeedList, FeedPost } from './components/FeedList';
import { RightSidebar } from './components/RightSidebar';
import { OfflineDinoGame } from './components/OfflineDinoGame';
import { BadgeModal } from './components/BadgeModal';
import { useBadges } from './components/useBadges';
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
    hashtags: ['#SosyalMedya', '#İçerik', '#TEKNOFEST'],
    likesCount: 27,
    repostsCount: 5,
    repliesCount: 3,
  },
];

export default function NSosyalDemoPage() {
  const [posts, setPosts] = useState<FeedPost[]>(INITIAL_POSTS);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState(false);
  const [isDinoModalOpen, setIsDinoModalOpen] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [attachedVideo, setAttachedVideo] = useState<VideoAttachedDetail | null>(null);
  const [postText, setPostText] = useState('');
  const [toastMessage, setToastMessage] = useState<{ text: string; isBadge?: boolean } | null>(null);

  // Badge Gamification Hook
  const {
    badges,
    unlockedBadges,
    totalXp,
    level,
    nextLevelXp,
    currentLevelProgress,
    unlockBadge,
    newlyUnlockedBadge,
    clearNewBadgeToast,
  } = useBadges();

  // Listen to Online / Offline Network Status
  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      showToast('İnternet bağlantısı yeniden sağlandı 🌐');
    };
    const handleOffline = () => {
      setIsOffline(true);
      setIsDinoModalOpen(true);
      showToast('İnternet bağlantısı kesildi! Çevrimdışı Dino oyunu başlatıldı 🦖');
    };

    // Initial check
    if (typeof window !== 'undefined' && !navigator.onLine) {
      setIsOffline(true);
    }

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Show Toast when a badge is newly unlocked
  useEffect(() => {
    if (newlyUnlockedBadge) {
      setToastMessage({
        text: `🎉 Tebrikler! "${newlyUnlockedBadge.title}" Rozeti Açıldı (+${newlyUnlockedBadge.xp} XP)`,
        isBadge: true,
      });
      const timer = setTimeout(() => {
        setToastMessage(null);
        clearNewBadgeToast();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [newlyUnlockedBadge, clearNewBadgeToast]);

  const showToast = (msg: string, isBadge = false) => {
    setToastMessage({ text: msg, isBadge });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleVideoAttached = (detail: VideoAttachedDetail) => {
    setAttachedVideo(detail);
    setIsVideoModalOpen(false);
    showToast(`Video eklendi (${detail.duration.toFixed(1)} sn)`);
    // Reward Badge: Video Ustası
    unlockBadge('video_master');
  };

  const handlePostApplied = (detail: PostAppliedDetail) => {
    setPostText(detail.fullText);
    setIsAiModalOpen(false);
    showToast('Taslak metin gönderi kutusuna aktarıldı');
    // Reward Badge: Yapay Zeka Mimarı
    unlockBadge('ai_architect');
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

    // Reward Badge: Topluluk Sesi
    unlockBadge('community_voice');

    // Check for TEKNOFEST / Milli Teknoloji tag
    if (text.includes('#TEKNOFEST') || text.includes('#MilliTeknoloji') || text.includes('TEKNOFEST')) {
      unlockBadge('teknofest_pioneer');
    }
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
    // Reward Badge: Etkileşim Öncüsü
    unlockBadge('interaction_lead');
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
    unlockBadge('interaction_lead');
  };

  return (
    <div className="min-h-screen bg-[#090d16] flex justify-center text-slate-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed top-5 left-1/2 -translate-y-1/2 z-[999999] px-4 py-2.5 rounded-xl border text-xs font-semibold shadow-2xl flex items-center gap-3 animate-in fade-in-0 slide-in-from-top-4 duration-300 ${
            toastMessage.isBadge
              ? 'bg-[#151d30] border-amber-500/50 text-amber-300 shadow-amber-500/10'
              : 'bg-[#141c2e] border-slate-700 text-slate-200'
          }`}
        >
          <span>{toastMessage.text}</span>
          {toastMessage.isBadge && (
            <button
              onClick={() => setIsBadgeModalOpen(true)}
              className="px-2 py-0.5 rounded-md bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[11px] underline"
            >
              Rozetleri İncele
            </button>
          )}
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white ml-1 text-xs"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main 3-Column Container */}
      <div className="w-full max-w-7xl flex justify-between">
        {/* Column 1: Left Navigation Sidebar */}
        <Sidebar
          onOpenComposer={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          onOpenBadges={() => setIsBadgeModalOpen(true)}
          onOpenDinoGame={() => setIsDinoModalOpen(true)}
          unlockedBadgeCount={unlockedBadges.length}
        />

        {/* Column 2: Center Main Feed */}
        <main className="flex-1 max-w-2xl min-h-screen border-r border-slate-800/80">
          {/* Header */}
          <header className="sticky top-0 z-20 bg-[#090d16]/90 backdrop-blur-md px-4 py-3.5 border-b border-slate-800/80 flex items-center justify-between">
            <h1 className="text-base font-bold text-slate-100">Ana Sayfa</h1>
            <div className="flex items-center gap-2">
              {/* Quick Dino Offline Game Button */}
              <button
                onClick={() => setIsDinoModalOpen(true)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-750 border border-slate-700/60 text-slate-300 hover:text-white text-xs font-medium transition-colors"
                title="Çevrimdışı Dino Oyunu"
              >
                <span>🦖</span>
                <span className="hidden sm:inline">Dino Oyunu</span>
              </button>

              {/* Badges Modal Trigger */}
              <button
                onClick={() => setIsBadgeModalOpen(true)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold transition-colors"
              >
                <span>🏅</span>
                <span>Seviye {level}</span>
              </button>
            </div>
          </header>

          {/* Stories Carousel */}
          <StoryBar />

          {/* Post Composer Area */}
          <PostComposer
            onOpenVideoModal={() => setIsVideoModalOpen(true)}
            onOpenAiModal={() => setIsAiModalOpen(true)}
            attachedVideo={attachedVideo}
            onRemoveVideo={() => setAttachedVideo(null)}
            postText={postText}
            onPostTextChange={setPostText}
            onPublish={handlePublishPost}
          />

          {/* Feed Posts */}
          <FeedList
            posts={posts}
            onToggleLike={handleToggleLike}
            onToggleRepost={handleToggleRepost}
          />
        </main>

        {/* Column 3: Right Sidebar */}
        <RightSidebar
          level={level}
          totalXp={totalXp}
          nextLevelXp={nextLevelXp}
          currentLevelProgress={currentLevelProgress}
          unlockedBadges={unlockedBadges}
          onOpenBadgeModal={() => setIsBadgeModalOpen(true)}
          onOpenDinoGame={() => setIsDinoModalOpen(true)}
        />
      </div>

      {/* WASM Video Editor Modal */}
      <SenkronVideoEditorModal
        isOpen={isVideoModalOpen}
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        onClose={() => setIsVideoModalOpen(false)}
        onVideoAttached={(detail) => {
          handleVideoAttached(detail);
        }}
      />

      {/* AI Post Generator Modal */}
      <SenkronPostGeneratorModal
        isOpen={isAiModalOpen}
        topic={postText}
        onClose={() => setIsAiModalOpen(false)}
        onPostApplied={(detail) => {
          handlePostApplied(detail);
        }}
      />

      {/* Badge Rewards Modal */}
      <BadgeModal
        isOpen={isBadgeModalOpen}
        onClose={() => setIsBadgeModalOpen(false)}
        badges={badges}
        level={level}
        totalXp={totalXp}
        nextLevelXp={nextLevelXp}
        currentLevelProgress={currentLevelProgress}
      />

      {/* Offline / Dino Game Popup Modal */}
      {isDinoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in-0 duration-200">
          <div className="relative w-full max-w-2xl">
            <OfflineDinoGame
              onScoreEarned={(s) => {
                if (s >= 50) unlockBadge('offline_hero');
              }}
              onBadgeUnlocked={(badgeId) => unlockBadge(badgeId)}
              onClose={() => setIsDinoModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

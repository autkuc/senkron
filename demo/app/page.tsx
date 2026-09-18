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
    videoUrl: '/videos/teknofest-sample.mp4',
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
  const [activeVideoSrc, setActiveVideoSrc] = useState<string>('/videos/teknofest-sample.mp4');
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
      isLiked: false,
    };

    setPosts([newPost, ...posts]);
    setAttachedVideo(null);
    setPostText('');
    showToast('Gönderiniz başarıyla paylaşıldı!');

    // Reward Badge: Topluluk Sesi
    unlockBadge('first_post');

    // Check for TEKNOFEST / Milli Teknoloji tag
    if (text.includes('#TEKNOFEST') || text.includes('#MilliTeknoloji') || text.includes('TEKNOFEST')) {
      unlockBadge('teknofest_pioneer');
    }
  };

  const handleToggleLike = (postId: string) => {
    setPosts(
      posts.map((p) => {
        if (p.id === postId) {
          const isLiked = !p.isLiked;
          if (isLiked) unlockBadge('social_butterfly');
          return {
            ...p,
            isLiked,
            likesCount: isLiked ? p.likesCount + 1 : p.likesCount - 1,
          };
        }
        return p;
      })
    );
  };

  const handleToggleRepost = (postId: string) => {
    setPosts(
      posts.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            repostsCount: p.repostsCount + 1,
          };
        }
        return p;
      })
    );
    showToast('Gönderi yeniden paylaşıldı 🔄');
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex justify-center">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div
          className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-semibold backdrop-blur-md border animate-in fade-in-0 slide-in-from-top-4 duration-200 ${
            toastMessage.isBadge
              ? 'bg-amber-500/20 border-amber-500/50 text-amber-200 shadow-amber-500/10'
              : 'bg-sky-500/20 border-sky-500/40 text-sky-200 shadow-sky-500/10'
          }`}
        >
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Offline Alert Sticky Banner */}
      {isOffline && (
        <div className="fixed bottom-16 md:bottom-4 right-4 z-40 px-3.5 py-2 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-semibold flex items-center gap-2 backdrop-blur-md shadow-lg animate-in slide-in-from-bottom-2">
          <span className="w-2 h-2 rounded-full bg-red-400 animate-ping"></span>
          <span className="hidden xs:inline">Çevrimdışı</span>
          <button
            onClick={() => setIsDinoModalOpen(true)}
            className="ml-1 px-2 py-0.5 rounded bg-red-500/30 hover:bg-red-500/50 text-[11px] underline"
          >
            Dino 🦖
          </button>
        </div>
      )}

      {/* Main 3-Column Container */}
      <div className="w-full max-w-7xl flex justify-center md:justify-start lg:justify-between">
        {/* Column 1: Left Navigation Sidebar */}
        <Sidebar
          onOpenComposer={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          onOpenBadges={() => setIsBadgeModalOpen(true)}
          onOpenDinoGame={() => setIsDinoModalOpen(true)}
          unlockedBadgeCount={unlockedBadges.length}
        />

        {/* Column 2: Center Main Feed */}
        <main className="w-full flex-1 max-w-2xl min-h-screen border-r border-slate-800/80 pb-20 md:pb-6">
          {/* Header */}
          <header className="sticky top-0 z-20 bg-[#090d16]/90 backdrop-blur-md px-3.5 sm:px-4 py-3 border-b border-slate-800/80 flex items-center justify-between">
            {/* Desktop Page Title / Mobile Brand */}
            <div className="flex items-center gap-2.5">
              {/* Mobile Brand Logo */}
              <div className="flex md:hidden items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-600 to-cyan-500 flex items-center justify-center font-bold text-white text-sm shadow-sm">
                  N
                </div>
                <span className="font-bold text-base text-white">NSosyal</span>
              </div>
              <h1 className="hidden md:block text-base font-bold text-slate-100">Ana Sayfa</h1>
            </div>

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
          <div className="p-3 sm:p-4">
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

          {/* Feed Posts */}
          <div className="px-3 sm:px-4">
            <FeedList
              posts={posts}
              onToggleLike={handleToggleLike}
              onToggleRepost={handleToggleRepost}
            />
          </div>
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

      {/* Mobile Bottom Navigation Bar (Visible on < 768px) */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-[#090d16]/95 backdrop-blur-lg border-t border-slate-800/90 px-4 py-2 flex items-center justify-around md:hidden shadow-2xl">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex flex-col items-center gap-0.5 text-sky-400 py-1 px-3"
          title="Ana Sayfa"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
          <span className="text-[10px] font-medium">Akış</span>
        </button>

        <button
          onClick={() => showToast('Trend konular sağ panelde listeleniyor')}
          className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-slate-200 py-1 px-3"
          title="Keşfet"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          <span className="text-[10px] font-medium">Keşfet</span>
        </button>

        {/* Mobile Central Action Button */}
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="w-10 h-10 -mt-3 rounded-full bg-gradient-to-tr from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 flex items-center justify-center text-white shadow-lg shadow-sky-500/25 active:scale-95 transition-all"
          title="Gönderi Paylaş"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>

        <button
          onClick={() => setIsBadgeModalOpen(true)}
          className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-amber-300 py-1 px-3 relative"
          title="Rozetlerim"
        >
          <span className="text-base">🏅</span>
          <span className="text-[10px] font-medium">Rozetler</span>
          {unlockedBadges.length > 0 && (
            <span className="absolute top-0.5 right-2 w-2 h-2 rounded-full bg-amber-400" />
          )}
        </button>

        <button
          onClick={() => setIsDinoModalOpen(true)}
          className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-rose-400 py-1 px-3"
          title="Dino Oyunu"
        >
          <span className="text-base">🦖</span>
          <span className="text-[10px] font-medium">Dino</span>
        </button>
      </nav>

      {/* WASM Video Editor Modal */}
      <SenkronVideoEditorModal
        isOpen={isVideoModalOpen}
        src={activeVideoSrc}
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

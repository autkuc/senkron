'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

interface OfflineDinoGameProps {
  onScoreEarned?: (score: number) => void;
  onBadgeUnlocked?: (badgeId: string) => void;
  onClose?: () => void;
}

export const OfflineDinoGame: React.FC<OfflineDinoGameProps> = ({
  onScoreEarned,
  onBadgeUnlocked,
  onClose,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [badgeNotice, setBadgeNotice] = useState<string | null>(null);

  // Game state refs for 60fps loop
  const gameState = useRef({
    dinoY: 150,
    dinoVelocityY: 0,
    isJumping: false,
    gravity: 0.65,
    jumpPower: -11.5,
    groundY: 150,
    speed: 4.5,
    score: 0,
    obstacles: [] as { x: number; y: number; width: number; height: number; type: number }[],
    clouds: [] as { x: number; y: number; speed: number }[],
    stars: [] as { x: number; y: number; size: number }[],
    lastObstacleTime: 0,
    animationFrameId: 0,
    gameOver: false,
  });

  // Load High Score
  useEffect(() => {
    try {
      const saved = localStorage.getItem('senkron_dino_highscore');
      if (saved) setHighScore(parseInt(saved, 10));
    } catch {
      // Ignored
    }
  }, []);

  const jump = useCallback(() => {
    const s = gameState.current;
    if (s.gameOver) {
      restartGame();
      return;
    }
    if (!s.isJumping && s.dinoY >= s.groundY) {
      s.dinoVelocityY = s.jumpPower;
      s.isJumping = true;
      if (!isPlaying) setIsPlaying(true);
    }
  }, [isPlaying]);

  const restartGame = () => {
    const s = gameState.current;
    s.dinoY = s.groundY;
    s.dinoVelocityY = 0;
    s.isJumping = false;
    s.speed = 4.5;
    s.score = 0;
    s.obstacles = [];
    s.gameOver = false;
    s.lastObstacleTime = 0;
    setScore(0);
    setIsGameOver(false);
    setIsPlaying(true);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [jump]);

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Init clouds and stars
    const s = gameState.current;
    s.clouds = [
      { x: 100, y: 35, speed: 0.8 },
      { x: 320, y: 50, speed: 0.6 },
      { x: 540, y: 25, speed: 0.9 },
    ];
    s.stars = Array.from({ length: 25 }, () => ({
      x: Math.random() * 640,
      y: Math.random() * 110,
      size: Math.random() > 0.5 ? 2 : 1,
    }));

    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const delta = Math.min((currentTime - lastTime) / 16.66, 2);
      lastTime = currentTime;

      // Clear Canvas
      ctx.fillStyle = '#0a0f1d';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw background stars
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      s.stars.forEach((star) => {
        ctx.fillRect(star.x, star.y, star.size, star.size);
      });

      // Draw and move clouds
      ctx.fillStyle = 'rgba(30, 41, 59, 0.7)';
      s.clouds.forEach((cloud) => {
        if (!s.gameOver) cloud.x -= cloud.speed * delta;
        if (cloud.x < -60) cloud.x = canvas.width + Math.random() * 80;
        // Pixel Cloud
        ctx.fillRect(cloud.x, cloud.y, 45, 14);
        ctx.fillRect(cloud.x + 8, cloud.y - 6, 28, 8);
      });

      // Draw Ground Line
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, s.groundY + 32);
      ctx.lineTo(canvas.width, s.groundY + 32);
      ctx.stroke();

      // Ground details (dashes)
      ctx.fillStyle = '#334155';
      for (let i = 0; i < canvas.width; i += 30) {
        const offset = ((currentTime * 0.15) % 30);
        ctx.fillRect((i - offset + canvas.width) % canvas.width, s.groundY + 35, 12, 2);
      }

      if (!s.gameOver) {
        // Physics update
        s.dinoVelocityY += s.gravity * delta;
        s.dinoY += s.dinoVelocityY * delta;

        if (s.dinoY >= s.groundY) {
          s.dinoY = s.groundY;
          s.dinoVelocityY = 0;
          s.isJumping = false;
        }

        // Score update & speed scaling
        s.score += 0.15 * delta;
        const currentIntScore = Math.floor(s.score);
        setScore(currentIntScore);

        if (currentIntScore > highScore) {
          setHighScore(currentIntScore);
          try {
            localStorage.setItem('senkron_dino_highscore', currentIntScore.toString());
          } catch {
            // Ignored
          }
        }

        // Badge Unlock at 50 points
        if (currentIntScore >= 50 && onBadgeUnlocked) {
          onBadgeUnlocked('offline_hero');
          setBadgeNotice('🦖 "Piksel Koşucusu" Rozeti Açıldı!');
        }

        // Increase speed gradually
        s.speed = 4.5 + Math.min(4.0, currentIntScore * 0.015);

        // Spawn obstacles
        if (currentTime - s.lastObstacleTime > Math.max(1100, 2200 - s.speed * 120)) {
          const type = Math.random() > 0.4 ? 1 : 2; // 1: Cactus, 2: Server Rack / Drone
          s.obstacles.push({
            x: canvas.width + 20,
            y: type === 1 ? s.groundY + 4 : s.groundY - 10,
            width: type === 1 ? 16 : 22,
            height: type === 1 ? 28 : 42,
            type,
          });
          s.lastObstacleTime = currentTime;
        }

        // Move and filter obstacles
        s.obstacles.forEach((obs) => {
          obs.x -= s.speed * delta;
        });
        s.obstacles = s.obstacles.filter((obs) => obs.x > -40);
      }

      // Draw Dino (Pixel Cyber Dino / Runner)
      const dinoX = 45;
      const dinoY = s.dinoY;

      // Dino Body & Visor
      ctx.fillStyle = '#38bdf8'; // Sky Cyan
      ctx.fillRect(dinoX + 4, dinoY, 18, 22);
      ctx.fillRect(dinoX + 16, dinoY - 8, 14, 12); // Head

      // Visor
      ctx.fillStyle = '#f43f5e'; // Red Neon Visor
      ctx.fillRect(dinoX + 22, dinoY - 5, 8, 4);

      // Tail & Arms
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(dinoX - 2, dinoY + 6, 6, 8);
      ctx.fillRect(dinoX + 18, dinoY + 8, 6, 4);

      // Legs (running animation)
      ctx.fillStyle = '#38bdf8';
      const legOffset = s.isJumping ? 0 : Math.sin(currentTime * 0.02) * 4;
      ctx.fillRect(dinoX + 6, dinoY + 22, 4, 10 + legOffset);
      ctx.fillRect(dinoX + 14, dinoY + 22, 4, 10 - legOffset);

      // Draw Obstacles
      s.obstacles.forEach((obs) => {
        if (obs.type === 1) {
          // Cyber Cactus
          ctx.fillStyle = '#10b981'; // Emerald Green
          ctx.fillRect(obs.x + 5, obs.y, 6, obs.height);
          ctx.fillRect(obs.x, obs.y + 6, 6, 10);
          ctx.fillRect(obs.x + 10, obs.y + 4, 6, 12);
        } else {
          // Server Rack / Drone
          ctx.fillStyle = '#818cf8'; // Indigo Server
          ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
          // Server LEDs
          ctx.fillStyle = '#34d399';
          ctx.fillRect(obs.x + 3, obs.y + 4, 3, 3);
          ctx.fillRect(obs.x + 3, obs.y + 12, 3, 3);
          ctx.fillStyle = '#f43f5e';
          ctx.fillRect(obs.x + 14, obs.y + 4, 4, 3);
        }

        // Collision Check (AABB)
        const dinoBox = { x: dinoX + 4, y: dinoY - 6, width: 22, height: 36 };
        if (
          dinoBox.x < obs.x + obs.width &&
          dinoBox.x + dinoBox.width > obs.x &&
          dinoBox.y < obs.y + obs.height &&
          dinoBox.y + dinoBox.height > obs.y
        ) {
          s.gameOver = true;
          setIsGameOver(true);
          if (onScoreEarned) onScoreEarned(Math.floor(s.score));
        }
      });

      // Request next frame
      s.animationFrameId = requestAnimationFrame(loop);
    };

    s.animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(s.animationFrameId);
  }, [highScore, onBadgeUnlocked, onScoreEarned]);

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6 bg-[#090d16] border border-slate-800 rounded-2xl shadow-2xl space-y-4">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-base">
            🦖
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              Çevrimdışı Dinozor Koşusu
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 font-mono">
                OFFLINE
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              İnternet bağlantınız koptuğunda puan toplayın ve özel rozetler kazanın!
            </p>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 text-xs px-2 py-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            Kapat ✕
          </button>
        )}
      </div>

      {/* Badge Unlock Notification */}
      {badgeNotice && (
        <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs text-amber-300 animate-pulse">
          <span className="font-semibold">{badgeNotice}</span>
          <span className="text-[10px] bg-amber-500/20 px-2 py-0.5 rounded-full">+40 XP</span>
        </div>
      )}

      {/* Canvas Game Area */}
      <div
        onClick={jump}
        className="relative cursor-pointer rounded-xl overflow-hidden border border-slate-800 bg-[#0a0f1d] select-none"
      >
        <canvas
          ref={canvasRef}
          width={600}
          height={200}
          className="w-full h-[180px] sm:h-[200px] block"
        />

        {/* Live Score Overlay */}
        <div className="absolute top-3 right-3 flex items-center gap-3 text-xs font-mono">
          <span className="text-slate-500">
            EN YÜKSEK: <strong className="text-slate-300">{highScore}</strong>
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700 text-sky-400 font-bold">
            SKOR: {score}
          </span>
        </div>

        {/* Start / Game Over Overlay */}
        {isGameOver && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center space-y-3">
            <div className="text-center">
              <h4 className="text-base font-bold text-rose-400">OYUN BİTTİ</h4>
              <p className="text-xs text-slate-300 mt-0.5">Toplanan Skor: {score}</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                restartGame();
              }}
              className="px-4 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition-transform active:scale-95 shadow-lg shadow-sky-600/30"
            >
              Yeniden Oyna (Boşluk Tuşu)
            </button>
          </div>
        )}

        {!isPlaying && !isGameOver && (
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xs font-semibold text-slate-200 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-700 shadow">
              Zıplamak için Boşluk (Space) veya Ekrana Tıkla
            </span>
          </div>
        )}
      </div>

      {/* Control Hint Footer */}
      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
        <span>🎮 Kontroller: <strong>Boşluk (Space)</strong> veya <strong>Yukarı Ok (↑)</strong></span>
        <span>Hedef: <strong>50+ Puan</strong> &rarr; Rozet Ödülü 🏆</span>
      </div>
    </div>
  );
};

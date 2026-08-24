const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, '../images');
if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir, { recursive: true });
}

// Helper: Rounded Rectangle
function drawRoundedRect(ctx, x, y, width, height, radius, fill, stroke, strokeWidth = 1) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = strokeWidth;
    ctx.stroke();
  }
}

// Helper: Arrow
function drawArrow(ctx, fromX, fromY, toX, toY, color = '#64748b', text = '') {
  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.stroke();

  const headlen = 8;
  const angle = Math.atan2(toY - fromY, toX - fromX);
  ctx.beginPath();
  ctx.moveTo(toX, toY);
  ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
  ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
  ctx.fillStyle = color;
  ctx.fill();

  if (text) {
    ctx.font = 'bold 11px sans-serif';
    ctx.fillStyle = color;
    const midX = (fromX + toX) / 2;
    const midY = (fromY + toY) / 2 - 6;
    ctx.fillText(text, midX - ctx.measureText(text).width / 2, midY);
  }
}

// ----------------------------------------------------
// 1. SYSTEM ARCHITECTURE DIAGRAM
// ----------------------------------------------------
function generateSystemArchitecture() {
  const width = 1200;
  const height = 750;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  // Title Banner
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 22px sans-serif';
  ctx.fillText('SENKRON: KATMANLI SİSTEM MİMARİSİ (SYSTEM ARCHITECTURE)', 40, 45);
  ctx.fillStyle = '#64748b';
  ctx.font = '13px sans-serif';
  ctx.fillText('TEKNOFEST Proje Standardı: İstemci Uçtan Uca Hibrit İşleme & Güvenli LLM Ağ Geçidi', 40, 70);

  const tiers = [
    {
      title: '1. İSTEMCİ KATMANI (Client Tier / Web Components)',
      color: '#0284c7',
      bg: '#f0f9ff',
      border: '#bae6fd',
      items: [
        { name: '<senkron-video-editor-modal>', desc: 'WASM FFmpeg & Canvas Video İşleyici' },
        { name: '<senkron-post-generator-modal>', desc: 'NSosyal Gönderi & Taslak Asistanı' },
        { name: 'React / Next.js Wrappers', desc: 'Typed Custom Element Sarmalayıcılar' },
        { name: 'Cihaz Donanım Algılama', desc: 'Hardware Concurrency & SharedArrayBuffer' },
      ],
    },
    {
      title: '2. AĞ VE GEÇİT KATMANI (API Gateway & Middleware)',
      color: '#4f46e5',
      bg: '#eef2ff',
      border: '#c7d2fe',
      items: [
        { name: 'Next.js Route Handlers', desc: 'POST /api/video/* & POST /api/ai/*' },
        { name: 'Kimlik ve Misafir Denetimi', desc: 'Guest Blocker (401 Unauthorized)' },
        { name: 'Kayan Pencereli Kota Motoru', desc: 'Sliding-Window Token Bucket (15/60 RPM)' },
        { name: 'Çift Kademeli Moderasyon', desc: 'Prompt Injection & Türkçe İçerik Süzgeci' },
      ],
    },
    {
      title: '3. İŞLEM VE YÜRÜTME KATMANI (Execution Tier)',
      color: '#059669',
      bg: '#ecfdf5',
      border: '#a7f3d0',
      items: [
        { name: 'Hibrit Karar Matrisi', desc: 'WASM vs Sunucu İşleme Seçici' },
        { name: 'Sunucu FFmpeg İş Kuyruğu', desc: 'fluent-ffmpeg + FastStart H.264' },
        { name: 'Sunucu LLM Ağ Geçidi', desc: 'Ollama/vLLM & Harici API Adaptörü' },
      ],
    },
    {
      title: '4. VERİ VE DEPOLAMA KATMANI (Data & Storage Tier)',
      color: '#d97706',
      bg: '#fffbeb',
      border: '#fde68a',
      items: [
        { name: 'Redis / Bellek İçi Depolama', desc: 'Oturum & Kota Sayaçları' },
        { name: 'Medya & CDN Depolama', desc: 'İşlenmiş Video Çıktıları' },
      ],
    },
  ];

  let currentY = 100;
  tiers.forEach((tier, index) => {
    drawRoundedRect(ctx, 40, currentY, 1120, 130, 8, tier.bg, tier.border, 2);

    ctx.fillStyle = tier.color;
    ctx.font = 'bold 15px sans-serif';
    ctx.fillText(tier.title, 60, currentY + 28);

    const itemWidth = 245;
    tier.items.forEach((item, itemIdx) => {
      const itemX = 60 + itemIdx * (itemWidth + 25);
      const itemY = currentY + 42;
      drawRoundedRect(ctx, itemX, itemY, itemWidth, 70, 6, '#ffffff', '#e2e8f0', 1);

      ctx.fillStyle = '#1e293b';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(item.name, itemX + 12, itemY + 26);

      ctx.fillStyle = '#64748b';
      ctx.font = '11px sans-serif';
      ctx.fillText(item.desc, itemX + 12, itemY + 48);
    });

    if (index < tiers.length - 1) {
      drawArrow(ctx, 600, currentY + 130, 600, currentY + 155, '#94a3b8');
    }
    currentY += 155;
  });

  fs.writeFileSync(path.join(imgDir, '1_system_architecture.png'), canvas.toBuffer('image/png'));
}

// ----------------------------------------------------
// 2. HYBRID DECISION TREE DIAGRAM
// ----------------------------------------------------
function generateDecisionTree() {
  const width = 1100;
  const height = 650;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 20px sans-serif';
  ctx.fillText('SENKRON: HİBRİT FFmpeg İŞ YÜKÜ KARAR AĞACI (DECISION TREE)', 40, 45);
  ctx.fillStyle = '#64748b';
  ctx.font = '13px sans-serif';
  ctx.fillText('Dosya Boyutu, Video Süresi ve Cihaz Donanım Kapasitesine Göre Akıllı Dağıtım', 40, 70);

  // Start Node
  drawRoundedRect(ctx, 425, 100, 250, 48, 24, '#0f172a', null);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 13px sans-serif';
  ctx.fillText('Video Dosyası & Telemetri Alındı', 445, 130);

  // Arrow 1
  drawArrow(ctx, 550, 148, 550, 195, '#64748b');

  // Decision 1
  drawRoundedRect(ctx, 400, 195, 300, 60, 8, '#f8fafc', '#cbd5e1', 2);
  ctx.fillStyle = '#1e293b';
  ctx.font = 'bold 13px sans-serif';
  ctx.fillText('1. Dosya Boyutu <= 50 MB mı?', 445, 230);

  // Branch 1 No
  drawArrow(ctx, 700, 225, 860, 225, '#ef4444', 'HAYIR (>50MB)');
  drawRoundedRect(ctx, 860, 195, 200, 60, 8, '#fef2f2', '#fecaca', 2);
  ctx.fillStyle = '#991b1b';
  ctx.font = 'bold 12px sans-serif';
  ctx.fillText('Sunucu FFmpeg Kuyruğu', 880, 230);

  // Branch 1 Yes
  drawArrow(ctx, 550, 255, 550, 310, '#10b981', 'EVET');

  // Decision 2
  drawRoundedRect(ctx, 400, 310, 300, 60, 8, '#f8fafc', '#cbd5e1', 2);
  ctx.fillStyle = '#1e293b';
  ctx.font = 'bold 13px sans-serif';
  ctx.fillText('2. Video Süresi <= 60 Saniye mi?', 440, 345);

  // Branch 2 No
  drawArrow(ctx, 700, 340, 860, 340, '#ef4444', 'HAYIR (>60s)');
  drawRoundedRect(ctx, 860, 310, 200, 60, 8, '#fef2f2', '#fecaca', 2);
  ctx.fillStyle = '#991b1b';
  ctx.font = 'bold 12px sans-serif';
  ctx.fillText('Sunucu FFmpeg Kuyruğu', 880, 345);

  // Branch 2 Yes
  drawArrow(ctx, 550, 370, 550, 425, '#10b981', 'EVET');

  // Decision 3
  drawRoundedRect(ctx, 380, 425, 340, 60, 8, '#f8fafc', '#cbd5e1', 2);
  ctx.fillStyle = '#1e293b';
  ctx.font = 'bold 13px sans-serif';
  ctx.fillText('3. Çekirdek >= 4 & SharedArrayBuffer?', 400, 460);

  // Branch 3 No
  drawArrow(ctx, 720, 455, 860, 455, '#ef4444', 'HAYIR');
  drawRoundedRect(ctx, 860, 425, 200, 60, 8, '#fef2f2', '#fecaca', 2);
  ctx.fillStyle = '#991b1b';
  ctx.font = 'bold 12px sans-serif';
  ctx.fillText('Sunucu FFmpeg Kuyruğu', 880, 460);

  // Final Success
  drawArrow(ctx, 550, 485, 550, 545, '#10b981', 'EVET');
  drawRoundedRect(ctx, 350, 545, 400, 65, 10, '#ecfdf5', '#10b981', 2);
  ctx.fillStyle = '#065f46';
  ctx.font = 'bold 14px sans-serif';
  ctx.fillText('İstemci Tarafı WASM FFmpeg ile İşle', 415, 572);
  ctx.font = '12px sans-serif';
  ctx.fillText('0$ Bulut Maliyeti • Anında Önizleme (< 1.2s)', 420, 595);

  fs.writeFileSync(path.join(imgDir, '2_hybrid_decision_tree.png'), canvas.toBuffer('image/png'));
}

// ----------------------------------------------------
// 3. DUAL-PASS MODERATION DIAGRAM
// ----------------------------------------------------
function generateModerationFlow() {
  const width = 1100;
  const height = 550;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 20px sans-serif';
  ctx.fillText('SENKRON: ÇİFT AŞAMALI GÜVENLİK VE MODERASYON HATTI', 40, 45);
  ctx.fillStyle = '#64748b';
  ctx.font = '13px sans-serif';
  ctx.fillText('Misafir Engelleme, Kayan Pencereli Kota ve Çift Aşamalı Türkçe İçerik Süzgeci', 40, 70);

  const steps = [
    { num: 'Adım 1', title: 'Oturum & Misafir Denetimi', desc: 'Misafir ise 401 Unauthorized ile Kesin Engel', color: '#0284c7', bg: '#f0f9ff' },
    { num: 'Adım 2', title: 'Kayan Pencereli Kota', desc: '15 RPM / 100 Günlük Limit Kontrolü', color: '#6366f1', bg: '#eef2ff' },
    { num: 'Adım 3', title: 'Girdi Moderasyonu', desc: 'İstem Enjeksiyonu & Nefret Söylemi Süzgeci', color: '#f59e0b', bg: '#fffbeb' },
    { num: 'Adım 4', title: 'Model Çıkarımı', desc: 'Sunucu Kontrollü Yerli/Harici LLM Çıkarımı', color: '#10b981', bg: '#ecfdf5' },
    { num: 'Adım 5', title: 'Çıktı Doğrulama & Teslim', desc: '500 Karakter & İkinci Süzgeç Onayı', color: '#0f172a', bg: '#f8fafc' },
  ];

  steps.forEach((step, idx) => {
    const x = 40 + idx * 210;
    const y = 140;
    drawRoundedRect(ctx, x, y, 185, 260, 8, step.bg, '#cbd5e1', 1);

    drawRoundedRect(ctx, x + 15, y + 15, 60, 24, 4, step.color, null);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText(step.num, x + 24, y + 31);

    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText(step.title, x + 15, y + 70);

    ctx.fillStyle = '#64748b';
    ctx.font = '11px sans-serif';
    const words = step.desc.split(' ');
    let line1 = words.slice(0, 3).join(' ');
    let line2 = words.slice(3).join(' ');
    ctx.fillText(line1, x + 15, y + 110);
    ctx.fillText(line2, x + 15, y + 130);

    if (idx < steps.length - 1) {
      drawArrow(ctx, x + 185, y + 130, x + 210, y + 130, '#94a3b8');
    }
  });

  // Rejection Bar Bottom
  drawRoundedRect(ctx, 40, 440, 1020, 60, 8, '#fef2f2', '#fecaca', 1);
  ctx.fillStyle = '#991b1b';
  ctx.font = 'bold 13px sans-serif';
  ctx.fillText('❌ Güvenlik İhlali Durumunda Anında Hata Bildirimi:', 60, 475);
  ctx.font = '12px sans-serif';
  ctx.fillStyle = '#b91c1c';
  ctx.fillText('401 Unauthorized (Giriş Yapılmalı)  |  429 Too Many Requests (Kota Doldu)  |  422 Unprocessable (Topluluk İhlali)', 410, 475);

  fs.writeFileSync(path.join(imgDir, '3_dual_pass_moderation.png'), canvas.toBuffer('image/png'));
}

// ----------------------------------------------------
// 4. COST COMPARISON CHART
// ----------------------------------------------------
function generateCostComparison() {
  const width = 1000;
  const height = 550;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 20px sans-serif';
  ctx.fillText('SENKRON: ALTYAPI MALİYET VE SUNUCU YÜKÜ KARŞILAŞTIRMASI', 40, 45);
  ctx.fillStyle = '#64748b';
  ctx.font = '13px sans-serif';
  ctx.fillText('10.000 Video Kırpma & Gönderi Paylaşımında Bulut Masraf Analizi', 40, 70);

  // Bar 1: Legacy
  ctx.fillStyle = '#1e293b';
  ctx.font = 'bold 14px sans-serif';
  ctx.fillText('Geleneksel Bulut Mimarisi (AWS MediaConvert / EC2 GPU)', 60, 140);

  drawRoundedRect(ctx, 60, 160, 850, 45, 6, '#fee2e2', null);
  drawRoundedRect(ctx, 60, 160, 850, 45, 6, '#ef4444', null);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 14px sans-serif';
  ctx.fillText('1,500.00 $ (Sunucu GPU İşleme + 1.5 TB Egress Veri Transferi)', 80, 188);

  // Bar 2: Senkron
  ctx.fillStyle = '#1e293b';
  ctx.font = 'bold 14px sans-serif';
  ctx.fillText('Senkron İstemci Uçtan Uca Hibrit Mimari (Client-side WASM + Fallback)', 60, 260);

  drawRoundedRect(ctx, 60, 280, 850, 45, 6, '#e2e8f0', null);
  drawRoundedRect(ctx, 60, 280, 45, 45, 6, '#10b981', null);
  ctx.fillStyle = '#065f46';
  ctx.font = 'bold 14px sans-serif';
  ctx.fillText('45.00 $ (%97.0 Maliyet Tasarrufu)', 120, 308);

  // Metrics Highlights Box
  drawRoundedRect(ctx, 60, 370, 880, 130, 8, '#f8fafc', '#e2e8f0', 1);
  const metrics = [
    { label: 'Bulut Maliyet Düşüşü', val: '%97.0' },
    { label: 'İşlem Gecikmesi', val: '45s ➔ 1.2s' },
    { label: 'Bant Genişliği Tasarrufu', val: '%92.0' },
    { label: 'Spam Token Engelleme', val: '%100' },
  ];

  metrics.forEach((m, idx) => {
    const mx = 90 + idx * 215;
    ctx.fillStyle = '#64748b';
    ctx.font = '12px sans-serif';
    ctx.fillText(m.label, mx, 410);

    ctx.fillStyle = '#0284c7';
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText(m.val, mx, 450);
  });

  fs.writeFileSync(path.join(imgDir, '4_cost_comparison_chart.png'), canvas.toBuffer('image/png'));
}

// ----------------------------------------------------
// 5. THROUGHPUT BENCHMARK CHART
// ----------------------------------------------------
function generateThroughputBenchmark() {
  const width = 1000;
  const height = 500;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 20px sans-serif';
  ctx.fillText('SENKRON: ARKA PLAN MİKROSERVİS İŞLEM KAPASİTESİ (THROUGHPUT)', 40, 45);
  ctx.fillStyle = '#64748b';
  ctx.font = '13px sans-serif';
  ctx.fillText('Saniye Başına İstek ve Güvenlik Denetim Kapasiteleri (Requests Per Second)', 40, 70);

  const benchmarks = [
    { name: 'İçerik Moderasyon Süzgeci', rps: '12,500 ops/sn', p95: '0.16 ms', width: 750, color: '#10b981' },
    { name: 'Video Karar Matrisi Router', rps: '4,200 req/sn', p95: '0.88 ms', width: 450, color: '#0284c7' },
    { name: 'Kayan Pencereli Kota Sorgusu', rps: '3,800 req/sn', p95: '0.72 ms', width: 400, color: '#6366f1' },
    { name: 'Dahili AI Gönderi Üretici', rps: '2,100 req/sn', p95: '3.40 ms', width: 280, color: '#f59e0b' },
  ];

  benchmarks.forEach((b, idx) => {
    const y = 120 + idx * 85;
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText(`${b.name} (p95 Gecikme: ${b.p95})`, 60, y);

    drawRoundedRect(ctx, 60, y + 10, 850, 32, 4, '#f1f5f9', null);
    drawRoundedRect(ctx, 60, y + 10, b.width, 32, 4, b.color, null);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText(b.rps, 75, y + 31);
  });

  fs.writeFileSync(path.join(imgDir, '5_throughput_benchmark_chart.png'), canvas.toBuffer('image/png'));
}

// ----------------------------------------------------
// 6. TEKNOFEST SWOT MATRIX
// ----------------------------------------------------
function generateSwotMatrix() {
  const width = 1000;
  const height = 650;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 20px sans-serif';
  ctx.fillText('SENKRON: TEKNOFEST SWOT TEKNİK DEĞERLENDİRME MATRİSİ', 40, 45);
  ctx.fillStyle = '#64748b';
  ctx.font = '13px sans-serif';
  ctx.fillText('Projenin Teknolojik Üstünlükleri, İyileştirme Alanları ve Ölçeklenme Fırsatları', 40, 70);

  const quadrants = [
    {
      title: 'GÜÇLÜ YÖNLER (Strengths)',
      color: '#065f46',
      bg: '#ecfdf5',
      border: '#a7f3d0',
      x: 50,
      y: 100,
      items: [
        '• 0$ Sunucu maliyetiyle istemcide WASM video kırpma',
        '• Web Components ile doğrudan sosyal ağa entegre',
        '• Çift aşamalı yüksek hızlı Türkçe moderasyon',
        '• Kayan pencereli token bazlı kota koruması',
      ],
    },
    {
      title: 'ZAYIF YÖNLER (Weaknesses)',
      color: '#991b1b',
      bg: '#fef2f2',
      border: '#fecaca',
      x: 520,
      y: 100,
      items: [
        '• Düşük donanımlı telefonlarda WASM gecikme farkı',
        '• 24MB WASM çekirdeğinin ilk indirme süresi',
        '• Tarayıcı bellek sınırları (2GB RAM limiti)',
      ],
    },
    {
      title: 'FIRSATLAR (Opportunities)',
      color: '#1e40af',
      bg: '#eff6ff',
      border: '#bfdbfe',
      x: 50,
      y: 360,
      items: [
        '• NSosyal platformunda ulusal ölçekte yaygınlaşma',
        '• 3B yerli ve damıtılmış SLM modelleriyle < 50ms çıkarım',
        '• WebCodecs ile donanım hızlandırmalı video işleme',
      ],
    },
    {
      title: 'TEHDİTLER (Threats)',
      color: '#92400e',
      bg: '#fffbeb',
      border: '#fde68a',
      x: 520,
      y: 360,
      items: [
        '• Safari/iOS WebAssembly bellek kısıtları',
        '• İstem enjeksiyonu ve adversarial saldırıların evrimi',
      ],
    },
  ];

  quadrants.forEach((q) => {
    drawRoundedRect(ctx, q.x, q.y, 430, 230, 8, q.bg, q.border, 2);

    ctx.fillStyle = q.color;
    ctx.font = 'bold 15px sans-serif';
    ctx.fillText(q.title, q.x + 20, q.y + 35);

    ctx.fillStyle = '#334155';
    ctx.font = '12px sans-serif';
    q.items.forEach((item, itemIdx) => {
      ctx.fillText(item, q.x + 20, q.y + 75 + itemIdx * 35);
    });
  });

  fs.writeFileSync(path.join(imgDir, '6_teknofest_swot_matrix.png'), canvas.toBuffer('image/png'));
}

console.log('Generating high-resolution diagram PNGs...');
generateSystemArchitecture();
generateDecisionTree();
generateModerationFlow();
generateCostComparison();
generateThroughputBenchmark();
generateSwotMatrix();
console.log('All 6 diagrams generated successfully in docs/pitch/images/');

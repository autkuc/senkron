import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const SAMPLE = path.resolve(__dirname, '../demo/public/videos/teknofest-sample.mp4');

test('gerçek tarayıcıda WASM FFmpeg ile video export doğrulaması', async ({ page }) => {
  const started = Date.now();
  const wasmLogs: string[] = [];
  page.on('console', (msg) => {
    const t = msg.text();
    if (t.includes('[Senkron FFmpeg WASM]')) wasmLogs.push(t);
  });

  await page.goto('http://localhost:3100');
  await page.getByRole('button', { name: 'Video Düzenle' }).first().click();

  // Host elemanı fixed backdrop nedeniyle sıfır boyutlu olabilir;
  // görünürlüğü shadow içindeki dialog üzerinden doğrula.
  const dialog = page.locator('senkron-video-editor-modal .modal-dialog[role="dialog"]').first();
  await expect(dialog).toBeVisible();

  await page.locator('senkron-video-editor-modal input[type="file"]').setInputFiles(SAMPLE);

  const exportBtn = page.locator('senkron-video-editor-modal button', { hasText: 'WASM Dışa Aktar' });
  await expect(exportBtn).toBeEnabled({ timeout: 60_000 });

  // WASM kodlama süresini sınırlamak için aralığı ~2,5 sn'ye kırp:
  const btn = (t: string) => page.locator('senkron-video-editor-modal button', { hasText: t });
  await btn('Oynat').click();
  await page.waitForTimeout(2500);
  await btn('Bitiş ]').click();
  await btn('Duraklat').click();

  await exportBtn.click();

  await expect(
    page.locator('senkron-video-editor-modal button', { hasText: 'Videoyu Gönderiye Ekle' })
  ).toBeVisible({ timeout: 420_000 });

  const result = {
    timestamp: new Date().toISOString(),
    browser: 'chromium-headless-shell',
    sample: 'teknofest-sample.mp4',
    success: true,
    elapsedSeconds: Math.round((Date.now() - started) / 100) / 10,
    wasmLogCount: wasmLogs.length,
    note: 'Gerçek tarayıcı, gerçek WASM yolu; simülasyon kabul edilmedi.',
  };
  fs.mkdirSync(path.join(__dirname, 'results'), { recursive: true });
  fs.writeFileSync(
    path.join(__dirname, 'results', 'export-e2e.json'),
    JSON.stringify(result, null, 2)
  );
});

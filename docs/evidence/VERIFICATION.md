# SenkroN Doğrulama Durumu (Verification Evidence)

**Base commit:** `eadad358fd7cafc8539b88448cb8fda85edeac07` (main, değişmedi)
**Çalışma dalı:** `feat/media-pipeline-verification`
**Doğrulama ortamı:** Linux sandbox, Node v20.20.2, chromium-headless-shell (Playwright)
**İlke:** Gerçek deney yapılmadan sonuç yazılmaz; yapılamayan deney açıkça "tamamlanmadı" olarak işaretlenir.

## 1) Test suitleri (gerçek çalıştırma)

| Paket | Komut | Sonuç |
|---|---|---|
| @senkron/ai | `npm --prefix ai test` | 20/20 geçti |
| @senkron/backend | `npm --prefix backend test` | 9/9 geçti |
| @senkron/components | `npm --prefix components test` | 24/24 geçti |

Toplam **53/53**. Test sayıları README ile hizalıdır.

**Ek (4. commit):** `callExternal()` hata yolundaki `deterministic-fallback` kaldırıldı; dış sağlayıcı da
başarısız olduğunda production `LLM_UNAVAILABLE` fırlatır, dev/test `routeUsed: "simulated"` ile döner.
İki yeni router testi eklendi (çift-sağlayıcı başarısızlığı: production throw + simülasyon etiketi).

## 2) Demo production derlemesi ve asset doğrulaması (HTTP)

`npm --prefix demo run build` + `next start -p 3100` ile:

| URL | HTTP | Boyut |
|---|---|---|
| `/` | 200 | 33.212 B |
| `/ffmpeg/ffmpeg-core.js` | 200 | 111.804 B |
| `/ffmpeg/ffmpeg-core.wasm` | 200 | 32.232.419 B |
| `/videos/teknofest-sample.mp4` | 200 | 3.888.718 B |

## 3) AI uç noktası davranışları

- **Misafir:** `POST /api/ai/generate` (kullanıcı başlığı yok) → `401 UNAUTHORIZED_GUEST` (sahte başarı yok).
- **Kimlikli, production, gerçek uç nokta:** Modal üzerinde konuşlu `senkron-turkish-llama3.2:3b` servisi **canlı** yanıt verdi (~38 sn cold-start). Gerçek çıktı örneği:
  `"🚀 2026'da öne çıkan başlık: webassembly ile tarayıcıda video düzenleme! ..."` — model çıktısı karakter hataları içerebilir; bu, sansürsüz gerçek çıkarım kanıtıdır.
- **Aday sıralama:** Yanıt `candidates[].scores` (relevance/languageQuality/novelty/lengthFit/safety + total) ve `selectedCandidateIndex = argmax(total)` içerir; sabit seçim kaldırıldı.
- **Simülasyon dürüstlüğü:** `NODE_ENV=production` + LLM yok + dış anahtar yok → `LLM_UNAVAILABLE` hatası (birim testle doğrulandı: `two-stage-generator.test.ts`). Dev/test simülasyonu telemetride `routeUsed: "simulated"`, `fallbackTriggered: true` olarak işaretlenir.

## 4) Erişilebilirlik (gerçek tarayıcı)

Playwright a11y snapshot, production demo üzerinde yeni ARIA rollerinin canlı çalıştığını gösterdi:
`role="dialog"`, `aria-modal`, `role="status"`, `role="progressbar"` ve `aria-live` bölgeleri erişilebilirlik ağacında mevcut.
Klavye/odak birim testleri: `components/src/a11y/modal-a11y.test.ts` (8 test).
**Eksik:** Axe/Lighthouse raporu henüz üretilmedi.

## 5) E2E video export — TAMAMLANMADI (dürüst durum)

`e2e/export.e2e.ts` gerçek tarayıcıda şu adımları doğruladı: modal açılır, dosya seçilir, kırpma
(00:00–00:02.5) uygulanır, export başlar ve WASM ilerleme çubuğu render olur.
Ancak headless-shell ortamında FFmpeg WASM motoru yüklemesi **"motor hazırlanıyor" (%5) adımında
takılı kaldı** (120 sn boyunca ilerleme yok; 7 dk'lık tam deneme de tamamlanmadı).
COOP/COEP başlıkları zaten mevcut (`next.config.mjs`), asset'ler 200 döndüğü için eksiklik
headless ortama özgü bir worker/WASM yükleme sorunu olarak kaydedildi.

**Sonuç dosyası üretilmedi** (başarısız deney başarı gibi sunulmaz).
Öneri: `e2e/export.e2e.ts` gerçek bir masaüstü tarayıcıda koşulsun; `results/export-e2e.json`
yalnızca gerçek başarıda yazılır.

## 6) Bu dalda değiştirilen davranışlar (özet)

1. Açıklanabilir aday sıralama (`ai/src/pipeline/scoring.ts`), 500 karakter zorlaması.
2. Simülasyon telemetrisi dürüstleştirildi; production'da sahte çıktı kapatıldı.
3. Modallarda WAI-ARIA dialog, odak tuzağı, Escape; form/progress/alert ARIA'ları.
4. README iddiaları kanıt hizasına çekildi (sentetik veri, training-time metrik, 51/51 test).

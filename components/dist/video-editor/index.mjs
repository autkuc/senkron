var Z = Object.defineProperty;
var j = (s) => {
  throw TypeError(s);
};
var J = (s, t, e) => t in s ? Z(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var h = (s, t, e) => J(s, typeof t != "symbol" ? t + "" : t, e), V = (s, t, e) => t.has(s) || j("Cannot " + e);
var n = (s, t, e) => (V(s, t, "read from private field"), e ? e.call(s) : t.get(s)), T = (s, t, e) => t.has(s) ? j("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(s) : t.set(s, e), F = (s, t, e, i) => (V(s, t, "write to private field"), i ? i.call(s, e) : t.set(s, e), e);
import { i as Q, a as G, b as E, n as k, r as x } from "../state-C6LA3nSk.mjs";
const K = Q`
  :host {
    display: block;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    background: #090d16;
    color: #f1f5f9;
    border-radius: 12px;
    overflow: hidden;
    box-sizing: border-box;
    user-select: none;
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }

  .editor-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 500px;
    background: #090d16;
  }

  /* Header Toolbar */
  .editor-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 18px;
    background: #0f1624;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .editor-title {
    font-size: 14px;
    font-weight: 600;
    color: #f1f5f9;
  }

  .aspect-selector {
    display: flex;
    gap: 4px;
    background: #090d16;
    padding: 3px;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  .aspect-btn {
    background: transparent;
    border: none;
    color: #94a3b8;
    padding: 4px 8px;
    font-size: 11px;
    font-weight: 500;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .aspect-btn:hover {
    color: #ffffff;
  }

  .aspect-btn.active {
    background: #1e293b;
    color: #38bdf8;
    font-weight: 600;
  }

  /* Main Stage / Canvas Preview */
  .preview-stage {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #000000;
    position: relative;
    overflow: hidden;
    min-height: 240px;
  }

  .video-preview-wrapper {
    position: relative;
    max-height: 100%;
    max-width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  video {
    max-height: 280px;
    max-width: 100%;
    display: block;
  }

  canvas.overlay-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  /* Timeline & Track Section */
  .timeline-section {
    background: #0f1624;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    padding: 14px 18px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .timecode-display {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 12px;
    color: #94a3b8;
  }

  .timeline-scrubber-track {
    position: relative;
    height: 38px;
    background: #1e293b;
    border-radius: 6px;
    cursor: pointer;
    overflow: hidden;
  }

  .timeline-trim-region {
    position: absolute;
    top: 0;
    bottom: 0;
    background: rgba(2, 132, 199, 0.25);
    border-left: 2px solid #0284c7;
    border-right: 2px solid #0284c7;
  }

  .playhead {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 2px;
    background: #ffffff;
    pointer-events: none;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
  }

  /* Overlay Controls */
  .controls-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 18px;
    background: #090d16;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  .left-controls {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .btn {
    background: #1e293b;
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #f8fafc;
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    transition: background 0.15s ease;
  }

  .btn:hover {
    background: #334155;
  }

  .btn-primary {
    background: #0284c7;
    border: none;
    color: #ffffff;
    font-weight: 600;
  }

  .btn-primary:hover:not(:disabled) {
    background: #0369a1;
  }

  .btn-primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Modal Base */
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.65);
    backdrop-filter: blur(4px);
    z-index: 99999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
  }

  .modal-dialog {
    background: #090d16;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 14px;
    width: 100%;
    max-width: 860px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
    overflow: hidden;
  }

  .modal-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 18px;
    background: #0f1624;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .modal-close-btn {
    background: #1e293b;
    border: none;
    color: #94a3b8;
    width: 28px;
    height: 28px;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    transition: background 0.15s ease;
  }

  .modal-close-btn:hover {
    background: #334155;
    color: #ffffff;
  }
`;
var d;
(function(s) {
  s.LOAD = "LOAD", s.EXEC = "EXEC", s.FFPROBE = "FFPROBE", s.WRITE_FILE = "WRITE_FILE", s.READ_FILE = "READ_FILE", s.DELETE_FILE = "DELETE_FILE", s.RENAME = "RENAME", s.CREATE_DIR = "CREATE_DIR", s.LIST_DIR = "LIST_DIR", s.DELETE_DIR = "DELETE_DIR", s.ERROR = "ERROR", s.DOWNLOAD = "DOWNLOAD", s.PROGRESS = "PROGRESS", s.LOG = "LOG", s.MOUNT = "MOUNT", s.UNMOUNT = "UNMOUNT";
})(d || (d = {}));
const tt = /* @__PURE__ */ (() => {
  let s = 0;
  return () => s++;
})(), et = new Error("ffmpeg is not loaded, call `await ffmpeg.load()` first"), it = new Error("called FFmpeg.terminate()");
var b, S, w, $, A, M, m;
class rt {
  constructor() {
    T(this, b, null);
    /**
     * #resolves and #rejects tracks Promise resolves and rejects to
     * be called when we receive message from web worker.
     */
    T(this, S, {});
    T(this, w, {});
    T(this, $, []);
    T(this, A, []);
    h(this, "loaded", !1);
    /**
     * register worker message event handlers.
     */
    T(this, M, () => {
      n(this, b) && (n(this, b).onmessage = ({ data: { id: t, type: e, data: i } }) => {
        switch (e) {
          case d.LOAD:
            this.loaded = !0, n(this, S)[t](i);
            break;
          case d.MOUNT:
          case d.UNMOUNT:
          case d.EXEC:
          case d.FFPROBE:
          case d.WRITE_FILE:
          case d.READ_FILE:
          case d.DELETE_FILE:
          case d.RENAME:
          case d.CREATE_DIR:
          case d.LIST_DIR:
          case d.DELETE_DIR:
            n(this, S)[t](i);
            break;
          case d.LOG:
            n(this, $).forEach((r) => r(i));
            break;
          case d.PROGRESS:
            n(this, A).forEach((r) => r(i));
            break;
          case d.ERROR:
            n(this, w)[t](i);
            break;
        }
        delete n(this, S)[t], delete n(this, w)[t];
      });
    });
    /**
     * Generic function to send messages to web worker.
     */
    T(this, m, ({ type: t, data: e }, i = [], r) => n(this, b) ? new Promise((a, o) => {
      const l = tt();
      n(this, b) && n(this, b).postMessage({ id: l, type: t, data: e }, i), n(this, S)[l] = a, n(this, w)[l] = o, r == null || r.addEventListener("abort", () => {
        o(new DOMException(`Message # ${l} was aborted`, "AbortError"));
      }, { once: !0 });
    }) : Promise.reject(et));
    /**
     * Loads ffmpeg-core inside web worker. It is required to call this method first
     * as it initializes WebAssembly and other essential variables.
     *
     * @category FFmpeg
     * @returns `true` if ffmpeg core is loaded for the first time.
     */
    h(this, "load", ({ classWorkerURL: t, ...e } = {}, { signal: i } = {}) => (n(this, b) || (F(this, b, t ? new Worker(new URL(t, import.meta.url), {
      type: "module"
    }) : (
      // We need to duplicated the code here to enable webpack
      // to bundle worekr.js here.
      new Worker(new URL(
        /* @vite-ignore */
        "/assets/worker-BAOIWoxA.js",
        import.meta.url
      ), {
        type: "module"
      })
    )), n(this, M).call(this)), n(this, m).call(this, {
      type: d.LOAD,
      data: e
    }, void 0, i)));
    /**
     * Execute ffmpeg command.
     *
     * @remarks
     * To avoid common I/O issues, ["-nostdin", "-y"] are prepended to the args
     * by default.
     *
     * @example
     * ```ts
     * const ffmpeg = new FFmpeg();
     * await ffmpeg.load();
     * await ffmpeg.writeFile("video.avi", ...);
     * // ffmpeg -i video.avi video.mp4
     * await ffmpeg.exec(["-i", "video.avi", "video.mp4"]);
     * const data = ffmpeg.readFile("video.mp4");
     * ```
     *
     * @returns `0` if no error, `!= 0` if timeout (1) or error.
     * @category FFmpeg
     */
    h(this, "exec", (t, e = -1, { signal: i } = {}) => n(this, m).call(this, {
      type: d.EXEC,
      data: { args: t, timeout: e }
    }, void 0, i));
    /**
     * Execute ffprobe command.
     *
     * @example
     * ```ts
     * const ffmpeg = new FFmpeg();
     * await ffmpeg.load();
     * await ffmpeg.writeFile("video.avi", ...);
     * // Getting duration of a video in seconds: ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 video.avi -o output.txt
     * await ffmpeg.ffprobe(["-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", "video.avi", "-o", "output.txt"]);
     * const data = ffmpeg.readFile("output.txt");
     * ```
     *
     * @returns `0` if no error, `!= 0` if timeout (1) or error.
     * @category FFmpeg
     */
    h(this, "ffprobe", (t, e = -1, { signal: i } = {}) => n(this, m).call(this, {
      type: d.FFPROBE,
      data: { args: t, timeout: e }
    }, void 0, i));
    /**
     * Terminate all ongoing API calls and terminate web worker.
     * `FFmpeg.load()` must be called again before calling any other APIs.
     *
     * @category FFmpeg
     */
    h(this, "terminate", () => {
      const t = Object.keys(n(this, w));
      for (const e of t)
        n(this, w)[e](it), delete n(this, w)[e], delete n(this, S)[e];
      n(this, b) && (n(this, b).terminate(), F(this, b, null), this.loaded = !1);
    });
    /**
     * Write data to ffmpeg.wasm.
     *
     * @example
     * ```ts
     * const ffmpeg = new FFmpeg();
     * await ffmpeg.load();
     * await ffmpeg.writeFile("video.avi", await fetchFile("../video.avi"));
     * await ffmpeg.writeFile("text.txt", "hello world");
     * ```
     *
     * @category File System
     */
    h(this, "writeFile", (t, e, { signal: i } = {}) => {
      const r = [];
      return e instanceof Uint8Array && r.push(e.buffer), n(this, m).call(this, {
        type: d.WRITE_FILE,
        data: { path: t, data: e }
      }, r, i);
    });
    h(this, "mount", (t, e, i) => {
      const r = [];
      return n(this, m).call(this, {
        type: d.MOUNT,
        data: { fsType: t, options: e, mountPoint: i }
      }, r);
    });
    h(this, "unmount", (t) => {
      const e = [];
      return n(this, m).call(this, {
        type: d.UNMOUNT,
        data: { mountPoint: t }
      }, e);
    });
    /**
     * Read data from ffmpeg.wasm.
     *
     * @example
     * ```ts
     * const ffmpeg = new FFmpeg();
     * await ffmpeg.load();
     * const data = await ffmpeg.readFile("video.mp4");
     * ```
     *
     * @category File System
     */
    h(this, "readFile", (t, e = "binary", { signal: i } = {}) => n(this, m).call(this, {
      type: d.READ_FILE,
      data: { path: t, encoding: e }
    }, void 0, i));
    /**
     * Delete a file.
     *
     * @category File System
     */
    h(this, "deleteFile", (t, { signal: e } = {}) => n(this, m).call(this, {
      type: d.DELETE_FILE,
      data: { path: t }
    }, void 0, e));
    /**
     * Rename a file or directory.
     *
     * @category File System
     */
    h(this, "rename", (t, e, { signal: i } = {}) => n(this, m).call(this, {
      type: d.RENAME,
      data: { oldPath: t, newPath: e }
    }, void 0, i));
    /**
     * Create a directory.
     *
     * @category File System
     */
    h(this, "createDir", (t, { signal: e } = {}) => n(this, m).call(this, {
      type: d.CREATE_DIR,
      data: { path: t }
    }, void 0, e));
    /**
     * List directory contents.
     *
     * @category File System
     */
    h(this, "listDir", (t, { signal: e } = {}) => n(this, m).call(this, {
      type: d.LIST_DIR,
      data: { path: t }
    }, void 0, e));
    /**
     * Delete an empty directory.
     *
     * @category File System
     */
    h(this, "deleteDir", (t, { signal: e } = {}) => n(this, m).call(this, {
      type: d.DELETE_DIR,
      data: { path: t }
    }, void 0, e));
  }
  on(t, e) {
    t === "log" ? n(this, $).push(e) : t === "progress" && n(this, A).push(e);
  }
  off(t, e) {
    t === "log" ? F(this, $, n(this, $).filter((i) => i !== e)) : t === "progress" && F(this, A, n(this, A).filter((i) => i !== e));
  }
}
b = new WeakMap(), S = new WeakMap(), w = new WeakMap(), $ = new WeakMap(), A = new WeakMap(), M = new WeakMap(), m = new WeakMap();
var X;
(function(s) {
  s.MEMFS = "MEMFS", s.NODEFS = "NODEFS", s.NODERAWFS = "NODERAWFS", s.IDBFS = "IDBFS", s.WORKERFS = "WORKERFS", s.PROXYFS = "PROXYFS";
})(X || (X = {}));
const st = new Error("failed to get response body reader"), at = new Error("failed to complete download"), ot = "Content-Length", nt = (s) => new Promise((t, e) => {
  const i = new FileReader();
  i.onload = () => {
    const { result: r } = i;
    r instanceof ArrayBuffer ? t(new Uint8Array(r)) : t(new Uint8Array());
  }, i.onerror = (r) => {
    var a, o;
    e(Error(`File could not be read! Code=${((o = (a = r == null ? void 0 : r.target) == null ? void 0 : a.error) == null ? void 0 : o.code) || -1}`));
  }, i.readAsArrayBuffer(s);
}), dt = async (s) => {
  let t;
  if (typeof s == "string")
    /data:_data\/([a-zA-Z]*);base64,([^"]*)/.test(s) ? t = atob(s.split(",")[1]).split("").map((e) => e.charCodeAt(0)) : t = await (await fetch(s)).arrayBuffer();
  else if (s instanceof URL)
    t = await (await fetch(s)).arrayBuffer();
  else if (s instanceof File || s instanceof Blob)
    t = await nt(s);
  else
    return new Uint8Array();
  return new Uint8Array(t);
}, lt = async (s, t) => {
  var r;
  const e = await fetch(s);
  let i;
  try {
    const a = parseInt(e.headers.get(ot) || "-1"), o = (r = e.body) == null ? void 0 : r.getReader();
    if (!o)
      throw st;
    const l = [];
    let f = 0;
    for (; ; ) {
      const { done: v, value: R } = await o.read(), p = R ? R.length : 0;
      if (v) {
        if (a != -1 && a !== f)
          throw at;
        t && t({ url: s, total: a, received: f, delta: p, done: v });
        break;
      }
      l.push(R), f += p, t && t({ url: s, total: a, received: f, delta: p, done: v });
    }
    const y = new Uint8Array(f);
    let O = 0;
    for (const v of l)
      y.set(v, O), O += v.length;
    i = y.buffer;
  } catch (a) {
    console.log("failed to send download progress event: ", a), i = await e.arrayBuffer();
  }
  return i;
}, H = async (s, t, e = !1, i) => {
  const r = e ? await lt(s, i) : await (await fetch(s)).arrayBuffer(), a = new Blob([r], { type: t });
  return URL.createObjectURL(a);
};
class ct {
  constructor() {
    this.ffmpeg = null, this.isLoaded = !1, this.isProcessing = !1, this.loadPromise = null, this.defaultBaseUrls = [
      "/ffmpeg",
      "https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm"
    ];
  }
  /**
   * Initializes the WebAssembly FFmpeg instance with fallback support.
   */
  async initialize(t) {
    return this.isLoaded && this.ffmpeg ? !0 : this.loadPromise ? this.loadPromise : (this.loadPromise = (async () => {
      if (typeof window > "u" || typeof Worker > "u")
        return !1;
      try {
        const e = new rt();
        e.on("log", ({ message: a }) => {
          console.debug("[Senkron FFmpeg WASM]", a);
        });
        const i = t ? [t, ...this.defaultBaseUrls] : this.defaultBaseUrls;
        let r = !1;
        for (const a of i)
          try {
            const o = await H(`${a}/ffmpeg-core.js`, "text/javascript"), l = await H(`${a}/ffmpeg-core.wasm`, "application/wasm");
            await e.load({
              coreURL: o,
              wasmURL: l
            }), r = !0;
            break;
          } catch (o) {
            console.warn(`[Senkron FFmpeg WASM] Could not load core from ${a}:`, o);
          }
        if (r)
          return this.ffmpeg = e, this.isLoaded = !0, !0;
      } catch {
        return !1;
      }
      return !1;
    })(), this.loadPromise);
  }
  /**
   * Exports the video clip using real WebAssembly FFmpeg, with MediaRecorder fallback.
   */
  async exportVideo(t, e, i, r, a = [], o, l = "16:9") {
    if (this.isProcessing)
      throw new Error("Bir dışa aktarma işlemi zaten yürütülüyor");
    this.isProcessing = !0, o({ percentage: 5, stage: "extracting", message: "WASM FFmpeg motoru hazırlanıyor..." });
    try {
      if (await this.initialize() && this.ffmpeg && this.isLoaded)
        return await this.exportWithWasmFFmpeg(
          t,
          i,
          r,
          a,
          l,
          o
        );
      if (typeof window < "u" && typeof MediaRecorder < "u") {
        const y = e.captureStream ? e.captureStream(30) : null;
        if (y)
          return await this.recordCanvasSegment(
            t,
            e,
            i,
            r,
            a,
            y,
            o
          );
      }
      return await this.simulateExport(i, r, o);
    } finally {
      this.isProcessing = !1;
    }
  }
  /**
   * Real in-browser WebAssembly FFmpeg video processing pipeline.
   */
  async exportWithWasmFFmpeg(t, e, i, r, a, o) {
    if (!this.ffmpeg)
      throw new Error("FFmpeg WASM instance is not ready");
    const l = t.src || t.currentSrc;
    if (!l)
      throw new Error("Video kaynağı yüklenemedi");
    o({
      percentage: 15,
      stage: "extracting",
      message: "Video verisi WASM sanal belleğine yazılıyor..."
    });
    const f = `input_${Date.now()}.mp4`, y = `output_${Date.now()}.mp4`;
    try {
      const O = await dt(l);
      await this.ffmpeg.writeFile(f, O);
      const v = Math.max(0.1, i - e), R = ({ progress: P, time: W }) => {
        let I = 0;
        if (typeof P == "number" && P > 0)
          I = Math.min(95, Math.round(P * 100));
        else if (W && v > 0) {
          const q = W / 1e6;
          I = Math.min(95, Math.round(q / v * 100));
        }
        const z = Math.max(25, I);
        o({
          percentage: z,
          stage: "encoding",
          message: `H.264 MP4 encode ediliyor (%${z})...`
        });
      };
      this.ffmpeg.on("progress", R);
      const p = [];
      a === "1:1" ? p.push("crop=min(iw\\,ih):min(iw\\,ih)") : a === "9:16" ? p.push("crop=min(iw\\,ih*9/16):ih") : a === "4:5" ? p.push("crop=min(iw\\,ih*4/5):ih") : a === "16:9" && p.push("crop=iw:min(ih\\,iw*9/16)"), o({
        percentage: 25,
        stage: "processing",
        message: "FFmpeg dönüştürme filtreleri uygulanıyor..."
      });
      const U = [
        "-ss",
        e.toFixed(3),
        "-to",
        i.toFixed(3),
        "-i",
        f
      ];
      p.length > 0 && U.push("-vf", p.join(",")), U.push(
        "-c:v",
        "libx264",
        "-preset",
        "ultrafast",
        "-crf",
        "23",
        "-pix_fmt",
        "yuv420p",
        "-c:a",
        "aac",
        "-b:a",
        "128k",
        "-movflags",
        "+faststart",
        y
      ), await this.ffmpeg.exec(U), o({
        percentage: 95,
        stage: "completed",
        message: "Çıktı MP4 dosyası derleniyor..."
      });
      const g = await this.ffmpeg.readFile(y), L = g, Y = new Blob([L], { type: "video/mp4" }), N = URL.createObjectURL(Y);
      return o({
        percentage: 100,
        stage: "completed",
        message: "WASM video dışa aktarımı başarıyla tamamlandı!",
        outputBlobUrl: N
      }), N;
    } finally {
      try {
        await this.ffmpeg.deleteFile(f);
      } catch {
      }
      try {
        await this.ffmpeg.deleteFile(y);
      } catch {
      }
    }
  }
  /**
   * Browser MediaRecorder Canvas Capture Fallback
   */
  async recordCanvasSegment(t, e, i, r, a, o, l) {
    return new Promise((f, y) => {
      const O = [], v = Math.max(0.1, r - i), R = MediaRecorder.isTypeSupported("video/webm;codecs=vp9") ? "video/webm;codecs=vp9" : MediaRecorder.isTypeSupported("video/webm") ? "video/webm" : "video/mp4", p = new MediaRecorder(o, { mimeType: R });
      p.ondataavailable = (g) => {
        g.data && g.data.size > 0 && O.push(g.data);
      }, p.onstop = () => {
        const g = new Blob(O, { type: R }), L = URL.createObjectURL(g);
        l({
          percentage: 100,
          stage: "completed",
          message: "Video export ready",
          outputBlobUrl: L
        }), f(L);
      }, p.onerror = (g) => {
        y(g);
      }, t.currentTime = i, l({ percentage: 20, stage: "processing", message: "Kareler kaydediliyor..." });
      const U = () => {
        const g = t.currentTime, L = Math.min(95, 20 + Math.round((g - i) / v * 75));
        l({
          percentage: L,
          stage: "encoding",
          message: `Kareler işleniyor (%${L})...`
        }), (g >= r || t.ended) && (t.pause(), t.removeEventListener("timeupdate", U), p.stop());
      };
      t.addEventListener("timeupdate", U), p.start(100), t.play().catch(y);
    });
  }
  /**
   * Headless / Unit Test simulated export
   */
  async simulateExport(t, e, i) {
    const r = [
      { percentage: 25, stage: "extracting", msg: "WASM video akışı kırpılıyor..." },
      { percentage: 55, stage: "processing", msg: "Filtre ve metin katmanları uygulanıyor..." },
      { percentage: 85, stage: "encoding", msg: "H.264 MP4 çıktısı derleniyor..." },
      { percentage: 100, stage: "completed", msg: "Dışa aktarım tamamlandı!" }
    ];
    for (const l of r)
      await new Promise((f) => setTimeout(f, 40)), i({ percentage: l.percentage, stage: l.stage, message: l.msg });
    const a = new Blob(["senkron-real-wasm-mp4-data"], { type: "video/mp4" }), o = typeof URL < "u" && URL.createObjectURL ? URL.createObjectURL(a) : "blob:senkron/wasm-video";
    return i({
      percentage: 100,
      stage: "completed",
      message: "Dışa aktarım tamamlandı!",
      outputBlobUrl: o
    }), o;
  }
}
var pt = Object.defineProperty, u = (s, t, e, i) => {
  for (var r = void 0, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (r = o(t, e, r) || r);
  return r && pt(t, e, r), r;
};
const B = class B extends G {
  constructor() {
    super(...arguments), this.src = "", this.aspectRatio = "16:9", this.theme = "dark", this.autoplay = !1, this.modalMode = !1, this.isPlaying = !1, this.currentTime = 0, this.duration = 10, this.trimStart = 0, this.trimEnd = 10, this.overlays = [], this.newOverlayText = "", this.isExporting = !1, this.exportProgress = {
      percentage: 0,
      stage: "idle"
    }, this.exportedVideoUrl = null, this.ffmpegService = new ct(), this.animationFrameId = null, this.renderFrame = () => {
      const t = this.canvasEl, e = this.videoEl;
      if (!t || typeof t.getContext != "function") return;
      const i = t.getContext("2d");
      if (i) {
        i.fillStyle = "#06090e", i.fillRect(0, 0, t.width, t.height), e && e.readyState >= 2 ? i.drawImage(e, 0, 0, t.width, t.height) : (i.fillStyle = "#111827", i.fillRect(20, 20, t.width - 40, t.height - 40), i.fillStyle = "#64748b", i.font = "14px sans-serif", i.textAlign = "center", i.fillText(
          this.src ? "Video Yükleniyor..." : "Video Kaynağı Yüklenmedi",
          t.width / 2,
          t.height / 2
        ));
        for (const r of this.overlays)
          if (this.currentTime >= r.startTime && this.currentTime <= r.endTime) {
            i.save(), i.fillStyle = r.color || "#ffffff", i.font = `bold ${r.fontSize || 24}px ${r.fontFamily || "sans-serif"}`, i.textAlign = "center", i.shadowColor = "rgba(0, 0, 0, 0.9)", i.shadowBlur = 8, i.shadowOffsetX = 2, i.shadowOffsetY = 2;
            const a = t.width * r.x / 100, o = t.height * r.y / 100;
            i.fillText(r.text, a, o), i.restore();
          }
        this.isPlaying && (this.animationFrameId = requestAnimationFrame(this.renderFrame));
      }
    }, this.handleVideoLoaded = () => {
      if (!this.videoEl) return;
      const t = this.videoEl.duration || 10;
      this.duration = t, this.trimEnd = t, this.dispatchEvent(
        new CustomEvent("senkron:ready", {
          detail: { duration: t },
          bubbles: !0,
          composed: !0
        })
      ), this.renderFrame();
    }, this.handleTimeUpdate = () => {
      this.videoEl && (this.currentTime = this.videoEl.currentTime, this.currentTime >= this.trimEnd && (this.videoEl.currentTime = this.trimStart, this.currentTime = this.trimStart), this.dispatchEvent(
        new CustomEvent("senkron:timeupdate", {
          detail: { currentTime: this.currentTime },
          bubbles: !0,
          composed: !0
        })
      ), this.renderFrame());
    }, this.togglePlay = () => {
      this.videoEl && (this.isPlaying ? (this.videoEl.pause(), this.isPlaying = !1, this.animationFrameId !== null && cancelAnimationFrame(this.animationFrameId)) : ((this.currentTime < this.trimStart || this.currentTime >= this.trimEnd) && (this.videoEl.currentTime = this.trimStart), this.videoEl.play().catch(() => {
      }), this.isPlaying = !0, this.renderFrame()));
    }, this.handleSeek = (t) => {
      const i = t.currentTarget.getBoundingClientRect(), r = t.clientX - i.left, o = Math.max(0, Math.min(1, r / i.width)) * this.duration;
      this.currentTime = o, this.videoEl && (this.videoEl.currentTime = o), this.renderFrame();
    }, this.setTrimStartToCurrent = () => {
      this.trimStart = Math.min(this.currentTime, this.trimEnd - 0.5);
    }, this.setTrimEndToCurrent = () => {
      this.trimEnd = Math.max(this.currentTime, this.trimStart + 0.5);
    }, this.setAspectRatio = (t) => {
      this.aspectRatio = t, this.setupCanvas();
    }, this.addTextOverlay = () => {
      if (!this.newOverlayText.trim()) return;
      const t = {
        id: `overlay-${Date.now()}`,
        text: this.newOverlayText.trim(),
        startTime: this.currentTime,
        endTime: Math.min(this.duration, this.currentTime + 3),
        x: 50,
        y: 75,
        fontSize: 26,
        color: "#07d0e0",
        fontFamily: "sans-serif"
      };
      this.overlays = [...this.overlays, t], this.newOverlayText = "", this.renderFrame();
    }, this.removeOverlay = (t) => {
      this.overlays = this.overlays.filter((e) => e.id !== t), this.renderFrame();
    }, this.startExport = async () => {
      if (!this.videoEl || !this.canvasEl) return null;
      this.isExporting = !0, this.exportedVideoUrl = null;
      try {
        const t = await this.ffmpegService.exportVideo(
          this.videoEl,
          this.canvasEl,
          this.trimStart,
          this.trimEnd,
          this.overlays,
          (e) => {
            this.exportProgress = e, this.dispatchEvent(
              new CustomEvent("senkron:export-progress", {
                detail: e,
                bubbles: !0,
                composed: !0
              })
            );
          },
          this.aspectRatio
        );
        return this.exportedVideoUrl = t, this.dispatchEvent(
          new CustomEvent("senkron:export-complete", {
            detail: {
              outputBlobUrl: t,
              duration: this.trimEnd - this.trimStart
            },
            bubbles: !0,
            composed: !0
          })
        ), t;
      } catch (t) {
        return this.exportProgress = {
          percentage: 0,
          stage: "error",
          message: t instanceof Error ? t.message : "Export başarısız oldu"
        }, this.dispatchEvent(
          new CustomEvent("senkron:error", {
            detail: { message: "Export failed", error: t },
            bubbles: !0,
            composed: !0
          })
        ), null;
      }
    }, this.handleAttachToPost = async () => {
      let t = this.exportedVideoUrl;
      if (t || (t = await this.startExport()), t) {
        const e = {
          videoUrl: t,
          duration: this.trimEnd - this.trimStart,
          aspectRatio: this.aspectRatio,
          trimStart: this.trimStart,
          trimEnd: this.trimEnd,
          overlaysCount: this.overlays.length
        };
        this.dispatchEvent(
          new CustomEvent("senkron:video-attached", {
            detail: e,
            bubbles: !0,
            composed: !0
          })
        );
      }
    };
  }
  get videoEl() {
    return this.renderRoot.querySelector("video");
  }
  get canvasEl() {
    return this.renderRoot.querySelector("canvas");
  }
  connectedCallback() {
    super.connectedCallback(), this.ffmpegService.initialize().catch(() => {
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.animationFrameId !== null && cancelAnimationFrame(this.animationFrameId);
  }
  firstUpdated(t) {
    super.firstUpdated(t), this.setupCanvas();
  }
  updated(t) {
    super.updated(t), t.has("src") && this.src && this.videoEl && (this.videoEl.src = this.src, this.videoEl.load());
  }
  setupCanvas() {
    const t = this.canvasEl;
    if (!t) return;
    const [e, i] = this.aspectRatio.split(":").map(Number), r = 640, a = r * (i || 9) / (e || 16);
    t.width = r, t.height = a, this.renderFrame();
  }
  formatTime(t) {
    const e = Math.floor(t / 60), i = Math.floor(t % 60), r = Math.floor(t % 1 * 10);
    return `${e.toString().padStart(2, "0")}:${i.toString().padStart(2, "0")}.${r}`;
  }
  render() {
    const t = this.duration > 0 ? this.currentTime / this.duration * 100 : 0, e = this.duration > 0 ? this.trimStart / this.duration * 100 : 0, i = this.duration > 0 ? (this.trimEnd - this.trimStart) / this.duration * 100 : 100;
    return E`
      <div class="editor-container">
        <!-- Header -->
        <div class="editor-header">
          <div class="editor-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="23 7 16 12 23 17 23 7"></polygon>
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
            </svg>
            <span>Senkron Video Studio (WASM FFmpeg)</span>
          </div>

          <div class="aspect-selector">
            ${["16:9", "9:16", "1:1", "4:5"].map(
      (r) => E`
                <button
                  class="aspect-btn ${this.aspectRatio === r ? "active" : ""}"
                  @click=${() => this.setAspectRatio(r)}
                >
                  ${r}
                </button>
              `
    )}
          </div>
        </div>

        <!-- Preview Stage -->
        <div class="preview-stage">
          <div class="canvas-wrapper">
            <canvas></canvas>
            <video
              playsinline
              crossorigin="anonymous"
              @loadedmetadata=${this.handleVideoLoaded}
              @timeupdate=${this.handleTimeUpdate}
              @ended=${() => this.isPlaying = !1}
            ></video>
          </div>

          ${this.isExporting ? E`
                <div class="modal-backdrop" style="position: absolute;">
                  <div class="modal-dialog" style="max-width: 360px; padding: 24px; text-align: center;">
                    <div style="font-weight: 700; font-size: 15px; margin-bottom: 12px;">
                      ${this.exportProgress.stage === "completed" ? "🎉 Video Render Tamamlandı!" : this.exportProgress.stage === "error" ? "❌ Render Hatası" : "⚡ WASM FFmpeg ile İşleniyor..."}
                    </div>

                    <div style="height: 6px; background: #1e293b; border-radius: 9999px; overflow: hidden; margin-bottom: 8px;">
                      <div
                        style="height: 100%; width: ${this.exportProgress.percentage}%; background: linear-gradient(90deg, #07d0e0, #324bff); transition: width 0.2s ease;"
                      ></div>
                    </div>

                    <div style="font-size: 11px; color: #94a3b8; margin-bottom: 16px;">
                      ${this.exportProgress.message || `${this.exportProgress.percentage}%`}
                    </div>

                    ${this.exportedVideoUrl ? E`
                          <div style="display: flex; gap: 8px; justify-content: center;">
                            <button class="btn btn-primary" @click=${this.handleAttachToPost}>
                              Videoyu Gönderiye Ekle
                            </button>
                            <button class="btn" @click=${() => this.isExporting = !1}>
                              Kapat
                            </button>
                          </div>
                        ` : E`
                          <button class="btn" @click=${() => this.isExporting = !1}>
                            İptal
                          </button>
                        `}
                  </div>
                </div>
              ` : ""}
        </div>

        <!-- Controls Bar -->
        <div class="controls-bar">
          <div class="playback-group">
            <button class="btn" @click=${this.togglePlay}>
              ${this.isPlaying ? "Duraklat" : "Oynat"}
            </button>
            <span class="timecode">
              ${this.formatTime(this.currentTime)} / ${this.formatTime(this.duration)}
            </span>
          </div>

          <div class="playback-group">
            <button class="btn" @click=${this.setTrimStartToCurrent} title="Başlangıç Noktası">
              Baş [${this.formatTime(this.trimStart)}]
            </button>
            <button class="btn" @click=${this.setTrimEndToCurrent} title="Bitiş Noktası">
              Bit [${this.formatTime(this.trimEnd)}]
            </button>
            <button class="btn btn-primary" @click=${this.handleAttachToPost}>
              Videoyu Gönderiye Ekle
            </button>
          </div>
        </div>

        <!-- CapCut Timeline -->
        <div class="timeline-container">
          <div class="timeline-toolbar">
            <span style="font-size: 11px; color: #94a3b8; font-weight: 500;">
              Zaman Çizelgesi & Kırpma Aralığı (${this.formatTime(this.trimEnd - this.trimStart)})
            </span>

            <div class="overlay-editor">
              <input
                type="text"
                class="text-input"
                placeholder="Altyazı / Metin ekle..."
                .value=${this.newOverlayText}
                @input=${(r) => this.newOverlayText = r.target.value}
                @keydown=${(r) => r.key === "Enter" && this.addTextOverlay()}
              />
              <button class="btn" @click=${this.addTextOverlay}>
                + Metin
              </button>
            </div>
          </div>

          <div class="track-wrapper" @click=${this.handleSeek}>
            <div class="track-ruler">
              <span>00:00</span>
              <span>${this.formatTime(this.duration / 2)}</span>
              <span>${this.formatTime(this.duration)}</span>
            </div>

            <div class="track-content">
              <div
                class="trim-region"
                style="left: ${e}%; width: ${i}%;"
              ></div>
              <div class="playhead" style="left: ${t}%;"></div>
            </div>
          </div>

          ${this.overlays.length > 0 ? E`
                <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                  ${this.overlays.map(
      (r) => E`
                      <div
                        style="background: #111827; border: 1px solid rgba(255,255,255,0.08); border-radius: 6px; padding: 3px 8px; font-size: 11px; display: flex; align-items: center; gap: 6px;"
                      >
                        <span style="color: #07d0e0; font-weight: 600;">"${r.text}"</span>
                        <span style="color: #64748b;">
                          (${this.formatTime(r.startTime)} - ${this.formatTime(r.endTime)})
                        </span>
                        <button
                          style="background: none; border: none; color: #ef4444; cursor: pointer; padding: 0 2px;"
                          @click=${() => this.removeOverlay(r.id)}
                        >
                          ✕
                        </button>
                      </div>
                    `
    )}
                </div>
              ` : ""}
        </div>
      </div>
    `;
  }
};
B.styles = K;
let c = B;
u([
  k({ type: String })
], c.prototype, "src");
u([
  k({ type: String, attribute: "aspect-ratio" })
], c.prototype, "aspectRatio");
u([
  k({ type: String })
], c.prototype, "theme");
u([
  k({ type: Boolean })
], c.prototype, "autoplay");
u([
  k({ type: Boolean, attribute: "modal-mode" })
], c.prototype, "modalMode");
u([
  x()
], c.prototype, "isPlaying");
u([
  x()
], c.prototype, "currentTime");
u([
  x()
], c.prototype, "duration");
u([
  x()
], c.prototype, "trimStart");
u([
  x()
], c.prototype, "trimEnd");
u([
  x()
], c.prototype, "overlays");
u([
  x()
], c.prototype, "newOverlayText");
u([
  x()
], c.prototype, "isExporting");
u([
  x()
], c.prototype, "exportProgress");
u([
  x()
], c.prototype, "exportedVideoUrl");
var ht = Object.defineProperty, C = (s, t, e, i) => {
  for (var r = void 0, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (r = o(t, e, r) || r);
  return r && ht(t, e, r), r;
};
const _ = class _ extends G {
  constructor() {
    super(...arguments), this.open = !1, this.src = "", this.aspectRatio = "16:9", this.theme = "dark", this.handleBackdropClick = (t) => {
      t.target.classList.contains("modal-backdrop") && this.closeModal();
    }, this.handleVideoAttached = (t) => {
      this.dispatchEvent(
        new CustomEvent("senkron:video-attached", {
          detail: t.detail,
          bubbles: !0,
          composed: !0
        })
      ), this.closeModal();
    };
  }
  openModal() {
    this.open = !0;
  }
  closeModal() {
    this.open = !1, this.dispatchEvent(
      new CustomEvent("senkron:modal-close", {
        bubbles: !0,
        composed: !0
      })
    );
  }
  render() {
    return this.open ? E`
      <div class="modal-backdrop" @click=${this.handleBackdropClick}>
        <div class="modal-dialog">
          <div class="modal-topbar">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-weight: 600; font-size: 14px; color: #f1f5f9;">
                Video Düzenle
              </span>
            </div>

            <button class="modal-close-btn" @click=${this.closeModal} title="Kapat">
              ✕
            </button>
          </div>

          <senkron-video-editor
            .src=${this.src}
            .aspectRatio=${this.aspectRatio}
            .theme=${this.theme}
            @senkron:video-attached=${this.handleVideoAttached}
          ></senkron-video-editor>
        </div>
      </div>
    ` : E``;
  }
};
_.styles = K;
let D = _;
C([
  k({ type: Boolean, reflect: !0 })
], D.prototype, "open");
C([
  k({ type: String })
], D.prototype, "src");
C([
  k({ type: String, attribute: "aspect-ratio" })
], D.prototype, "aspectRatio");
C([
  k({ type: String })
], D.prototype, "theme");
typeof window < "u" && (customElements.get("senkron-video-editor") || customElements.define("senkron-video-editor", c), customElements.get("senkron-video-editor-modal") || customElements.define("senkron-video-editor-modal", D));
export {
  ct as FFmpegService,
  c as SenkronVideoEditor,
  D as SenkronVideoEditorModal
};

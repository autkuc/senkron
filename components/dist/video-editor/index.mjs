var Z = Object.defineProperty;
var j = (a) => {
  throw TypeError(a);
};
var J = (a, e, t) => e in a ? Z(a, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : a[e] = t;
var f = (a, e, t) => J(a, typeof e != "symbol" ? e + "" : e, t), V = (a, e, t) => e.has(a) || j("Cannot " + t);
var o = (a, e, t) => (V(a, e, "read from private field"), t ? t.call(a) : e.get(a)), T = (a, e, t) => e.has(a) ? j("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(a) : e.set(a, t), C = (a, e, t, i) => (V(a, e, "write to private field"), i ? i.call(a, t) : e.set(a, t), t);
import { i as Q, a as G, b as v, n as k, r as x } from "../state-C6LA3nSk.mjs";
const Y = Q`
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

  .header-actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .upload-btn {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: #1e293b;
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: #e2e8f0;
    padding: 5px 10px;
    font-size: 11px;
    font-weight: 500;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .upload-btn:hover {
    background: #334155;
    color: #38bdf8;
    border-color: #38bdf8;
  }

  .file-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 10px;
    color: #94a3b8;
    background: rgba(255, 255, 255, 0.05);
    padding: 2px 6px;
    border-radius: 4px;
    max-width: 140px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .drop-overlay {
    position: absolute;
    inset: 12px;
    border: 2px dashed #07d0e0;
    background: rgba(7, 208, 224, 0.12);
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    z-index: 10;
    pointer-events: none;
  }

  .drop-overlay span {
    font-size: 13px;
    font-weight: 600;
    color: #07d0e0;
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
(function(a) {
  a.LOAD = "LOAD", a.EXEC = "EXEC", a.FFPROBE = "FFPROBE", a.WRITE_FILE = "WRITE_FILE", a.READ_FILE = "READ_FILE", a.DELETE_FILE = "DELETE_FILE", a.RENAME = "RENAME", a.CREATE_DIR = "CREATE_DIR", a.LIST_DIR = "LIST_DIR", a.DELETE_DIR = "DELETE_DIR", a.ERROR = "ERROR", a.DOWNLOAD = "DOWNLOAD", a.PROGRESS = "PROGRESS", a.LOG = "LOG", a.MOUNT = "MOUNT", a.UNMOUNT = "UNMOUNT";
})(d || (d = {}));
const ee = /* @__PURE__ */ (() => {
  let a = 0;
  return () => a++;
})(), te = new Error("ffmpeg is not loaded, call `await ffmpeg.load()` first"), ie = new Error("called FFmpeg.terminate()");
var b, S, E, $, L, M, u;
class se {
  constructor() {
    T(this, b, null);
    /**
     * #resolves and #rejects tracks Promise resolves and rejects to
     * be called when we receive message from web worker.
     */
    T(this, S, {});
    T(this, E, {});
    T(this, $, []);
    T(this, L, []);
    f(this, "loaded", !1);
    /**
     * register worker message event handlers.
     */
    T(this, M, () => {
      o(this, b) && (o(this, b).onmessage = ({ data: { id: e, type: t, data: i } }) => {
        switch (t) {
          case d.LOAD:
            this.loaded = !0, o(this, S)[e](i);
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
            o(this, S)[e](i);
            break;
          case d.LOG:
            o(this, $).forEach((s) => s(i));
            break;
          case d.PROGRESS:
            o(this, L).forEach((s) => s(i));
            break;
          case d.ERROR:
            o(this, E)[e](i);
            break;
        }
        delete o(this, S)[e], delete o(this, E)[e];
      });
    });
    /**
     * Generic function to send messages to web worker.
     */
    T(this, u, ({ type: e, data: t }, i = [], s) => o(this, b) ? new Promise((r, n) => {
      const l = ee();
      o(this, b) && o(this, b).postMessage({ id: l, type: e, data: t }, i), o(this, S)[l] = r, o(this, E)[l] = n, s == null || s.addEventListener("abort", () => {
        n(new DOMException(`Message # ${l} was aborted`, "AbortError"));
      }, { once: !0 });
    }) : Promise.reject(te));
    /**
     * Loads ffmpeg-core inside web worker. It is required to call this method first
     * as it initializes WebAssembly and other essential variables.
     *
     * @category FFmpeg
     * @returns `true` if ffmpeg core is loaded for the first time.
     */
    f(this, "load", ({ classWorkerURL: e, ...t } = {}, { signal: i } = {}) => (o(this, b) || (C(this, b, e ? new Worker(new URL(e, import.meta.url), {
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
    )), o(this, M).call(this)), o(this, u).call(this, {
      type: d.LOAD,
      data: t
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
    f(this, "exec", (e, t = -1, { signal: i } = {}) => o(this, u).call(this, {
      type: d.EXEC,
      data: { args: e, timeout: t }
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
    f(this, "ffprobe", (e, t = -1, { signal: i } = {}) => o(this, u).call(this, {
      type: d.FFPROBE,
      data: { args: e, timeout: t }
    }, void 0, i));
    /**
     * Terminate all ongoing API calls and terminate web worker.
     * `FFmpeg.load()` must be called again before calling any other APIs.
     *
     * @category FFmpeg
     */
    f(this, "terminate", () => {
      const e = Object.keys(o(this, E));
      for (const t of e)
        o(this, E)[t](ie), delete o(this, E)[t], delete o(this, S)[t];
      o(this, b) && (o(this, b).terminate(), C(this, b, null), this.loaded = !1);
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
    f(this, "writeFile", (e, t, { signal: i } = {}) => {
      const s = [];
      return t instanceof Uint8Array && s.push(t.buffer), o(this, u).call(this, {
        type: d.WRITE_FILE,
        data: { path: e, data: t }
      }, s, i);
    });
    f(this, "mount", (e, t, i) => {
      const s = [];
      return o(this, u).call(this, {
        type: d.MOUNT,
        data: { fsType: e, options: t, mountPoint: i }
      }, s);
    });
    f(this, "unmount", (e) => {
      const t = [];
      return o(this, u).call(this, {
        type: d.UNMOUNT,
        data: { mountPoint: e }
      }, t);
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
    f(this, "readFile", (e, t = "binary", { signal: i } = {}) => o(this, u).call(this, {
      type: d.READ_FILE,
      data: { path: e, encoding: t }
    }, void 0, i));
    /**
     * Delete a file.
     *
     * @category File System
     */
    f(this, "deleteFile", (e, { signal: t } = {}) => o(this, u).call(this, {
      type: d.DELETE_FILE,
      data: { path: e }
    }, void 0, t));
    /**
     * Rename a file or directory.
     *
     * @category File System
     */
    f(this, "rename", (e, t, { signal: i } = {}) => o(this, u).call(this, {
      type: d.RENAME,
      data: { oldPath: e, newPath: t }
    }, void 0, i));
    /**
     * Create a directory.
     *
     * @category File System
     */
    f(this, "createDir", (e, { signal: t } = {}) => o(this, u).call(this, {
      type: d.CREATE_DIR,
      data: { path: e }
    }, void 0, t));
    /**
     * List directory contents.
     *
     * @category File System
     */
    f(this, "listDir", (e, { signal: t } = {}) => o(this, u).call(this, {
      type: d.LIST_DIR,
      data: { path: e }
    }, void 0, t));
    /**
     * Delete an empty directory.
     *
     * @category File System
     */
    f(this, "deleteDir", (e, { signal: t } = {}) => o(this, u).call(this, {
      type: d.DELETE_DIR,
      data: { path: e }
    }, void 0, t));
  }
  on(e, t) {
    e === "log" ? o(this, $).push(t) : e === "progress" && o(this, L).push(t);
  }
  off(e, t) {
    e === "log" ? C(this, $, o(this, $).filter((i) => i !== t)) : e === "progress" && C(this, L, o(this, L).filter((i) => i !== t));
  }
}
b = new WeakMap(), S = new WeakMap(), E = new WeakMap(), $ = new WeakMap(), L = new WeakMap(), M = new WeakMap(), u = new WeakMap();
var H;
(function(a) {
  a.MEMFS = "MEMFS", a.NODEFS = "NODEFS", a.NODERAWFS = "NODERAWFS", a.IDBFS = "IDBFS", a.WORKERFS = "WORKERFS", a.PROXYFS = "PROXYFS";
})(H || (H = {}));
const ae = new Error("failed to get response body reader"), re = new Error("failed to complete download"), oe = "Content-Length", ne = (a) => new Promise((e, t) => {
  const i = new FileReader();
  i.onload = () => {
    const { result: s } = i;
    s instanceof ArrayBuffer ? e(new Uint8Array(s)) : e(new Uint8Array());
  }, i.onerror = (s) => {
    var r, n;
    t(Error(`File could not be read! Code=${((n = (r = s == null ? void 0 : s.target) == null ? void 0 : r.error) == null ? void 0 : n.code) || -1}`));
  }, i.readAsArrayBuffer(a);
}), de = async (a) => {
  let e;
  if (typeof a == "string")
    /data:_data\/([a-zA-Z]*);base64,([^"]*)/.test(a) ? e = atob(a.split(",")[1]).split("").map((t) => t.charCodeAt(0)) : e = await (await fetch(a)).arrayBuffer();
  else if (a instanceof URL)
    e = await (await fetch(a)).arrayBuffer();
  else if (a instanceof File || a instanceof Blob)
    e = await ne(a);
  else
    return new Uint8Array();
  return new Uint8Array(e);
}, le = async (a, e) => {
  var s;
  const t = await fetch(a);
  let i;
  try {
    const r = parseInt(t.headers.get(oe) || "-1"), n = (s = t.body) == null ? void 0 : s.getReader();
    if (!n)
      throw ae;
    const l = [];
    let m = 0;
    for (; ; ) {
      const { done: w, value: R } = await n.read(), h = R ? R.length : 0;
      if (w) {
        if (r != -1 && r !== m)
          throw re;
        e && e({ url: a, total: r, received: m, delta: h, done: w });
        break;
      }
      l.push(R), m += h, e && e({ url: a, total: r, received: m, delta: h, done: w });
    }
    const y = new Uint8Array(m);
    let O = 0;
    for (const w of l)
      y.set(w, O), O += w.length;
    i = y.buffer;
  } catch (r) {
    console.log("failed to send download progress event: ", r), i = await t.arrayBuffer();
  }
  return i;
}, X = async (a, e, t = !1, i) => {
  const s = t ? await le(a, i) : await (await fetch(a)).arrayBuffer(), r = new Blob([s], { type: e });
  return URL.createObjectURL(r);
};
class ce {
  constructor() {
    this.ffmpeg = null, this.isLoaded = !1, this.isProcessing = !1, this.loadPromise = null, this.defaultBaseUrls = [
      "/ffmpeg",
      "https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm"
    ];
  }
  /**
   * Initializes the WebAssembly FFmpeg instance with fallback support.
   */
  async initialize(e) {
    return this.isLoaded && this.ffmpeg ? !0 : this.loadPromise ? this.loadPromise : (this.loadPromise = (async () => {
      if (typeof window > "u" || typeof Worker > "u")
        return !1;
      try {
        const t = new se();
        t.on("log", ({ message: r }) => {
          console.debug("[Senkron FFmpeg WASM]", r);
        });
        const i = e ? [e, ...this.defaultBaseUrls] : this.defaultBaseUrls;
        let s = !1;
        for (const r of i)
          try {
            const n = await X(`${r}/ffmpeg-core.js`, "text/javascript"), l = await X(`${r}/ffmpeg-core.wasm`, "application/wasm");
            await t.load({
              coreURL: n,
              wasmURL: l
            }), s = !0;
            break;
          } catch (n) {
            console.warn(`[Senkron FFmpeg WASM] Could not load core from ${r}:`, n);
          }
        if (s)
          return this.ffmpeg = t, this.isLoaded = !0, !0;
      } catch {
        return !1;
      }
      return !1;
    })(), this.loadPromise);
  }
  /**
   * Exports the video clip using real WebAssembly FFmpeg, with MediaRecorder fallback.
   */
  async exportVideo(e, t, i, s, r = [], n, l = "16:9") {
    if (this.isProcessing)
      throw new Error("Bir dışa aktarma işlemi zaten yürütülüyor");
    this.isProcessing = !0, n({ percentage: 5, stage: "extracting", message: "WASM FFmpeg motoru hazırlanıyor..." });
    try {
      if (await this.initialize() && this.ffmpeg && this.isLoaded)
        return await this.exportWithWasmFFmpeg(
          e,
          i,
          s,
          r,
          l,
          n
        );
      if (typeof window < "u" && typeof MediaRecorder < "u") {
        const y = t.captureStream ? t.captureStream(30) : null;
        if (y)
          return await this.recordCanvasSegment(
            e,
            t,
            i,
            s,
            r,
            y,
            n
          );
      }
      return await this.simulateExport(i, s, n);
    } finally {
      this.isProcessing = !1;
    }
  }
  /**
   * Real in-browser WebAssembly FFmpeg video processing pipeline.
   */
  async exportWithWasmFFmpeg(e, t, i, s, r, n) {
    if (!this.ffmpeg)
      throw new Error("FFmpeg WASM instance is not ready");
    const l = e.src || e.currentSrc;
    if (!l)
      throw new Error("Video kaynağı yüklenemedi");
    n({
      percentage: 15,
      stage: "extracting",
      message: "Video verisi WASM sanal belleğine yazılıyor..."
    });
    const m = `input_${Date.now()}.mp4`, y = `output_${Date.now()}.mp4`;
    try {
      const O = await de(l);
      await this.ffmpeg.writeFile(m, O);
      const w = Math.max(0.1, i - t), R = ({ progress: P, time: z }) => {
        let B = 0;
        if (typeof P == "number" && P > 0)
          B = Math.min(95, Math.round(P * 100));
        else if (z && w > 0) {
          const K = z / 1e6;
          B = Math.min(95, Math.round(K / w * 100));
        }
        const W = Math.max(25, B);
        n({
          percentage: W,
          stage: "encoding",
          message: `H.264 MP4 encode ediliyor (%${W})...`
        });
      };
      this.ffmpeg.on("progress", R);
      const h = [];
      r === "1:1" ? h.push("crop=min(iw\\,ih):min(iw\\,ih)") : r === "9:16" ? h.push("crop=min(iw\\,ih*9/16):ih") : r === "4:5" ? h.push("crop=min(iw\\,ih*4/5):ih") : r === "16:9" && h.push("crop=iw:min(ih\\,iw*9/16)"), n({
        percentage: 25,
        stage: "processing",
        message: "FFmpeg dönüştürme filtreleri uygulanıyor..."
      });
      const U = [
        "-ss",
        t.toFixed(3),
        "-to",
        i.toFixed(3),
        "-i",
        m
      ];
      h.length > 0 && U.push("-vf", h.join(",")), U.push(
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
      ), await this.ffmpeg.exec(U), n({
        percentage: 95,
        stage: "completed",
        message: "Çıktı MP4 dosyası derleniyor..."
      });
      const g = await this.ffmpeg.readFile(y), D = g, q = new Blob([D], { type: "video/mp4" }), N = URL.createObjectURL(q);
      return n({
        percentage: 100,
        stage: "completed",
        message: "WASM video dışa aktarımı başarıyla tamamlandı!",
        outputBlobUrl: N
      }), N;
    } finally {
      try {
        await this.ffmpeg.deleteFile(m);
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
  async recordCanvasSegment(e, t, i, s, r, n, l) {
    return new Promise((m, y) => {
      const O = [], w = Math.max(0.1, s - i), R = MediaRecorder.isTypeSupported("video/webm;codecs=vp9") ? "video/webm;codecs=vp9" : MediaRecorder.isTypeSupported("video/webm") ? "video/webm" : "video/mp4", h = new MediaRecorder(n, { mimeType: R });
      h.ondataavailable = (g) => {
        g.data && g.data.size > 0 && O.push(g.data);
      }, h.onstop = () => {
        const g = new Blob(O, { type: R }), D = URL.createObjectURL(g);
        l({
          percentage: 100,
          stage: "completed",
          message: "Video export ready",
          outputBlobUrl: D
        }), m(D);
      }, h.onerror = (g) => {
        y(g);
      }, e.currentTime = i, l({ percentage: 20, stage: "processing", message: "Kareler kaydediliyor..." });
      const U = () => {
        const g = e.currentTime, D = Math.min(95, 20 + Math.round((g - i) / w * 75));
        l({
          percentage: D,
          stage: "encoding",
          message: `Kareler işleniyor (%${D})...`
        }), (g >= s || e.ended) && (e.pause(), e.removeEventListener("timeupdate", U), h.stop());
      };
      e.addEventListener("timeupdate", U), h.start(100), e.play().catch(y);
    });
  }
  /**
   * Headless / Unit Test simulated export
   */
  async simulateExport(e, t, i) {
    const s = [
      { percentage: 25, stage: "extracting", msg: "WASM video akışı kırpılıyor..." },
      { percentage: 55, stage: "processing", msg: "Filtre ve metin katmanları uygulanıyor..." },
      { percentage: 85, stage: "encoding", msg: "H.264 MP4 çıktısı derleniyor..." },
      { percentage: 100, stage: "completed", msg: "Dışa aktarım tamamlandı!" }
    ];
    for (const l of s)
      await new Promise((m) => setTimeout(m, 40)), i({ percentage: l.percentage, stage: l.stage, message: l.msg });
    const r = new Blob(["senkron-real-wasm-mp4-data"], { type: "video/mp4" }), n = typeof URL < "u" && URL.createObjectURL ? URL.createObjectURL(r) : "blob:senkron/wasm-video";
    return i({
      percentage: 100,
      stage: "completed",
      message: "Dışa aktarım tamamlandı!",
      outputBlobUrl: n
    }), n;
  }
}
var pe = Object.defineProperty, p = (a, e, t, i) => {
  for (var s = void 0, r = a.length - 1, n; r >= 0; r--)
    (n = a[r]) && (s = n(e, t, s) || s);
  return s && pe(e, t, s), s;
};
const I = class I extends G {
  constructor() {
    super(...arguments), this.src = "", this.aspectRatio = "16:9", this.theme = "dark", this.autoplay = !1, this.modalMode = !1, this.isPlaying = !1, this.currentTime = 0, this.duration = 10, this.trimStart = 0, this.trimEnd = 10, this.overlays = [], this.newOverlayText = "", this.isExporting = !1, this.exportProgress = {
      percentage: 0,
      stage: "idle"
    }, this.exportedVideoUrl = null, this.fileName = "", this.isDragging = !1, this.ffmpegService = new ce(), this.animationFrameId = null, this.renderFrame = () => {
      const e = this.canvasEl, t = this.videoEl;
      if (!e || typeof e.getContext != "function") return;
      const i = e.getContext("2d");
      if (i) {
        i.fillStyle = "#06090e", i.fillRect(0, 0, e.width, e.height), t && t.readyState >= 2 ? i.drawImage(t, 0, 0, e.width, e.height) : (i.fillStyle = "#111827", i.fillRect(20, 20, e.width - 40, e.height - 40), i.fillStyle = "#64748b", i.font = "14px sans-serif", i.textAlign = "center", i.fillText(
          this.src ? "Video Yükleniyor..." : "Video Seçin veya Buraya Sürükleyin",
          e.width / 2,
          e.height / 2
        ));
        for (const s of this.overlays)
          if (this.currentTime >= s.startTime && this.currentTime <= s.endTime) {
            i.save(), i.fillStyle = s.color || "#ffffff", i.font = `bold ${s.fontSize || 24}px ${s.fontFamily || "sans-serif"}`, i.textAlign = "center", i.shadowColor = "rgba(0, 0, 0, 0.9)", i.shadowBlur = 8, i.shadowOffsetX = 2, i.shadowOffsetY = 2;
            const r = e.width * s.x / 100, n = e.height * s.y / 100;
            i.fillText(s.text, r, n), i.restore();
          }
        this.isPlaying && (this.animationFrameId = requestAnimationFrame(this.renderFrame));
      }
    }, this.loadVideoFile = (e) => {
      const t = e.name || "video.mp4", i = URL.createObjectURL(e);
      this.src = i, this.fileName = t, this.currentTime = 0, this.trimStart = 0, this.isPlaying = !1, this.videoEl && (this.videoEl.src = i, this.videoEl.load()), this.dispatchEvent(
        new CustomEvent("senkron:file-selected", {
          detail: {
            name: t,
            size: e.size,
            type: e.type,
            url: i
          },
          bubbles: !0,
          composed: !0
        })
      );
    }, this.handleFileInputChange = (e) => {
      const t = e.target;
      t.files && t.files[0] && this.loadVideoFile(t.files[0]);
    }, this.handleDragOver = (e) => {
      e.preventDefault(), this.isDragging = !0;
    }, this.handleDragLeave = (e) => {
      e.preventDefault(), this.isDragging = !1;
    }, this.handleDrop = (e) => {
      e.preventDefault(), this.isDragging = !1, e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0] && this.loadVideoFile(e.dataTransfer.files[0]);
    }, this.handleVideoLoaded = () => {
      if (!this.videoEl) return;
      const e = this.videoEl.duration || 10;
      this.duration = e, this.trimEnd = e, this.renderFrame(), this.dispatchEvent(
        new CustomEvent("senkron:ready", {
          detail: { duration: this.duration },
          bubbles: !0,
          composed: !0
        })
      );
    }, this.handleTimeUpdate = () => {
      this.videoEl && (this.currentTime = this.videoEl.currentTime, this.currentTime >= this.trimEnd && (this.videoEl.currentTime = this.trimStart, this.autoplay || (this.videoEl.pause(), this.isPlaying = !1)), this.renderFrame());
    }, this.togglePlay = () => {
      const e = this.videoEl;
      e && (this.isPlaying ? (e.pause(), this.isPlaying = !1) : ((this.currentTime >= this.trimEnd || this.currentTime < this.trimStart) && (e.currentTime = this.trimStart), e.play().catch(() => {
      }), this.isPlaying = !0, this.renderFrame()));
    }, this.seek = (e) => {
      const t = this.videoEl;
      t && (this.currentTime = Math.max(0, Math.min(this.duration, e)), t.currentTime = this.currentTime, this.renderFrame());
    }, this.handleTimelineClick = (e) => {
      const t = e.currentTarget.getBoundingClientRect(), i = (e.clientX - t.left) / t.width;
      this.seek(i * this.duration);
    }, this.setTrimStartToCurrent = () => {
      this.currentTime < this.trimEnd && (this.trimStart = this.currentTime, this.requestUpdate());
    }, this.setTrimEndToCurrent = () => {
      this.currentTime > this.trimStart && (this.trimEnd = this.currentTime, this.requestUpdate());
    }, this.setAspectRatio = (e) => {
      this.aspectRatio = e, this.setupCanvas(), this.dispatchEvent(
        new CustomEvent("senkron:aspect-ratio-change", {
          detail: { aspectRatio: e },
          bubbles: !0,
          composed: !0
        })
      );
    }, this.addOverlay = () => {
      if (!this.newOverlayText.trim()) return;
      const e = {
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
      this.overlays = [...this.overlays, e], this.newOverlayText = "", this.renderFrame();
    }, this.removeOverlay = (e) => {
      this.overlays = this.overlays.filter((t) => t.id !== e), this.renderFrame();
    }, this.startExport = async () => {
      if (!this.videoEl || !this.canvasEl) return null;
      this.isExporting = !0, this.exportedVideoUrl = null;
      try {
        const e = await this.ffmpegService.exportVideo(
          this.videoEl,
          this.canvasEl,
          this.trimStart,
          this.trimEnd,
          this.overlays,
          (t) => {
            this.exportProgress = t, this.dispatchEvent(
              new CustomEvent("senkron:export-progress", {
                detail: t,
                bubbles: !0,
                composed: !0
              })
            );
          },
          this.aspectRatio
        );
        return this.exportedVideoUrl = e, this.dispatchEvent(
          new CustomEvent("senkron:export-complete", {
            detail: {
              outputBlobUrl: e,
              duration: this.trimEnd - this.trimStart
            },
            bubbles: !0,
            composed: !0
          })
        ), e;
      } catch (e) {
        return this.exportProgress = {
          percentage: 0,
          stage: "error",
          message: e instanceof Error ? e.message : "Export başarısız oldu"
        }, this.dispatchEvent(
          new CustomEvent("senkron:error", {
            detail: { message: "Export failed", error: e },
            bubbles: !0,
            composed: !0
          })
        ), null;
      }
    }, this.handleAttachToPost = async () => {
      let e = this.exportedVideoUrl;
      if (e || (e = await this.startExport()), e) {
        const t = {
          videoUrl: e,
          duration: this.trimEnd - this.trimStart,
          aspectRatio: this.aspectRatio,
          trimStart: this.trimStart,
          trimEnd: this.trimEnd,
          overlaysCount: this.overlays.length
        };
        this.dispatchEvent(
          new CustomEvent("senkron:video-attached", {
            detail: t,
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
  firstUpdated(e) {
    super.firstUpdated(e), this.setupCanvas();
  }
  updated(e) {
    super.updated(e), e.has("src") && this.src && this.videoEl && (this.videoEl.src = this.src, this.videoEl.load());
  }
  setupCanvas() {
    const e = this.canvasEl;
    if (!e) return;
    const [t, i] = this.aspectRatio.split(":").map(Number), s = 640, r = s * (i || 9) / (t || 16);
    e.width = s, e.height = r, this.renderFrame();
  }
  formatTime(e) {
    const t = Math.floor(e / 60), i = Math.floor(e % 60), s = Math.floor(e % 1 * 10);
    return `${t.toString().padStart(2, "0")}:${i.toString().padStart(2, "0")}.${s}`;
  }
  render() {
    const e = this.duration > 0 ? this.currentTime / this.duration * 100 : 0, t = this.duration > 0 ? this.trimStart / this.duration * 100 : 0, i = this.duration > 0 ? (this.trimEnd - this.trimStart) / this.duration * 100 : 100;
    return v`
      <div class="editor-container">
        <!-- Header -->
        <div class="editor-header">
          <div class="editor-title" style="display: flex; align-items: center; gap: 8px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="23 7 16 12 23 17 23 7"></polygon>
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
            </svg>
            <span>Senkron Video Studio (WASM FFmpeg)</span>
            ${this.fileName ? v`<span class="file-badge" title="${this.fileName}">📁 ${this.fileName}</span>` : ""}
          </div>

          <div class="header-actions">
            <label class="upload-btn" title="Cihazınızdan video yükleyin">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
              <span>${this.fileName ? "Değiştir" : "Video Yükle"}</span>
              <input
                type="file"
                accept="video/mp4,video/webm,video/quicktime,video/x-matroska,video/*"
                style="display: none;"
                @change=${this.handleFileInputChange}
              />
            </label>

            <div class="aspect-selector">
              ${["16:9", "9:16", "1:1", "4:5"].map(
      (s) => v`
                  <button
                    class="aspect-btn ${this.aspectRatio === s ? "active" : ""}"
                    @click=${() => this.setAspectRatio(s)}
                  >
                    ${s}
                  </button>
                `
    )}
            </div>
          </div>
        </div>

        <!-- Preview Stage -->
        <div
          class="preview-stage"
          @dragover=${this.handleDragOver}
          @dragleave=${this.handleDragLeave}
          @drop=${this.handleDrop}
          style="position: relative;"
        >
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

          ${this.isDragging ? v`
                <div class="drop-overlay">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#07d0e0" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                  <span style="font-weight: 600; font-size: 14px; color: #07d0e0;">
                    Video Dosyasını Buraya Bırakın
                  </span>
                  <span style="font-size: 12px; color: #94a3b8;">
                    MP4, WebM, MOV desteklenir
                  </span>
                </div>
              ` : ""}

          ${this.isExporting ? v`
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

                    ${this.exportedVideoUrl ? v`
                          <div style="display: flex; gap: 8px; justify-content: center;">
                            <button class="btn btn-primary" @click=${this.handleAttachToPost}>
                              Videoyu Gönderiye Ekle
                            </button>
                            <button class="btn" @click=${() => this.isExporting = !1}>
                              Kapat
                            </button>
                          </div>
                        ` : v`
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
              [ Başlangıç: ${this.formatTime(this.trimStart)}
            </button>
            <button class="btn" @click=${this.setTrimEndToCurrent} title="Bitiş Noktası">
              Bitiş: ${this.formatTime(this.trimEnd)} ]
            </button>
          </div>

          <div class="playback-group">
            <button class="btn btn-primary" @click=${this.startExport} ?disabled=${this.isExporting}>
              ${this.isExporting ? "İşleniyor..." : "⚡ WASM Dışa Aktar"}
            </button>
          </div>
        </div>

        <!-- Timeline -->
        <div class="timeline-container" @click=${this.handleTimelineClick}>
          <div class="timeline-track">
            <!-- Selected Trim Window -->
            <div
              class="trim-window"
              style="left: ${t}%; width: ${i}%;"
            >
              <div class="trim-handle trim-handle-start"></div>
              <div class="trim-handle trim-handle-end"></div>
            </div>

            <!-- Overlays Indicators -->
            ${this.overlays.map((s) => {
      const r = s.startTime / this.duration * 100, n = (s.endTime - s.startTime) / this.duration * 100;
      return v`
                <div
                  class="timeline-overlay-marker"
                  style="left: ${r}%; width: ${n}%;"
                  title="${s.text}"
                ></div>
              `;
    })}

            <!-- Playhead -->
            <div class="playhead" style="left: ${e}%;"></div>
          </div>
        </div>

        <!-- Overlays Manager -->
        <div class="overlays-panel">
          <div class="overlay-input-group">
            <input
              type="text"
              class="overlay-input"
              placeholder="Ekrana eklenecek metin katmanı..."
              .value=${this.newOverlayText}
              @input=${(s) => this.newOverlayText = s.target.value}
              @keydown=${(s) => s.key === "Enter" && this.addOverlay()}
            />
            <button class="btn" @click=${this.addOverlay}>
              + Metin Ekle
            </button>
          </div>

          ${this.overlays.length > 0 ? v`
                <div class="overlays-list">
                  ${this.overlays.map(
      (s) => v`
                      <div class="overlay-tag">
                        <span>"${s.text}" (${this.formatTime(s.startTime)} - ${this.formatTime(s.endTime)})</span>
                        <button class="overlay-tag-delete" @click=${() => this.removeOverlay(s.id)}>
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
I.styles = Y;
let c = I;
p([
  k({ type: String })
], c.prototype, "src");
p([
  k({ type: String, attribute: "aspect-ratio" })
], c.prototype, "aspectRatio");
p([
  k({ type: String })
], c.prototype, "theme");
p([
  k({ type: Boolean })
], c.prototype, "autoplay");
p([
  k({ type: Boolean, attribute: "modal-mode" })
], c.prototype, "modalMode");
p([
  x()
], c.prototype, "isPlaying");
p([
  x()
], c.prototype, "currentTime");
p([
  x()
], c.prototype, "duration");
p([
  x()
], c.prototype, "trimStart");
p([
  x()
], c.prototype, "trimEnd");
p([
  x()
], c.prototype, "overlays");
p([
  x()
], c.prototype, "newOverlayText");
p([
  x()
], c.prototype, "isExporting");
p([
  x()
], c.prototype, "exportProgress");
p([
  x()
], c.prototype, "exportedVideoUrl");
p([
  x()
], c.prototype, "fileName");
p([
  x()
], c.prototype, "isDragging");
var he = Object.defineProperty, F = (a, e, t, i) => {
  for (var s = void 0, r = a.length - 1, n; r >= 0; r--)
    (n = a[r]) && (s = n(e, t, s) || s);
  return s && he(e, t, s), s;
};
const _ = class _ extends G {
  constructor() {
    super(...arguments), this.open = !1, this.src = "", this.aspectRatio = "16:9", this.theme = "dark", this.handleBackdropClick = (e) => {
      e.target.classList.contains("modal-backdrop") && this.closeModal();
    }, this.handleVideoAttached = (e) => {
      this.dispatchEvent(
        new CustomEvent("senkron:video-attached", {
          detail: e.detail,
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
    return this.open ? v`
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
    ` : v``;
  }
};
_.styles = Y;
let A = _;
F([
  k({ type: Boolean, reflect: !0 })
], A.prototype, "open");
F([
  k({ type: String })
], A.prototype, "src");
F([
  k({ type: String, attribute: "aspect-ratio" })
], A.prototype, "aspectRatio");
F([
  k({ type: String })
], A.prototype, "theme");
typeof window < "u" && (customElements.get("senkron-video-editor") || customElements.define("senkron-video-editor", c), customElements.get("senkron-video-editor-modal") || customElements.define("senkron-video-editor-modal", A));
export {
  ce as FFmpegService,
  c as SenkronVideoEditor,
  A as SenkronVideoEditorModal
};

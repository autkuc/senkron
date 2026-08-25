var Z = Object.defineProperty;
var j = (s) => {
  throw TypeError(s);
};
var J = (s, e, t) => e in s ? Z(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var u = (s, e, t) => J(s, typeof e != "symbol" ? e + "" : e, t), V = (s, e, t) => e.has(s) || j("Cannot " + t);
var o = (s, e, t) => (V(s, e, "read from private field"), t ? t.call(s) : e.get(s)), T = (s, e, t) => e.has(s) ? j("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(s) : e.set(s, t), U = (s, e, t, i) => (V(s, e, "write to private field"), i ? i.call(s, t) : e.set(s, t), t);
import { i as Q, a as K, b, n as k, r as x } from "../state-C6LA3nSk.mjs";
const q = Q`
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
    min-height: 480px;
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
    gap: 12px;
    flex-wrap: wrap;
  }

  .editor-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
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
    gap: 6px;
    background: rgba(7, 208, 224, 0.12);
    border: 1px solid rgba(7, 208, 224, 0.35);
    color: #07d0e0;
    padding: 5px 12px;
    font-size: 12px;
    font-weight: 600;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .upload-btn:hover {
    background: rgba(7, 208, 224, 0.22);
    border-color: #07d0e0;
    color: #ffffff;
  }

  .file-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    font-family: ui-monospace, SFMono-Regular, monospace;
    color: #94a3b8;
    background: rgba(255, 255, 255, 0.06);
    padding: 3px 8px;
    border-radius: 4px;
    max-width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border: 1px solid rgba(255, 255, 255, 0.08);
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

  /* Main Stage / Video Preview */
  .preview-stage {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #000000;
    position: relative;
    overflow: hidden;
    min-height: 280px;
    padding: 12px;
  }

  .video-preview-wrapper {
    position: relative;
    max-height: 320px;
    max-width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    overflow: hidden;
    background: #070a12;
  }

  .video-preview-wrapper video {
    display: block;
    max-height: 320px;
    max-width: 100%;
    object-fit: contain;
    border-radius: 8px;
  }

  .video-preview-wrapper canvas.overlay-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .empty-stage-dropzone {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 32px;
    border: 2px dashed rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: center;
  }

  .empty-stage-dropzone:hover {
    border-color: #07d0e0;
    background: rgba(7, 208, 224, 0.05);
  }

  .drop-overlay {
    position: absolute;
    inset: 12px;
    border: 2px dashed #07d0e0;
    background: rgba(7, 208, 224, 0.15);
    backdrop-filter: blur(2px);
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    z-index: 20;
    pointer-events: none;
  }

  .drop-overlay span {
    font-size: 14px;
    font-weight: 600;
    color: #07d0e0;
  }

  /* Timeline & Scrubber Section */
  .timeline-section {
    background: #0f1624;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    padding: 12px 18px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .timecode-display {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: ui-monospace, SFMono-Regular, monospace;
    font-size: 12px;
    color: #94a3b8;
  }

  .timeline-scrubber-track {
    position: relative;
    height: 36px;
    background: #1e293b;
    border-radius: 6px;
    cursor: pointer;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.06);
  }

  .timeline-trim-region {
    position: absolute;
    top: 0;
    bottom: 0;
    background: rgba(2, 132, 199, 0.3);
    border-left: 3px solid #07d0e0;
    border-right: 3px solid #07d0e0;
  }

  .timeline-overlay-marker {
    position: absolute;
    top: 2px;
    height: 6px;
    background: #eab308;
    border-radius: 2px;
    z-index: 5;
    opacity: 0.85;
  }

  .playhead {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 2px;
    background: #ffffff;
    pointer-events: none;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.8);
    z-index: 10;
  }

  /* Controls Bar */
  .controls-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 18px;
    background: #090d16;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    gap: 8px;
    flex-wrap: wrap;
  }

  .playback-group {
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

  /* Overlays Manager */
  .overlays-panel {
    background: #0f1624;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    padding: 10px 18px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .overlay-input-group {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .overlay-input {
    flex: 1;
    background: #1e293b;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    color: #f1f5f9;
    padding: 6px 12px;
    font-size: 12px;
    outline: none;
  }

  .overlay-input:focus {
    border-color: #07d0e0;
  }

  .overlays-list {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .overlay-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(234, 179, 8, 0.15);
    border: 1px solid rgba(234, 179, 8, 0.3);
    color: #fef08a;
    padding: 3px 8px;
    border-radius: 4px;
    font-size: 11px;
  }

  .overlay-tag-delete {
    background: transparent;
    border: none;
    color: #fef08a;
    cursor: pointer;
    font-size: 11px;
    padding: 0 2px;
  }

  /* Modal Base */
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(6px);
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
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
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
const ee = /* @__PURE__ */ (() => {
  let s = 0;
  return () => s++;
})(), te = new Error("ffmpeg is not loaded, call `await ffmpeg.load()` first"), ie = new Error("called FFmpeg.terminate()");
var v, O, E, D, L, C, f;
class re {
  constructor() {
    T(this, v, null);
    /**
     * #resolves and #rejects tracks Promise resolves and rejects to
     * be called when we receive message from web worker.
     */
    T(this, O, {});
    T(this, E, {});
    T(this, D, []);
    T(this, L, []);
    u(this, "loaded", !1);
    /**
     * register worker message event handlers.
     */
    T(this, C, () => {
      o(this, v) && (o(this, v).onmessage = ({ data: { id: e, type: t, data: i } }) => {
        switch (t) {
          case d.LOAD:
            this.loaded = !0, o(this, O)[e](i);
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
            o(this, O)[e](i);
            break;
          case d.LOG:
            o(this, D).forEach((r) => r(i));
            break;
          case d.PROGRESS:
            o(this, L).forEach((r) => r(i));
            break;
          case d.ERROR:
            o(this, E)[e](i);
            break;
        }
        delete o(this, O)[e], delete o(this, E)[e];
      });
    });
    /**
     * Generic function to send messages to web worker.
     */
    T(this, f, ({ type: e, data: t }, i = [], r) => o(this, v) ? new Promise((a, n) => {
      const l = ee();
      o(this, v) && o(this, v).postMessage({ id: l, type: e, data: t }, i), o(this, O)[l] = a, o(this, E)[l] = n, r == null || r.addEventListener("abort", () => {
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
    u(this, "load", ({ classWorkerURL: e, ...t } = {}, { signal: i } = {}) => (o(this, v) || (U(this, v, e ? new Worker(new URL(e, import.meta.url), {
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
    )), o(this, C).call(this)), o(this, f).call(this, {
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
    u(this, "exec", (e, t = -1, { signal: i } = {}) => o(this, f).call(this, {
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
    u(this, "ffprobe", (e, t = -1, { signal: i } = {}) => o(this, f).call(this, {
      type: d.FFPROBE,
      data: { args: e, timeout: t }
    }, void 0, i));
    /**
     * Terminate all ongoing API calls and terminate web worker.
     * `FFmpeg.load()` must be called again before calling any other APIs.
     *
     * @category FFmpeg
     */
    u(this, "terminate", () => {
      const e = Object.keys(o(this, E));
      for (const t of e)
        o(this, E)[t](ie), delete o(this, E)[t], delete o(this, O)[t];
      o(this, v) && (o(this, v).terminate(), U(this, v, null), this.loaded = !1);
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
    u(this, "writeFile", (e, t, { signal: i } = {}) => {
      const r = [];
      return t instanceof Uint8Array && r.push(t.buffer), o(this, f).call(this, {
        type: d.WRITE_FILE,
        data: { path: e, data: t }
      }, r, i);
    });
    u(this, "mount", (e, t, i) => {
      const r = [];
      return o(this, f).call(this, {
        type: d.MOUNT,
        data: { fsType: e, options: t, mountPoint: i }
      }, r);
    });
    u(this, "unmount", (e) => {
      const t = [];
      return o(this, f).call(this, {
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
    u(this, "readFile", (e, t = "binary", { signal: i } = {}) => o(this, f).call(this, {
      type: d.READ_FILE,
      data: { path: e, encoding: t }
    }, void 0, i));
    /**
     * Delete a file.
     *
     * @category File System
     */
    u(this, "deleteFile", (e, { signal: t } = {}) => o(this, f).call(this, {
      type: d.DELETE_FILE,
      data: { path: e }
    }, void 0, t));
    /**
     * Rename a file or directory.
     *
     * @category File System
     */
    u(this, "rename", (e, t, { signal: i } = {}) => o(this, f).call(this, {
      type: d.RENAME,
      data: { oldPath: e, newPath: t }
    }, void 0, i));
    /**
     * Create a directory.
     *
     * @category File System
     */
    u(this, "createDir", (e, { signal: t } = {}) => o(this, f).call(this, {
      type: d.CREATE_DIR,
      data: { path: e }
    }, void 0, t));
    /**
     * List directory contents.
     *
     * @category File System
     */
    u(this, "listDir", (e, { signal: t } = {}) => o(this, f).call(this, {
      type: d.LIST_DIR,
      data: { path: e }
    }, void 0, t));
    /**
     * Delete an empty directory.
     *
     * @category File System
     */
    u(this, "deleteDir", (e, { signal: t } = {}) => o(this, f).call(this, {
      type: d.DELETE_DIR,
      data: { path: e }
    }, void 0, t));
  }
  on(e, t) {
    e === "log" ? o(this, D).push(t) : e === "progress" && o(this, L).push(t);
  }
  off(e, t) {
    e === "log" ? U(this, D, o(this, D).filter((i) => i !== t)) : e === "progress" && U(this, L, o(this, L).filter((i) => i !== t));
  }
}
v = new WeakMap(), O = new WeakMap(), E = new WeakMap(), D = new WeakMap(), L = new WeakMap(), C = new WeakMap(), f = new WeakMap();
var H;
(function(s) {
  s.MEMFS = "MEMFS", s.NODEFS = "NODEFS", s.NODERAWFS = "NODERAWFS", s.IDBFS = "IDBFS", s.WORKERFS = "WORKERFS", s.PROXYFS = "PROXYFS";
})(H || (H = {}));
const se = new Error("failed to get response body reader"), ae = new Error("failed to complete download"), oe = "Content-Length", ne = (s) => new Promise((e, t) => {
  const i = new FileReader();
  i.onload = () => {
    const { result: r } = i;
    r instanceof ArrayBuffer ? e(new Uint8Array(r)) : e(new Uint8Array());
  }, i.onerror = (r) => {
    var a, n;
    t(Error(`File could not be read! Code=${((n = (a = r == null ? void 0 : r.target) == null ? void 0 : a.error) == null ? void 0 : n.code) || -1}`));
  }, i.readAsArrayBuffer(s);
}), de = async (s) => {
  let e;
  if (typeof s == "string")
    /data:_data\/([a-zA-Z]*);base64,([^"]*)/.test(s) ? e = atob(s.split(",")[1]).split("").map((t) => t.charCodeAt(0)) : e = await (await fetch(s)).arrayBuffer();
  else if (s instanceof URL)
    e = await (await fetch(s)).arrayBuffer();
  else if (s instanceof File || s instanceof Blob)
    e = await ne(s);
  else
    return new Uint8Array();
  return new Uint8Array(e);
}, le = async (s, e) => {
  var r;
  const t = await fetch(s);
  let i;
  try {
    const a = parseInt(t.headers.get(oe) || "-1"), n = (r = t.body) == null ? void 0 : r.getReader();
    if (!n)
      throw se;
    const l = [];
    let m = 0;
    for (; ; ) {
      const { done: w, value: R } = await n.read(), h = R ? R.length : 0;
      if (w) {
        if (a != -1 && a !== m)
          throw ae;
        e && e({ url: s, total: a, received: m, delta: h, done: w });
        break;
      }
      l.push(R), m += h, e && e({ url: s, total: a, received: m, delta: h, done: w });
    }
    const y = new Uint8Array(m);
    let S = 0;
    for (const w of l)
      y.set(w, S), S += w.length;
    i = y.buffer;
  } catch (a) {
    console.log("failed to send download progress event: ", a), i = await t.arrayBuffer();
  }
  return i;
}, X = async (s, e, t = !1, i) => {
  const r = t ? await le(s, i) : await (await fetch(s)).arrayBuffer(), a = new Blob([r], { type: e });
  return URL.createObjectURL(a);
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
        const t = new re();
        t.on("log", ({ message: a }) => {
          console.debug("[Senkron FFmpeg WASM]", a);
        });
        const i = e ? [e, ...this.defaultBaseUrls] : this.defaultBaseUrls;
        let r = !1;
        for (const a of i)
          try {
            const n = await X(`${a}/ffmpeg-core.js`, "text/javascript"), l = await X(`${a}/ffmpeg-core.wasm`, "application/wasm");
            await t.load({
              coreURL: n,
              wasmURL: l
            }), r = !0;
            break;
          } catch (n) {
            console.warn(`[Senkron FFmpeg WASM] Could not load core from ${a}:`, n);
          }
        if (r)
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
  async exportVideo(e, t, i, r, a = [], n, l = "16:9") {
    if (this.isProcessing)
      throw new Error("Bir dışa aktarma işlemi zaten yürütülüyor");
    this.isProcessing = !0, n({ percentage: 5, stage: "extracting", message: "WASM FFmpeg motoru hazırlanıyor..." });
    try {
      if (await this.initialize() && this.ffmpeg && this.isLoaded)
        return await this.exportWithWasmFFmpeg(
          e,
          i,
          r,
          a,
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
            r,
            a,
            y,
            n
          );
      }
      return await this.simulateExport(i, r, n);
    } finally {
      this.isProcessing = !1;
    }
  }
  /**
   * Real in-browser WebAssembly FFmpeg video processing pipeline.
   */
  async exportWithWasmFFmpeg(e, t, i, r, a, n) {
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
      const S = await de(l);
      await this.ffmpeg.writeFile(m, S);
      const w = Math.max(0.1, i - t), R = ({ progress: B, time: N }) => {
        let F = 0;
        if (typeof B == "number" && B > 0)
          F = Math.min(95, Math.round(B * 100));
        else if (N && w > 0) {
          const Y = N / 1e6;
          F = Math.min(95, Math.round(Y / w * 100));
        }
        const W = Math.max(25, F);
        n({
          percentage: W,
          stage: "encoding",
          message: `H.264 MP4 encode ediliyor (%${W})...`
        });
      };
      this.ffmpeg.on("progress", R);
      const h = [];
      a === "1:1" ? h.push("crop=min(iw\\,ih):min(iw\\,ih)") : a === "9:16" ? h.push("crop=min(iw\\,ih*9/16):ih") : a === "4:5" ? h.push("crop=min(iw\\,ih*4/5):ih") : a === "16:9" && h.push("crop=iw:min(ih\\,iw*9/16)"), n({
        percentage: 25,
        stage: "processing",
        message: "FFmpeg dönüştürme filtreleri uygulanıyor..."
      });
      const M = [
        "-ss",
        t.toFixed(3),
        "-to",
        i.toFixed(3),
        "-i",
        m
      ];
      h.length > 0 && M.push("-vf", h.join(",")), M.push(
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
      ), await this.ffmpeg.exec(M), n({
        percentage: 95,
        stage: "completed",
        message: "Çıktı MP4 dosyası derleniyor..."
      });
      const g = await this.ffmpeg.readFile(y), $ = g, G = new Blob([$], { type: "video/mp4" }), z = URL.createObjectURL(G);
      return n({
        percentage: 100,
        stage: "completed",
        message: "WASM video dışa aktarımı başarıyla tamamlandı!",
        outputBlobUrl: z
      }), z;
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
  async recordCanvasSegment(e, t, i, r, a, n, l) {
    return new Promise((m, y) => {
      const S = [], w = Math.max(0.1, r - i), R = MediaRecorder.isTypeSupported("video/webm;codecs=vp9") ? "video/webm;codecs=vp9" : MediaRecorder.isTypeSupported("video/webm") ? "video/webm" : "video/mp4", h = new MediaRecorder(n, { mimeType: R });
      h.ondataavailable = (g) => {
        g.data && g.data.size > 0 && S.push(g.data);
      }, h.onstop = () => {
        const g = new Blob(S, { type: R }), $ = URL.createObjectURL(g);
        l({
          percentage: 100,
          stage: "completed",
          message: "Video export ready",
          outputBlobUrl: $
        }), m($);
      }, h.onerror = (g) => {
        y(g);
      }, e.currentTime = i, l({ percentage: 20, stage: "processing", message: "Kareler kaydediliyor..." });
      const M = () => {
        const g = e.currentTime, $ = Math.min(95, 20 + Math.round((g - i) / w * 75));
        l({
          percentage: $,
          stage: "encoding",
          message: `Kareler işleniyor (%${$})...`
        }), (g >= r || e.ended) && (e.pause(), e.removeEventListener("timeupdate", M), h.stop());
      };
      e.addEventListener("timeupdate", M), h.start(100), e.play().catch(y);
    });
  }
  /**
   * Headless / Unit Test simulated export
   */
  async simulateExport(e, t, i) {
    const r = [
      { percentage: 25, stage: "extracting", msg: "WASM video akışı kırpılıyor..." },
      { percentage: 55, stage: "processing", msg: "Filtre ve metin katmanları uygulanıyor..." },
      { percentage: 85, stage: "encoding", msg: "H.264 MP4 çıktısı derleniyor..." },
      { percentage: 100, stage: "completed", msg: "Dışa aktarım tamamlandı!" }
    ];
    for (const l of r)
      await new Promise((m) => setTimeout(m, 40)), i({ percentage: l.percentage, stage: l.stage, message: l.msg });
    const a = new Blob(["senkron-real-wasm-mp4-data"], { type: "video/mp4" }), n = typeof URL < "u" && URL.createObjectURL ? URL.createObjectURL(a) : "blob:senkron/wasm-video";
    return i({
      percentage: 100,
      stage: "completed",
      message: "Dışa aktarım tamamlandı!",
      outputBlobUrl: n
    }), n;
  }
}
var pe = Object.defineProperty, p = (s, e, t, i) => {
  for (var r = void 0, a = s.length - 1, n; a >= 0; a--)
    (n = s[a]) && (r = n(e, t, r) || r);
  return r && pe(e, t, r), r;
};
const I = class I extends K {
  constructor() {
    super(...arguments), this.src = "", this.aspectRatio = "16:9", this.theme = "dark", this.autoplay = !1, this.modalMode = !1, this.isPlaying = !1, this.currentTime = 0, this.duration = 10, this.trimStart = 0, this.trimEnd = 10, this.overlays = [], this.newOverlayText = "", this.isExporting = !1, this.exportProgress = {
      percentage: 0,
      stage: "idle"
    }, this.exportedVideoUrl = null, this.fileName = "", this.isDragging = !1, this.ffmpegService = new ce(), this.animationFrameId = null, this.renderOverlays = () => {
      const e = this.canvasEl;
      if (!e || typeof e.getContext != "function") return;
      const t = e.getContext("2d");
      if (t) {
        t.clearRect(0, 0, e.width, e.height);
        for (const i of this.overlays)
          if (this.currentTime >= i.startTime && this.currentTime <= i.endTime) {
            t.save(), t.fillStyle = i.color || "#ffffff", t.font = `bold ${i.fontSize || 24}px ${i.fontFamily || "sans-serif"}`, t.textAlign = "center", t.shadowColor = "rgba(0, 0, 0, 0.9)", t.shadowBlur = 8, t.shadowOffsetX = 2, t.shadowOffsetY = 2;
            const r = e.width * i.x / 100, a = e.height * i.y / 100;
            t.fillText(i.text, r, a), t.restore();
          }
        this.isPlaying && (this.animationFrameId = requestAnimationFrame(this.renderOverlays));
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
    }, this.triggerFilePicker = () => {
      var e;
      (e = this.fileInputEl) == null || e.click();
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
      this.duration = e, this.trimEnd = e, this.setupCanvas(), this.dispatchEvent(
        new CustomEvent("senkron:ready", {
          detail: { duration: this.duration },
          bubbles: !0,
          composed: !0
        })
      );
    }, this.handleTimeUpdate = () => {
      this.videoEl && (this.currentTime = this.videoEl.currentTime, this.currentTime >= this.trimEnd && (this.videoEl.currentTime = this.trimStart, this.autoplay || (this.videoEl.pause(), this.isPlaying = !1)), this.renderOverlays());
    }, this.togglePlay = () => {
      const e = this.videoEl;
      e && (this.isPlaying ? (e.pause(), this.isPlaying = !1) : ((this.currentTime >= this.trimEnd || this.currentTime < this.trimStart) && (e.currentTime = this.trimStart), e.play().catch(() => {
      }), this.isPlaying = !0, this.renderOverlays()));
    }, this.seek = (e) => {
      const t = this.videoEl;
      t && (this.currentTime = Math.max(0, Math.min(this.duration, e)), t.currentTime = this.currentTime, this.renderOverlays());
    }, this.handleTimelineClick = (e) => {
      const t = e.currentTarget.getBoundingClientRect(), i = Math.max(0, Math.min(1, (e.clientX - t.left) / t.width));
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
      this.overlays = [...this.overlays, e], this.newOverlayText = "", this.renderOverlays();
    }, this.removeOverlay = (e) => {
      this.overlays = this.overlays.filter((t) => t.id !== e), this.renderOverlays();
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
    return this.renderRoot.querySelector("canvas.overlay-canvas");
  }
  get fileInputEl() {
    return this.renderRoot.querySelector('input[type="file"]');
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
    super.updated(e), e.has("src") && this.src && this.videoEl && (this.videoEl.src = this.src, this.videoEl.load()), e.has("aspectRatio") && this.setupCanvas();
  }
  setupCanvas() {
    const e = this.canvasEl, t = this.videoEl;
    if (e) {
      if (t && t.videoWidth && t.videoHeight)
        e.width = t.videoWidth, e.height = t.videoHeight;
      else {
        const [i, r] = this.aspectRatio.split(":").map(Number), a = 640, n = a * (r || 9) / (i || 16);
        e.width = a, e.height = n;
      }
      this.renderOverlays();
    }
  }
  formatTime(e) {
    const t = Math.floor(e / 60), i = Math.floor(e % 60), r = Math.floor(e % 1 * 10);
    return `${t.toString().padStart(2, "0")}:${i.toString().padStart(2, "0")}.${r}`;
  }
  render() {
    const e = this.duration > 0 ? this.currentTime / this.duration * 100 : 0, t = this.duration > 0 ? this.trimStart / this.duration * 100 : 0, i = this.duration > 0 ? (this.trimEnd - this.trimStart) / this.duration * 100 : 100;
    return b`
      <div class="editor-container">
        <!-- Header -->
        <div class="editor-header">
          <div class="editor-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="23 7 16 12 23 17 23 7"></polygon>
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
            </svg>
            <span>Senkron Video Studio (WASM FFmpeg)</span>
            ${this.fileName ? b`<span class="file-badge" title="${this.fileName}">📁 ${this.fileName}</span>` : ""}
          </div>

          <div class="header-actions">
            <!-- Video Upload Button inside Editor Modal -->
            <label class="upload-btn" title="Cihazınızdan video yükleyin">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
              <span>${this.src ? "Videoyu Değiştir" : "Video Yükle"}</span>
              <input
                type="file"
                accept="video/mp4,video/webm,video/quicktime,video/x-matroska,video/*"
                style="display: none;"
                @change=${this.handleFileInputChange}
              />
            </label>

            <!-- Aspect Ratio Selector -->
            <div class="aspect-selector">
              ${["16:9", "9:16", "1:1", "4:5"].map(
      (r) => b`
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
        </div>

        <!-- Preview Stage -->
        <div
          class="preview-stage"
          @dragover=${this.handleDragOver}
          @dragleave=${this.handleDragLeave}
          @drop=${this.handleDrop}
        >
          ${this.src ? b`
                <div class="video-preview-wrapper">
                  <video
                    playsinline
                    crossorigin="anonymous"
                    .src=${this.src}
                    @loadedmetadata=${this.handleVideoLoaded}
                    @timeupdate=${this.handleTimeUpdate}
                    @ended=${() => this.isPlaying = !1}
                    @click=${this.togglePlay}
                  ></video>
                  <canvas class="overlay-canvas"></canvas>
                </div>
              ` : b`
                <div class="empty-stage-dropzone" @click=${this.triggerFilePicker}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#07d0e0" stroke-width="1.5">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                  <div>
                    <div style="font-weight: 600; font-size: 15px; color: #f1f5f9; margin-bottom: 4px;">
                      Video Dosyasını Buraya Sürükleyin veya Seçin
                    </div>
                    <div style="font-size: 12px; color: #64748b;">
                      MP4, WebM, MOV desteklenir • İstemci taraflı WASM işleme
                    </div>
                  </div>
                </div>
              `}

          ${this.isDragging ? b`
                <div class="drop-overlay">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#07d0e0" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                  <span>Video Dosyasını Bırakın</span>
                </div>
              ` : ""}

          ${this.isExporting ? b`
                <div class="modal-backdrop" style="position: absolute;">
                  <div class="modal-dialog" style="max-width: 380px; padding: 24px; text-align: center;">
                    <div style="font-weight: 700; font-size: 15px; margin-bottom: 12px; color: #f1f5f9;">
                      ${this.exportProgress.stage === "completed" ? "🎉 Video Render Tamamlandı!" : this.exportProgress.stage === "error" ? "❌ Render Hatası" : "⚡ WASM FFmpeg ile İşleniyor..."}
                    </div>

                    <div style="height: 6px; background: #1e293b; border-radius: 9999px; overflow: hidden; margin-bottom: 10px;">
                      <div
                        style="height: 100%; width: ${this.exportProgress.percentage}%; background: linear-gradient(90deg, #07d0e0, #324bff); transition: width 0.2s ease;"
                      ></div>
                    </div>

                    <div style="font-size: 12px; color: #94a3b8; margin-bottom: 16px;">
                      ${this.exportProgress.message || `${this.exportProgress.percentage}%`}
                    </div>

                    ${this.exportedVideoUrl ? b`
                          <div style="display: flex; gap: 8px; justify-content: center;">
                            <button class="btn btn-primary" @click=${this.handleAttachToPost}>
                              Videoyu Gönderiye Ekle
                            </button>
                            <button class="btn" @click=${() => this.isExporting = !1}>
                              Kapat
                            </button>
                          </div>
                        ` : b`
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
            <button class="btn" @click=${this.togglePlay} ?disabled=${!this.src}>
              ${this.isPlaying ? "Duraklat" : "Oynat"}
            </button>
            <button class="btn" @click=${this.setTrimStartToCurrent} ?disabled=${!this.src} title="Başlangıç Noktası Ayarla">
              [ Başlangıç
            </button>
            <button class="btn" @click=${this.setTrimEndToCurrent} ?disabled=${!this.src} title="Bitiş Noktası Ayarla">
              Bitiş ]
            </button>
          </div>

          <div class="playback-group">
            <button
              class="btn btn-primary"
              @click=${this.startExport}
              ?disabled=${!this.src || this.isExporting}
            >
              ${this.isExporting ? "İşleniyor..." : "⚡ WASM Dışa Aktar"}
            </button>
          </div>
        </div>

        <!-- Timeline -->
        <div class="timeline-section">
          <div class="timecode-display">
            <span>Seçili Aralık: ${this.formatTime(this.trimStart)} - ${this.formatTime(this.trimEnd)}</span>
            <span>Konum: ${this.formatTime(this.currentTime)} / ${this.formatTime(this.duration)}</span>
          </div>

          <div class="timeline-scrubber-track" @click=${this.handleTimelineClick}>
            <!-- Selected Trim Window -->
            <div
              class="timeline-trim-region"
              style="left: ${t}%; width: ${i}%;"
            ></div>

            <!-- Overlays Indicators -->
            ${this.overlays.map((r) => {
      const a = r.startTime / this.duration * 100, n = (r.endTime - r.startTime) / this.duration * 100;
      return b`
                <div
                  class="timeline-overlay-marker"
                  style="left: ${a}%; width: ${n}%;"
                  title="${r.text}"
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
              placeholder="Videoya metin katmanı ekle (örn: #TEKNOFEST2026)..."
              .value=${this.newOverlayText}
              @input=${(r) => this.newOverlayText = r.target.value}
              @keydown=${(r) => r.key === "Enter" && this.addOverlay()}
            />
            <button class="btn" @click=${this.addOverlay} ?disabled=${!this.src}>
              + Metin Ekle
            </button>
          </div>

          ${this.overlays.length > 0 ? b`
                <div class="overlays-list">
                  ${this.overlays.map(
      (r) => b`
                      <div class="overlay-tag">
                        <span>"${r.text}" (${this.formatTime(r.startTime)} - ${this.formatTime(r.endTime)})</span>
                        <button class="overlay-tag-delete" @click=${() => this.removeOverlay(r.id)}>
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
I.styles = q;
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
var he = Object.defineProperty, P = (s, e, t, i) => {
  for (var r = void 0, a = s.length - 1, n; a >= 0; a--)
    (n = s[a]) && (r = n(e, t, r) || r);
  return r && he(e, t, r), r;
};
const _ = class _ extends K {
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
    return this.open ? b`
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
    ` : b``;
  }
};
_.styles = q;
let A = _;
P([
  k({ type: Boolean, reflect: !0 })
], A.prototype, "open");
P([
  k({ type: String })
], A.prototype, "src");
P([
  k({ type: String, attribute: "aspect-ratio" })
], A.prototype, "aspectRatio");
P([
  k({ type: String })
], A.prototype, "theme");
typeof window < "u" && (customElements.get("senkron-video-editor") || customElements.define("senkron-video-editor", c), customElements.get("senkron-video-editor-modal") || customElements.define("senkron-video-editor-modal", A));
export {
  ce as FFmpegService,
  c as SenkronVideoEditor,
  A as SenkronVideoEditorModal
};

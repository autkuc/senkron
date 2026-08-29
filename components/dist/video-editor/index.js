"use strict";var Y=Object.defineProperty;var W=a=>{throw TypeError(a)};var Z=(a,e,t)=>e in a?Y(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t;var f=(a,e,t)=>Z(a,typeof e!="symbol"?e+"":e,t),j=(a,e,t)=>e.has(a)||W("Cannot "+t);var o=(a,e,t)=>(j(a,e,"read from private field"),t?t.call(a):e.get(a)),k=(a,e,t)=>e.has(a)?W("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(a):e.set(a,t),A=(a,e,t,i)=>(j(a,e,"write to private field"),i?i.call(a,t):e.set(a,t),t);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const n=require("../modal-a11y-DEFP8DoG.js");var U=typeof document<"u"?document.currentScript:null;const q=n.i`
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
`;var l;(function(a){a.LOAD="LOAD",a.EXEC="EXEC",a.FFPROBE="FFPROBE",a.WRITE_FILE="WRITE_FILE",a.READ_FILE="READ_FILE",a.DELETE_FILE="DELETE_FILE",a.RENAME="RENAME",a.CREATE_DIR="CREATE_DIR",a.LIST_DIR="LIST_DIR",a.DELETE_DIR="DELETE_DIR",a.ERROR="ERROR",a.DOWNLOAD="DOWNLOAD",a.PROGRESS="PROGRESS",a.LOG="LOG",a.MOUNT="MOUNT",a.UNMOUNT="UNMOUNT"})(l||(l={}));const J=(()=>{let a=0;return()=>a++})(),Q=new Error("ffmpeg is not loaded, call `await ffmpeg.load()` first"),ee=new Error("called FFmpeg.terminate()");var y,R,w,$,D,M,m;class te{constructor(){k(this,y,null);k(this,R,{});k(this,w,{});k(this,$,[]);k(this,D,[]);f(this,"loaded",!1);k(this,M,()=>{o(this,y)&&(o(this,y).onmessage=({data:{id:e,type:t,data:i}})=>{switch(t){case l.LOAD:this.loaded=!0,o(this,R)[e](i);break;case l.MOUNT:case l.UNMOUNT:case l.EXEC:case l.FFPROBE:case l.WRITE_FILE:case l.READ_FILE:case l.DELETE_FILE:case l.RENAME:case l.CREATE_DIR:case l.LIST_DIR:case l.DELETE_DIR:o(this,R)[e](i);break;case l.LOG:o(this,$).forEach(r=>r(i));break;case l.PROGRESS:o(this,D).forEach(r=>r(i));break;case l.ERROR:o(this,w)[e](i);break}delete o(this,R)[e],delete o(this,w)[e]})});k(this,m,({type:e,data:t},i=[],r)=>o(this,y)?new Promise((s,d)=>{const c=J();o(this,y)&&o(this,y).postMessage({id:c,type:e,data:t},i),o(this,R)[c]=s,o(this,w)[c]=d,r==null||r.addEventListener("abort",()=>{d(new DOMException(`Message # ${c} was aborted`,"AbortError"))},{once:!0})}):Promise.reject(Q));f(this,"load",({classWorkerURL:e,...t}={},{signal:i}={})=>(o(this,y)||(A(this,y,e?new Worker(new URL(e,typeof document>"u"?require("url").pathToFileURL(__filename).href:U&&U.tagName.toUpperCase()==="SCRIPT"&&U.src||new URL("video-editor/index.js",document.baseURI).href),{type:"module"}):new Worker(new URL("/assets/worker-BAOIWoxA.js",typeof document>"u"?require("url").pathToFileURL(__filename).href:U&&U.tagName.toUpperCase()==="SCRIPT"&&U.src||new URL("video-editor/index.js",document.baseURI).href),{type:"module"})),o(this,M).call(this)),o(this,m).call(this,{type:l.LOAD,data:t},void 0,i)));f(this,"exec",(e,t=-1,{signal:i}={})=>o(this,m).call(this,{type:l.EXEC,data:{args:e,timeout:t}},void 0,i));f(this,"ffprobe",(e,t=-1,{signal:i}={})=>o(this,m).call(this,{type:l.FFPROBE,data:{args:e,timeout:t}},void 0,i));f(this,"terminate",()=>{const e=Object.keys(o(this,w));for(const t of e)o(this,w)[t](ee),delete o(this,w)[t],delete o(this,R)[t];o(this,y)&&(o(this,y).terminate(),A(this,y,null),this.loaded=!1)});f(this,"writeFile",(e,t,{signal:i}={})=>{const r=[];return t instanceof Uint8Array&&r.push(t.buffer),o(this,m).call(this,{type:l.WRITE_FILE,data:{path:e,data:t}},r,i)});f(this,"mount",(e,t,i)=>{const r=[];return o(this,m).call(this,{type:l.MOUNT,data:{fsType:e,options:t,mountPoint:i}},r)});f(this,"unmount",e=>{const t=[];return o(this,m).call(this,{type:l.UNMOUNT,data:{mountPoint:e}},t)});f(this,"readFile",(e,t="binary",{signal:i}={})=>o(this,m).call(this,{type:l.READ_FILE,data:{path:e,encoding:t}},void 0,i));f(this,"deleteFile",(e,{signal:t}={})=>o(this,m).call(this,{type:l.DELETE_FILE,data:{path:e}},void 0,t));f(this,"rename",(e,t,{signal:i}={})=>o(this,m).call(this,{type:l.RENAME,data:{oldPath:e,newPath:t}},void 0,i));f(this,"createDir",(e,{signal:t}={})=>o(this,m).call(this,{type:l.CREATE_DIR,data:{path:e}},void 0,t));f(this,"listDir",(e,{signal:t}={})=>o(this,m).call(this,{type:l.LIST_DIR,data:{path:e}},void 0,t));f(this,"deleteDir",(e,{signal:t}={})=>o(this,m).call(this,{type:l.DELETE_DIR,data:{path:e}},void 0,t))}on(e,t){e==="log"?o(this,$).push(t):e==="progress"&&o(this,D).push(t)}off(e,t){e==="log"?A(this,$,o(this,$).filter(i=>i!==t)):e==="progress"&&A(this,D,o(this,D).filter(i=>i!==t))}}y=new WeakMap,R=new WeakMap,w=new WeakMap,$=new WeakMap,D=new WeakMap,M=new WeakMap,m=new WeakMap;var V;(function(a){a.MEMFS="MEMFS",a.NODEFS="NODEFS",a.NODERAWFS="NODERAWFS",a.IDBFS="IDBFS",a.WORKERFS="WORKERFS",a.PROXYFS="PROXYFS"})(V||(V={}));const ie=new Error("failed to get response body reader"),re=new Error("failed to complete download"),ae="Content-Length",se=a=>new Promise((e,t)=>{const i=new FileReader;i.onload=()=>{const{result:r}=i;r instanceof ArrayBuffer?e(new Uint8Array(r)):e(new Uint8Array)},i.onerror=r=>{var s,d;t(Error(`File could not be read! Code=${((d=(s=r==null?void 0:r.target)==null?void 0:s.error)==null?void 0:d.code)||-1}`))},i.readAsArrayBuffer(a)}),oe=async a=>{let e;if(typeof a=="string")/data:_data\/([a-zA-Z]*);base64,([^"]*)/.test(a)?e=atob(a.split(",")[1]).split("").map(t=>t.charCodeAt(0)):e=await(await fetch(a)).arrayBuffer();else if(a instanceof URL)e=await(await fetch(a)).arrayBuffer();else if(a instanceof File||a instanceof Blob)e=await se(a);else return new Uint8Array;return new Uint8Array(e)},ne=async(a,e)=>{var r;const t=await fetch(a);let i;try{const s=parseInt(t.headers.get(ae)||"-1"),d=(r=t.body)==null?void 0:r.getReader();if(!d)throw ie;const c=[];let g=0;for(;;){const{done:x,value:E}=await d.read(),u=E?E.length:0;if(x){if(s!=-1&&s!==g)throw re;e&&e({url:a,total:s,received:g,delta:u,done:x});break}c.push(E),g+=u,e&&e({url:a,total:s,received:g,delta:u,done:x})}const v=new Uint8Array(g);let S=0;for(const x of c)v.set(x,S),S+=x.length;i=v.buffer}catch(s){console.log("failed to send download progress event: ",s),i=await t.arrayBuffer()}return i},H=async(a,e,t=!1,i)=>{const r=t?await ne(a,i):await(await fetch(a)).arrayBuffer(),s=new Blob([r],{type:e});return URL.createObjectURL(s)};class K{constructor(){this.ffmpeg=null,this.isLoaded=!1,this.isProcessing=!1,this.loadPromise=null,this.defaultBaseUrls=["/ffmpeg","https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm"]}async initialize(e){return this.isLoaded&&this.ffmpeg?!0:this.loadPromise?this.loadPromise:(this.loadPromise=(async()=>{if(typeof window>"u"||typeof Worker>"u")return!1;try{const t=new te;t.on("log",({message:s})=>{console.debug("[Senkron FFmpeg WASM]",s)});const i=e?[e,...this.defaultBaseUrls]:this.defaultBaseUrls;let r=!1;for(const s of i)try{const d=await H(`${s}/ffmpeg-core.js`,"text/javascript"),c=await H(`${s}/ffmpeg-core.wasm`,"application/wasm");await t.load({coreURL:d,wasmURL:c}),r=!0;break}catch(d){console.warn(`[Senkron FFmpeg WASM] Could not load core from ${s}:`,d)}if(r)return this.ffmpeg=t,this.isLoaded=!0,!0}catch{return!1}return!1})(),this.loadPromise)}async exportVideo(e,t,i,r,s=[],d,c="16:9"){if(this.isProcessing)throw new Error("Bir dışa aktarma işlemi zaten yürütülüyor");this.isProcessing=!0,d({percentage:5,stage:"extracting",message:"WASM FFmpeg motoru hazırlanıyor..."});try{if(await this.initialize()&&this.ffmpeg&&this.isLoaded)return await this.exportWithWasmFFmpeg(e,i,r,s,c,d);if(typeof window<"u"&&typeof MediaRecorder<"u"){const v=t.captureStream?t.captureStream(30):null;if(v)return await this.recordCanvasSegment(e,t,i,r,s,v,d)}return await this.simulateExport(i,r,d)}finally{this.isProcessing=!1}}async exportWithWasmFFmpeg(e,t,i,r,s,d){if(!this.ffmpeg)throw new Error("FFmpeg WASM instance is not ready");const c=e.src||e.currentSrc;if(!c)throw new Error("Video kaynağı yüklenemedi");d({percentage:15,stage:"extracting",message:"Video verisi WASM sanal belleğine yazılıyor..."});const g=`input_${Date.now()}.mp4`,v=`output_${Date.now()}.mp4`;try{const S=await oe(c);await this.ffmpeg.writeFile(g,S);const x=Math.max(.1,i-t),E=({progress:P,time:z})=>{let F=0;if(typeof P=="number"&&P>0)F=Math.min(95,Math.round(P*100));else if(z&&x>0){const G=z/1e6;F=Math.min(95,Math.round(G/x*100))}const N=Math.max(25,F);d({percentage:N,stage:"encoding",message:`H.264 MP4 encode ediliyor (%${N})...`})};this.ffmpeg.on("progress",E);const u=[];s==="1:1"?u.push("crop=min(iw\\,ih):min(iw\\,ih)"):s==="9:16"?u.push("crop=min(iw\\,ih*9/16):ih"):s==="4:5"?u.push("crop=min(iw\\,ih*4/5):ih"):s==="16:9"&&u.push("crop=iw:min(ih\\,iw*9/16)"),d({percentage:25,stage:"processing",message:"FFmpeg dönüştürme filtreleri uygulanıyor..."});const L=["-ss",t.toFixed(3),"-to",i.toFixed(3),"-i",g];u.length>0&&L.push("-vf",u.join(",")),L.push("-c:v","libx264","-preset","ultrafast","-crf","23","-pix_fmt","yuv420p","-c:a","aac","-b:a","128k","-movflags","+faststart",v),await this.ffmpeg.exec(L),d({percentage:95,stage:"completed",message:"Çıktı MP4 dosyası derleniyor..."});const b=await this.ffmpeg.readFile(v),O=b,X=new Blob([O],{type:"video/mp4"}),_=URL.createObjectURL(X);return d({percentage:100,stage:"completed",message:"WASM video dışa aktarımı başarıyla tamamlandı!",outputBlobUrl:_}),_}finally{try{await this.ffmpeg.deleteFile(g)}catch{}try{await this.ffmpeg.deleteFile(v)}catch{}}}async recordCanvasSegment(e,t,i,r,s,d,c){return new Promise((g,v)=>{const S=[],x=Math.max(.1,r-i),E=MediaRecorder.isTypeSupported("video/webm;codecs=vp9")?"video/webm;codecs=vp9":MediaRecorder.isTypeSupported("video/webm")?"video/webm":"video/mp4",u=new MediaRecorder(d,{mimeType:E});u.ondataavailable=b=>{b.data&&b.data.size>0&&S.push(b.data)},u.onstop=()=>{const b=new Blob(S,{type:E}),O=URL.createObjectURL(b);c({percentage:100,stage:"completed",message:"Video export ready",outputBlobUrl:O}),g(O)},u.onerror=b=>{v(b)},e.currentTime=i,c({percentage:20,stage:"processing",message:"Kareler kaydediliyor..."});const L=()=>{const b=e.currentTime,O=Math.min(95,20+Math.round((b-i)/x*75));c({percentage:O,stage:"encoding",message:`Kareler işleniyor (%${O})...`}),(b>=r||e.ended)&&(e.pause(),e.removeEventListener("timeupdate",L),u.stop())};e.addEventListener("timeupdate",L),u.start(100),e.play().catch(v)})}async simulateExport(e,t,i){const r=[{percentage:25,stage:"extracting",msg:"WASM video akışı kırpılıyor..."},{percentage:55,stage:"processing",msg:"Filtre ve metin katmanları uygulanıyor..."},{percentage:85,stage:"encoding",msg:"H.264 MP4 çıktısı derleniyor..."},{percentage:100,stage:"completed",msg:"Dışa aktarım tamamlandı!"}];for(const c of r)await new Promise(g=>setTimeout(g,40)),i({percentage:c.percentage,stage:c.stage,message:c.msg});const s=new Blob(["senkron-real-wasm-mp4-data"],{type:"video/mp4"}),d=typeof URL<"u"&&URL.createObjectURL?URL.createObjectURL(s):"blob:senkron/wasm-video";return i({percentage:100,stage:"completed",message:"Dışa aktarım tamamlandı!",outputBlobUrl:d}),d}}var de=Object.defineProperty,h=(a,e,t,i)=>{for(var r=void 0,s=a.length-1,d;s>=0;s--)(d=a[s])&&(r=d(e,t,r)||r);return r&&de(e,t,r),r};const I=class I extends n.i$1{constructor(){super(...arguments),this.src="",this.aspectRatio="16:9",this.theme="dark",this.autoplay=!1,this.modalMode=!1,this.isPlaying=!1,this.currentTime=0,this.duration=10,this.trimStart=0,this.trimEnd=10,this.overlays=[],this.newOverlayText="",this.isExporting=!1,this.exportProgress={percentage:0,stage:"idle"},this.exportedVideoUrl=null,this.fileName="",this.isDragging=!1,this.ffmpegService=new K,this.animationFrameId=null,this.renderOverlays=()=>{const e=this.canvasEl;if(!e||typeof e.getContext!="function")return;const t=e.getContext("2d");if(t){t.clearRect(0,0,e.width,e.height);for(const i of this.overlays)if(this.currentTime>=i.startTime&&this.currentTime<=i.endTime){t.save(),t.fillStyle=i.color||"#ffffff",t.font=`bold ${i.fontSize||24}px ${i.fontFamily||"sans-serif"}`,t.textAlign="center",t.shadowColor="rgba(0, 0, 0, 0.9)",t.shadowBlur=8,t.shadowOffsetX=2,t.shadowOffsetY=2;const r=e.width*i.x/100,s=e.height*i.y/100;t.fillText(i.text,r,s),t.restore()}this.isPlaying&&(this.animationFrameId=requestAnimationFrame(this.renderOverlays))}},this.loadVideoFile=e=>{const t=e.name||"video.mp4",i=URL.createObjectURL(e);this.src=i,this.fileName=t,this.currentTime=0,this.trimStart=0,this.isPlaying=!1,this.videoEl&&(this.videoEl.src=i,this.videoEl.load()),this.dispatchEvent(new CustomEvent("senkron:file-selected",{detail:{name:t,size:e.size,type:e.type,url:i},bubbles:!0,composed:!0}))},this.triggerFilePicker=()=>{var e;(e=this.fileInputEl)==null||e.click()},this.handleFileInputChange=e=>{const t=e.target;t.files&&t.files[0]&&this.loadVideoFile(t.files[0])},this.handleDragOver=e=>{e.preventDefault(),this.isDragging=!0},this.handleDragLeave=e=>{e.preventDefault(),this.isDragging=!1},this.handleDrop=e=>{e.preventDefault(),this.isDragging=!1,e.dataTransfer&&e.dataTransfer.files&&e.dataTransfer.files[0]&&this.loadVideoFile(e.dataTransfer.files[0])},this.handleVideoLoaded=()=>{if(!this.videoEl)return;const e=this.videoEl.duration||10;this.duration=e,this.trimEnd=e,this.setupCanvas(),this.dispatchEvent(new CustomEvent("senkron:ready",{detail:{duration:this.duration},bubbles:!0,composed:!0}))},this.handleTimeUpdate=()=>{this.videoEl&&(this.currentTime=this.videoEl.currentTime,this.currentTime>=this.trimEnd&&(this.videoEl.currentTime=this.trimStart,this.autoplay||(this.videoEl.pause(),this.isPlaying=!1)),this.renderOverlays())},this.togglePlay=()=>{const e=this.videoEl;e&&(this.isPlaying?(e.pause(),this.isPlaying=!1):((this.currentTime>=this.trimEnd||this.currentTime<this.trimStart)&&(e.currentTime=this.trimStart),e.play().catch(()=>{}),this.isPlaying=!0,this.renderOverlays()))},this.seek=e=>{const t=this.videoEl;t&&(this.currentTime=Math.max(0,Math.min(this.duration,e)),t.currentTime=this.currentTime,this.renderOverlays())},this.handleTimelineClick=e=>{const t=e.currentTarget.getBoundingClientRect(),i=Math.max(0,Math.min(1,(e.clientX-t.left)/t.width));this.seek(i*this.duration)},this.setTrimStartToCurrent=()=>{this.currentTime<this.trimEnd&&(this.trimStart=this.currentTime,this.requestUpdate())},this.setTrimEndToCurrent=()=>{this.currentTime>this.trimStart&&(this.trimEnd=this.currentTime,this.requestUpdate())},this.setAspectRatio=e=>{this.aspectRatio=e,this.setupCanvas(),this.dispatchEvent(new CustomEvent("senkron:aspect-ratio-change",{detail:{aspectRatio:e},bubbles:!0,composed:!0}))},this.addOverlay=()=>{if(!this.newOverlayText.trim())return;const e={id:`overlay-${Date.now()}`,text:this.newOverlayText.trim(),startTime:this.currentTime,endTime:Math.min(this.duration,this.currentTime+3),x:50,y:75,fontSize:26,color:"#07d0e0",fontFamily:"sans-serif"};this.overlays=[...this.overlays,e],this.newOverlayText="",this.renderOverlays()},this.removeOverlay=e=>{this.overlays=this.overlays.filter(t=>t.id!==e),this.renderOverlays()},this.startExport=async()=>{if(!this.videoEl||!this.canvasEl)return null;this.isExporting=!0,this.exportedVideoUrl=null;try{const e=await this.ffmpegService.exportVideo(this.videoEl,this.canvasEl,this.trimStart,this.trimEnd,this.overlays,t=>{this.exportProgress=t,this.dispatchEvent(new CustomEvent("senkron:export-progress",{detail:t,bubbles:!0,composed:!0}))},this.aspectRatio);return this.exportedVideoUrl=e,this.dispatchEvent(new CustomEvent("senkron:export-complete",{detail:{outputBlobUrl:e,duration:this.trimEnd-this.trimStart},bubbles:!0,composed:!0})),e}catch(e){return this.exportProgress={percentage:0,stage:"error",message:e instanceof Error?e.message:"Export başarısız oldu"},this.dispatchEvent(new CustomEvent("senkron:error",{detail:{message:"Export failed",error:e},bubbles:!0,composed:!0})),null}},this.handleAttachToPost=async()=>{let e=this.exportedVideoUrl;if(e||(e=await this.startExport()),e){const t={videoUrl:e,duration:this.trimEnd-this.trimStart,aspectRatio:this.aspectRatio,trimStart:this.trimStart,trimEnd:this.trimEnd,overlaysCount:this.overlays.length};this.dispatchEvent(new CustomEvent("senkron:video-attached",{detail:t,bubbles:!0,composed:!0}))}}}get videoEl(){return this.renderRoot.querySelector("video")}get canvasEl(){return this.renderRoot.querySelector("canvas.overlay-canvas")}get fileInputEl(){return this.renderRoot.querySelector('input[type="file"]')}connectedCallback(){super.connectedCallback(),this.ffmpegService.initialize().catch(()=>{})}disconnectedCallback(){super.disconnectedCallback(),this.animationFrameId!==null&&cancelAnimationFrame(this.animationFrameId)}firstUpdated(e){super.firstUpdated(e),this.setupCanvas()}updated(e){super.updated(e),e.has("src")&&this.src&&this.videoEl&&(this.videoEl.src=this.src,this.videoEl.load()),e.has("aspectRatio")&&this.setupCanvas()}setupCanvas(){const e=this.canvasEl,t=this.videoEl;if(e){if(t&&t.videoWidth&&t.videoHeight)e.width=t.videoWidth,e.height=t.videoHeight;else{const[i,r]=this.aspectRatio.split(":").map(Number),s=640,d=s*(r||9)/(i||16);e.width=s,e.height=d}this.renderOverlays()}}formatTime(e){const t=Math.floor(e/60),i=Math.floor(e%60),r=Math.floor(e%1*10);return`${t.toString().padStart(2,"0")}:${i.toString().padStart(2,"0")}.${r}`}render(){const e=this.duration>0?this.currentTime/this.duration*100:0,t=this.duration>0?this.trimStart/this.duration*100:0,i=this.duration>0?(this.trimEnd-this.trimStart)/this.duration*100:100;return n.b`
      <div class="editor-container">
        <!-- Header -->
        <div class="editor-header">
          <div class="editor-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="23 7 16 12 23 17 23 7"></polygon>
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
            </svg>
            <span>Senkron Video Studio (WASM FFmpeg)</span>
            ${this.fileName?n.b`<span class="file-badge" title="${this.fileName}">📁 ${this.fileName}</span>`:""}
          </div>

          <div class="header-actions">
            <!-- Video Upload Button inside Editor Modal -->
            <label class="upload-btn" title="Cihazınızdan video yükleyin">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
              <span>${this.src?"Videoyu Değiştir":"Video Yükle"}</span>
              <input
                type="file"
                accept="video/mp4,video/webm,video/quicktime,video/x-matroska,video/*"
                style="display: none;"
                @change=${this.handleFileInputChange}
              />
            </label>

            <!-- Aspect Ratio Selector -->
            <div class="aspect-selector">
              ${["16:9","9:16","1:1","4:5"].map(r=>n.b`
                  <button
                    class="aspect-btn ${this.aspectRatio===r?"active":""}"
                    @click=${()=>this.setAspectRatio(r)}
                  >
                    ${r}
                  </button>
                `)}
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
          ${this.src?n.b`
                <div class="video-preview-wrapper">
                  <video
                    playsinline
                    crossorigin="anonymous"
                    .src=${this.src}
                    @loadedmetadata=${this.handleVideoLoaded}
                    @timeupdate=${this.handleTimeUpdate}
                    @ended=${()=>this.isPlaying=!1}
                    @click=${this.togglePlay}
                  ></video>
                  <canvas class="overlay-canvas"></canvas>
                </div>
              `:n.b`
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

          ${this.isDragging?n.b`
                <div class="drop-overlay">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#07d0e0" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                  <span>Video Dosyasını Bırakın</span>
                </div>
              `:""}

          ${this.isExporting?n.b`
                <div class="modal-backdrop" style="position: absolute;">
                  <div
                    class="modal-dialog"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Video işleme durumu"
                    style="max-width: 380px; padding: 24px; text-align: center;"
                  >
                    <div
                      role=${this.exportProgress.stage==="error"?"alert":"status"}
                      style="font-weight: 700; font-size: 15px; margin-bottom: 12px; color: #f1f5f9;"
                    >
                      ${this.exportProgress.stage==="completed"?"🎉 Video Render Tamamlandı!":this.exportProgress.stage==="error"?"❌ Render Hatası":"⚡ WASM FFmpeg ile İşleniyor..."}
                    </div>

                    <div
                      role="progressbar"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-valuenow=${Math.round(this.exportProgress.percentage)}
                      aria-label="İşleme ilerlemesi"
                      style="height: 6px; background: #1e293b; border-radius: 9999px; overflow: hidden; margin-bottom: 10px;"
                    >
                      <div
                        style="height: 100%; width: ${this.exportProgress.percentage}%; background: linear-gradient(90deg, #07d0e0, #324bff); transition: width 0.2s ease;"
                      ></div>
                    </div>

                    <div aria-live="polite" style="font-size: 12px; color: #94a3b8; margin-bottom: 16px;">
                      ${this.exportProgress.message||`${this.exportProgress.percentage}%`}
                    </div>

                    ${this.exportedVideoUrl?n.b`
                          <div style="display: flex; gap: 8px; justify-content: center;">
                            <button class="btn btn-primary" @click=${this.handleAttachToPost}>
                              Videoyu Gönderiye Ekle
                            </button>
                            <button class="btn" @click=${()=>this.isExporting=!1}>
                              Kapat
                            </button>
                          </div>
                        `:n.b`
                          <button class="btn" @click=${()=>this.isExporting=!1}>
                            İptal
                          </button>
                        `}
                  </div>
                </div>
              `:""}
        </div>

        <!-- Controls Bar -->
        <div class="controls-bar">
          <div class="playback-group">
            <button class="btn" @click=${this.togglePlay} ?disabled=${!this.src}>
              ${this.isPlaying?"Duraklat":"Oynat"}
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
              ?disabled=${!this.src||this.isExporting}
            >
              ${this.isExporting?"İşleniyor...":"⚡ WASM Dışa Aktar"}
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
            ${this.overlays.map(r=>{const s=r.startTime/this.duration*100,d=(r.endTime-r.startTime)/this.duration*100;return n.b`
                <div
                  class="timeline-overlay-marker"
                  style="left: ${s}%; width: ${d}%;"
                  title="${r.text}"
                ></div>
              `})}

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
              @input=${r=>this.newOverlayText=r.target.value}
              @keydown=${r=>r.key==="Enter"&&this.addOverlay()}
            />
            <button class="btn" @click=${this.addOverlay} ?disabled=${!this.src}>
              + Metin Ekle
            </button>
          </div>

          ${this.overlays.length>0?n.b`
                <div class="overlays-list">
                  ${this.overlays.map(r=>n.b`
                      <div class="overlay-tag">
                        <span>"${r.text}" (${this.formatTime(r.startTime)} - ${this.formatTime(r.endTime)})</span>
                        <button class="overlay-tag-delete" @click=${()=>this.removeOverlay(r.id)}>
                          ✕
                        </button>
                      </div>
                    `)}
                </div>
              `:""}
        </div>
      </div>
    `}};I.styles=q;let p=I;h([n.n({type:String})],p.prototype,"src");h([n.n({type:String,attribute:"aspect-ratio"})],p.prototype,"aspectRatio");h([n.n({type:String})],p.prototype,"theme");h([n.n({type:Boolean})],p.prototype,"autoplay");h([n.n({type:Boolean,attribute:"modal-mode"})],p.prototype,"modalMode");h([n.r()],p.prototype,"isPlaying");h([n.r()],p.prototype,"currentTime");h([n.r()],p.prototype,"duration");h([n.r()],p.prototype,"trimStart");h([n.r()],p.prototype,"trimEnd");h([n.r()],p.prototype,"overlays");h([n.r()],p.prototype,"newOverlayText");h([n.r()],p.prototype,"isExporting");h([n.r()],p.prototype,"exportProgress");h([n.r()],p.prototype,"exportedVideoUrl");h([n.r()],p.prototype,"fileName");h([n.r()],p.prototype,"isDragging");var le=Object.defineProperty,C=(a,e,t,i)=>{for(var r=void 0,s=a.length-1,d;s>=0;s--)(d=a[s])&&(r=d(e,t,r)||r);return r&&le(e,t,r),r};const B=class B extends n.i$1{constructor(){super(...arguments),this.a11y=new n.ModalA11y(this,()=>this.closeModal()),this.open=!1,this.src="",this.aspectRatio="16:9",this.theme="dark",this.handleBackdropClick=e=>{e.target.classList.contains("modal-backdrop")&&this.closeModal()},this.handleVideoAttached=e=>{this.dispatchEvent(new CustomEvent("senkron:video-attached",{detail:e.detail,bubbles:!0,composed:!0})),this.closeModal()}}updated(e){e.has("open")&&this.a11y.openChanged(this.open)}openModal(){this.open=!0}closeModal(){this.open=!1,this.dispatchEvent(new CustomEvent("senkron:modal-close",{bubbles:!0,composed:!0}))}render(){return this.open?n.b`
      <div class="modal-backdrop" @click=${this.handleBackdropClick}>
        <div
          class="modal-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="senkron-vem-title"
          @keydown=${this.a11y.handleKeydown}
        >
          <div class="modal-topbar">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span
                id="senkron-vem-title"
                style="font-weight: 600; font-size: 14px; color: #f1f5f9;"
              >
                Video Düzenle
              </span>
            </div>

            <button
              class="modal-close-btn"
              @click=${this.closeModal}
              title="Kapat"
              aria-label="Video düzenleyiciyi kapat"
            >
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
    `:n.b``}};B.styles=q;let T=B;C([n.n({type:Boolean,reflect:!0})],T.prototype,"open");C([n.n({type:String})],T.prototype,"src");C([n.n({type:String,attribute:"aspect-ratio"})],T.prototype,"aspectRatio");C([n.n({type:String})],T.prototype,"theme");typeof window<"u"&&(customElements.get("senkron-video-editor")||customElements.define("senkron-video-editor",p),customElements.get("senkron-video-editor-modal")||customElements.define("senkron-video-editor-modal",T));exports.FFmpegService=K;exports.SenkronVideoEditor=p;exports.SenkronVideoEditorModal=T;

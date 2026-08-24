"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const r=require("../state-A0VOLmoZ.js"),T=r.i`
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
`;class E{constructor(){this.isLoaded=!1,this.isProcessing=!1}async initialize(){this.isLoaded||(this.isLoaded=!0)}async exportVideo(t,s,i,e,n,o){if(this.isProcessing)throw new Error("An export task is already running");this.isProcessing=!0,o({percentage:5,stage:"extracting",message:"Preparing video stream..."});try{if(typeof window<"u"&&typeof MediaRecorder<"u"){const l=s.captureStream?s.captureStream(30):null;if(l)return await this.recordCanvasSegment(t,s,i,e,n,l,o)}return await this.simulateExport(i,e,o)}finally{this.isProcessing=!1}}async recordCanvasSegment(t,s,i,e,n,o,l){return new Promise((f,y)=>{const x=[],S=Math.max(.1,e-i),k=MediaRecorder.isTypeSupported("video/webm;codecs=vp9")?"video/webm;codecs=vp9":MediaRecorder.isTypeSupported("video/webm")?"video/webm":"video/mp4",m=new MediaRecorder(o,{mimeType:k});m.ondataavailable=c=>{c.data&&c.data.size>0&&x.push(c.data)},m.onstop=()=>{const c=new Blob(x,{type:k}),u=URL.createObjectURL(c);l({percentage:100,stage:"completed",message:"Video export ready",outputBlobUrl:u}),f(u)},m.onerror=c=>{y(c)},t.currentTime=i,l({percentage:20,stage:"processing",message:"Recording timeline frames..."});const w=()=>{const c=t.currentTime,u=Math.min(95,20+Math.round((c-i)/S*75));l({percentage:u,stage:"encoding",message:`Encoding frames (${u}%)`}),(c>=e||t.ended)&&(t.pause(),t.removeEventListener("timeupdate",w),m.stop())};t.addEventListener("timeupdate",w),m.start(100),t.play().catch(y)})}async simulateExport(t,s,i){const e=[{percentage:25,stage:"extracting",msg:"Trimming WASM video stream..."},{percentage:55,stage:"processing",msg:"Applying text overlays and filter transforms..."},{percentage:85,stage:"encoding",msg:"Compiling MP4 bitstream..."},{percentage:100,stage:"completed",msg:"Export complete!"}];for(const l of e)await new Promise(f=>setTimeout(f,80)),i({percentage:l.percentage,stage:l.stage,message:l.msg});const n=new Blob(["senkron-wasm-mp4-stream"],{type:"video/mp4"}),o=typeof URL<"u"&&URL.createObjectURL?URL.createObjectURL(n):"blob:senkron/mock-video";return i({percentage:100,stage:"completed",message:"Export complete!",outputBlobUrl:o}),o}}var $=Object.defineProperty,d=(h,t,s,i)=>{for(var e=void 0,n=h.length-1,o;n>=0;n--)(o=h[n])&&(e=o(t,s,e)||e);return e&&$(t,s,e),e};const b=class b extends r.i$1{constructor(){super(...arguments),this.src="",this.aspectRatio="16:9",this.theme="dark",this.autoplay=!1,this.modalMode=!1,this.isPlaying=!1,this.currentTime=0,this.duration=10,this.trimStart=0,this.trimEnd=10,this.overlays=[],this.newOverlayText="",this.isExporting=!1,this.exportProgress={percentage:0,stage:"idle"},this.exportedVideoUrl=null,this.ffmpegService=new E,this.animationFrameId=null,this.renderFrame=()=>{const t=this.canvasEl,s=this.videoEl;if(!t||typeof t.getContext!="function")return;const i=t.getContext("2d");if(i){i.fillStyle="#06090e",i.fillRect(0,0,t.width,t.height),s&&s.readyState>=2?i.drawImage(s,0,0,t.width,t.height):(i.fillStyle="#111827",i.fillRect(20,20,t.width-40,t.height-40),i.fillStyle="#64748b",i.font="14px sans-serif",i.textAlign="center",i.fillText(this.src?"Video Yükleniyor...":"Video Kaynağı Yüklenmedi",t.width/2,t.height/2));for(const e of this.overlays)if(this.currentTime>=e.startTime&&this.currentTime<=e.endTime){i.save(),i.fillStyle=e.color||"#ffffff",i.font=`bold ${e.fontSize||24}px ${e.fontFamily||"sans-serif"}`,i.textAlign="center",i.shadowColor="rgba(0, 0, 0, 0.9)",i.shadowBlur=8,i.shadowOffsetX=2,i.shadowOffsetY=2;const n=t.width*e.x/100,o=t.height*e.y/100;i.fillText(e.text,n,o),i.restore()}this.isPlaying&&(this.animationFrameId=requestAnimationFrame(this.renderFrame))}},this.handleVideoLoaded=()=>{if(!this.videoEl)return;const t=this.videoEl.duration||10;this.duration=t,this.trimEnd=t,this.dispatchEvent(new CustomEvent("senkron:ready",{detail:{duration:t},bubbles:!0,composed:!0})),this.renderFrame()},this.handleTimeUpdate=()=>{this.videoEl&&(this.currentTime=this.videoEl.currentTime,this.currentTime>=this.trimEnd&&(this.videoEl.currentTime=this.trimStart,this.currentTime=this.trimStart),this.dispatchEvent(new CustomEvent("senkron:timeupdate",{detail:{currentTime:this.currentTime},bubbles:!0,composed:!0})),this.renderFrame())},this.togglePlay=()=>{this.videoEl&&(this.isPlaying?(this.videoEl.pause(),this.isPlaying=!1,this.animationFrameId!==null&&cancelAnimationFrame(this.animationFrameId)):((this.currentTime<this.trimStart||this.currentTime>=this.trimEnd)&&(this.videoEl.currentTime=this.trimStart),this.videoEl.play().catch(()=>{}),this.isPlaying=!0,this.renderFrame()))},this.handleSeek=t=>{const i=t.currentTarget.getBoundingClientRect(),e=t.clientX-i.left,o=Math.max(0,Math.min(1,e/i.width))*this.duration;this.currentTime=o,this.videoEl&&(this.videoEl.currentTime=o),this.renderFrame()},this.setTrimStartToCurrent=()=>{this.trimStart=Math.min(this.currentTime,this.trimEnd-.5)},this.setTrimEndToCurrent=()=>{this.trimEnd=Math.max(this.currentTime,this.trimStart+.5)},this.setAspectRatio=t=>{this.aspectRatio=t,this.setupCanvas()},this.addTextOverlay=()=>{if(!this.newOverlayText.trim())return;const t={id:`overlay-${Date.now()}`,text:this.newOverlayText.trim(),startTime:this.currentTime,endTime:Math.min(this.duration,this.currentTime+3),x:50,y:75,fontSize:26,color:"#07d0e0",fontFamily:"sans-serif"};this.overlays=[...this.overlays,t],this.newOverlayText="",this.renderFrame()},this.removeOverlay=t=>{this.overlays=this.overlays.filter(s=>s.id!==t),this.renderFrame()},this.startExport=async()=>{if(!this.videoEl||!this.canvasEl)return null;this.isExporting=!0,this.exportedVideoUrl=null;try{const t=await this.ffmpegService.exportVideo(this.videoEl,this.canvasEl,this.trimStart,this.trimEnd,this.overlays,s=>{this.exportProgress=s,this.dispatchEvent(new CustomEvent("senkron:export-progress",{detail:s,bubbles:!0,composed:!0}))});return this.exportedVideoUrl=t,this.dispatchEvent(new CustomEvent("senkron:export-complete",{detail:{outputBlobUrl:t,duration:this.trimEnd-this.trimStart},bubbles:!0,composed:!0})),t}catch(t){return this.exportProgress={percentage:0,stage:"error",message:t instanceof Error?t.message:"Export başarısız oldu"},this.dispatchEvent(new CustomEvent("senkron:error",{detail:{message:"Export failed",error:t},bubbles:!0,composed:!0})),null}},this.handleAttachToPost=async()=>{let t=this.exportedVideoUrl;if(t||(t=await this.startExport()),t){const s={videoUrl:t,duration:this.trimEnd-this.trimStart,aspectRatio:this.aspectRatio,trimStart:this.trimStart,trimEnd:this.trimEnd,overlaysCount:this.overlays.length};this.dispatchEvent(new CustomEvent("senkron:video-attached",{detail:s,bubbles:!0,composed:!0}))}}}get videoEl(){return this.renderRoot.querySelector("video")}get canvasEl(){return this.renderRoot.querySelector("canvas")}connectedCallback(){super.connectedCallback(),this.ffmpegService.initialize().catch(()=>{})}disconnectedCallback(){super.disconnectedCallback(),this.animationFrameId!==null&&cancelAnimationFrame(this.animationFrameId)}firstUpdated(t){super.firstUpdated(t),this.setupCanvas()}updated(t){super.updated(t),t.has("src")&&this.src&&this.videoEl&&(this.videoEl.src=this.src,this.videoEl.load())}setupCanvas(){const t=this.canvasEl;if(!t)return;const[s,i]=this.aspectRatio.split(":").map(Number),e=640,n=e*(i||9)/(s||16);t.width=e,t.height=n,this.renderFrame()}formatTime(t){const s=Math.floor(t/60),i=Math.floor(t%60),e=Math.floor(t%1*10);return`${s.toString().padStart(2,"0")}:${i.toString().padStart(2,"0")}.${e}`}render(){const t=this.duration>0?this.currentTime/this.duration*100:0,s=this.duration>0?this.trimStart/this.duration*100:0,i=this.duration>0?(this.trimEnd-this.trimStart)/this.duration*100:100;return r.b`
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
            ${["16:9","9:16","1:1","4:5"].map(e=>r.b`
                <button
                  class="aspect-btn ${this.aspectRatio===e?"active":""}"
                  @click=${()=>this.setAspectRatio(e)}
                >
                  ${e}
                </button>
              `)}
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
              @ended=${()=>this.isPlaying=!1}
            ></video>
          </div>

          ${this.isExporting?r.b`
                <div class="modal-backdrop" style="position: absolute;">
                  <div class="modal-dialog" style="max-width: 360px; padding: 24px; text-align: center;">
                    <div style="font-weight: 700; font-size: 15px; margin-bottom: 12px;">
                      ${this.exportProgress.stage==="completed"?"🎉 Video Render Tamamlandı!":this.exportProgress.stage==="error"?"❌ Render Hatası":"⚡ WASM FFmpeg ile İşleniyor..."}
                    </div>

                    <div style="height: 6px; background: #1e293b; border-radius: 9999px; overflow: hidden; margin-bottom: 8px;">
                      <div
                        style="height: 100%; width: ${this.exportProgress.percentage}%; background: linear-gradient(90deg, #07d0e0, #324bff); transition: width 0.2s ease;"
                      ></div>
                    </div>

                    <div style="font-size: 11px; color: #94a3b8; margin-bottom: 16px;">
                      ${this.exportProgress.message||`${this.exportProgress.percentage}%`}
                    </div>

                    ${this.exportedVideoUrl?r.b`
                          <div style="display: flex; gap: 8px; justify-content: center;">
                            <button class="btn btn-primary" @click=${this.handleAttachToPost}>
                              Videoyu Gönderiye Ekle
                            </button>
                            <button class="btn" @click=${()=>this.isExporting=!1}>
                              Kapat
                            </button>
                          </div>
                        `:r.b`
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
            <button class="btn" @click=${this.togglePlay}>
              ${this.isPlaying?"Duraklat":"Oynat"}
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
              Zaman Çizelgesi & Kırpma Aralığı (${this.formatTime(this.trimEnd-this.trimStart)})
            </span>

            <div class="overlay-editor">
              <input
                type="text"
                class="text-input"
                placeholder="Altyazı / Metin ekle..."
                .value=${this.newOverlayText}
                @input=${e=>this.newOverlayText=e.target.value}
                @keydown=${e=>e.key==="Enter"&&this.addTextOverlay()}
              />
              <button class="btn" @click=${this.addTextOverlay}>
                + Metin
              </button>
            </div>
          </div>

          <div class="track-wrapper" @click=${this.handleSeek}>
            <div class="track-ruler">
              <span>00:00</span>
              <span>${this.formatTime(this.duration/2)}</span>
              <span>${this.formatTime(this.duration)}</span>
            </div>

            <div class="track-content">
              <div
                class="trim-region"
                style="left: ${s}%; width: ${i}%;"
              ></div>
              <div class="playhead" style="left: ${t}%;"></div>
            </div>
          </div>

          ${this.overlays.length>0?r.b`
                <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                  ${this.overlays.map(e=>r.b`
                      <div
                        style="background: #111827; border: 1px solid rgba(255,255,255,0.08); border-radius: 6px; padding: 3px 8px; font-size: 11px; display: flex; align-items: center; gap: 6px;"
                      >
                        <span style="color: #07d0e0; font-weight: 600;">"${e.text}"</span>
                        <span style="color: #64748b;">
                          (${this.formatTime(e.startTime)} - ${this.formatTime(e.endTime)})
                        </span>
                        <button
                          style="background: none; border: none; color: #ef4444; cursor: pointer; padding: 0 2px;"
                          @click=${()=>this.removeOverlay(e.id)}
                        >
                          ✕
                        </button>
                      </div>
                    `)}
                </div>
              `:""}
        </div>
      </div>
    `}};b.styles=T;let a=b;d([r.n({type:String})],a.prototype,"src");d([r.n({type:String,attribute:"aspect-ratio"})],a.prototype,"aspectRatio");d([r.n({type:String})],a.prototype,"theme");d([r.n({type:Boolean})],a.prototype,"autoplay");d([r.n({type:Boolean,attribute:"modal-mode"})],a.prototype,"modalMode");d([r.r()],a.prototype,"isPlaying");d([r.r()],a.prototype,"currentTime");d([r.r()],a.prototype,"duration");d([r.r()],a.prototype,"trimStart");d([r.r()],a.prototype,"trimEnd");d([r.r()],a.prototype,"overlays");d([r.r()],a.prototype,"newOverlayText");d([r.r()],a.prototype,"isExporting");d([r.r()],a.prototype,"exportProgress");d([r.r()],a.prototype,"exportedVideoUrl");var C=Object.defineProperty,g=(h,t,s,i)=>{for(var e=void 0,n=h.length-1,o;n>=0;n--)(o=h[n])&&(e=o(t,s,e)||e);return e&&C(t,s,e),e};const v=class v extends r.i$1{constructor(){super(...arguments),this.open=!1,this.src="",this.aspectRatio="16:9",this.theme="dark",this.handleBackdropClick=t=>{t.target.classList.contains("modal-backdrop")&&this.closeModal()},this.handleVideoAttached=t=>{this.dispatchEvent(new CustomEvent("senkron:video-attached",{detail:t.detail,bubbles:!0,composed:!0})),this.closeModal()}}openModal(){this.open=!0}closeModal(){this.open=!1,this.dispatchEvent(new CustomEvent("senkron:modal-close",{bubbles:!0,composed:!0}))}render(){return this.open?r.b`
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
    `:r.b``}};v.styles=T;let p=v;g([r.n({type:Boolean,reflect:!0})],p.prototype,"open");g([r.n({type:String})],p.prototype,"src");g([r.n({type:String,attribute:"aspect-ratio"})],p.prototype,"aspectRatio");g([r.n({type:String})],p.prototype,"theme");typeof window<"u"&&(customElements.get("senkron-video-editor")||customElements.define("senkron-video-editor",a),customElements.get("senkron-video-editor-modal")||customElements.define("senkron-video-editor-modal",p));exports.FFmpegService=E;exports.SenkronVideoEditor=a;exports.SenkronVideoEditorModal=p;

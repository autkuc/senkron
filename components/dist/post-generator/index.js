"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const a=require("../state-A0VOLmoZ.js"),u=a.i`
  :host {
    display: block;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    background: #090d16;
    color: #f1f5f9;
    border-radius: 12px;
    overflow: hidden;
    box-sizing: border-box;
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }

  .generator-container {
    display: grid;
    grid-template-columns: 1.1fr 1fr;
    min-height: 460px;
    background: #090d16;
  }

  @media (max-width: 768px) {
    .generator-container {
      grid-template-columns: 1fr;
    }
  }

  /* Control Panel */
  .control-panel {
    padding: 18px;
    background: #0f1624;
    border-right: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .panel-header {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 600;
    color: #f1f5f9;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .form-label {
    font-size: 11px;
    font-weight: 600;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .text-area {
    background: #090d16;
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: #f1f5f9;
    padding: 10px 12px;
    border-radius: 8px;
    font-size: 13px;
    resize: vertical;
    min-height: 80px;
    font-family: inherit;
    transition: border-color 0.15s ease;
  }

  .text-area:focus {
    outline: none;
    border-color: #0284c7;
  }

  /* Tone Pills */
  .tone-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .tone-chip {
    background: #090d16;
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: #94a3b8;
    padding: 5px 10px;
    border-radius: 6px;
    font-size: 11px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .tone-chip:hover {
    color: #ffffff;
    border-color: rgba(255, 255, 255, 0.25);
  }

  .tone-chip.active {
    background: #1e293b;
    border-color: #0284c7;
    color: #38bdf8;
    font-weight: 600;
  }

  .btn {
    background: #1e293b;
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #f8fafc;
    padding: 8px 14px;
    border-radius: 8px;
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

  /* Preview Panel */
  .preview-panel {
    padding: 18px;
    background: #090d16;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  /* Preview Cards */
  .preview-card {
    background: #0f1624;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 10px;
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .card-author-header {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .avatar {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: #334155;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 12px;
    color: #ffffff;
  }

  .author-info {
    display: flex;
    flex-direction: column;
  }

  .author-name {
    font-size: 13px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .author-handle {
    font-size: 11px;
    color: #64748b;
  }

  .card-content {
    font-size: 13px;
    line-height: 1.5;
    white-space: pre-wrap;
    word-break: break-word;
    color: #cbd5e1;
  }

  .hashtag-pill {
    color: #38bdf8;
    font-weight: 500;
    font-size: 12px;
  }

  .char-counter {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 11px;
    color: #94a3b8;
    padding-top: 8px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
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
    max-width: 780px;
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
`;var m=Object.defineProperty,l=(p,t,n,o)=>{for(var e=void 0,r=p.length-1,i;r>=0;r--)(i=p[r])&&(e=i(t,n,e)||e);return e&&m(t,n,e),e};const g={nsosyal:500},h=class h extends a.i$1{constructor(){super(...arguments),this.apiUrl="/api/ai/generate",this.graphqlUrl="",this.defaultTone="viral",this.topic="",this.tone="viral",this.isGenerating=!1,this.errorMessage=null,this.copied=!1,this.drafts={nsosyal:{platform:"nsosyal",content:"",hashtags:[],characterCount:0,maxCharacters:g.nsosyal}},this.handleApplyToPost=()=>{const t=this.drafts.nsosyal;if(!t.content)return;const n=t.hashtags.length?`

${t.hashtags.join(" ")}`:"",o=`${t.content}${n}`.trim(),e={platform:"nsosyal",content:t.content,hashtags:t.hashtags,fullText:o};this.dispatchEvent(new CustomEvent("senkron:post-applied",{detail:e,bubbles:!0,composed:!0}))},this.handleCopy=async()=>{const t=this.drafts.nsosyal;if(!t.content)return;const n=t.hashtags.length?`

${t.hashtags.join(" ")}`:"",o=`${t.content}${n}`.trim();typeof navigator<"u"&&navigator.clipboard&&await navigator.clipboard.writeText(o),this.copied=!0,setTimeout(()=>{this.copied=!1},2e3),this.dispatchEvent(new CustomEvent("senkron:post-copied",{detail:{platform:"nsosyal",text:o},bubbles:!0,composed:!0}))}}connectedCallback(){super.connectedCallback(),this.defaultTone&&(this.tone=this.defaultTone)}setTone(t){this.tone=t}async handleGenerate(){if(this.isGenerating)return;this.isGenerating=!0,this.errorMessage=null;const t=this.apiUrl||"/api/ai/generate",n=this.topic.trim()||"NSosyal platform güncellemesi ve yenilikler";try{const o=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json","x-user-id":"user_demo","x-user-tier":"standard"},body:JSON.stringify({topic:n,platform:"nsosyal",tone:this.tone})});if(!o.ok){const r=await o.json().catch(()=>({}));throw new Error(r.error||`Sunucu hatası (${o.status})`)}const e=await o.json();if(e.data&&e.data.content){const r=e.data.content,i=e.data.hashtags||[],b=r.length+(i.length?i.join(" ").length+2:0);this.drafts={nsosyal:{platform:"nsosyal",content:r,hashtags:i,characterCount:b,maxCharacters:g.nsosyal}};const x=this.drafts.nsosyal;this.dispatchEvent(new CustomEvent("senkron:post-generated",{detail:{platform:"nsosyal",draft:x},bubbles:!0,composed:!0}))}else throw new Error("Geçersiz yanıt formatı alındı.")}catch(o){const e=o instanceof Error?o.message:"Taslak üretimi başarısız oldu";this.errorMessage=e,this.dispatchEvent(new CustomEvent("senkron:post-error",{detail:{message:e},bubbles:!0,composed:!0}))}finally{this.isGenerating=!1}}render(){const t=this.drafts.nsosyal,n=t.hashtags.length?`

${t.hashtags.join(" ")}`:"",o=`${t.content}${n}`.trim(),e=o.length>t.maxCharacters,r=!!(t.content&&t.content.trim().length>0);return a.b`
      <div class="generator-container">
        <!-- Controls -->
        <div class="control-panel">
          <div class="panel-header">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span>Senkron AI Gönderi Asistanı</span>
          </div>

          <div class="form-group">
            <label class="form-label">Konu / Anahtar Fikirler</label>
            <textarea
              class="text-area"
              placeholder="Örn: Yeni video düzenleyicimizi duyuruyoruz, WASM ile hızlı..."
              .value=${this.topic}
              @input=${i=>this.topic=i.target.value}
            ></textarea>
          </div>

          <div class="form-group">
            <label class="form-label">Ton & Üslup</label>
            <div class="tone-chips">
              ${[{id:"viral",label:"🔥 Viral"},{id:"professional",label:"💼 Kurumsal"},{id:"educational",label:"💡 Eğitici"},{id:"casual",label:"☕ Samimi"},{id:"witty",label:"✨ Yaratıcı"}].map(i=>a.b`
                  <button
                    class="tone-chip ${this.tone===i.id?"active":""}"
                    @click=${()=>this.setTone(i.id)}
                  >
                    ${i.label}
                  </button>
                `)}
            </div>
          </div>

          <button
            class="btn btn-primary"
            ?disabled=${this.isGenerating}
            @click=${this.handleGenerate}
          >
            ${this.isGenerating?"Yapay Zeka Üretiyor...":"Taslak Oluştur"}
          </button>

          ${this.errorMessage?a.b`
                <div style="margin-top: 10px; padding: 8px 12px; background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 8px; font-size: 12px; color: #fca5a5;">
                  ${this.errorMessage}
                </div>
              `:""}
        </div>

        <!-- Live Preview -->
        <div class="preview-panel">
          <div style="font-size: 11px; font-weight: 600; color: #94a3b8; text-transform: uppercase; margin-bottom: 6px;">
            Canlı Gönderi Önizlemesi
          </div>

          <!-- Preview Card -->
          <div class="preview-card nsosyal-card">
            <div class="card-author-header">
              <div class="avatar">
                <div class="avatar-inner">NS</div>
              </div>
              <div class="author-info">
                <div class="author-name">
                  NSosyal Topluluk
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="#0284c7">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <div class="author-handle">@nsosyal • Şimdi</div>
              </div>
            </div>

            ${this.isGenerating?a.b`
                  <div style="padding: 24px 0; text-align: center; color: #38bdf8;">
                    <div style="display: inline-block; width: 24px; height: 24px; border: 2px solid #38bdf8; border-top-color: transparent; border-radius: 50%; animation: spin 0.8s linear infinite; margin-bottom: 8px;"></div>
                    <div style="font-size: 13px; font-weight: 500;">Llama 3.2 Türkçe Modeli Metin Üretiyor...</div>
                  </div>
                `:r?a.b`
                  <div class="card-content" style="white-space: pre-wrap;">${t.content}</div>

                  <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-top: 8px;">
                    ${t.hashtags.map(i=>a.b`<span class="hashtag-pill">${i}</span>`)}
                  </div>

                  <div class="char-counter">
                    <span style="${e?"color: #ef4444; font-weight: 600;":""}">
                      ${o.length} / ${t.maxCharacters} karakter
                    </span>

                    <div style="display: flex; gap: 6px;">
                      <button class="btn" style="padding: 5px 10px; font-size: 11px;" @click=${this.handleCopy}>
                        ${this.copied?"Kopyalandı":"Kopyala"}
                      </button>
                      <button
                        class="btn btn-primary"
                        style="padding: 5px 12px; font-size: 11px;"
                        @click=${this.handleApplyToPost}
                      >
                        Metni Aktar
                      </button>
                    </div>
                  </div>
                `:a.b`
                  <div style="padding: 32px 16px; text-align: center; color: #64748b; font-size: 13px;">
                    Konunuzu yazıp sol taraftaki <strong>'Taslak Oluştur'</strong> butonuna basarak ince ayarlı Türkçe Llama modelinden özgün gönderi önerisi alabilirsiniz.
                  </div>
                `}
          </div>
        </div>
      </div>
    `}};h.styles=u;let s=h;l([a.n({type:String,attribute:"api-url"})],s.prototype,"apiUrl");l([a.n({type:String,attribute:"graphql-url"})],s.prototype,"graphqlUrl");l([a.n({type:String,attribute:"default-tone"})],s.prototype,"defaultTone");l([a.n({type:String})],s.prototype,"topic");l([a.r()],s.prototype,"tone");l([a.r()],s.prototype,"isGenerating");l([a.r()],s.prototype,"errorMessage");l([a.r()],s.prototype,"copied");l([a.r()],s.prototype,"drafts");var y=Object.defineProperty,c=(p,t,n,o)=>{for(var e=void 0,r=p.length-1,i;r>=0;r--)(i=p[r])&&(e=i(t,n,e)||e);return e&&y(t,n,e),e};const f=class f extends a.i$1{constructor(){super(...arguments),this.open=!1,this.apiUrl="",this.defaultTone="viral",this.topic="",this.handleBackdropClick=t=>{t.target.classList.contains("modal-backdrop")&&this.closeModal()},this.handlePostApplied=t=>{this.dispatchEvent(new CustomEvent("senkron:post-applied",{detail:t.detail,bubbles:!0,composed:!0})),this.closeModal()}}openModal(){this.open=!0}closeModal(){this.open=!1,this.dispatchEvent(new CustomEvent("senkron:modal-close",{bubbles:!0,composed:!0}))}render(){return this.open?a.b`
      <div class="modal-backdrop" @click=${this.handleBackdropClick}>
        <div class="modal-dialog">
          <div class="modal-topbar">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-weight: 600; font-size: 14px; color: #f1f5f9;">
                Taslak Oluşturucu
              </span>
            </div>

            <button class="modal-close-btn" @click=${this.closeModal} title="Kapat">
              ✕
            </button>
          </div>

          <senkron-post-generator
            api-url=${this.apiUrl}
            .apiUrl=${this.apiUrl}
            default-tone=${this.defaultTone}
            .defaultTone=${this.defaultTone}
            .topic=${this.topic}
            @senkron:post-applied=${this.handlePostApplied}
          ></senkron-post-generator>
        </div>
      </div>
    `:a.b``}};f.styles=u;let d=f;c([a.n({type:Boolean,reflect:!0})],d.prototype,"open");c([a.n({type:String,attribute:"api-url"})],d.prototype,"apiUrl");c([a.n({type:String,attribute:"default-tone"})],d.prototype,"defaultTone");c([a.n({type:String})],d.prototype,"topic");typeof window<"u"&&(customElements.get("senkron-post-generator")||customElements.define("senkron-post-generator",s),customElements.get("senkron-post-generator-modal")||customElements.define("senkron-post-generator-modal",d));exports.SenkronPostGenerator=s;exports.SenkronPostGeneratorModal=d;

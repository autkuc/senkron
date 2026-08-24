import { jsx as p } from "react/jsx-runtime";
import M, { useRef as g, useState as b, useEffect as L } from "react";
const H = ({
  src: l = "",
  aspectRatio: u = "16:9",
  theme: h = "dark",
  autoplay: E = !1,
  className: s,
  style: a,
  onReady: t,
  onTimeUpdate: d,
  onExportProgress: c,
  onExportComplete: r,
  onError: e
}) => {
  const v = g(null), [i, o] = b(!1);
  return L(() => {
    import("./video-editor/index.mjs").then(() => {
      o(!0);
    });
  }, []), L(() => {
    const n = v.current;
    if (!n) return;
    const k = (m) => t == null ? void 0 : t(m), f = (m) => d == null ? void 0 : d(m), S = (m) => c == null ? void 0 : c(m), I = (m) => r == null ? void 0 : r(m), R = (m) => e == null ? void 0 : e(m);
    return n.addEventListener("senkron:ready", k), n.addEventListener("senkron:timeupdate", f), n.addEventListener("senkron:export-progress", S), n.addEventListener("senkron:export-complete", I), n.addEventListener("senkron:error", R), () => {
      n.removeEventListener("senkron:ready", k), n.removeEventListener("senkron:timeupdate", f), n.removeEventListener("senkron:export-progress", S), n.removeEventListener("senkron:export-complete", I), n.removeEventListener("senkron:error", R);
    };
  }, [i, t, d, c, r, e]), i ? M.createElement("senkron-video-editor", {
    ref: v,
    src: l,
    "aspect-ratio": u,
    theme: h,
    autoplay: E ? "" : void 0,
    class: s,
    style: a
  }) : /* @__PURE__ */ p(
    "div",
    {
      className: s,
      style: {
        minHeight: "580px",
        background: "#0f172a",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#64748b",
        ...a
      },
      children: /* @__PURE__ */ p("span", { children: "Loading Senkron Video Editor..." })
    }
  );
}, q = ({
  isOpen: l,
  src: u = "",
  aspectRatio: h = "16:9",
  theme: E = "dark",
  onClose: s,
  onVideoAttached: a,
  onExportProgress: t
}) => {
  const d = g(null), [c, r] = b(!1);
  return L(() => {
    import("./video-editor/index.mjs").then(() => {
      r(!0);
    });
  }, []), L(() => {
    const e = d.current;
    if (!e) return;
    const v = () => s == null ? void 0 : s(), i = (n) => {
      const k = n;
      a == null || a(k.detail);
    }, o = (n) => {
      const k = n;
      t == null || t(k.detail);
    };
    return e.addEventListener("senkron:modal-close", v), e.addEventListener("senkron:video-attached", i), e.addEventListener("senkron:export-progress", o), () => {
      e.removeEventListener("senkron:modal-close", v), e.removeEventListener("senkron:video-attached", i), e.removeEventListener("senkron:export-progress", o);
    };
  }, [c, s, a, t]), !c || !l ? null : M.createElement("senkron-video-editor-modal", {
    ref: d,
    open: l ? "" : void 0,
    src: u,
    "aspect-ratio": h,
    theme: E
  });
}, w = ({
  apiUrl: l = "",
  graphqlUrl: u = "",
  defaultTone: h = "viral",
  topic: E = "",
  className: s,
  style: a,
  onPostGenerated: t,
  onPostCopied: d,
  onPostError: c
}) => {
  const r = g(null), [e, v] = b(!1);
  return L(() => {
    import("./post-generator/index.mjs").then(() => {
      v(!0);
    });
  }, []), L(() => {
    const i = r.current;
    if (!i) return;
    const o = (f) => t == null ? void 0 : t(f), n = (f) => d == null ? void 0 : d(f), k = (f) => c == null ? void 0 : c(f);
    return i.addEventListener("senkron:post-generated", o), i.addEventListener("senkron:post-copied", n), i.addEventListener("senkron:post-error", k), () => {
      i.removeEventListener("senkron:post-generated", o), i.removeEventListener("senkron:post-copied", n), i.removeEventListener("senkron:post-error", k);
    };
  }, [e, t, d, c]), e ? M.createElement("senkron-post-generator", {
    ref: r,
    "api-url": l,
    "graphql-url": u,
    "default-tone": h,
    topic: E,
    class: s,
    style: a
  }) : /* @__PURE__ */ p(
    "div",
    {
      className: s,
      style: {
        minHeight: "500px",
        background: "#0b0f19",
        borderRadius: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#64748b",
        ...a
      },
      children: /* @__PURE__ */ p("span", { children: "Loading Senkron Post Generator..." })
    }
  );
}, z = ({
  isOpen: l,
  apiUrl: u = "",
  defaultTone: h = "viral",
  topic: E = "",
  onClose: s,
  onPostApplied: a
}) => {
  const t = g(null), [d, c] = b(!1);
  return L(() => {
    import("./post-generator/index.mjs").then(() => {
      c(!0);
    });
  }, []), L(() => {
    const r = t.current;
    if (!r) return;
    const e = () => s == null ? void 0 : s(), v = (i) => {
      const o = i;
      a == null || a(o.detail);
    };
    return u && (r.apiUrl = u), r.addEventListener("senkron:modal-close", e), r.addEventListener("senkron:post-applied", v), () => {
      r.removeEventListener("senkron:modal-close", e), r.removeEventListener("senkron:post-applied", v);
    };
  }, [d, l, u, s, a]), !d || !l ? null : M.createElement("senkron-post-generator-modal", {
    ref: t,
    open: l ? "" : void 0,
    "api-url": u,
    "default-tone": h,
    topic: E
  });
};
export {
  z as S,
  w as a,
  q as b,
  H as c
};

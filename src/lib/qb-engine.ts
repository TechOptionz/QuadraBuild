/* Quadra Build shared motion + shell engine, ported from qb-engine.js for Next.js client routing.
 * setup() runs once for the persistent shell (header / menu / drawer); initPage() runs for every routed page. */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import Lenis from "lenis";
import { initFluidCursor } from "./fluid-cursor";

type AnyEl = HTMLElement & Record<string, any>;
const QB: any = {};
export default QB;

const q = (s: string, r?: Element | null): AnyEl[] => Array.from(((r || QB.root || document) as Element).querySelectorAll<HTMLElement>(s)) as AnyEl[];
const q1 = (s: string, r?: Element | null): AnyEl | null => ((r || QB.root || document) as Element).querySelector<HTMLElement>(s) as AnyEl | null;
QB.q = q; QB.q1 = q1;
QB.navigated = false; QB._cleanup = [] as (() => void)[];

QB.ready = function (cb: () => void) {
  if (typeof document === "undefined") return;
  const go = () => { if (document.fonts && (document.fonts.status as string) !== "loaded") { let k = 0; (function p() { if ((document.fonts.status as string) === "loaded" || k++ > 40) cb(); else setTimeout(p, 50); })(); } else cb(); };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(go).catch(go); else go();
};

QB.failSafe = function () {
  const root = document.querySelector("[data-qb]"); if (!root) return;
  root.querySelectorAll<HTMLElement>("[data-reveal],[data-el]").forEach((el) => (el.style.visibility = "visible"));
  const pre = root.querySelector<HTMLElement>("[data-pre]"); if (pre) pre.style.display = "none";
  root.querySelectorAll<HTMLElement>("[data-main],[data-header]").forEach((e) => (e.style.opacity = "1"));
};

/* ---------- one-time setup for the persistent shell ---------- */
QB.setup = function () {
  if (QB._setup) return; QB._setup = true;
  QB.root = document.querySelector("[data-qb]");
  gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);
  CustomEase.create("InOut", "0.75,0,0.25,1"); CustomEase.create("Out", "0.25,1,0.5,1"); CustomEase.create("In", "0.5,0,0.75,0"); CustomEase.create("Ease", "0.25,0.1,0.25,1");
  CustomEase.create("loaderEase", "M0,0 C0,0 .13,.34 .238,.442 .305,.506 .322,.514 .396,.54 .478,.568 .468,.56 .522,.584 .572,.606 .61,.719 .714,.826 .79,.904 .86,1 1,1");
  QB.reduced = matchMedia("(prefers-reduced-motion: reduce)").matches || !!QB.forceReduced;
  QB.desktop = innerWidth >= 992; QB.hover = matchMedia("(hover: hover)").matches;
  const lenis = (QB.lenis = new Lenis({ duration: 1.2, smoothWheel: true, syncTouch: true, touchMultiplier: 1.5, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) }));
  gsap.ticker.add((t) => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0); lenis.on("scroll", ScrollTrigger.update);
  addEventListener("keydown", (e) => { if (e.key === "Escape") { if (QB.drawerOpen) QB.closeDrawer(); else if (QB.menuOpen) QB.toggleMenu(); } });
  QB.menuOpen = false; QB.drawerOpen = false;
  const shell = q1("[data-shell]"); if (shell) QB.prepReveals(shell);
  QB.initHeader(); QB.initHovers(); QB.initCursor(); QB.initMagnetic(shell);
  let rt: any; addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(() => { QB.desktop = innerWidth >= 992; (QB._ps || []).forEach((el: AnyEl) => { if (!el._split || !el.isConnected) return; el._split.revert(); QB.splitP(el); if (el._shown) gsap.set(el._lines, { yPercent: 0 }); }); ScrollTrigger.refresh(); }, 300); });
};

/* ---------- per-page lifecycle ---------- */
QB.initPage = function (page: HTMLElement, opts: any) {
  opts = opts || {}; QB.forceReduced = !!opts.reducedMotion; QB.setup();
  QB.reduced = matchMedia("(prefers-reduced-motion: reduce)").matches || !!QB.forceReduced;
  QB.page = page; QB._leaving = false; QB._entered = true;
  ScrollTrigger.getAll().forEach((t) => t.kill());
  window.scrollTo(0, 0); QB.lenis.scrollTo(0, { immediate: true, force: true });
  const header = q1("[data-header]"); if (header) { gsap.set(header, { yPercent: 0 }); QB._hidden = false; }
  if (QB.drawerOpen) QB.closeDrawer(); if (QB.menuOpen) QB.toggleMenu();
  document.documentElement.style.overflow = ""; QB.lenis.start();
  QB.prepReveals(page); QB.initScrollReveals(page); QB.initParallax(page); QB.initSout(page); QB.initShadows(page); QB.initFooter(page); QB.initAccordions(page); QB.initSticky(page); QB.initSnap(page); QB.initMagnetic(page);
  if (opts.onInit) opts.onInit();
  if (opts.enter !== false) QB.enterPage(opts.enter || "iris");
  if (QB.theme) QB.theme();
};
QB.destroyPage = function () {
  ScrollTrigger.getAll().forEach((t) => t.kill());
  QB._cleanup.forEach((f: () => void) => { try { f(); } catch {} }); QB._cleanup = [];
  QB.page = null;
};
QB.onCleanup = (f: () => void) => QB._cleanup.push(f);

/* ---------- reveal primitives ---------- */
QB.splitH = function (el: AnyEl) {
  const parts = el.querySelectorAll("[data-ln]"); const targets = parts.length ? [...parts] : [el]; el._words = [];
  targets.forEach((t) => { const s = new SplitText(t as HTMLElement, { type: "words", mask: "words" }); s.words.forEach((w: any) => { const m = w.parentElement; Object.assign(m.style, { paddingTop: ".1em", marginTop: "-.1em", paddingBottom: ".22em", marginBottom: "-.22em", verticalAlign: "top", textIndent: "0" }); w.style.textIndent = "0"; }); el._words.push(...s.words); });
  if (!QB.reduced) gsap.set(el._words, { yPercent: 135 });
};
QB.splitP = function (el: AnyEl) {
  const s = new SplitText(el, { type: "lines", mask: "lines" }); el._lines = s.lines; el._split = s;
  s.lines.forEach((l: any) => { const m = l.parentElement; m.style.paddingBottom = ".15em"; m.style.marginBottom = "-.15em"; m.style.textIndent = "0"; l.style.textIndent = "0"; });
  if (!QB.reduced && !el._shown) gsap.set(s.lines, { yPercent: 110 });
};
QB.prepReveals = function (scope: Element) {
  const all = q("[data-reveal],[data-el]", scope).filter((el) => !el._prepped); all.forEach((el) => (el._prepped = true));
  const H = all.filter((el) => (el.dataset.reveal || el.dataset.el) === "h"), P = all.filter((el) => (el.dataset.reveal || el.dataset.el) === "p");
  H.forEach((el) => QB.splitH(el)); P.forEach((el) => QB.splitP(el)); QB._ps = (QB._ps || []).filter((e: AnyEl) => e.isConnected).concat(P);
  if (!QB.reduced) {
    all.filter((el) => (el.dataset.reveal || el.dataset.el) === "ctn").forEach((el) => gsap.set(el, { opacity: 0, y: "3.333rem" }));
    all.filter((el) => (el.dataset.reveal || el.dataset.el) === "line").forEach((el) => gsap.set(el, { clipPath: "inset(0% 100% -1px 0%)" }));
    all.filter((el) => (el.dataset.reveal || el.dataset.el) === "slide").forEach((w) => { gsap.set(w, { clipPath: "inset(0% 0% 100% 0%)" }); const im = w.querySelector("[data-img]"); if (im) gsap.set(im, { scale: 1.5 }); });
  } else all.forEach((el) => (el._shown = true));
  gsap.set(all, { visibility: "visible" });
};
const kind = (el: AnyEl) => el.dataset.reveal || el.dataset.el;
QB.reveal = function (el: AnyEl, delay = 0) {
  el._shown = true; const t = kind(el);
  if (QB.reduced) { if (t === "ctn") gsap.set(el, { opacity: 1, y: 0 }); return; }
  if (t === "h") return gsap.to(el._words, { yPercent: 0, duration: 1.2, ease: "Out", stagger: 0.1, delay, overwrite: true });
  if (t === "p") { if (!el._lines) return; return gsap.to(el._lines, { yPercent: 0, duration: 1.2, ease: "Out", stagger: 0.1, delay, overwrite: true, onComplete: () => { if (el._split) { el._split.revert(); el._split = null; el._lines = null; } } }); }
  if (t === "ctn") return gsap.to(el, { opacity: 1, y: 0, duration: 1.2, ease: "Out", delay, overwrite: true });
  if (t === "line") return gsap.to(el, { clipPath: "inset(0% 0% -1px 0%)", duration: 1.2, ease: "Out", delay, overwrite: true });
  if (t === "slide") { const im = el.querySelector("[data-img]"); const tl = gsap.timeline({ delay }); tl.to(el, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "InOut", overwrite: true }); if (im) tl.to(im, { scale: 1, duration: 1.2, ease: "InOut", overwrite: "auto" }, "<"); return tl; }
};
QB.hide = function (el: AnyEl) {
  el._shown = false; const t = kind(el);
  if (t === "h") return gsap.to(el._words, { yPercent: -135, duration: 0.4, ease: "In", stagger: 0.025, overwrite: true });
  if (t === "p") return el._lines ? gsap.to(el._lines, { yPercent: -110, duration: 0.4, ease: "In", stagger: 0.05, overwrite: true }) : gsap.to(el, { opacity: 0, duration: 0.4, ease: "In", overwrite: true });
  if (t === "ctn") return gsap.to(el, { opacity: 0, duration: 0.4, ease: "In", overwrite: true });
  if (t === "line") return gsap.to(el, { clipPath: "inset(0% 0% -1px 100%)", duration: 0.4, ease: "In", overwrite: true });
  if (t === "slide") { const im = el.querySelector("[data-img]"); gsap.to(el, { clipPath: "inset(100% 0% 0% 0%)", duration: 1.2, ease: "InOut", overwrite: true }); if (im) gsap.to(im, { scale: 1.5, duration: 1.2, ease: "InOut", overwrite: "auto" }); }
};
QB.resetHidden = function (el: AnyEl) {
  const t = kind(el); el._shown = false;
  if (t === "h") gsap.set(el._words, { yPercent: 135 });
  else if (t === "p") { gsap.set(el, { opacity: 1 }); if (!el._lines) QB.splitP(el); gsap.set(el._lines, { yPercent: 110 }); }
  else if (t === "ctn") gsap.set(el, { opacity: 0, y: "3.333rem" });
  else if (t === "line") gsap.set(el, { clipPath: "inset(0% 100% -1px 0%)" });
  else if (t === "slide") { gsap.set(el, { clipPath: "inset(0% 0% 100% 0%)" }); const im = el.querySelector("[data-img]"); if (im) gsap.set(im, { scale: 1.5 }); }
};
QB.revealGroup = function (items: AnyEl[], delay = 0) { items.forEach((el, i) => QB.reveal(el, delay + i * 0.1)); };
QB.initScrollReveals = function (scope: Element) {
  if (QB.reduced) return;
  const make = (trigger: Element, items: AnyEl[]) => { let done = false; const go = () => { if (done) return; done = true; QB.revealGroup(items, 0.2); }; ScrollTrigger.create({ trigger, start: "top bottom", once: true, onEnter: go }); if (window.IntersectionObserver) { const io = new IntersectionObserver((es) => { if (es.some((x) => x.isIntersecting)) { go(); io.disconnect(); } }, { rootMargin: "0px 0px 10% 0px" }); io.observe(trigger); QB.onCleanup(() => io.disconnect()); } };
  q("[data-reveal]", scope).filter((el) => !el.closest("[data-group]") && !el.hasAttribute("data-manual") && !el.closest("[data-manual]")).forEach((el) => make(el, [el]));
  q("[data-group]", scope).forEach((gp) => { if (gp.hasAttribute("data-manual") || gp.closest("[data-manual]")) return; make(gp, [...gp.querySelectorAll("[data-reveal]")] as AnyEl[]); });
};
QB.initParallax = function (scope: Element) {
  if (QB.reduced) return;
  q('[data-parallax="w"]', scope).forEach((w) => { const im = w.querySelector('[data-parallax="img"]'); if (!im) return; gsap.fromTo(im, { yPercent: -15 }, { yPercent: 15, ease: "none", scrollTrigger: { trigger: w, start: "top bottom", end: "bottom top", scrub: true } }); });
};
QB.initSout = function (scope: Element) {
  if (QB.reduced) return;
  q("[data-sout]", scope).forEach((s) => { const fade = s.dataset.sout === "fade"; gsap.to(s, { opacity: 0.3, yPercent: fade ? 0 : QB.desktop ? 50 : 30, ease: "none", scrollTrigger: { trigger: s, start: "top top", end: "bottom top", scrub: true } }); });
};
QB.initShadows = function (scope: Element) {
  if (QB.reduced) return;
  q("[data-blob]", scope).forEach((b, i) => { const tw = gsap.to(b, { xPercent: i % 2 ? -7 : 7, yPercent: i % 2 ? 4 : -4, rotation: `+=${i % 2 ? -3 : 3}`, duration: 16 + i * 3, ease: "sine.inOut", yoyo: true, repeat: -1 }); QB.onCleanup(() => tw.kill()); });
};
QB.initSnap = function (scope: Element) {
  if (!QB.desktop || QB.reduced) return;
  const snaps = q("[data-snap]", scope); if (!snaps.length) return; let st: any, snapping = false;
  const fn = () => {
    if (snapping || QB.drawerOpen || QB.menuOpen || QB._leaving) return; clearTimeout(st);
    st = setTimeout(() => {
      let best: AnyEl | null = null, cov = 0; snaps.forEach((s) => { const r = s.getBoundingClientRect(); const c = Math.max(0, Math.min(r.bottom, innerHeight) - Math.max(r.top, 0)) / innerHeight; if (c > cov) { cov = c; best = s; } });
      if (best && cov > 0.5 && Math.abs((best as AnyEl).getBoundingClientRect().top) > 2) { snapping = true; QB.lenis.scrollTo(best, { duration: 1.2, easing: gsap.parseEase("Ease") }); setTimeout(() => (snapping = false), 1300); }
    }, 40);
  };
  QB.lenis.on("scroll", fn); QB.onCleanup(() => { clearTimeout(st); QB.lenis.off("scroll", fn); });
};
QB.initFooter = function (scope: Element) {
  const f = q1("[data-footer]", scope), inner = q1("[data-footer-inner]", scope); if (!f || !inner) return;
  const wm = q1("[data-wm-light]", scope);
  if (wm && QB.hover && !QB.reduced) {
    const pos = { x: 50, y: 120 }; const apply = () => { wm.style.setProperty("--mx", pos.x + "%"); wm.style.setProperty("--my", pos.y + "%"); };
    f.addEventListener("pointermove", (e) => { const r = wm.getBoundingClientRect(); gsap.to(pos, { x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100, duration: 0.9, ease: "power3.out", overwrite: true, onUpdate: apply }); });
    f.addEventListener("pointerleave", () => gsap.to(pos, { y: 200, duration: 1.6, ease: "power2.out", overwrite: true, onUpdate: apply }));
  }
  if (!QB.desktop || QB.reduced) return;
  gsap.fromTo(inner, { yPercent: -40 }, { yPercent: 0, ease: "none", scrollTrigger: { trigger: f, start: "top bottom", end: "bottom bottom", scrub: true } });
};

/* ---------- header ---------- */
QB.initHeader = function () {
  const header = q1("[data-header]"); if (!header) return; QB.headerEl = header;
  const colors: Record<string, string> = { dark: "#F9F4EE", light: "#211A19", color: "#FFFFFF", grey: "#211A19" };
  const theme = () => {
    const y = header.offsetHeight / 2; let bg = "dark";
    for (const s of q("[data-bg]", QB.page || QB.root)) { const r = s.getBoundingClientRect(); if (r.top <= y && r.bottom > y) { bg = s.dataset.bg || "dark"; break; } }
    if (QB.menuOpen) bg = "dark";
    header.style.color = colors[bg] || colors.dark; header.dataset.theme = bg;
    const L = header.querySelector<HTMLElement>("[data-logo-light]"), D = header.querySelector<HTMLElement>("[data-logo-dark]"); const light = bg === "light" || bg === "grey";
    if (L && D) { L.style.display = light ? "none" : "flex"; D.style.display = light ? "flex" : "none"; }
  };
  QB.theme = theme; theme();
  let dir = 0, turnY = 0; QB._hidden = false;
  QB.lenis.on("scroll", ({ scroll, direction }: any) => {
    theme(); if (direction !== dir) { dir = direction; turnY = scroll; }
    const nearBottom = scroll >= document.documentElement.scrollHeight - innerHeight - 10;
    if (direction === 1 && scroll > 100 && !QB._hidden && !QB.drawerOpen) { QB._hidden = true; gsap.to(header, { yPercent: -200, duration: 0.8, ease: "Out", overwrite: true }); }
    else if (QB._hidden && ((direction === -1 && turnY - scroll > 40) || nearBottom || scroll < 100)) { QB._hidden = false; gsap.to(header, { yPercent: 0, duration: 0.8, ease: "Out", overwrite: true }); }
  });
  const svc = q1("[data-svc]"), panel = q1("[data-svc-panel]");
  if (svc && panel && QB.hover) { svc.addEventListener("mouseenter", () => gsap.to(panel, { opacity: 1, y: 0, duration: 0.5, ease: "Out", pointerEvents: "auto", overwrite: true })); svc.addEventListener("mouseleave", () => gsap.to(panel, { opacity: 0, y: 8, duration: 0.3, ease: "In", pointerEvents: "none", overwrite: true })); }
};
QB.initHovers = function () {
  gsap.set(q("[data-ul-line]"), { xPercent: -101, x: 0 });
  QB.root.addEventListener("pointerover", (e: PointerEvent) => { const a = (e.target as Element).closest("a[href]"); if (!a) return; const h = a.getAttribute("href"); if (h && h.startsWith("/") && QB.prefetchRoute) QB.prefetchRoute(h); });
  if (!QB.desktop || !QB.hover) return;
  QB.root.addEventListener("mouseover", (e: MouseEvent) => { const a = (e.target as Element).closest("[data-ul]"); if (!a || a.contains(e.relatedTarget as Node)) return; const l = a.querySelector("[data-ul-line]"); if (l) gsap.fromTo(l, { xPercent: -101, x: 0 }, { xPercent: 0, x: 0, duration: 1.2, ease: "Out", overwrite: true }); });
  QB.root.addEventListener("mouseout", (e: MouseEvent) => { const a = (e.target as Element).closest("[data-ul]"); if (!a || a.contains(e.relatedTarget as Node)) return; const l = a.querySelector("[data-ul-line]"); if (l) gsap.to(l, { xPercent: 101, duration: 1.2, ease: "Out", overwrite: true }); });
  q("[data-navlink]").forEach((a) => {
    const A = a.querySelector("[data-nav-a]"), B = a.querySelector("[data-nav-b]"); if (!A || !B || a._split) return; a._split = true;
    const ca = new SplitText(A as HTMLElement, { type: "chars" }).chars, cb = new SplitText(B as HTMLElement, { type: "chars" }).chars;
    gsap.set(cb, { yPercent: 100, opacity: 0 }); gsap.set(B, { opacity: 1 });
    a.addEventListener("mouseenter", () => { gsap.to(ca, { yPercent: -100, opacity: 0, duration: 0.8, ease: "Out", stagger: 0.02, overwrite: true }); gsap.to(cb, { yPercent: 0, opacity: 1, duration: 0.8, ease: "Out", stagger: 0.02, overwrite: true }); });
    a.addEventListener("mouseleave", () => { gsap.to(ca, { yPercent: 0, opacity: 1, duration: 0.8, ease: "Out", stagger: 0.02, overwrite: true }); gsap.to(cb, { yPercent: 100, opacity: 0, duration: 0.8, ease: "Out", stagger: 0.02, overwrite: true }); });
  });
};
QB.initMagnetic = function (scope: Element | null) {
  if (!scope || !QB.hover) return;
  q("[data-magnetic]", scope).forEach((btn) => {
    if (btn._mag) return; btn._mag = true;
    btn.addEventListener("pointermove", (e) => { const r = btn.getBoundingClientRect(); const dx = ((e.clientX - r.left) / r.width - 0.5) * 25, dy = ((e.clientY - r.top) / r.height - 0.5) * 25; gsap.to(btn, { x: dx, y: dy, duration: 1.6, ease: "power4.out", overwrite: true }); });
    btn.addEventListener("pointerleave", () => gsap.to(btn, { x: 0, y: 0, duration: 1.6, ease: "elastic.out(1,.3)", overwrite: true }));
  });
};
QB.initCursor = function () {
  if (!QB.desktop || !QB.hover || QB.reduced) return;
  const glow = q1("[data-glow]");
  try { QB._fluid = !!initFluidCursor({ zIndex: 1150, opacity: 0.08, densityIntensity: 0.012, splatRadius: 0.012, velocityScale: 380, densityDissipation: 0.985 }); } catch { QB._fluid = false; }
  if (QB._fluid) { if (glow) gsap.set(glow, { display: "none" }); return; }
  if (!glow) return; gsap.set(glow, { display: "block", x: innerWidth / 2, y: innerHeight / 2 });
  const gx = gsap.quickTo(glow, "x", { duration: 0.6, ease: "power3" }), gy = gsap.quickTo(glow, "y", { duration: 0.6, ease: "power3" });
  addEventListener("pointermove", (e) => { gx(e.clientX); gy(e.clientY); });
};

/* ---------- accordion + sticky list ---------- */
QB.initAccordions = function (scope: Element) {
  q("[data-acc]", scope).forEach((btn) => {
    const body = btn.parentElement!.querySelector("[data-acc-body]"), icon = btn.querySelector("[data-acc-icon]"); if (!body) return;
    btn.addEventListener("click", () => {
      const open = btn.getAttribute("aria-expanded") === "true"; btn.setAttribute("aria-expanded", open ? "false" : "true");
      gsap.to(body, { height: open ? 0 : "auto", duration: 0.8, ease: "InOut", overwrite: true, onComplete: () => ScrollTrigger.refresh() });
      if (icon) gsap.to(icon, { rotation: open ? 0 : 45, duration: 0.8, ease: "InOut", overwrite: true });
    });
  });
};
QB.initSticky = function (scope: Element) {
  q("[data-sticky]", scope).forEach((sec) => {
    const titles = q("[data-st-title]", sec), imgs = q("[data-st-img]", sec), descs = q("[data-st-desc]", sec), items = q("[data-st-item]", sec);
    let active = -1;
    const activate = (i: number) => {
      if (i === active) return; active = i;
      titles.forEach((t, k) => gsap.to(t, { opacity: k === i ? 1 : 0.2, duration: 0.8, ease: "Out", overwrite: true }));
      imgs.forEach((im, k) => { if (k === i) { gsap.set(im, { zIndex: 2 }); gsap.fromTo(im, { opacity: 0, scale: 1.25 }, { opacity: 1, scale: 1, duration: 1.2, ease: "Out", overwrite: true }); } else { gsap.set(im, { zIndex: 1 }); gsap.to(im, { opacity: 0, duration: 0.8, ease: "In", overwrite: true }); } });
      descs.forEach((d, k) => gsap.to(d, { opacity: k === i ? 1 : 0, y: k === i ? 0 : 16, duration: 0.8, ease: "Out", overwrite: true, delay: k === i ? 0.2 : 0 }));
    };
    gsap.set(imgs, { opacity: 0 }); gsap.set(descs, { opacity: 0, y: 16 });
    if (!QB.desktop) { activate(0); gsap.set(titles, { opacity: 1 }); return; }
    items.forEach((it, i) => { const t = titles[i] || it; const lastOne = i === items.length - 1; ScrollTrigger.create({ trigger: t, start: "top 58%", end: lastOne ? "bottom top" : "bottom 42%", onEnter: () => activate(i), onEnterBack: () => activate(i) }); });
    activate(0);
  });
};

/* ---------- scroll lock, drawer, menu, nav ---------- */
QB.lock = function () { if (QB.lenis) QB.lenis.stop(); document.documentElement.style.overflow = "hidden"; };
QB.unlock = function () { if (QB.drawerOpen || QB.menuOpen) return; if (QB.lenis) QB.lenis.start(); document.documentElement.style.overflow = ""; };
QB.openDrawer = function (e?: any) {
  if (e && e.preventDefault) e.preventDefault(); if (QB.drawerOpen || !QB.root) return;
  if (QB.menuOpen) QB.toggleMenu();
  QB.drawerOpen = true; const ov = q1("[data-drawer-overlay]"), dr = q1("[data-drawer]"); if (!dr || !ov) return;
  QB.lock(); gsap.set([ov, dr], { display: "block" });
  gsap.to(ov, { opacity: 1, duration: 0.8, ease: "Out", overwrite: true });
  gsap.fromTo(dr, { xPercent: 100, x: 0 }, { xPercent: 0, x: 0, duration: 1.2, ease: "Out", overwrite: true });
  const items = [...dr.querySelectorAll("[data-el]")] as AnyEl[]; items.forEach((el) => QB.resetHidden(el)); items.forEach((el, i) => QB.reveal(el, 0.4 + i * 0.1));
  setTimeout(() => { const f = dr.querySelector("input"); if (f) f.focus({ preventScroll: true }); }, 900);
};
QB.closeDrawer = function () {
  if (!QB.drawerOpen) return; QB.drawerOpen = false;
  const ov = q1("[data-drawer-overlay]"), dr = q1("[data-drawer]"); if (!dr || !ov) return;
  gsap.to(dr, { xPercent: 100, duration: 0.4, ease: "In", overwrite: true });
  gsap.to(ov, { opacity: 0, duration: 0.4, ease: "In", overwrite: true, onComplete: () => { gsap.set([ov, dr], { display: "none" }); QB.unlock(); } });
};
QB.toggleMenu = function () {
  if (!QB.root) return; const open = !QB.menuOpen; QB.menuOpen = open;
  if (QB.onMenuState) QB.onMenuState(open);
  const m = q1("[data-menu]"), icon = q1("[data-menu-icon]"); if (!m) return;
  if (open) {
    QB.lock(); gsap.set(m, { display: "flex" }); gsap.to(m, { opacity: 1, duration: 0.8, ease: "Out", overwrite: true }); if (icon) gsap.to(icon, { rotation: 90, duration: 0.8, ease: "InOut" });
    const items = [...m.querySelectorAll("[data-el]")] as AnyEl[]; items.forEach((el) => QB.resetHidden(el)); items.forEach((el, i) => QB.reveal(el, 0.2 + i * 0.06));
  } else {
    gsap.to(m, { opacity: 0, duration: 0.8, ease: "In", overwrite: true, onComplete: () => { gsap.set(m, { display: "none" }); QB.unlock(); } }); if (icon) gsap.to(icon, { rotation: 0, duration: 0.8, ease: "InOut" });
  }
  if (QB.theme) QB.theme();
};
QB.navTo = function (e: any) {
  const a = e.currentTarget as HTMLElement; const href = a.getAttribute("href") || ""; e.preventDefault();
  if (href === "#" || !href) return;
  if (href.startsWith("#")) {
    const t = q1(href); if (QB.menuOpen) QB.toggleMenu();
    if (a.dataset.tabGo !== undefined && QB.onTabGo) QB.onTabGo(+a.dataset.tabGo);
    if (t && QB.lenis) QB.lenis.scrollTo(t, { duration: 1.2, easing: gsap.parseEase("Ease") });
    return;
  }
  if (/^https?:/.test(href) || (a as HTMLAnchorElement).target) { location.href = href; return; }
  if (href === location.pathname) { if (QB.menuOpen) QB.toggleMenu(); if (QB.drawerOpen) QB.closeDrawer(); QB.lenis.scrollTo(0, { duration: 1.2, easing: gsap.parseEase("Ease") }); return; }
  QB.transitionOut(href);
};
QB.iris = (el: HTMLElement, p: number) => { const h = 50 * (1 - p); el.style.clipPath = `polygon(evenodd, 0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, ${50 - h}% ${50 - h}%, ${50 + h}% ${50 - h}%, ${50 + h}% ${50 + h}%, ${50 - h}% ${50 + h}%, ${50 - h}% ${50 - h}%)`; };
QB.go = function (href: string) { QB.navigated = true; if (QB.push) QB.push(href); else location.href = href; };
QB.transitionOut = function (href: string) {
  if (QB._leaving) return; QB._leaving = true;
  if (QB.reduced) { QB.go(href); return; }
  if (QB.menuOpen) QB.toggleMenu(); if (QB.drawerOpen) QB.closeDrawer();
  if (QB.lenis) QB.lenis.stop(); document.documentElement.style.overflow = "hidden";
  const main = q1("[data-main]"), header = q1("[data-header]");
  document.body.style.background = "#211A19";
  if (header) gsap.to(header, { opacity: 0, duration: 0.4, ease: "In" });
  if (!main) { QB.go(href); return; }
  const o = { p: 1 };
  gsap.to(o, { p: 0, duration: 0.7, ease: "InOut", onUpdate: () => QB.iris(main, o.p), onComplete: () => QB.go(href) });
};
QB.enterPage = function (mode: string) {
  const main = q1("[data-main]"), header = q1("[data-header]"); if (!main) return;
  const heroItems = q("[data-hero] [data-reveal]");
  ScrollTrigger.refresh();
  if (QB.reduced) { gsap.set([main, header], { opacity: 1 }); return; }
  if (QB.navigated || mode === "iris") {
    const o = { p: 0 }; QB.iris(main, 0); gsap.set(main, { opacity: 1 }); gsap.to(header, { opacity: 1, duration: 0.8, ease: "Out", delay: 0.3 });
    gsap.to(o, { p: 1, duration: 0.9, ease: "InOut", onUpdate: () => QB.iris(main, o.p), onComplete: () => { main.style.clipPath = ""; } });
    QB.revealGroup(heroItems, 0.35); return;
  }
  gsap.to(main, { opacity: 1, duration: 1.2, ease: "Out" }); gsap.to(header, { opacity: 1, duration: 1.2, ease: "Out", delay: 0.3 });
  QB.revealGroup(heroItems, 0.3);
};
QB.validate = function (f: HTMLFormElement) {
  const v = (n: string) => ((f.elements.namedItem(n) as HTMLInputElement | null)?.value || "").trim(); const errors: Record<string, string> = {};
  if (!v("name")) errors.name = "Required Field";
  const em = v("email"); if (!em) errors.email = "Required Field"; else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) errors.email = "Please Enter a Valid Email";
  if (!v("message")) errors.message = "Required Field";
  const c = f.elements.namedItem("consent") as HTMLInputElement | null; if (c && !c.checked) errors.consent = "Required Field";
  return errors;
};
QB.brisbaneTime = function () { try { return new Intl.DateTimeFormat("en-AU", { timeZone: "Australia/Brisbane", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date()); } catch { return "--:--"; } };

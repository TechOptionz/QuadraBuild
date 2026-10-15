"use client";
import { useRef, type MouseEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import QB from "@/lib/qb-engine";
import { px, projectHref } from "@/lib/projects";
import Page from "@/components/Page";
import Promise from "@/components/Promise";
import { Img, UL, VLine, Diag, navTo, warm } from "@/components/ui";
import Sketch from "./Sketch";

/* eslint-disable @typescript-eslint/no-explicit-any */
const HERO_SLIDES = [8134821, 31737860, 30484316, 4626268, 8134746, 6077368, 31737862, 9976121];
const FEATURED = [
  { slug: "ashgrove-residence", title: "Ashgrove Residence", meta: "Renovations · Ashgrove, QLD", img: px(30484316), scrub: true, bg: "radial-gradient(80% 60% at 25% 35%,#5a483f 0%,rgba(90,72,63,0) 60%),linear-gradient(165deg,#30261f 0%,#211A19 60%,#15100e 100%)" },
  { slug: "paddington-house", title: "Paddington House", meta: "Homes · Paddington, QLD", img: px(8134821), scrub: true, bg: "radial-gradient(70% 60% at 75% 30%,#4f4a43 0%,rgba(79,74,67,0) 60%),linear-gradient(195deg,#2b2623 0%,#211A19 60%,#15100e 100%)" },
  { slug: "valley-espresso", title: "Valley Espresso", meta: "Commercial · Fortitude Valley, QLD", img: px(5490827), scrub: false, bg: "radial-gradient(80% 60% at 50% 20%,#4a4541 0%,rgba(74,69,65,0) 60%),linear-gradient(180deg,#2b2623 0%,#211A19 60%,#15100e 100%)" },
];
const TABS = [
  { num: "1.0", label: "Renovations", img: px(10153052), bg: warm(170, "#55443b", "30% 30%"), h: ["Homes,", "Reimagined."], p: "Renovate an existing home, extend your living space or refresh kitchens, bathrooms and outdoor areas. We also discuss landscaping, fencing and whole-home transformations.", cta: "Explore Renovations", href: "/renovations" },
  { num: "2.0", label: "New Homes", img: px(9976121), bg: warm(190, "#4f4a43", "70% 30%"), h: ["New", "Beginnings."], p: "From custom homes to granny flats and secondary dwellings, Quadra Homes helps shape residential building ideas around the site, the brief and everyday living.", cta: "Explore Homes", href: "/homes" },
  { num: "3.0", label: "Commercial", img: px(5490827), bg: warm(160, "#4a4541", "50% 70%"), h: ["Spaces for", "Business."], p: "Create a commercial space that serves its purpose, from retail and shop fit-outs to office improvements, hospitality environments and considered refurbishments.", cta: "Explore Commercial", href: "/commercial" },
  { num: "4.0", label: "Approvals", img: px(3990587), bg: warm(200, "#5a483f", "30% 70%"), h: ["Progress with", "Clarity."], p: "Understand the steps from an early idea to development and building applications, with practical coordination of planning information, documentation and relevant approval specialists.", cta: "Explore Approvals", href: "/approvals" },
];

export default function HomeView() {
  const S = useRef<any>({ tab: 0, tabBusy: false }).current;
  const q = (s: string) => QB.q(s, QB.page), q1 = (s: string) => QB.q1(s, QB.page);

  /* ---------- hero slideshow ---------- */
  const initHeroSlides = () => {
    const slides = q("[data-hero-slide]"), fills = q("[data-hero-fill]"); if (slides.length < 2) return;
    const HOLD = 6, FADE = 1.6; let i = 0; const calls: any[] = [];
    gsap.set(slides, { scale: 1.08 }); gsap.set(slides[0], { opacity: 1 });
    const run = () => {
      const cur = slides[i], nxt = slides[(i + 1) % slides.length];
      if (fills[i]) gsap.fromTo(fills[i], { scaleX: 0 }, { scaleX: 1, duration: HOLD, ease: "none" });
      gsap.fromTo(cur, { scale: 1.08 }, { scale: 1, duration: HOLD + FADE, ease: "none" });
      calls.push(gsap.delayedCall(HOLD, () => {
        if (fills[i]) gsap.to(fills[i], { opacity: 0, duration: FADE, onComplete: () => gsap.set(fills[i], { scaleX: 0, opacity: 1 }) });
        gsap.set(nxt, { zIndex: 2 }); gsap.set(cur, { zIndex: 1 });
        gsap.fromTo(nxt, { opacity: 0, scale: 1.12 }, { opacity: 1, scale: 1.08, duration: FADE, ease: "power2.inOut", onComplete: () => { gsap.set(cur, { opacity: 0 }); i = (i + 1) % slides.length; run(); } });
      }));
    };
    QB.onCleanup(() => { calls.forEach((c) => c.kill()); gsap.killTweensOf([...slides, ...fills]); });
    if (QB.reduced) return; S.heroRun = run;
  };
  const startHeroSlides = () => { if (S.heroRun && !S.heroStarted) { S.heroStarted = true; S.heroRun(); } };

  /* ---------- featured project cards ---------- */
  const initProjects = () => {
    q("[data-card]").forEach((card: HTMLElement) => {
      const cam = card.querySelector("[data-cam]");
      if (QB.desktop && !QB.reduced) {
        if (card.hasAttribute("data-scrub")) gsap.fromTo(cam, { scale: 1.3, xPercent: -3 }, { scale: 1, xPercent: 3, ease: "none", scrollTrigger: { trigger: card, start: "top 25%", end: "bottom 75%", scrub: 1 } });
        gsap.fromTo(cam, { yPercent: -12 }, { yPercent: 0, ease: "none", immediateRender: false, scrollTrigger: { trigger: card, start: "top bottom", end: "top top", scrub: true } });
        gsap.fromTo(cam, { yPercent: 0 }, { yPercent: 12, ease: "none", immediateRender: false, scrollTrigger: { trigger: card, start: "bottom bottom", end: "bottom top", scrub: true } });
      }
      const rings = card.querySelectorAll("[data-ring]");
      if (!QB.reduced) { const tw = gsap.fromTo(rings, { opacity: 1, scale: 1 }, { opacity: 0, scale: 2, duration: 1.2, ease: "In", stagger: { each: 0.2, repeat: -1, repeatDelay: 0.6 } }); QB.onCleanup(() => tw.kill()); }
    });
  };

  /* ---------- craft sketch ---------- */
  const initSketch = () => {
    const sec = q1("#craft"), svg = q1("[data-sk]"); if (!svg || !sec || QB.reduced) return;
    const groups = [0, 1, 2, 3].map((i) => [...svg.querySelectorAll('[data-g="' + i + '"] path')] as SVGPathElement[]);
    groups.flat().forEach((p) => { const L = p.getTotalLength(); p.style.strokeDasharray = String(L); p.style.strokeDashoffset = String(L); });
    const starts = [0, 1.5, 3.5, 6], durs = [2, 2.5, 3, 2]; const tl = gsap.timeline({ paused: true });
    groups.forEach((shapes, i) => { if (shapes.length) tl.to(shapes, { strokeDashoffset: 0, duration: durs[i], ease: "power2.out", stagger: { amount: durs[i] * 0.5 } }, starts[i]); });
    ScrollTrigger.create({ trigger: sec, start: "top 60%", once: true, onEnter: () => tl.play() });
    if (QB.desktop && QB.hover) {
      const outer = q1("[data-tilt-outer]"), inner = q1("[data-tilt]"); if (!outer || !inner) return;
      gsap.set([outer, inner], { transformPerspective: 1200 });
      gsap.fromTo(outer, { rotationX: 4 }, { rotationX: -4, ease: "none", scrollTrigger: { trigger: sec, start: "top bottom", end: "bottom top", scrub: true } });
      const rx = gsap.quickTo(inner, "rotationX", { duration: 0.6, ease: "power3" }), ry = gsap.quickTo(inner, "rotationY", { duration: 0.6, ease: "power3" });
      sec.addEventListener("pointermove", (e: PointerEvent) => { const r = sec.getBoundingClientRect(); const pxx = (e.clientX - r.left) / r.width - 0.5, pyy = (e.clientY - r.top) / r.height - 0.5; ry(pxx * 4); rx(-pyy * 2.6); });
      sec.addEventListener("pointerleave", () => { rx(0); ry(0); });
    }
  };

  /* ---------- services tabs ---------- */
  const setRows = (i: number) => { S.rows.forEach((r: HTMLElement, k: number) => { gsap.to(r, { opacity: k === i ? 1 : 0.5, duration: 0.3 }); r.setAttribute("aria-selected", k === i ? "true" : "false"); gsap.to(r.querySelector("[data-dot]"), { opacity: k === i ? 1 : 0, duration: 0.3 }); }); };
  const selectTab = (i: number) => {
    if (i === S.tab || !S.contents) return; if (S.tabBusy) { S.pending = i; return; } S.pending = undefined;
    const old = S.contents[S.tab], nw = S.contents[i], oi = S.imgs[S.tab], ni = S.imgs[i];
    S.tabBusy = true;
    gsap.set(nw, { display: "flex", position: "relative", zIndex: 1 }); gsap.set(old, { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 });
    const oldItems = [...old.querySelectorAll("[data-el],[data-reveal]")], newItems = [...nw.querySelectorAll("[data-el],[data-reveal]")];
    if (QB.reduced) { gsap.set(old, { display: "none", clearProps: "position,top,left,right,bottom,zIndex" }); gsap.set(oi, { clipPath: "inset(0% 0% 100% 0%)" }); gsap.set(ni, { clipPath: "inset(0% 0% 0% 0%)" }); setRows(i); S.tab = i; S.tabBusy = false; return; }
    oldItems.forEach((el) => QB.hide(el)); QB.hide(oi);
    newItems.forEach((el) => QB.resetHidden(el)); QB.resetHidden(ni); QB.reveal(ni, 0);
    gsap.delayedCall(0.8, () => newItems.forEach((el, k) => QB.reveal(el, k * 0.1)));
    gsap.delayedCall(1.2, () => { gsap.set(old, { display: "none", clearProps: "position,top,left,right,bottom,zIndex" }); setRows(i); S.tab = i; S.tabBusy = false; ScrollTrigger.refresh(); if (S.pending !== undefined && S.pending !== S.tab) { const p = S.pending; S.pending = undefined; selectTab(p); } });
  };
  const initTabs = () => {
    S.rows = q("[data-tab]"); S.contents = q("[data-tab-content]"); S.imgs = q("[data-tab-img]"); S.tab = 0; S.tabBusy = false;
    QB.onTabGo = (i: number) => selectTab(i);
    if (QB.hover) S.rows.forEach((r: HTMLElement, k: number) => {
      let t: any; r.addEventListener("mouseenter", () => { gsap.to(r, { opacity: 1, duration: 0.3 }); t = setTimeout(() => { if (k !== S.tab) selectTab(k); }, 160); });
      r.addEventListener("mouseleave", () => { clearTimeout(t); gsap.to(r, { opacity: k === S.tab ? 1 : 0.5, duration: 0.3 }); });
    });
  };
  const onTabClick = (e: MouseEvent<HTMLButtonElement>) => selectTab(+(e.currentTarget.dataset.i || 0));

  /* ---------- intro / enter ---------- */
  const revealHero = (delay: number) => q("#hero [data-reveal]").forEach((el: any, i: number) => QB.reveal(el, delay + i * 0.1));
  const enterSimple = () => {
    const pre = q1("[data-pre]"), main = q1("[data-main]"), header = QB.q1("[data-header]");
    gsap.set(pre, { display: "none" }); gsap.set(main, { clearProps: "transform,clipPath" });
    if (QB.enterPage && !QB.reduced) { QB.enterPage("iris"); gsap.delayedCall(0.9, () => startHeroSlides()); return; }
    gsap.to(main, { opacity: 1, duration: 1.2, ease: "Out" }); gsap.to(header, { opacity: 1, duration: 1.2, ease: "Out", delay: 0.3 });
    ScrollTrigger.refresh(); revealHero(0.3);
  };
  const finishIntro = () => {
    if (S.introDone) return; S.introDone = true;
    const pre = q1("[data-pre]"), main = q1("[data-main]");
    gsap.set(pre, { display: "none" }); gsap.set(main, { clearProps: "transform" });
    try { sessionStorage.setItem("qb_visited", "1"); } catch {}
    QB.unlock(); ScrollTrigger.refresh(); revealHero(0.1); startHeroSlides();
  };
  const playIntro = () => {
    QB.lock();
    const pre = q1("[data-pre]"), main = q1("[data-main]"), header = QB.q1("[data-header]");
    gsap.set(pre, { visibility: "visible" });
    const words = q("[data-pw]"), anchors = q("[data-pt]"), masks = words.map((w: HTMLElement) => w.parentElement as HTMLElement);
    const counter = q1("[data-pre-count]"), prog = q1("[data-pre-prog]"), frame = q1("[data-pre-frame]"), fimg = frame.querySelector("[data-img]");
    const logo = q1("[data-pre-logo]"), hLogo = QB.q1("[data-logo]"), texts = q("[data-pre-text]");
    gsap.set(main, { opacity: 1, scale: 0.5, transformOrigin: "center 50vh" });
    gsap.set(words, { yPercent: 135 }); gsap.set(frame, { clipPath: "inset(50% 0% 50% 0%)" }); gsap.set(fimg, { scale: 1.2 }); gsap.set(texts, { opacity: 0, y: 16 });
    const deltas = masks.map((m: HTMLElement, i: number) => { const mr = m.getBoundingClientRect(), ar = anchors[i].getBoundingClientRect(); return { x: ar.left - (mr.left + mr.width / 2), y: ar.top - (mr.top + mr.height / 2) }; });
    const lr = logo.getBoundingClientRect(), hr = hLogo.getBoundingClientRect();
    const ld = { x: hr.left + hr.width / 2 - (lr.left + lr.width / 2), y: hr.top + hr.height / 2 - (lr.top + lr.height / 2) };
    const ap = { p: 0 }; const o = { v: 0 };
    const clip = (p: number) => { const h = 50 * p; pre.style.clipPath = "polygon(evenodd, 0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, " + (50 - h) + "% " + (50 - h) + "%, " + (50 + h) + "% " + (50 - h) + "%, " + (50 + h) + "% " + (50 + h) + "%, " + (50 - h) + "% " + (50 + h) + "%, " + (50 - h) + "% " + (50 - h) + "%)"; };
    const tl = gsap.timeline({ onComplete: () => finishIntro() });
    tl.to(words, { yPercent: 0, duration: 1.2, ease: "Out", stagger: 0.1 }, 0)
      .to(texts, { opacity: 1, y: 0, duration: 1.2, ease: "Out", stagger: 0.1 }, 0.3)
      .to(o, { v: 100, duration: 3, ease: "loaderEase", onUpdate: () => { counter.textContent = String(Math.round(o.v)).padStart(2, "0") + " %"; prog.style.transform = "scaleX(" + o.v / 100 + ")"; } }, 1.2)
      .add(() => masks.forEach((m: HTMLElement) => (m.style.overflow = "visible")), 1.3)
      .to(words, { x: (i: number) => deltas[i].x, y: (i: number) => deltas[i].y, duration: 1.2, ease: "InOut" }, 1.3)
      .to(logo, { x: ld.x, y: ld.y, scale: 0.45, duration: 1.2, ease: "InOut" }, 1.3)
      .to(prog, { opacity: 0, duration: 0.4 }, 1.3)
      .to(frame, { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "InOut" }, 1.4)
      .to(fimg, { scale: 1, duration: 1, ease: "InOut" }, 1.4)
      .to(words, { x: 0, y: 0, duration: 1.2, ease: "InOut" }, 2.9)
      .to(frame, { clipPath: "inset(50% 0% 50% 0%)", duration: 0.8, ease: "InOut" }, 2.9)
      .to(fimg, { scale: 1.2, duration: 0.8, ease: "InOut" }, 2.9)
      .to(ap, { p: 1, duration: 1.8, ease: "InOut", onUpdate: () => clip(ap.p) }, 4.3)
      .to(main, { scale: 1, duration: 1.8, ease: "InOut" }, 4.3)
      .to(header, { opacity: 1, duration: 1, ease: "Out" }, 5.2);
    S.introDone = false;
    const wd = setTimeout(() => { if (!S.introDone) tl.progress(1); }, 12000); // watchdog: never leave the page hidden behind the preloader
    QB.onCleanup(() => { clearTimeout(wd); tl.kill(); });
  };
  const onInit = () => {
    S.heroStarted = false;
    initHeroSlides(); initProjects(); initSketch(); initTabs();
    // Full intro only on a direct load of the home page; client-side navigations get the iris entrance.
    if (QB.reduced || QB.navigated) enterSimple(); else playIntro();
  };

  const underline = (label: string, href: string, extra: Record<string, string | undefined> = {}) => <UL href={href} label={label} data-reveal="ctn" {...extra} />;

  return (
    <Page current="home" enter={false} onInit={onInit} before={<Preloader />}>
      {/* 01 HERO */}
      <section id="hero" data-hero data-bg="color" data-sout style={{ position: "relative", height: "100svh", minHeight: 600, overflow: "hidden", background: "#211A19", color: "#fff" }}>
        <div data-parallax="w" style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <div data-parallax="img" style={{ position: "absolute", left: 0, right: 0, top: "-15%", height: "130%", background: "radial-gradient(90% 70% at 30% 30%,#54433b 0%,rgba(84,67,59,0) 60%),radial-gradient(60% 50% at 80% 80%,#3b2f2a 0%,rgba(59,47,42,0) 70%),linear-gradient(170deg,#2a2220 0%,#211A19 55%,#17120f 100%)" }}>
            {HERO_SLIDES.map((id, i) => (
              <div key={id} data-hero-slide={i} style={{ position: "absolute", inset: 0, opacity: i ? 0 : 1, willChange: "transform,opacity" }}><Img src={px(id, 2560)} alt="" priority={i === 0} eager /></div>
            ))}
          </div>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: "32vh", background: "linear-gradient(rgba(0,0,0,.35),rgba(0,0,0,0))", pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "50vh", background: "linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.5))", pointerEvents: "none" }} />
        <div data-r="desk" data-hero-dots style={{ position: "absolute", right: "var(--pad)", bottom: "3.3rem", display: "flex", gap: ".6rem", alignItems: "center", zIndex: 2 }}>
          {HERO_SLIDES.map((id, i) => (
            <span key={id} data-hero-dot={i} style={{ position: "relative", width: "2rem", height: 1, background: "rgba(255,255,255,.3)", overflow: "hidden" }}><span data-hero-fill style={{ position: "absolute", inset: 0, background: "#FF6500", transform: "scaleX(0)", transformOrigin: "left" }} /></span>
          ))}
        </div>
        <div data-grid data-r="hero-bottom" style={{ padding: "0 var(--pad) 3rem", position: "absolute", left: 0, right: 0, bottom: 0, alignItems: "end", pointerEvents: "none" }}>
          <div data-reveal="ctn" data-manual data-mo="3" style={{ gridColumn: "1/4", display: "flex", flexDirection: "column", gap: ".4rem", pointerEvents: "auto" }}>
            <span className="lab">Quadra Build</span>
            <span className="h3" style={{ opacity: 0.85 }}>Brisbane and South East Queensland</span>
          </div>
          <div data-mo="1" style={{ gridColumn: "7/12", display: "flex", flexDirection: "column", gap: "2.5rem", pointerEvents: "auto" }}>
            <h1 data-reveal="h" data-manual data-hero-h className="h1" style={{ color: "#fff" }}><span data-ln className="ln">We build.</span><span data-ln className="ln">We renovate.</span><span data-ln className="ln">We transform.</span></h1>
            <div style={{ display: "flex", gap: "3rem", alignItems: "center" }}>
              <span data-reveal="p" data-manual data-r="desk" className="lab5">Scroll to explore</span>
              <UL href="#services" label="Explore Services" data-reveal="ctn" data-manual data-r="mob" gap="2rem" lineOpacity={0.4} />
            </div>
          </div>
        </div>
      </section>

      {/* 02 ABOUT */}
      <section id="about" data-bg="dark" style={{ position: "relative", background: "#211A19", color: "#F9F4EE", padding: "var(--sec) 0 calc(var(--sec) * .8)", overflow: "hidden" }}>
        <div data-shadow style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", mixBlendMode: "multiply" }}>
          <div data-blob style={{ position: "absolute", left: "-10%", top: "-20%", width: "70%", height: "60%", background: "radial-gradient(ellipse at center,rgba(0,0,0,.55) 0%,rgba(0,0,0,0) 65%)", transform: "rotate(-18deg)", filter: "blur(40px)" }} />
          <div data-blob style={{ position: "absolute", right: "-15%", bottom: "-25%", width: "60%", height: "70%", background: "radial-gradient(ellipse at center,rgba(0,0,0,.45) 0%,rgba(0,0,0,0) 65%)", transform: "rotate(22deg)", filter: "blur(50px)" }} />
        </div>
        <VLine />
        <div data-grid style={{ padding: "0 var(--pad)", alignItems: "center", position: "relative", rowGap: "3rem" }}>
          <div data-mo="2" style={{ gridColumn: "1/6" }}>
            <div data-reveal="slide" data-parallax="w" style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden" }}>
              <div data-img data-parallax="img" style={{ position: "absolute", left: 0, right: 0, top: "-15%", height: "130%", background: warm() }}><Img src={px(30484316)} alt="Quadra Build project interior" sizes="(min-width: 992px) 42vw, 100vw" /></div>
            </div>
          </div>
          <div data-group data-mo="1" style={{ gridColumn: "7/13", position: "relative" }}>
            <span data-eyebrow data-reveal="ctn" className="lab" style={{ position: "absolute", left: 0, top: ".45em" }}>About</span>
            <h2 data-reveal="h" data-indent className="h2" style={{ textIndent: "9rem" }}>At Quadra Build, we see every project as a chance to make a place work better. From considered home renovations and new builds to commercial fit-outs and development approval support, we bring planning, practical thinking and attention to detail together for people building their next chapter in Brisbane and South East Queensland.</h2>
            <div data-grid style={{ gridTemplateColumns: "repeat(6,1fr)", padding: 0, marginTop: "4rem", rowGap: "2.5rem" }}>
              <p data-reveal="p" className="lab5" style={{ gridColumn: "1/4", lineHeight: 1.6, color: "rgba(249,244,238,.62)", maxWidth: "20rem" }}>Thoughtfully planned.<br />Built around the way you live.</p>
              <div style={{ gridColumn: "4/7", display: "flex", flexDirection: "column", gap: "1.4rem" }}>
                <p data-reveal="p" className="p1">Every successful project begins with listening. We take time to understand the site, the brief and the way each space will be used, then bring the right people and practical approach to the work. Good decisions at the beginning shape better outcomes at the end.</p>
                <p data-reveal="p" className="p1">Our four service divisions connect the parts of a project that are often treated separately: improving an existing home, creating a new one, shaping a commercial environment and navigating approvals. The aim is a clearer process, considered decisions and a result that feels right for its purpose.</p>
                {underline("Our Story", "/about", { style: undefined })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 PHILOSOPHY */}
      <section id="philosophy" data-bg="dark" style={{ position: "relative", background: "#211A19", color: "#F9F4EE", padding: "calc(var(--sec) * .6) 0 0", overflow: "hidden" }}>
        <VLine />
        <Diag />
        <div data-grid data-group style={{ padding: "0 var(--pad)", position: "relative", rowGap: "3rem" }}>
          <h2 data-reveal="h" className="h1" style={{ gridColumn: "1/6" }}>Thoughtful</h2>
          <h2 data-reveal="h" className="h1" style={{ gridColumn: "7/13" }}><span data-ln className="ln">Spaces</span><span data-ln className="ln" style={{ paddingLeft: "4rem" }}>Designed To</span><span data-ln className="ln">Last.</span></h2>
          <div data-r="bleed" style={{ gridColumn: "1/7", marginLeft: "calc(-1 * var(--pad))", marginTop: "1rem" }}>
            <div data-reveal="slide" data-parallax="w" style={{ position: "relative", aspectRatio: "3/2", overflow: "hidden" }}>
              <div data-img data-parallax="img" style={{ position: "absolute", left: 0, right: 0, top: "-15%", height: "130%", background: warm(200, "#4a3b35", "30% 30%") }}><Img src={px(5982764)} alt="Living space" sizes="(min-width: 992px) 50vw, 100vw" /></div>
            </div>
          </div>
          <div style={{ gridColumn: "7/13", alignSelf: "end", paddingBottom: "2rem" }}>
            <div style={{ maxWidth: "26rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <p data-reveal="ctn" className="sans" style={{ fontWeight: 700, fontSize: "var(--p1)", lineHeight: 1.4 }}>Approach</p>
              <p data-reveal="p" className="p1">We believe good construction is about more than what you see on the day of handover. It is about useful layouts, lasting materials, careful coordination and spaces that continue to feel right as life changes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 04 FEATURED PROJECTS */}
      <section id="projects" aria-label="Featured projects" style={{ position: "relative", background: "#211A19", color: "#fff" }}>
        {FEATURED.map((p, i) => {
          const last = i === FEATURED.length - 1;
          return (
            <div key={p.slug} data-card data-scrub={p.scrub ? "" : undefined} data-bg="color" style={{ position: "relative", height: last ? "100vh" : "300vh", overflow: "clip", background: "#211A19" }}>
              <div data-screen style={{ position: last ? "relative" : "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
                <div data-cam style={{ position: "absolute", left: 0, right: 0, top: "-15%", height: "130%", background: p.bg }}><Img src={p.img} alt={p.title} /></div>
                <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "60%", background: "linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.6))", pointerEvents: "none" }} />
                <a href={projectHref(p.slug)} onClick={navTo} data-info style={{ position: "absolute", left: "var(--pad)", bottom: "3rem", display: "flex", flexDirection: "column", gap: "1.2rem", color: "#fff" }}>
                  <span data-pulse className="sans" style={{ position: "relative", width: "6rem", height: "6rem", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,.6)", borderRadius: "50%", fontWeight: 700, fontSize: ".6rem", lineHeight: 1.3, letterSpacing: ".08em", textTransform: "uppercase", textAlign: "center" }}>
                    <span style={{ position: "relative", zIndex: 1 }}>View<br />Project</span>
                    <span data-ring style={{ position: "absolute", inset: 0, border: "1px solid rgba(255,255,255,.5)", borderRadius: "50%" }} /><span data-ring style={{ position: "absolute", inset: 0, border: "1px solid rgba(255,255,255,.5)", borderRadius: "50%" }} />
                  </span>
                  <span className="lab" style={{ color: "rgba(255,255,255,.8)" }}>{p.meta}</span>
                  <span className="h2t" style={{ marginTop: "-.6rem" }}>{p.title}</span>
                </a>
                {last && <UL href="/projects" label="All Projects" lineOpacity={0.4} style={{ position: "absolute", right: "var(--pad)", bottom: "3rem", color: "#fff" }} />}
              </div>
              {!last && <div data-spacer style={{ height: "200vh" }} />}
            </div>
          );
        })}
      </section>

      {/* 05 CRAFT / SKETCH */}
      <section id="craft" data-bg="light" data-snap data-r="snap" style={{ position: "relative", height: "100vh", minHeight: 640, background: "#F9F4EE", color: "#211A19", overflow: "hidden" }}>
        <div data-shadow style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", mixBlendMode: "multiply" }}>
          <div data-blob style={{ position: "absolute", right: "-20%", top: "-30%", width: "80%", height: "80%", background: "radial-gradient(ellipse at center,rgba(70,50,40,.16) 0%,rgba(70,50,40,0) 62%)", transform: "rotate(28deg)", filter: "blur(30px)" }} />
          <div data-blob style={{ position: "absolute", right: "5%", top: "10%", width: "40%", height: "35%", background: "radial-gradient(ellipse at center,rgba(70,50,40,.12) 0%,rgba(70,50,40,0) 65%)", transform: "rotate(-12deg)", filter: "blur(24px)" }} />
        </div>
        <Diag color="rgba(33,26,25,.12)" width="150vw" />
        <div data-grid data-group data-craft-grid style={{ gridTemplateRows: "1fr auto", padding: "var(--hh) var(--pad) 3rem", position: "relative", height: "100%", rowGap: "2.5rem" }}>
          <div data-tilt-outer data-sk-wrap data-r="pt" style={{ gridColumn: "1/9", gridRow: 1, alignSelf: "center", position: "relative" }}>
            <div data-tilt><Sketch /></div>
            <div className="mono" style={{ position: "absolute", left: 0, bottom: "-1.6rem", color: "rgba(33,26,25,.5)" }}>[CLIENT ASSET: ARCHITECTURAL_LINE_SKETCH.svg] — stand-in drawing, animation-ready</div>
          </div>
          <h2 data-reveal="h" className="h1" style={{ gridColumn: "7/11", gridRow: 1, alignSelf: "center", position: "relative", zIndex: 2 }}><span data-ln className="ln">Crafted with Care.</span><span data-ln className="ln">Made for Living.</span></h2>
          <div style={{ gridColumn: "7/10", gridRow: 2, display: "flex", flexDirection: "column", gap: "1.6rem" }}>
            <p data-reveal="p" className="p1">The details give a space its character. We look at how rooms connect, how materials feel and how finishes meet, then consider the practical construction decisions behind them. From first conversations to final touches, each choice should support the design and the people using it.</p>
            {underline("Our Process", "/about")}
          </div>
          <p data-reveal="p" className="p1" style={{ gridColumn: "10/13", gridRow: 2 }}>From a single-room renovation to a new home or commercial fit-out, our thinking starts with the site and its purpose. Brisbane&apos;s climate, light and outdoor way of life shape the opportunities we explore.</p>
        </div>
      </section>

      {/* 06 STATEMENT */}
      <section id="statement" data-statement data-bg="color" data-snap data-r="snap" style={{ position: "relative", height: "100vh", minHeight: 640, overflow: "hidden", background: "#211A19", color: "#fff" }}>
        <div data-parallax="w" style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <div data-parallax="img" style={{ position: "absolute", left: 0, right: 0, top: "-15%", height: "130%", background: "radial-gradient(70% 60% at 50% 40%,#5c4a3f 0%,rgba(92,74,63,0) 60%),linear-gradient(180deg,#33291f 0%,#211A19 55%,#120e0c 100%)" }}><Img src={px(8134745)} alt="" /></div>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "40%", background: "linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.35))", pointerEvents: "none" }} />
        <div data-grid data-group data-spread-wrap style={{ padding: "0 var(--pad)", position: "absolute", left: 0, right: 0, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", rowGap: ".4rem" }}>
          <h2 data-reveal="h" className="h1" style={{ gridColumn: "1/5" }}>RENOVATE.</h2>
          <h2 data-reveal="h" className="h1" style={{ gridColumn: "6/9" }}>BUILD.</h2>
          <h2 data-reveal="h" data-r="spread" className="h1" style={{ gridColumn: "9/13", textAlign: "right" }}>TRANSFORM.</h2>
        </div>
        <div data-grid data-group data-spread-bottom style={{ padding: "0 var(--pad) 3rem", position: "absolute", left: 0, right: 0, bottom: 0, alignItems: "end", rowGap: "2rem", pointerEvents: "none" }}>
          <div data-reveal="ctn" data-mo="2" style={{ gridColumn: "1/4", display: "flex", flexDirection: "column", gap: ".4rem" }}>
            <span className="lab">Our Vision</span>
            <span className="h3" style={{ opacity: 0.85 }}>Spaces for the next chapter</span>
          </div>
          <div data-mo="1" style={{ gridColumn: "7/11", display: "flex", flexDirection: "column", gap: "1.6rem", pointerEvents: "auto" }}>
            <p data-reveal="p" className="p1" style={{ maxWidth: "26rem" }}>A family home ready for change. A new space to make your own. A workplace that needs to work harder. Whatever the brief, we start by understanding what matters and build a practical way forward.</p>
            <UL href="#services" label="Explore Services" data-reveal="ctn" data-r="mob" gap="2rem" lineOpacity={0.4} />
          </div>
        </div>
      </section>

      {/* 07 SERVICES */}
      <section id="services" data-bg="light" data-group style={{ position: "relative", background: "#F9F4EE", color: "#211A19", padding: "var(--sec) 0", overflow: "hidden" }}>
        <div data-shadow style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", mixBlendMode: "multiply" }}>
          <div data-blob style={{ position: "absolute", left: "-10%", top: "-40%", width: "90%", height: "90%", background: "radial-gradient(ellipse at center,rgba(70,50,40,.1) 0%,rgba(70,50,40,0) 62%)", transform: "rotate(-20deg)", filter: "blur(36px)" }} />
        </div>
        <div data-grid style={{ padding: "0 var(--pad)", position: "relative", alignItems: "stretch", rowGap: "2rem" }}>
          <div data-r="mob" data-mo="0" className="lab" style={{ gridColumn: "1/-1", display: "block" }}>Services</div>
          <div data-r="stage" data-mo="4" style={{ gridColumn: "1/7", position: "relative", aspectRatio: "16/10", overflow: "hidden" }}>
            {TABS.map((t, i) => (
              <div key={t.href} data-tab-img={i} {...(i ? { "data-el": "slide" } : { "data-reveal": "slide" })} style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
                <div data-img style={{ position: "absolute", inset: 0, background: t.bg }}><Img src={t.img} alt={t.label} eager sizes="(min-width: 992px) 50vw, 100vw" /></div>
              </div>
            ))}
          </div>
          <div data-mo="1" role="tablist" aria-label="Service divisions" style={{ gridColumn: "7/10", display: "flex", flexDirection: "column", alignSelf: "start" }}>
            {TABS.map((t, i) => (
              <button key={t.href} data-tab data-i={i} role="tab" aria-selected={i === 0} onClick={onTabClick} style={{ display: "grid", gridTemplateColumns: "2.6rem 1fr auto", alignItems: "center", gap: ".6rem", width: "100%", padding: "1.1rem 0", background: "none", border: 0, borderBottom: "1px solid rgba(33,26,25,.15)", color: "inherit", opacity: i ? 0.5 : 1, cursor: "pointer", textAlign: "left" }}>
                <span className="sans" style={{ fontWeight: 500, fontSize: "var(--l1)", letterSpacing: ".08em", color: "#FF6500" }}>{t.num}</span>
                <span className="serif" style={{ fontSize: "calc(var(--h2) * .72)", lineHeight: 1, letterSpacing: "-.02em" }}>{t.label}</span>
                <span data-dot style={{ width: 7, height: 7, borderRadius: "50%", background: "#FF6500", opacity: i ? 0 : 1, transition: "transform .4s" }} />
              </button>
            ))}
          </div>
          <div data-mo="2" data-tab-col style={{ gridColumn: "10/13", position: "relative", display: "flex", flexDirection: "column", minHeight: "22rem" }}>
            {TABS.map((t, i) => {
              const r = i ? "data-el" : "data-reveal";
              return (
                <div key={t.href} data-tab-content={i} style={{ position: "relative", flex: 1, display: i ? "none" : "flex", flexDirection: "column", justifyContent: "space-between", gap: "3rem" }}>
                  <h2 {...{ [r]: "h" }} className="h1"><span data-ln className="ln">{t.h[0]}</span><span data-ln className="ln">{t.h[1]}</span></h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: "1.6rem" }}>
                    <p {...{ [r]: "p" }} className="p1">{t.p}</p>
                    <UL href={t.href} label={t.cta} dot minWidth="12rem" {...{ [r]: "ctn" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 08 PROMISE */}
      <Promise />
    </Page>
  );
}

function Preloader() {
  const lines = ["16.666%", "33.333%", "50%", "66.666%", "83.333%"];
  return (
    <div data-pre style={{ position: "fixed", inset: 0, zIndex: 3000, background: "#211A19", color: "#F9F4EE", overflow: "hidden", visibility: "hidden" }}>
      {lines.map((l) => <div key={l} style={{ position: "absolute", top: 0, bottom: 0, left: l, width: 1, background: "rgba(249,244,238,.1)" }} />)}
      <div data-pre-logo style={{ position: "absolute", left: "var(--pad)", top: "50%", transform: "translateY(-50%)", width: "18rem" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/qb2-lockup-light.png" alt="Quadra Build" style={{ width: "100%", height: "auto", display: "block" }} />
      </div>
      <div data-pre-prog style={{ position: "absolute", left: "var(--pad)", top: "calc(50% + 6.9rem)", width: "18rem", height: 1, background: "#FF6500", transform: "scaleX(0)", transformOrigin: "left" }} />
      <div data-pre-head className="h1" style={{ position: "absolute", left: "50%", top: "50%", transform: "translateY(-50%)", whiteSpace: "nowrap", paddingLeft: "1rem" }}>
        {["Built", "With", "Care", "Always"].map((w) => (
          <span key={w} style={{ display: "inline-block", overflow: "hidden", padding: ".1em 0 .2em", margin: "-.1em 0 -.2em", verticalAlign: "top" }}><span data-pw style={{ display: "inline-block" }}>{w}</span>{" "}</span>
        ))}
      </div>
      {[["8.333%", "50%"], ["25%", "50%"], ["58.333%", "26%"], ["58.333%", "74%"]].map(([l, t]) => <div key={l + t} data-pt style={{ position: "absolute", left: l, top: t, width: 0, height: 0 }} />)}
      <div data-pre-frame style={{ position: "absolute", left: "calc(66.666% + 1.5rem)", right: "1.5rem", top: "18vh", height: "64vh", overflow: "hidden" }}>
        <div data-img style={{ position: "absolute", inset: 0, background: warm() }}><Img src={px(9976121)} alt="" priority sizes="33vw" /></div>
      </div>
      <div data-pre-text style={{ position: "absolute", left: "var(--pad)", bottom: "var(--pad)", display: "flex", gap: "1.5rem", alignItems: "baseline" }}>
        <span className="lab5" style={{ color: "rgba(249,244,238,.7)" }}>Loading</span>
        <span data-pre-count className="serif" style={{ fontSize: "var(--h3)", lineHeight: 1 }}>00 %</span>
      </div>
      <div data-pre-text style={{ position: "absolute", left: "50%", bottom: "var(--pad)", paddingLeft: "1rem", display: "flex", flexDirection: "column", gap: ".4rem" }}>
        <span className="lab">Quadra Build</span>
        <span className="h3">Building spaces for everyday life.</span>
      </div>
    </div>
  );
}

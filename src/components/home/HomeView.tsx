"use client";
import { useEffect, useRef, useState, type MouseEvent } from "react";
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
  { slug: "ashgrove-residence", title: "Ashgrove Residence", meta: "Renovations · Ashgrove, QLD", img: px(30484316), scrub: true, bg: "radial-gradient(80% 60% at 25% 35%,#5a483f 0%,transparent 60%),linear-gradient(165deg,#2b2320 0%,#211A19 60%,#15100e 100%)" },
  { slug: "paddington-house", title: "Paddington House", meta: "Homes · Paddington, QLD", img: px(8134821), scrub: true, bg: "radial-gradient(70% 60% at 75% 30%,#4a3b35 0%,transparent 60%),linear-gradient(195deg,#2b2320 0%,#211A19 60%,#15100e 100%)" },
  { slug: "valley-espresso", title: "Valley Espresso", meta: "Commercial · Fortitude Valley, QLD", img: px(5490827), scrub: false, bg: "radial-gradient(80% 60% at 50% 20%,#4a3b35 0%,transparent 60%),linear-gradient(180deg,#2b2320 0%,#211A19 60%,#15100e 100%)" },
];
const TABS = [
  { num: "1.0", label: "Renovations", img: px(10153052), bg: warm(170, "#5a483f", "30% 30%"), h: ["Homes,", "Reimagined."], p: "Renovate an existing home, extend your living space or refresh kitchens, bathrooms and outdoor areas. We also discuss landscaping, fencing and whole-home transformations.", cta: "Explore Renovations", href: "/renovations" },
  { num: "2.0", label: "New Homes", img: px(9976121), bg: warm(190, "#4a3b35", "70% 30%"), h: ["New", "Beginnings."], p: "From custom homes to granny flats and secondary dwellings, Quadra Homes helps shape residential building ideas around the site, the brief and everyday living.", cta: "Explore Homes", href: "/homes" },
  { num: "3.0", label: "Commercial", img: px(5490827), bg: warm(160, "#4a3b35", "50% 70%"), h: ["Spaces for", "Business."], p: "Create a commercial space that serves its purpose, from retail and shop fit-outs to office improvements, hospitality environments and considered refurbishments.", cta: "Explore Commercial", href: "/commercial" },
  { num: "4.0", label: "Approvals", img: px(3990587), bg: warm(200, "#5a483f", "30% 70%"), h: ["Progress with", "Clarity."], p: "Understand the steps from an early idea to development and building applications, with practical coordination of planning information, documentation and relevant approval specialists.", cta: "Explore Approvals", href: "/approvals" },
];

export default function HomeView() {
  const S = useRef<any>({ tab: 0, tabBusy: false }).current;
  const q = (s: string) => QB.q(s, QB.page), q1 = (s: string) => QB.q1(s, QB.page);

  /* ---------- hero slideshow ---------- */
  const initHeroSlides = () => {
    const slides = q("[data-hero-slide]"), fills = q("[data-hero-fill]"); if (slides.length < 2) return;
    const HOLD = 4.5, FADE = 1.2; let i = 0; const calls: any[] = [];
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

  /* ---------- enter ---------- */
  const revealHero = (delay: number) => q("#hero [data-reveal]").forEach((el: any, i: number) => QB.reveal(el, delay + i * 0.1));
  const enter = () => {
    const main = q1("[data-main]"), header = QB.q1("[data-header]");
    gsap.set(main, { clearProps: "transform,clipPath" });
    if (QB.enterPage && !QB.reduced) { QB.enterPage("iris"); gsap.delayedCall(0.9, () => startHeroSlides()); return; }
    gsap.to(main, { opacity: 1, duration: 1.2, ease: "Out" }); gsap.to(header, { opacity: 1, duration: 1.2, ease: "Out", delay: 0.3 });
    ScrollTrigger.refresh(); revealHero(0.3);
  };
  const onInit = () => {
    S.heroStarted = false;
    initHeroSlides(); initProjects(); initSketch(); initTabs();
    enter();
  };

  const underline = (label: string, href: string, extra: Record<string, string | undefined> = {}) => <UL href={href} label={label} data-reveal="ctn" {...extra} />;

  return (
    <Page current="home" enter={false} onInit={onInit}>
      {/* 01 HERO */}
      <section id="hero" data-hero data-bg="color" data-sout style={{ position: "relative", height: "100svh", minHeight: 600, overflow: "hidden", background: "#211A19", color: "#fff" }}>
        <div data-parallax="w" style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <div data-parallax="img" style={{ position: "absolute", left: 0, right: 0, top: "-15%", height: "130%", background: "radial-gradient(90% 70% at 30% 30%,#5a483f 0%,transparent 60%),radial-gradient(60% 50% at 80% 80%,#4a3b35 0%,transparent 70%),linear-gradient(170deg,#2b2320 0%,#211A19 55%,#15100e 100%)" }}>
            <HeroSlides />
          </div>
        </div>
        <div data-hero-scrim />
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: "32vh", background: "linear-gradient(rgba(0,0,0,.35),rgba(0,0,0,0))", pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "50vh", background: "linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.5))", pointerEvents: "none" }} />
        <div data-r="desk" data-hero-dots style={{ position: "absolute", right: "var(--pad)", bottom: "3.3rem", display: "flex", gap: ".6rem", alignItems: "center", zIndex: 2 }}>
          {HERO_SLIDES.map((id, i) => (
            <span key={id} data-hero-dot={i} style={{ position: "relative", width: "2rem", height: 1, background: "rgba(255,255,255,.3)", overflow: "hidden" }}><span data-hero-fill style={{ position: "absolute", inset: 0, background: "#FF6500", transform: "scaleX(0)", transformOrigin: "left" }} /></span>
          ))}
        </div>
        <div data-grid data-r="hero-bottom" style={{ padding: "0 var(--pad) 3rem", position: "absolute", left: 0, right: 0, bottom: 0, alignItems: "end", pointerEvents: "none" }}>
          <div data-mo="1" style={{ gridColumn: "1/9", display: "flex", flexDirection: "column", gap: "2.4rem", pointerEvents: "auto" }}>
            <div data-reveal="ctn" data-manual style={{ display: "flex", flexDirection: "column", gap: ".4rem" }}>
              <span className="lab">Quadra Build</span>
              <span className="h3" style={{ opacity: 0.85 }}>Brisbane and South East Queensland</span>
            </div>
            <h1 data-reveal="h" data-manual data-hero-h className="h1" style={{ color: "#fff", fontSize: "calc(var(--h1) * 1.45)" }}><span data-ln className="ln">We build.</span><span data-ln className="ln">We renovate.</span><span data-ln className="ln">We transform.</span></h1>
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
          <div data-blob style={{ position: "absolute", left: "-10%", top: "-20%", width: "70%", height: "60%", background: "radial-gradient(ellipse at center,rgba(0,0,0,.55) 0%,rgba(0,0,0,0) 65%)", transform: "rotate(-18deg)" }} />
          <div data-blob style={{ position: "absolute", right: "-15%", bottom: "-25%", width: "60%", height: "70%", background: "radial-gradient(ellipse at center,rgba(0,0,0,.45) 0%,rgba(0,0,0,0) 65%)", transform: "rotate(22deg)" }} />
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
          <div data-blob style={{ position: "absolute", right: "-20%", top: "-30%", width: "80%", height: "80%", background: "radial-gradient(ellipse at center,rgba(70,50,40,.16) 0%,transparent 62%)", transform: "rotate(28deg)" }} />
          <div data-blob style={{ position: "absolute", right: "5%", top: "10%", width: "40%", height: "35%", background: "radial-gradient(ellipse at center,rgba(70,50,40,.12) 0%,transparent 65%)", transform: "rotate(-12deg)" }} />
        </div>
        <Diag color="rgba(33,26,25,.12)" width="150vw" />
        <div data-grid data-group data-craft-grid style={{ gridTemplateRows: "minmax(0,1fr) auto", padding: "var(--hh) var(--pad) 3rem", position: "relative", height: "100%", rowGap: "2.5rem" }}>
          <div data-tilt-outer data-sk-wrap data-r="pt" style={{ gridColumn: "1/9", gridRow: 1, alignSelf: "stretch", minHeight: 0, position: "relative" }}>
            <div data-tilt style={{ height: "100%" }}><Sketch /></div>
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
          <div data-parallax="img" style={{ position: "absolute", left: 0, right: 0, top: "-15%", height: "130%", background: "radial-gradient(70% 60% at 50% 40%,#5a483f 0%,transparent 60%),linear-gradient(180deg,#2b2320 0%,#211A19 55%,#15100e 100%)" }}><Img src={px(8134745)} alt="" /></div>
        </div>
        <div data-r="shade" style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "40%", background: "linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.35))", pointerEvents: "none" }} />
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
          <div data-blob style={{ position: "absolute", left: "-10%", top: "-40%", width: "90%", height: "90%", background: "radial-gradient(ellipse at center,rgba(70,50,40,.10) 0%,transparent 62%)", transform: "rotate(-20deg)" }} />
        </div>
        <div data-grid style={{ padding: "0 var(--pad)", position: "relative", alignItems: "stretch", rowGap: "2rem" }}>
          <div data-r="mob" data-mo="0" className="lab" style={{ gridColumn: "1/-1", display: "block" }}>Services</div>
          <div data-r="stage" data-mo="4" style={{ gridColumn: "1/7", position: "relative", aspectRatio: "16/10", overflow: "hidden" }}>
            {TABS.map((t, i) => (
              <div key={t.href} data-tab-img={i} {...(i ? { "data-el": "slide" } : { "data-reveal": "slide" })} style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
                <div data-img style={{ position: "absolute", inset: 0, background: t.bg }}><Img src={t.img} alt={t.label} sizes="(min-width: 992px) 50vw, 100vw" /></div>
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
            <UL href="/services" label="View All Services" data-reveal="ctn" minWidth="13rem" lineOpacity={0.4} style={{ marginTop: "2rem" }} />
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

/** Hero slideshow frames. Slide 0 is the LCP image and is preloaded; the other frames mount shortly after so they
 *  never compete with it (the first crossfade is 6s away). No will-change: GSAP promotes only the frame it animates. */
function HeroSlides() {
  const [rest, setRest] = useState(false);
  useEffect(() => { const t = setTimeout(() => setRest(true), 1500); return () => clearTimeout(t); }, []);
  return (
    <>
      {HERO_SLIDES.map((id, i) => (
        <div key={id} data-hero-slide={i} style={{ position: "absolute", inset: 0, opacity: i ? 0 : 1 }}>
          {(i === 0 || rest) && <Img src={px(id, 2560)} alt="" priority={i === 0} quality={i === 0 ? 75 : 60} />}
        </div>
      ))}
    </>
  );
}

"use client";
import { useState } from "react";
import { PROJECTS, projectHref, px } from "@/lib/projects";
import Page from "./Page";
import Promise from "./Promise";
import { Img, UL, VLine, Diag, navTo, warm } from "./ui";

const FILTERS: [string, string][] = [["all", "All"], ["renovations", "Renovations"], ["homes", "Homes"], ["commercial", "Commercial"]];
const LAYOUT = [["1/8", "9/13"], ["6/13", "1/5"]];

export default function ProjectsView() {
  const [filter, setFilter] = useState("all");
  const list = PROJECTS.filter((p) => filter === "all" || p.divisionKey === filter);
  return (
    <Page current="projects">
      <section data-hero data-bg="color" style={{ position: "relative", minHeight: "100svh", background: "#211A19", color: "#fff", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center", padding: "calc(var(--hh) + 4rem) var(--pad) 4rem" }}>
        <div data-parallax="w" style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <div data-parallax="img" style={{ position: "absolute", left: 0, right: 0, top: "-15%", height: "130%", background: "#211A19" }}><Img src={px(4626268, 2560)} alt="" priority /></div>
        </div>
        <div data-hero-scrim />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(rgba(0,0,0,.55),rgba(0,0,0,.25) 40%,rgba(0,0,0,.6))", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(60% 55% at 50% 55%,rgba(0,0,0,.45),rgba(0,0,0,0) 70%)", pointerEvents: "none" }} />
        <VLine color="rgba(255,255,255,.12)" left="33.333%" />
        <VLine color="rgba(255,255,255,.12)" left="66.666%" />
        <Diag color="rgba(255,255,255,.12)" width="160vw" />
        <div data-r="hero-stack" style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "2.4rem" }}>
          <h1 data-reveal="h" data-r="center" className="h1" style={{ fontSize: "calc(var(--h1) * 1.15)" }}>A Closer Look at Our Work</h1>
          <p data-reveal="p" data-r="center" className="lab5" style={{ lineHeight: 1.7, color: "rgba(255,255,255,.8)" }}>Spaces shaped with care<br />for the people<br />who use them</p>
        </div>
        <p data-reveal="p" data-r="hero-caption" className="h3" style={{ position: "absolute", left: 0, right: 0, bottom: "2rem", textAlign: "center", color: "rgba(255,255,255,.75)" }}>Spaces shaped around the people who use them.</p>
      </section>

      <section data-bg="dark" style={{ position: "relative", background: "#211A19", color: "#F9F4EE", padding: "3rem 0 var(--sec)", overflow: "hidden" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "1.5rem 3rem", padding: "0 var(--pad) 3rem", borderBottom: "1px solid rgba(249,244,238,.1)" }}>
          <div data-filters role="tablist" aria-label="Project filters" style={{ display: "flex", gap: "3rem" }}>
            {FILTERS.map(([key, label]) => (
              <button key={key} role="tab" aria-selected={filter === key} onClick={() => setFilter(key)} className="sans" style={{ display: "inline-flex", alignItems: "center", gap: ".8rem", background: "none", border: 0, padding: ".5rem 0", color: "inherit", cursor: "pointer", opacity: filter === key ? 1 : 0.5, fontWeight: 700, fontSize: "1rem", letterSpacing: ".06em", textTransform: "uppercase", transition: "opacity .3s" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#FF6500", opacity: filter === key ? 1 : 0 }} /><span>{label}</span>
              </button>
            ))}
          </div>
          <div className="mono" style={{ display: "flex", gap: ".6rem", alignItems: "center", color: "rgba(249,244,238,.5)" }}><span style={{ width: ".5rem", height: ".5rem", background: "#FF6500" }} />{list.length} project{list.length === 1 ? "" : "s"} · sample records for review</div>
        </div>

        {list.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", padding: "0 var(--pad)" }}>
            {list.map((p, i) => {
              const L = LAYOUT[i % LAYOUT.length];
              return (
                <a key={p.slug} href={projectHref(p.slug)} onClick={navTo} data-pgrid-card data-project-card data-grid style={{ rowGap: "2rem", alignItems: "end", padding: "4rem 0", borderBottom: "1px solid rgba(249,244,238,.1)", color: "inherit" }}>
                  <div data-mo="1" style={{ gridColumn: L[0], gridRow: 1, position: "relative", aspectRatio: "3/2", overflow: "hidden", background: warm() }}><Img src={p.hero} alt={p.title} sizes="(min-width: 992px) 58vw, 100vw" /></div>
                  <div data-mo="2" style={{ gridColumn: L[1], gridRow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "3rem", alignSelf: "stretch" }}>
                    <div className="lab" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "2rem", color: "rgba(249,244,238,.65)" }}><span>{String(i + 1).padStart(2, "0")}</span><span>{p.division} · {p.location}</span></div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
                      <span className="h1" style={{ lineHeight: 0.95 }}>{p.title}</span>
                      <span className="sans" style={{ fontSize: "var(--p1)", lineHeight: 1.4, letterSpacing: "-.01em", color: "rgba(249,244,238,.75)", maxWidth: "24rem" }}>{p.caption}</span>
                      <span data-ul style={{ marginTop: ".6rem" }}><span className="ul-row"><span>View Project</span><span>↗</span></span><span className="ul-base" /><span data-ul-line className="ul-line" /></span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        ) : (
          <div data-grid style={{ padding: "6rem var(--pad) 2rem", rowGap: "2.4rem" }}>
            <h2 className="h1" style={{ gridColumn: "1/7" }}>Projects Coming Soon</h2>
            <div style={{ gridColumn: "7/13", display: "flex", flexDirection: "column", gap: "2rem" }}>
              <p className="p1" style={{ maxWidth: "28rem" }}>Our project collection is being prepared. In the meantime, explore the work we can help you plan.</p>
              <UL href="/renovations" label="Explore Services" minWidth="12rem" />
            </div>
          </div>
        )}
      </section>
      <Promise />
    </Page>
  );
}

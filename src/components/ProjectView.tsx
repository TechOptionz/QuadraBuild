"use client";
import { PROJECTS, projectHref, type Project } from "@/lib/projects";
import Page from "./Page";
import Promise from "./Promise";
import { Img, VLine, navTo, warm } from "./ui";

const LAYOUT: [string, string, string][] = [["3/5", "3/4", "0"], ["7/13", "16/10", "6rem"], ["4/10", "16/9", "0"], ["1/7", "3/2", "0"], ["8/13", "3/4", "-4rem"], ["3/11", "21/9", "0"]];

export default function ProjectView({ project: p }: { project: Project }) {
  const i = PROJECTS.findIndex((x) => x.slug === p.slug); const next = PROJECTS[(i + 1) % PROJECTS.length];
  return (
    <Page current="projects">
      <section data-hero data-bg="color" data-sout style={{ position: "relative", height: "100svh", minHeight: 640, overflow: "hidden", background: "#211A19", color: "#fff" }}>
        <div data-parallax="w" style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <div data-parallax="img" style={{ position: "absolute", left: 0, right: 0, top: "-15%", height: "130%", background: "radial-gradient(80% 60% at 25% 35%,#5a483f 0%,rgba(90,72,63,0) 60%),linear-gradient(165deg,#30261f 0%,#211A19 60%,#15100e 100%)" }}><Img src={p.hero} alt={p.title} priority /></div>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: "40vh", background: "linear-gradient(rgba(0,0,0,.45),rgba(0,0,0,0))", pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "30vh", background: "linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.4))", pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: "calc(var(--hh) + 3rem)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "1.4rem", padding: "0 var(--pad)", pointerEvents: "none" }}>
          <span data-reveal="ctn" className="lab">{p.location}</span>
          <h1 data-reveal="h" data-r="center" className="h1" style={{ fontSize: "calc(var(--h1) * 1.4)" }}>{p.title}</h1>
        </div>
        <p data-reveal="p" data-r="center" className="h3" style={{ position: "absolute", left: 0, right: 0, bottom: "3rem", textAlign: "center", padding: "0 var(--pad)" }}>{p.caption}</p>
      </section>

      <section data-bg="light" style={{ position: "relative", background: "#F9F4EE", color: "#211A19", padding: "var(--sec) 0", overflow: "hidden" }}>
        <div data-grid data-group style={{ padding: "0 var(--pad)", rowGap: "4rem" }}>
          <div style={{ gridColumn: "3/9", position: "relative" }}>
            <span data-eyebrow data-reveal="ctn" className="lab" style={{ position: "absolute", left: 0, top: ".45em" }}>Overview</span>
            <h2 data-reveal="h" data-indent className="h2" style={{ textIndent: "9rem" }}>{p.overview}</h2>
          </div>
          <div style={{ gridColumn: "3/11", display: "flex", flexDirection: "column" }}>
            {p.specs.map(([k, v]) => (
              <div key={k} data-row data-reveal="ctn" className="sans" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", columnGap: "var(--gap)", padding: "1.1rem 0", borderTop: "1px solid rgba(33,26,25,.15)", fontSize: "var(--p1)", lineHeight: 1.4 }}>
                <span className="lab" style={{ color: "rgba(33,26,25,.6)", paddingTop: ".2em" }}>{k}</span><span className="serif" style={{ fontSize: "calc(var(--p1) * 1.3)" }}>{v}</span>
              </div>
            ))}
            <div className="hairline" />
          </div>
        </div>
      </section>

      <section data-bg="light" style={{ position: "relative", background: "#F9F4EE", color: "#211A19", padding: "0 0 var(--sec)", overflow: "hidden" }}>
        <VLine color="rgba(33,26,25,.1)" left="25%" /><VLine color="rgba(33,26,25,.1)" left="50%" /><VLine color="rgba(33,26,25,.1)" left="75%" />
        <div data-grid style={{ padding: "0 var(--pad)", rowGap: "6rem", position: "relative", alignItems: "start" }}>
          {p.gallery.map((img, k) => {
            const [col, ratio, mt] = LAYOUT[k % LAYOUT.length];
            return (
              <div key={img + k} data-r="gal" data-reveal="slide" data-parallax="w" style={{ gridColumn: col, marginTop: mt, position: "relative", aspectRatio: ratio, overflow: "hidden" }}>
                <div data-img data-parallax="img" style={{ position: "absolute", left: 0, right: 0, top: "-15%", height: "130%", background: warm() }}><Img src={img} alt={`${p.title} gallery image ${k + 1}`} sizes="(min-width: 992px) 60vw, 100vw" /></div>
              </div>
            );
          })}
          <div data-group style={{ gridColumn: "1/5", display: "flex", flexDirection: "column", gap: "1.6rem", alignSelf: "center" }}>
            <div data-reveal="ctn" aria-hidden="true" className="serif" style={{ fontSize: "8rem", lineHeight: 0.6, letterSpacing: "-.04em", color: "rgba(33,26,25,.2)", height: "3.4rem", overflow: "hidden" }}>“</div>
            <h3 data-reveal="h" className="h2">“Sample statement — replace with an approved client or director quote, or remove this block.”</h3>
            <span data-reveal="ctn" className="lab" style={{ color: "rgba(33,26,25,.6)" }}>Attribution pending</span>
          </div>
        </div>
      </section>

      <section data-bg="dark" style={{ position: "relative", background: "#211A19", color: "#F9F4EE" }}>
        {p.inside.map((s) => (
          <div key={s.title} data-r="inside" style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", background: "#211A19" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(80% 60% at 60% 40%,#4f4036 0%,rgba(79,64,54,0) 60%),linear-gradient(180deg,#2b2320 0%,#211A19 60%,#15100e 100%)" }}><Img src={s.img} alt={s.title} /></div>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(rgba(0,0,0,.35),rgba(0,0,0,0) 40%,rgba(0,0,0,0) 60%,rgba(0,0,0,.45))", pointerEvents: "none" }} />
            <div data-group style={{ position: "absolute", left: "var(--pad)", top: "calc(var(--hh) + 2rem)", display: "flex", flexDirection: "column", gap: "1rem", pointerEvents: "none" }}>
              <span data-reveal="ctn" className="lab">{s.eyebrow}</span>
              <h2 data-reveal="h" className="h1">{s.title}</h2>
            </div>
            <div data-group style={{ position: "absolute", right: "var(--pad)", bottom: "3rem", left: "var(--pad)", display: "flex", justifyContent: "flex-end" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.4rem", maxWidth: "26rem" }}>
                <p data-reveal="p" className="p1">{s.body}</p>
                <span data-reveal="ctn" className="lab">View Gallery +</span>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section data-bg="light" style={{ position: "relative", background: "#F9F4EE", color: "#211A19", padding: "var(--sec) 0 0", overflow: "hidden" }}>
        <div data-grid data-group style={{ padding: "0 var(--pad) 4rem", rowGap: "3rem", alignItems: "end" }}>
          <div style={{ gridColumn: "1/5", display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            <a href="/projects" onClick={navTo} data-reveal="ctn" className="lab">← All Projects</a>
            <h2 data-reveal="h" className="h1">Next</h2>
          </div>
          <a href={projectHref(next.slug)} onClick={navTo} data-reveal="ctn" style={{ gridColumn: "7/13", display: "flex", flexDirection: "column", gap: ".6rem" }}>
            <span className="lab" style={{ color: "rgba(33,26,25,.6)" }}>{next.location}</span>
            <span className="h2t">{next.title} ↗</span>
          </a>
        </div>
        <a href={projectHref(next.slug)} onClick={navTo} data-reveal="slide" data-parallax="w" style={{ display: "block", position: "relative", height: "50vh", overflow: "hidden" }}>
          <div data-img data-parallax="img" style={{ position: "absolute", left: 0, right: 0, top: "-15%", height: "130%", background: warm(200, "#4a3b35", "30% 30%") }}><Img src={next.hero} alt={next.title} /></div>
        </a>
      </section>
      <Promise />
    </Page>
  );
}

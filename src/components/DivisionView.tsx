"use client";
import { DIVISIONS } from "@/lib/divisions";
import { PROJECTS, projectHref, px, type DivisionKey } from "@/lib/projects";
import Page from "./Page";
import Promise from "./Promise";
import { Img, UL, VLine, navTo, warm } from "./ui";

export default function DivisionView({ division }: { division: DivisionKey }) {
  const d = DIVISIONS[division];
  const proj = PROJECTS.find((p) => p.divisionKey === division) || PROJECTS[0];
  const services = d.services.map((s, i) => ({ num: "0" + (i + 1), title: s[0], body: s[1], id: `${division}-s${i + 1}`, img: px(d.pool[i % d.pool.length]) }));
  return (
    <Page current={division}>
      <section data-hero data-bg="color" data-sout data-r="snap" style={{ position: "relative", height: "100svh", minHeight: 640, overflow: "hidden", background: "#211A19", color: "#fff", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <div data-parallax="w" style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <div data-parallax="img" style={{ position: "absolute", left: 0, right: 0, top: "-15%", height: "130%", background: "radial-gradient(90% 70% at 30% 30%,#54433b 0%,rgba(84,67,59,0) 60%),linear-gradient(170deg,#2a2220 0%,#211A19 55%,#17120f 100%)" }}><Img src={d.heroImg} alt={d.eyebrow} priority /></div>
        </div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,rgba(0,0,0,.55) 0%,rgba(0,0,0,.35) 50%,rgba(0,0,0,.15) 100%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: "32vh", background: "linear-gradient(rgba(0,0,0,.35),rgba(0,0,0,0))", pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "55vh", background: "linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.55))", pointerEvents: "none" }} />
        <div data-reveal="ctn" className="lab" style={{ position: "absolute", left: "var(--pad)", top: "calc(var(--hh) + 1.5rem)" }}>{d.eyebrow}</div>
        <div data-grid data-r="hero-bottom" data-divgrid style={{ padding: "0 var(--pad) 3rem", position: "relative", alignItems: "end", rowGap: "2.5rem", pointerEvents: "none" }}>
          <h1 data-reveal="h" className="h1" style={{ gridColumn: "1/7", fontSize: "calc(var(--h1) * 1.15)", pointerEvents: "auto" }}>{d.h.map((l) => <span key={l} data-ln className="ln">{l}</span>)}</h1>
          <div style={{ gridColumn: "8/13", display: "flex", flexDirection: "column", gap: "2rem", pointerEvents: "auto" }}>
            <p data-reveal="p" className="p1" style={{ maxWidth: "28rem" }}>{d.intro}</p>
            <UL label={d.cta} dot data-reveal="ctn" minWidth="12rem" lineOpacity={0.4} />
          </div>
        </div>
      </section>

      <section data-bg="dark" style={{ position: "relative", background: "#211A19", color: "#F9F4EE", padding: "var(--sec) 0 3rem", overflow: "hidden" }}>
        <VLine />
        <div data-grid data-group style={{ padding: "0 var(--pad)", position: "relative", rowGap: "2.5rem" }}>
          <div data-reveal="ctn" className="lab" style={{ gridColumn: "1/4" }}>What We Do</div>
          <h2 data-reveal="h" className="h2" style={{ gridColumn: "7/13" }}>{d.indexLine}</h2>
        </div>
      </section>

      <section data-bg="dark" data-sticky style={{ position: "relative", background: "#211A19", color: "#F9F4EE", padding: "2rem 0 var(--sec)", overflow: "clip visible" }}>
        <div data-grid style={{ padding: "0 var(--pad)", alignItems: "start" }}>
          <div data-r="desk" data-st-panel style={{ gridColumn: "1/6", position: "sticky", top: "var(--hh)", alignSelf: "start", height: "calc(100vh - var(--hh))", display: "flex", flexDirection: "column", justifyContent: "center", gap: "2.4rem", padding: "1rem 0 2rem" }}>
            <div style={{ position: "relative", aspectRatio: "4/3", maxHeight: "52vh", width: "100%", overflow: "hidden" }}>
              {services.map((s) => <div key={s.id} data-st-img style={{ position: "absolute", inset: 0, overflow: "hidden", background: warm() }}><Img src={s.img} alt={s.title} sizes="(min-width: 992px) 42vw, 100vw" /></div>)}
            </div>
            <div style={{ position: "relative", minHeight: "11rem" }}>
              {services.map((s) => (
                <div key={s.id} data-st-desc style={{ position: "absolute", top: 0, left: 0, right: 0, maxWidth: "30rem", display: "flex", flexDirection: "column", gap: ".9rem" }}>
                  <span className="lab" style={{ display: "flex", gap: ".8rem", alignItems: "center" }}><span style={{ color: "#FF6500", fontWeight: 500 }}>{s.num}</span><span>{s.title}</span><span style={{ flex: 1, height: 1, background: "currentColor", opacity: 0.25, marginLeft: ".6rem" }} /></span>
                  <p className="p1">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ gridColumn: "7/13", paddingBottom: "30vh" }}>
            {services.map((s) => (
              <div key={s.id} data-st-item id={s.id} style={{ minHeight: "70vh", display: "flex", flexDirection: "column", justifyContent: "center", borderTop: "1px solid rgba(249,244,238,.1)", padding: "3rem 0" }}>
                <span className="lab5" style={{ color: "rgba(249,244,238,.55)", marginBottom: "1.2rem" }}>{s.num}</span>
                <h3 data-st-title className="h1" style={{ lineHeight: 0.95, opacity: 0.2 }}>{s.title}</h3>
                <div data-r="mob" style={{ display: "flex", flexDirection: "column", gap: "1.4rem", marginTop: "1.6rem" }}>
                  <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", background: warm() }}><Img src={s.img} alt={s.title} /></div>
                  <p className="p1">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-bg="light" style={{ position: "relative", background: "#F9F4EE", color: "#211A19", padding: "var(--sec) 0", overflow: "hidden" }}>
        <div data-shadow style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", mixBlendMode: "multiply" }}>
          <div data-blob style={{ position: "absolute", right: "-20%", top: "-30%", width: "80%", height: "70%", background: "radial-gradient(ellipse at center,rgba(70,50,40,.12) 0%,rgba(70,50,40,0) 62%)", transform: "rotate(24deg)", filter: "blur(34px)" }} />
        </div>
        <div data-grid data-group style={{ padding: "0 var(--pad)", position: "relative", rowGap: "3rem" }}>
          <div data-reveal="ctn" className="lab" style={{ gridColumn: "1/4" }}>Our Process</div>
          <h2 data-reveal="h" className="h1" style={{ gridColumn: "7/13" }}><span data-ln className="ln">Five steps,</span><span data-ln className="ln">clearly explained.</span></h2>
        </div>
        <div style={{ padding: "4rem var(--pad) 0", position: "relative" }}>
          {d.process.map((st, i) => (
            <div key={st[0]} data-row data-reveal="ctn" data-grid style={{ padding: "2rem 0", borderTop: "1px solid rgba(33,26,25,.15)", alignItems: "start" }}>
              <span className="row-num" style={{ gridColumn: "1/3" }}>{i + 1}.0</span>
              <h3 className="h2t" style={{ gridColumn: "3/7" }}>{st[0]}</h3>
              <p className="p1" style={{ gridColumn: "7/12" }}>{st[1]}</p>
            </div>
          ))}
          <div className="hairline" />
        </div>
      </section>

      {d.table && (
        <section data-bg="light" style={{ position: "relative", background: "#F9F4EE", color: "#211A19", padding: "0 0 var(--sec)", overflow: "hidden" }}>
          <div data-grid data-group style={{ padding: "0 var(--pad)", rowGap: "3rem" }}>
            <div data-reveal="ctn" className="lab" style={{ gridColumn: "1/4" }}>What We Handle</div>
            <div style={{ gridColumn: "4/13" }}>
              <div data-row className="lab5" style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr 1.3fr", columnGap: "var(--gap)", padding: "0 0 1rem", color: "rgba(33,26,25,.55)" }}><span>Area</span><span>Coordination focus</span><span>Important boundary</span></div>
              {d.table.map((r) => (
                <div key={r[0]} data-row data-reveal="ctn" className="p1" style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr 1.3fr", columnGap: "var(--gap)", padding: "1.2rem 0", borderTop: "1px solid rgba(33,26,25,.15)" }}>
                  <span className="serif" style={{ fontSize: "calc(var(--p1) * 1.25)" }}>{r[0]}</span><span>{r[1]}</span><span style={{ color: "rgba(33,26,25,.7)" }}>{r[2]}</span>
                </div>
              ))}
              <p data-reveal="p" className="lab5" style={{ marginTop: "2.4rem", maxWidth: "34rem", lineHeight: 1.6, color: "rgba(33,26,25,.62)" }}>{d.disclaimer}</p>
            </div>
          </div>
        </section>
      )}

      <section data-bg="light" style={{ position: "relative", background: "#F9F4EE", color: "#211A19", padding: "0 0 var(--sec)", overflow: "hidden" }}>
        <VLine color="rgba(33,26,25,.1)" />
        <div data-grid data-group style={{ padding: "0 var(--pad)", position: "relative", rowGap: "3rem" }}>
          <div style={{ gridColumn: "1/6", display: "flex", flexDirection: "column", gap: "1.4rem", alignSelf: "start" }}>
            <div data-reveal="ctn" className="lab">Common Questions</div>
            <h2 data-reveal="h" className="h1" style={{ maxWidth: "24rem" }}>Frequently asked questions</h2>
          </div>
          <div style={{ gridColumn: "7/13", display: "flex", flexDirection: "column" }}>
            {d.faqs.map((f) => (
              <div key={f[0]} data-reveal="ctn" style={{ borderTop: "1px solid rgba(33,26,25,.15)" }}>
                <button data-acc aria-expanded="false" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "2rem", width: "100%", padding: "1.4rem 0", background: "none", border: 0, color: "inherit", cursor: "pointer", textAlign: "left" }}>
                  <span className="serif" style={{ fontSize: "calc(var(--h2) * .8)", lineHeight: 1.1, letterSpacing: "-.02em" }}>{f[0]}</span>
                  <span data-acc-icon className="sans" style={{ flex: "none", width: "1.6rem", height: "1.6rem", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(33,26,25,.3)", borderRadius: "50%", fontSize: "1rem", lineHeight: 1 }}>+</span>
                </button>
                <div data-acc-body><p className="p1" style={{ padding: "0 3rem 1.8rem 0", maxWidth: "34rem" }}>{f[1]}</p></div>
              </div>
            ))}
            <div className="hairline" />
          </div>
        </div>
      </section>

      <section data-bg="dark" style={{ position: "relative", background: "#211A19", color: "#F9F4EE", padding: "var(--sec) 0", overflow: "hidden" }}>
        <VLine />
        <div data-grid data-group style={{ padding: "0 var(--pad)", position: "relative", rowGap: "3rem" }}>
          <div style={{ gridColumn: "1/7", display: "flex", flexDirection: "column", gap: "1.6rem", alignSelf: "start" }}>
            <div data-reveal="ctn" className="lab">Related Project</div>
            <a href={projectHref(proj.slug)} onClick={navTo} data-rel-img style={{ display: "block", position: "relative", aspectRatio: "16/10", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(170deg,#2e2522 0%,#211A19 60%,#1a1514 100%)" }}><Img src={proj.hero} alt={proj.title} sizes="(min-width: 992px) 50vw, 100vw" /></div>
            </a>
            <a href={projectHref(proj.slug)} onClick={navTo} data-rel-cap style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
              <span className="lab" style={{ color: "rgba(249,244,238,.7)" }}>{proj.location}</span>
              <span className="h2t">{proj.title} ↗</span>
            </a>
          </div>
          <div style={{ gridColumn: "8/13", display: "flex", flexDirection: "column", alignSelf: "end" }}>
            <div data-reveal="ctn" className="lab" style={{ paddingBottom: ".6rem" }}>Other Divisions</div>
            {d.related.map(([label, href]) => (
              <a key={href} href={href} onClick={navTo} data-reveal="ctn" data-ul style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: "1rem", padding: "1.4rem 0", alignSelf: "stretch" }}>
                <span className="h2t">{label}</span><span className="lab">↗</span>
                <span className="ul-base" style={{ opacity: 0.15 }} /><span data-ul-line className="ul-line" />
              </a>
            ))}
          </div>
          <div style={{ gridColumn: "1/13", paddingTop: "var(--sec)", display: "flex", flexDirection: "column", gap: "2.4rem", alignItems: "flex-start" }}>
            <h2 data-reveal="h" className="h1" style={{ fontSize: "calc(var(--h1) * 1.4)", maxWidth: "60rem" }}>{d.closingH}</h2>
            <UL label={d.closingCta} dot data-reveal="ctn" minWidth="14rem" lineOpacity={0.4} />
          </div>
        </div>
      </section>
      <Promise />
    </Page>
  );
}

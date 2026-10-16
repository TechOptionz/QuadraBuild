"use client";
import { DIVISIONS } from "@/lib/divisions";
import { px, type DivisionKey } from "@/lib/projects";
import Page from "./Page";
import Promise from "./Promise";
import { Img, UL, VLine, Diag, navTo, warm } from "./ui";

const ORDER: DivisionKey[] = ["renovations", "homes", "commercial", "approvals"];
const BLURB: Record<DivisionKey, string> = {
  renovations: "Renovate an existing home, extend your living space or refresh kitchens, bathrooms and outdoor areas. We also discuss landscaping, fencing and whole-home transformations.",
  homes: "From custom homes to granny flats and secondary dwellings, Quadra Homes helps shape residential building ideas around the site, the brief and everyday living.",
  commercial: "Create a commercial space that serves its purpose, from retail and shop fit-outs to office improvements, hospitality environments and considered refurbishments.",
  approvals: "Understand the steps from an early idea to development and building applications, with practical coordination of planning information, documentation and relevant approval specialists.",
};
const CTA: Record<DivisionKey, string> = { renovations: "Explore Renovations", homes: "Explore Homes", commercial: "Explore Commercial", approvals: "Explore Approvals" };
const TONE: Record<DivisionKey, string> = { renovations: warm(170, "#5a483f", "30% 30%"), homes: warm(190, "#4a3b35", "70% 30%"), commercial: warm(160, "#4a3b35", "50% 70%"), approvals: warm(200, "#5a483f", "30% 70%") };

const SERVICES = ORDER.map((key, i) => {
  const d = DIVISIONS[key];
  return { key, num: `${i + 1}.0`, eyebrow: d.eyebrow, h: d.h, blurb: BLURB[key], img: d.heroImg, bg: TONE[key], href: d.path, cta: CTA[key], items: d.services.map((s) => s[0]) };
});

const PRINCIPLES: [string, string, string][] = [
  ["01", "One conversation", "Projects often cross more than one division. You deal with one team that understands the whole picture, whichever service you start with."],
  ["02", "Scope before speed", "We take time to understand the brief, the site and the constraints before discussing how a project should proceed and what it will involve."],
  ["03", "The right specialists", "Where a project needs designers, engineers, certifiers or planning advice, we help coordinate those conversations rather than work around them."],
  ["04", "Clear communication", "Decisions, documentation and next steps are kept visible, so you always know where a project stands and what happens next."],
];

const FIT: { need: string; label: string; href: string }[] = [
  { need: "Extending, renovating or refreshing a home you already own", label: "Quadra Renovations", href: "/renovations" },
  { need: "Building a new home, granny flat or secondary dwelling", label: "Quadra Homes", href: "/homes" },
  { need: "Fitting out or refurbishing a shop, office or hospitality space", label: "Quadra Commercial", href: "/commercial" },
  { need: "Understanding planning pathways, documentation and approvals", label: "Quadra Approvals", href: "/approvals" },
];

export default function ServicesView() {
  return (
    <Page current="services">
      {/* 01 HERO */}
      <section data-hero data-bg="color" data-sout data-r="snap" style={{ position: "relative", height: "100svh", minHeight: 640, overflow: "hidden", background: "#211A19", color: "#fff", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <div data-parallax="w" style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <div data-parallax="img" style={{ position: "absolute", left: 0, right: 0, top: "-15%", height: "130%", background: "radial-gradient(90% 70% at 30% 30%,#5a483f 0%,transparent 60%),linear-gradient(170deg,#2b2320 0%,#211A19 55%,#15100e 100%)" }}><Img src={px(6077368, 2560)} alt="" priority /></div>
        </div>
        <div data-hero-scrim />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,rgba(0,0,0,.55) 0%,rgba(0,0,0,.35) 50%,rgba(0,0,0,.15) 100%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: "32vh", background: "linear-gradient(rgba(0,0,0,.35),rgba(0,0,0,0))", pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "55vh", background: "linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.55))", pointerEvents: "none" }} />
        <Diag color="rgba(255,255,255,.12)" width="160vw" />
        <div data-reveal="ctn" className="lab" style={{ position: "absolute", left: "var(--pad)", top: "calc(var(--hh) + 1.5rem)" }}>Our Services</div>
        <div data-grid data-r="hero-bottom" data-divgrid style={{ padding: "0 var(--pad) 3rem", position: "relative", alignItems: "end", rowGap: "2.5rem", pointerEvents: "none" }}>
          <h1 data-reveal="h" className="h1" style={{ gridColumn: "1/7", fontSize: "calc(var(--h1) * 1.15)", pointerEvents: "auto" }}><span data-ln className="ln">Four Divisions,</span><span data-ln className="ln">One Way</span><span data-ln className="ln">Of Working.</span></h1>
          <div style={{ gridColumn: "8/13", display: "flex", flexDirection: "column", gap: "2rem", pointerEvents: "auto" }}>
            <p data-reveal="p" className="p1" style={{ maxWidth: "28rem" }}>Renovations, new homes, commercial spaces and approvals, brought together under one roof. Whatever the brief, each division shares the same emphasis on planning, communication and the details that make a space work.</p>
            <div style={{ display: "flex", gap: "3rem", alignItems: "center", flexWrap: "wrap" }}>
              <UL href="#divisions" label="Explore Divisions" data-reveal="ctn" gap="2rem" lineOpacity={0.4} />
              <span data-reveal="p" data-r="desk" className="lab5" style={{ opacity: 0.8 }}>Scroll to explore</span>
            </div>
          </div>
        </div>
      </section>

      {/* 02 INTRO */}
      <section data-bg="dark" style={{ position: "relative", background: "#211A19", color: "#F9F4EE", padding: "var(--sec) 0 3rem", overflow: "hidden" }}>
        <VLine />
        <div data-grid data-group style={{ padding: "0 var(--pad)", position: "relative", rowGap: "2.5rem" }}>
          <div data-reveal="ctn" className="lab" style={{ gridColumn: "1/4" }}>What We Do</div>
          <div style={{ gridColumn: "7/13", display: "flex", flexDirection: "column", gap: "2rem" }}>
            <h2 data-reveal="h" className="h2">Quadra Build brings four connected specialisms together, so a project can move from a first idea to a finished space with one team that understands every stage.</h2>
            <p data-reveal="p" className="lab5" style={{ lineHeight: 1.6, color: "rgba(249,244,238,.62)", maxWidth: "32rem" }}>Select a division below to explore its services, process and common questions in detail.</p>
          </div>
        </div>
      </section>

      {/* 03 DIVISIONS INDEX */}
      <section id="divisions" data-bg="dark" style={{ position: "relative", background: "#211A19", color: "#F9F4EE", padding: "2rem 0 var(--sec)", overflow: "hidden" }}>
        <div style={{ padding: "0 var(--pad)", position: "relative" }}>
          {SERVICES.map((s, i) => {
            const flip = i % 2 === 1;
            return (
              <div key={s.key} data-grid data-group style={{ padding: "4rem 0", borderTop: "1px solid rgba(249,244,238,.1)", alignItems: "center", rowGap: "2.4rem" }}>
                <a href={s.href} onClick={navTo} data-rel-img data-reveal="ctn" aria-label={s.eyebrow} style={{ gridColumn: flip ? "7/13" : "1/7", gridRow: 1, display: "block", position: "relative", aspectRatio: "16/10", overflow: "hidden", background: s.bg }}>
                  <Img src={s.img} alt={s.eyebrow} sizes="(min-width: 992px) 50vw, 100vw" />
                </a>
                <div style={{ gridColumn: flip ? "1/6" : "8/13", gridRow: 1, display: "flex", flexDirection: "column", gap: "2rem", alignSelf: "center" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
                    <div data-reveal="ctn" className="lab" style={{ display: "flex", gap: ".8rem", alignItems: "center", color: "rgba(249,244,238,.7)" }}><span style={{ color: "#FF6500", fontWeight: 500 }}>{s.num}</span><span>{s.eyebrow}</span><span style={{ flex: 1, height: 1, background: "currentColor", opacity: 0.25, marginLeft: ".6rem" }} /></div>
                    <a href={s.href} onClick={navTo} data-st-title data-reveal="h" className="h1" style={{ display: "block" }}>{s.h.map((l) => <span key={l} data-ln className="ln">{l}</span>)}</a>
                    <p data-reveal="p" className="p1" style={{ maxWidth: "28rem" }}>{s.blurb}</p>
                  </div>
                  <ul data-reveal="ctn" className="lab5" style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexWrap: "wrap", gap: ".6rem .9rem", color: "rgba(249,244,238,.7)", maxWidth: "30rem" }}>
                    {s.items.map((it) => <li key={it} style={{ padding: ".45rem .8rem", border: "1px solid rgba(249,244,238,.18)", borderRadius: 999, whiteSpace: "nowrap" }}>{it}</li>)}
                  </ul>
                  <UL href={s.href} label={s.cta} data-reveal="ctn" minWidth="13rem" lineOpacity={0.4} />
                </div>
              </div>
            );
          })}
          <div style={{ borderTop: "1px solid rgba(249,244,238,.1)" }} />
        </div>
      </section>

      {/* 04 ONE APPROACH */}
      <section data-bg="light" style={{ position: "relative", background: "#F9F4EE", color: "#211A19", padding: "var(--sec) 0", overflow: "hidden" }}>
        <div data-shadow style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", mixBlendMode: "multiply" }}>
          <div data-blob style={{ position: "absolute", right: "-20%", top: "-30%", width: "80%", height: "70%", background: "radial-gradient(ellipse at center,rgba(70,50,40,.12) 0%,transparent 62%)", transform: "rotate(24deg)" }} />
        </div>
        <div data-grid data-group style={{ padding: "0 var(--pad)", position: "relative", rowGap: "3rem" }}>
          <div data-reveal="ctn" className="lab" style={{ gridColumn: "1/4" }}>One Approach</div>
          <h2 data-reveal="h" className="h1" style={{ gridColumn: "7/13" }}><span data-ln className="ln">Different projects,</span><span data-ln className="ln">the same care.</span></h2>
        </div>
        <div data-grid data-group style={{ padding: "4rem var(--pad) 0", position: "relative", rowGap: "3rem", alignItems: "start" }}>
          {PRINCIPLES.map(([n, t, b], i) => (
            <div key={n} data-reveal="ctn" style={{ gridColumn: `${i * 3 + 1}/${i * 3 + 4}`, display: "flex", flexDirection: "column", gap: "1.2rem", paddingTop: "1.6rem", borderTop: "1px solid rgba(33,26,25,.15)" }}>
              <span className="row-num">{n}</span>
              <h3 className="h2t" style={{ maxWidth: "12rem" }}>{t}</h3>
              <p className="p1" style={{ color: "rgba(33,26,25,.8)" }}>{b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 05 WHICH DIVISION */}
      <section data-bg="light" style={{ position: "relative", background: "#F9F4EE", color: "#211A19", padding: "0 0 var(--sec)", overflow: "hidden" }}>
        <VLine color="rgba(33,26,25,.1)" />
        <div data-grid data-group style={{ padding: "0 var(--pad)", position: "relative", rowGap: "3rem" }}>
          <div style={{ gridColumn: "1/6", display: "flex", flexDirection: "column", gap: "1.4rem", alignSelf: "start" }}>
            <div data-reveal="ctn" className="lab">Where To Start</div>
            <h2 data-reveal="h" className="h1" style={{ maxWidth: "24rem" }}>Which division suits your project?</h2>
            <p data-reveal="p" className="p1" style={{ maxWidth: "26rem", color: "rgba(33,26,25,.8)" }}>Many projects touch more than one division. Start with the closest fit and we will bring in the rest of the team where it helps.</p>
          </div>
          <div style={{ gridColumn: "7/13", display: "flex", flexDirection: "column" }}>
            {FIT.map((f) => (
              <a key={f.href} href={f.href} onClick={navTo} data-reveal="ctn" data-ul data-fit-row style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: "2rem", padding: "1.4rem 0", minWidth: 0, alignSelf: "stretch" }}>
                <span style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
                  <span className="lab5" style={{ color: "rgba(33,26,25,.5)" }}>If you are</span>
                  <span className="serif" style={{ fontSize: "calc(var(--h2) * .8)", lineHeight: 1.1, letterSpacing: "-.02em" }}>{f.need}</span>
                </span>
                <span className="lab" style={{ whiteSpace: "nowrap" }}>{f.label} ↗</span>
                <span className="ul-base" style={{ opacity: 0.15 }} /><span data-ul-line className="ul-line" />
              </a>
            ))}
            <div className="hairline" />
            <div data-reveal="ctn" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1.4rem 3rem", paddingTop: "2rem" }}>
              <span className="p1" style={{ color: "rgba(33,26,25,.65)" }}>Not sure yet?</span>
              <UL label="Start a Conversation" dot minWidth="14rem" lineOpacity={0.4} />
            </div>
          </div>
        </div>
      </section>

      {/* 06 CLOSING */}
      <section data-bg="color" data-r="tall" style={{ position: "relative", minHeight: "90vh", overflow: "hidden", background: "#211A19", color: "#fff", display: "flex", alignItems: "center" }}>
        <div data-parallax="w" style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <div data-parallax="img" style={{ position: "absolute", left: 0, right: 0, top: "-15%", height: "130%", background: "radial-gradient(70% 60% at 30% 40%,#5a483f 0%,transparent 60%),linear-gradient(180deg,#2b2320 0%,#211A19 55%,#15100e 100%)" }}><Img src={px(4626268)} alt="" /></div>
        </div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(rgba(0,0,0,.35),rgba(0,0,0,.55))", pointerEvents: "none" }} />
        <div data-grid data-group style={{ padding: "calc(var(--hh) + 3rem) var(--pad) 4rem", position: "relative", width: "100%", rowGap: "3rem", pointerEvents: "none", alignItems: "end" }}>
          <h2 data-reveal="h" className="h2t" style={{ gridColumn: "1/4" }}>Next Steps</h2>
          <div style={{ gridColumn: "7/13", display: "flex", flexDirection: "column", gap: "2.4rem", pointerEvents: "auto" }}>
            <h2 data-reveal="h" className="h1" style={{ fontSize: "calc(var(--h1) * 1.2)" }}><span data-ln className="ln">Tell us about</span><span data-ln className="ln">the project.</span></h2>
            <p data-reveal="p" className="p1" style={{ maxWidth: "28rem" }}>Share what you have in mind, where it is and what matters most. We will help identify the right division and the right next conversation.</p>
            <UL label="Start a Conversation" dot data-reveal="ctn" minWidth="14rem" lineOpacity={0.4} />
          </div>
        </div>
      </section>

      <Promise />
    </Page>
  );
}

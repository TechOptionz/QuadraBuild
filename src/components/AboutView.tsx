"use client";
import { px } from "@/lib/projects";
import Page from "./Page";
import Promise from "./Promise";
import { Img, UL, VLine, Diag, navTo, warm } from "./ui";

const ITEMS = [
  { num: "01", title: "Quadra Renovations", href: "/renovations", img: px(8134746), body: "Existing homes often hold more potential than they first reveal. We look at how a layout can work harder, where extra space can be created and what small changes will have the greatest effect. Our renovation conversations cover extensions, kitchens, bathrooms, full-home updates, landscaping and outdoor areas. Each brief begins with the home you have and the way you want to live." },
  { num: "02", title: "Quadra Homes", href: "/homes", img: px(8134821), body: "A new home is an opportunity to make considered decisions from the beginning. We discuss the site, how rooms will be used, where natural light enters and how indoor and outdoor spaces connect. Whether the brief is a custom home, a granny flat or a secondary dwelling, we keep the practical requirements close to the design conversation." },
  { num: "03", title: "Quadra Commercial", href: "/commercial", img: px(5490827), body: "Commercial spaces need to support the people and activity inside them. We consider how customers move, how staff work, how a business presents itself and how a project can be organised around its operational needs. Our commercial scope includes shop fit-outs, office improvements, retail spaces and refurbishments, with early attention to constraints and approvals." },
  { num: "04", title: "Quadra Approvals", href: "/approvals", img: px(3990587), body: "Early planning questions can affect what is possible on a site and how a project moves forward. Quadra Approvals is intended to help clients understand the information, documentation and professionals involved in applicable planning and building pathways. We coordinate with relevant external specialists and authorities where required, without promising approval outcomes or substituting for licensed professional advice." },
];
const DIVS: [string, string, string][] = [["1.0", "Quadra Renovations", "/renovations"], ["2.0", "Quadra Homes", "/homes"], ["3.0", "Quadra Commercial", "/commercial"], ["4.0", "Quadra Approvals", "/approvals"]];

export default function AboutView() {
  return (
    <Page current="about">
      <section data-hero data-bg="color" style={{ position: "relative", minHeight: "100svh", background: "#211A19", color: "#fff", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <div data-parallax="w" style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <div data-parallax="img" style={{ position: "absolute", left: 0, right: 0, top: "-15%", height: "130%", background: "#211A19" }}><Img src={px(8134821, 2560)} alt="" priority /></div>
        </div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(rgba(0,0,0,.55),rgba(0,0,0,.25) 40%,rgba(0,0,0,.6))", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(60% 55% at 50% 60%,rgba(0,0,0,.45),rgba(0,0,0,0) 70%)", pointerEvents: "none" }} />
        <Diag color="rgba(255,255,255,.14)" width="160vw" />
        <Diag color="rgba(255,255,255,.09)" width="160vw" left="20%" />
        <Diag color="rgba(255,255,255,.09)" width="160vw" left="80%" />
        <div data-grid style={{ padding: "calc(var(--hh) + 2rem) var(--pad) 0", position: "relative", rowGap: "3rem" }}>
          <div data-reveal="ctn" className="lab" style={{ gridColumn: "1/4" }}>Quadra Build</div>
          <p data-reveal="p" className="p1" style={{ gridColumn: "9/13" }}>A thoughtful approach to homes, workplaces and the spaces between. Based in Brisbane, Quadra Build brings renovations, residential construction, commercial work and development approval support together with an emphasis on planning, communication and the details that make spaces work.</p>
        </div>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "4rem var(--pad)" }}>
          <h1 data-reveal="h" data-r="center" className="h1" style={{ fontSize: "calc(var(--h1) * 1.25)", textAlign: "center" }}><span data-ln className="ln">A Builder</span><span data-ln className="ln">Focused on</span><span data-ln className="ln">Better</span><span data-ln className="ln">Spaces.</span></h1>
        </div>
        <div style={{ padding: "0 var(--pad) 3rem", position: "relative" }}>
          <span data-reveal="p" className="lab5" style={{ display: "inline-block" }}>Scroll to explore</span>
        </div>
      </section>

      <section data-bg="dark" style={{ position: "relative", background: "#211A19", color: "#F9F4EE", padding: "var(--sec) 0", overflow: "hidden" }}>
        <VLine />
        <div data-grid data-group style={{ padding: "0 var(--pad)", position: "relative", rowGap: "2.5rem" }}>
          <div data-reveal="ctn" className="lab" style={{ gridColumn: "1/4" }}>Our Values</div>
          <div style={{ gridColumn: "4/11", display: "flex", flexDirection: "column", gap: "2rem" }}>
            <div data-reveal="ctn" aria-hidden="true" className="serif" style={{ fontSize: "10rem", lineHeight: 0.6, letterSpacing: "-.04em", color: "rgba(249,244,238,.22)", height: "4.2rem", overflow: "hidden" }}>“</div>
            <h2 data-reveal="h" className="h2">A place should feel considered from the first idea to the final detail. We value honest conversations, practical solutions and the kind of care that lives in the parts of a project people notice every day, and in the parts they never need to think about.</h2>
            <div data-reveal="ctn" className="lab" style={{ color: "rgba(249,244,238,.65)" }}>Quadra Build / Our Approach</div>
          </div>
        </div>
      </section>

      <section data-bg="dark" data-sticky style={{ position: "relative", background: "#211A19", color: "#F9F4EE", padding: "0 0 var(--sec)" }}>
        <div data-grid data-group style={{ padding: "3rem var(--pad) 4rem", rowGap: "2rem", borderTop: "1px solid rgba(249,244,238,.1)" }}>
          <div data-reveal="ctn" className="lab" style={{ gridColumn: "1/4" }}>What We Do</div>
          <p data-reveal="p" className="lab5" style={{ gridColumn: "7/12", lineHeight: 1.6, color: "rgba(249,244,238,.62)" }}>Four connected specialisms, shaped around the needs of every project.</p>
        </div>
        <div data-grid style={{ padding: "0 var(--pad)", alignItems: "start" }}>
          <div data-r="desk" data-st-panel style={{ gridColumn: "1/6", position: "sticky", top: "var(--hh)", alignSelf: "start", height: "calc(100vh - var(--hh))", display: "flex", flexDirection: "column", justifyContent: "center", gap: "2rem", padding: "0 0 1rem" }}>
            <div style={{ position: "relative", aspectRatio: "4/3", maxHeight: "40vh", width: "100%", overflow: "hidden", flex: "none" }}>
              {ITEMS.map((it) => <div key={it.num} data-st-img style={{ position: "absolute", inset: 0, overflow: "hidden", background: warm() }}><Img src={it.img} alt={it.title} sizes="(min-width: 992px) 42vw, 100vw" /></div>)}
            </div>
            <div style={{ position: "relative", minHeight: "14rem", flex: "none" }}>
              {ITEMS.map((it) => (
                <div key={it.num} data-st-desc style={{ position: "absolute", top: 0, left: 0, right: 0, maxWidth: "30rem", display: "flex", flexDirection: "column", gap: ".9rem" }}>
                  <span className="lab" style={{ display: "flex", gap: ".8rem", alignItems: "center" }}><span style={{ color: "#FF6500", fontWeight: 500 }}>{it.num}</span><span>{it.title}</span><span style={{ flex: 1, height: 1, background: "currentColor", opacity: 0.25, marginLeft: ".6rem" }} /></span>
                  <p className="p1">{it.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ gridColumn: "7/13", paddingBottom: "30vh" }}>
            {ITEMS.map((it) => (
              <div key={it.num} data-st-item style={{ minHeight: "70vh", display: "flex", flexDirection: "column", justifyContent: "center", borderTop: "1px solid rgba(249,244,238,.1)", padding: "3rem 0" }}>
                <span className="lab5" style={{ color: "rgba(249,244,238,.55)", marginBottom: "1.2rem" }}>{it.num}</span>
                <a href={it.href} onClick={navTo} data-st-title className="h1" style={{ display: "block", lineHeight: 0.95, opacity: 0.2 }}>{it.title}</a>
                <div data-r="mob" style={{ display: "flex", flexDirection: "column", gap: "1.4rem", marginTop: "1.6rem" }}>
                  <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", background: warm() }}><Img src={it.img} alt={it.title} /></div>
                  <p className="p1">{it.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-bg="light" style={{ position: "relative", background: "#F9F4EE", color: "#211A19", padding: "var(--sec) 0", overflow: "hidden" }}>
        <VLine color="rgba(33,26,25,.1)" />
        <div data-grid data-group style={{ padding: "0 var(--pad)", position: "relative", rowGap: "3rem" }}>
          <h2 data-reveal="h" className="h1" style={{ gridColumn: "1/6" }}><span data-ln className="ln">Explore Our</span><span data-ln className="ln">Divisions</span></h2>
          <div style={{ gridColumn: "7/13", display: "flex", flexDirection: "column" }}>
            {DIVS.map(([n, l, h]) => (
              <a key={h} href={h} onClick={navTo} data-reveal="ctn" data-ul style={{ display: "grid", gridTemplateColumns: "3rem 1fr auto", alignItems: "center", gap: "1rem", padding: "1.4rem 0", minWidth: 0, alignSelf: "stretch" }}>
                <span className="row-num">{n}</span><span className="h2t">{l}</span><span className="lab">Explore ↗</span>
                <span className="ul-base" style={{ opacity: 0.15 }} /><span data-ul-line className="ul-line" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section data-bg="color" data-r="tall" style={{ position: "relative", minHeight: "100vh", overflow: "hidden", background: "#211A19", color: "#fff", display: "flex", alignItems: "center" }}>
        <div data-parallax="w" style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <div data-parallax="img" style={{ position: "absolute", left: 0, right: 0, top: "-15%", height: "130%", background: "radial-gradient(70% 60% at 30% 40%,#5c4a3f 0%,rgba(92,74,63,0) 60%),linear-gradient(180deg,#33291f 0%,#211A19 55%,#120e0c 100%)" }}><Img src={px(30484316)} alt="" /></div>
        </div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(rgba(0,0,0,.25),rgba(0,0,0,.45))", pointerEvents: "none" }} />
        <div data-grid data-group style={{ padding: "calc(var(--hh) + 3rem) var(--pad) 4rem", position: "relative", width: "100%", rowGap: "3rem", pointerEvents: "none", alignItems: "end" }}>
          <h2 data-reveal="h" className="h2t" style={{ gridColumn: "1/4" }}>Partnership</h2>
          <div style={{ gridColumn: "7/13", display: "flex", flexDirection: "column", gap: "2.4rem", pointerEvents: "auto" }}>
            <h2 data-reveal="h" className="h2">We believe the strongest projects begin with shared understanding. Tell us what you need, what matters most and what the site makes possible. Together, we can identify priorities, discuss the right expertise and make the next steps clearer.</h2>
            <UL label="Begin the Conversation" dot data-reveal="ctn" minWidth="14rem" lineOpacity={0.4} />
          </div>
        </div>
      </section>

      <Promise />
    </Page>
  );
}

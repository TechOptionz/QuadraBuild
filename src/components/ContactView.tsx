"use client";
import Page from "./Page";
import { VLine, Diag, openDrawer } from "./ui";

export default function ContactView() {
  return (
    <Page current="contact">
      <section data-hero data-bg="light" data-sout="fade" style={{ position: "relative", minHeight: "100svh", background: "#F9F4EE", color: "#211A19", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "calc(var(--hh) + 2rem) 0 3rem" }}>
        <div data-shadow style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", mixBlendMode: "multiply" }}>
          <div data-blob style={{ position: "absolute", left: "-15%", top: "-30%", width: "70%", height: "80%", background: "radial-gradient(ellipse at center,rgba(70,50,40,.16) 0%,transparent 62%)", transform: "rotate(-22deg)" }} />
          <div data-blob style={{ position: "absolute", right: "-20%", bottom: "-30%", width: "70%", height: "80%", background: "radial-gradient(ellipse at center,rgba(70,50,40,.12) 0%,transparent 62%)", transform: "rotate(18deg)" }} />
        </div>
        <VLine color="rgba(33,26,25,.1)" />
        <Diag color="rgba(33,26,25,.1)" width="160vw" />
        <div data-grid style={{ padding: "0 var(--pad)", position: "relative" }}>
          <div data-reveal="ctn" className="lab" style={{ gridColumn: "1/4" }}>Get in touch</div>
        </div>
        <div data-grid style={{ padding: "4rem var(--pad)", position: "relative", rowGap: "4rem", alignItems: "center" }}>
          <h1 data-reveal="h" onClick={openDrawer} className="h1" style={{ gridColumn: "1/7", cursor: "pointer" }}><span data-ln className="ln">Every project starts</span><span data-ln className="ln">with a conversation.</span></h1>
          <div style={{ gridColumn: "7/13", display: "flex", flexDirection: "column", gap: "2.4rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: ".4rem" }}>
              <span data-reveal="ctn" className="h2t" style={{ color: "rgba(33,26,25,.45)" }}>Write us</span>
              <span data-reveal="ctn" className="h2t">[VERIFY EMAIL]</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: ".4rem" }}>
              <span data-reveal="ctn" className="h2t" style={{ color: "rgba(33,26,25,.45)" }}>Call us</span>
              <span data-reveal="ctn" className="h2t">[VERIFY PHONE]</span>
            </div>
            <div data-reveal="ctn" className="sans" style={{ display: "flex", flexDirection: "column", gap: ".4rem", fontSize: "var(--p1)", lineHeight: 1.4 }}>
              <span className="lab" style={{ color: "rgba(33,26,25,.6)" }}>Office</span>
              <span>Brisbane, QLD</span>
              <span style={{ color: "rgba(33,26,25,.7)" }}>Serving Brisbane and surrounding South East Queensland communities.</span>
            </div>
          </div>
        </div>
        <div data-grid style={{ padding: "0 var(--pad)", position: "relative", rowGap: "2rem", alignItems: "end" }}>
          <div data-reveal="ctn" className="mono" style={{ gridColumn: "1/4", display: "flex", gap: ".6rem", alignItems: "center", color: "rgba(33,26,25,.5)" }}><span style={{ width: ".5rem", height: ".5rem", background: "#FF6500" }} />Contact details pending client verification</div>
          <div style={{ gridColumn: "7/13", display: "flex", flexDirection: "column", gap: "1.8rem" }}>
            <p data-reveal="p" className="p1" style={{ maxWidth: "28rem" }}>Tell us about your site, your ideas and the work you have in mind. We can discuss the type of project, relevant considerations and how to take the next practical step.</p>
          </div>
        </div>
        <div data-grid style={{ padding: "4rem var(--pad) var(--sec)", position: "relative" }}>
          <button onClick={openDrawer} data-reveal="ctn" data-enq style={{ gridColumn: "1/13", display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "center", gap: "2.5rem", width: "100%", padding: "2.4rem 2.6rem", background: "#211A19", color: "#F9F4EE", border: 0, cursor: "pointer", textAlign: "left", position: "relative", overflow: "hidden", transition: "background .5s" }}>
            <span className="lab" style={{ display: "flex", flexDirection: "column", gap: ".6rem", letterSpacing: ".1em", color: "#FF6500" }}>
              <span style={{ display: "flex", alignItems: "center", gap: ".6rem" }}><span style={{ width: 7, height: 7, borderRadius: "50%", background: "#FF6500", display: "block" }} />Enquiry form</span>
              <span style={{ color: "rgba(249,244,238,.55)", fontWeight: 500, letterSpacing: ".08em" }}>Takes about two minutes</span>
            </span>
            <span style={{ display: "flex", flexDirection: "column", gap: ".6rem", minWidth: 0 }}>
              <span className="h2t" style={{ fontSize: "calc(var(--h2) * 1.15)" }}>Start your enquiry</span>
              <span className="sans" style={{ fontSize: "var(--p1)", lineHeight: 1.45, color: "rgba(249,244,238,.72)", maxWidth: "38rem" }}>Share your name, the type of project and a few details. We will come back to you to arrange a conversation.</span>
            </span>
            <span data-enq-arrow className="sans" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "4rem", height: "4rem", borderRadius: "50%", border: "1px solid rgba(249,244,238,.35)", fontSize: "1.3rem", lineHeight: 1, transition: "background .5s,color .5s,border-color .5s,transform .6s cubic-bezier(.25,1,.5,1)" }}>→</span>
          </button>
        </div>
      </section>
    </Page>
  );
}

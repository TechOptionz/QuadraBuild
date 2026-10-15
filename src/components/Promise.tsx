"use client";
import { px } from "@/lib/projects";
import { Img, UL, VLine, Diag } from "./ui";

/** Promise band — the closing quote section shared by most pages. */
export default function Promise() {
  return (
    <section data-bg="color" data-r="tall" style={{ position: "relative", height: "140vh", minHeight: 900, overflow: "hidden", background: "#211A19", color: "#fff" }}>
      <div data-parallax="w" style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <div data-parallax="img" style={{ position: "absolute", left: 0, right: 0, top: "-15%", height: "130%", background: "radial-gradient(80% 50% at 50% 15%,#6b5a4d 0%,rgba(107,90,77,0) 60%),linear-gradient(180deg,#3a2f27 0%,#241c19 50%,#15100e 100%)" }}>
          <Img src={px(8134746)} alt="Quadra Build exterior" />
        </div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: "60%", background: "linear-gradient(rgba(0,0,0,.45),rgba(0,0,0,0))", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,rgba(0,0,0,.6) 0%,rgba(0,0,0,.4) 45%,rgba(0,0,0,0) 75%)", pointerEvents: "none" }} />
      <VLine color="rgba(255,255,255,.12)" />
      <Diag color="rgba(255,255,255,.1)" width="150vw" />
      <div data-grid data-group style={{ padding: "calc(var(--sec) + var(--hh)) var(--pad) 0", position: "relative", pointerEvents: "none" }}>
        <div style={{ gridColumn: "1/6", display: "flex", flexDirection: "column", gap: "2rem", pointerEvents: "auto" }}>
          <h2 data-reveal="h" className="h1" style={{ lineHeight: 0.95 }}>“Good building starts with clear thinking, careful work and respect for the people who use each space.”</h2>
          <div data-reveal="ctn" className="lab" style={{ color: "rgba(255,255,255,.75)" }}>The Quadra Build Approach</div>
          <p data-reveal="p" className="p1" style={{ maxWidth: "26rem", marginTop: "1rem" }}>We want clients to feel informed from the first conversation to the final details. That means discussing scope openly, explaining next steps, identifying decisions early and keeping the finished space firmly in view. The aim is an experience built on clarity and care.</p>
          <UL label="Let's Talk" dot data-reveal="ctn" lineOpacity={0.4} />
        </div>
      </div>
    </section>
  );
}

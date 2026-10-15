"use client";
import Page from "./Page";
import { VLine } from "./ui";

/** Legal template page (Privacy Policy / Terms of Use). Section wording is to be supplied after legal review. */
export default function LegalView({ title, sections }: { title: string; sections: string[] }) {
  return (
    <Page current="legal" enter="fade">
      <section data-hero data-bg="light" style={{ position: "relative", background: "#F9F4EE", color: "#211A19", padding: "calc(var(--hh) + 5rem) 0 var(--sec)", overflow: "hidden", minHeight: "100svh" }}>
        <VLine color="rgba(33,26,25,.1)" />
        <div data-grid style={{ padding: "0 var(--pad)", position: "relative", rowGap: "3rem" }}>
          <div data-reveal="ctn" className="lab" style={{ gridColumn: "1/4" }}>Legal</div>
          <div style={{ gridColumn: "4/11", display: "flex", flexDirection: "column", gap: "2.4rem" }}>
            <h1 data-reveal="h" className="h1">{title}</h1>
            <div data-reveal="ctn" className="sans" style={{ display: "flex", flexDirection: "column", gap: ".6rem", fontSize: "var(--p1)", lineHeight: 1.4, color: "rgba(33,26,25,.7)" }}><span className="lab" style={{ color: "rgba(33,26,25,.6)" }}>Last updated</span><span>[DATE — set on publication]</span></div>
            <div data-reveal="ctn" style={{ display: "flex", gap: ".8rem", alignItems: "flex-start", padding: "1.2rem 0", borderTop: "1px solid rgba(33,26,25,.15)", borderBottom: "1px solid rgba(33,26,25,.15)", fontFamily: "ui-monospace,SFMono-Regular,Menlo,monospace", fontSize: ".7rem", lineHeight: 1.6, letterSpacing: ".02em", color: "#C8460B" }}>
              <span style={{ flex: "none", width: ".5rem", height: ".5rem", background: "#FF6500", marginTop: ".45em" }} />
              <span>TEMPLATE ONLY. This page contains placeholder section headings, not legal terms. Business-specific wording must be prepared and reviewed by a qualified legal adviser for Quadra Build before publication. Do not publish this page in its current state.</span>
            </div>
          </div>
        </div>
        <div data-grid data-group style={{ padding: "4rem var(--pad) 0", position: "relative", rowGap: 0 }}>
          <div style={{ gridColumn: "4/11", display: "flex", flexDirection: "column" }}>
            {sections.map((s, i) => (
              <div key={s} data-reveal="ctn" data-row style={{ display: "grid", gridTemplateColumns: "1fr 3fr", columnGap: "var(--gap)", padding: "2rem 0", borderTop: "1px solid rgba(33,26,25,.15)" }}>
                <span className="row-num">{i + 1}.0</span>
                <div style={{ display: "flex", flexDirection: "column", gap: ".8rem" }}>
                  <h2 className="h2t">{s}</h2>
                  <p className="p1" style={{ color: "rgba(33,26,25,.6)", maxWidth: "32rem" }}>[Business-specific wording to be supplied following legal review.]</p>
                </div>
              </div>
            ))}
            <div className="hairline" />
          </div>
        </div>
      </section>
    </Page>
  );
}

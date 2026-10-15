"use client";
import { navTo } from "./ui";

export type FooterCurrent = "home" | "about" | "renovations" | "homes" | "commercial" | "approvals" | "projects" | "contact" | "legal";

export default function Footer({ current }: { current: FooterCurrent }) {
  const op = (k: string) => (current === k ? 0.5 : 1);
  const svc = ["renovations", "homes", "commercial", "approvals"].includes(current) ? 0.5 : 1;
  return (
    <footer id="contact" data-footer data-bg="dark" style={{ position: "relative", background: "#211A19", color: "#F9F4EE", overflow: "clip" }}>
      <div data-footer-inner>
        <div data-r="wm" aria-hidden="true" className="serif" style={{ position: "relative", fontWeight: 400, fontSize: "21rem", lineHeight: 0.75, letterSpacing: "-.01em", margin: "-.3em 0 0 -.03em", whiteSpace: "nowrap", userSelect: "none", textTransform: "uppercase" }}>
          <span style={{ display: "block", color: "rgba(249,244,238,.035)" }}>Quadra</span>
          <span data-wm-light style={{ position: "absolute", inset: 0, display: "block", color: "rgba(249,244,238,.22)", WebkitMaskImage: "radial-gradient(34vw circle at var(--mx,50%) var(--my,160%),#000 0%,rgba(0,0,0,.35) 45%,transparent 72%)", maskImage: "radial-gradient(34vw circle at var(--mx,50%) var(--my,160%),#000 0%,rgba(0,0,0,.35) 45%,transparent 72%)" }}>Quadra</span>
        </div>
        <div data-grid data-group style={{ padding: "3rem var(--pad) 6rem", rowGap: "3rem" }}>
          <div data-reveal="ctn" className="lab" style={{ gridColumn: "1/3" }}>Explore</div>
          <nav aria-label="Footer" data-reveal="ctn" className="h2t" style={{ gridColumn: "3/6", display: "flex", flexDirection: "column", gap: ".5rem" }}>
            <a href="/" onClick={navTo} style={{ opacity: op("home") }}>Home</a>
            <a href="/about" onClick={navTo} style={{ opacity: op("about") }}>About</a>
            <a href="/renovations" onClick={navTo} style={{ opacity: svc }}>Services</a>
            <a href="/projects" onClick={navTo} style={{ opacity: op("projects") }}>Projects</a>
            <a href="/contact" onClick={navTo} style={{ opacity: op("contact") }}>Contact</a>
          </nav>
          <div data-reveal="ctn" style={{ gridColumn: "7/9", display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            <span className="lab">Our Divisions</span>
            <div className="sans" style={{ display: "flex", flexDirection: "column", gap: ".5rem", fontSize: "var(--p1)", lineHeight: 1.4 }}>
              <a href="/renovations" onClick={navTo}>Renovations</a>
              <a href="/homes" onClick={navTo}>Homes</a>
              <a href="/commercial" onClick={navTo}>Commercial</a>
              <a href="/approvals" onClick={navTo}>Approvals</a>
            </div>
          </div>
          <div data-reveal="ctn" style={{ gridColumn: "9/13", display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            <span className="lab">Get in touch</span>
            <div className="sans" style={{ display: "grid", gridTemplateColumns: "1.6rem 1fr", rowGap: ".5rem", fontSize: "var(--p1)", lineHeight: 1.4 }}>
              <span style={{ color: "rgba(249,244,238,.55)" }}>E.</span><span>[VERIFY EMAIL]</span>
              <span style={{ color: "rgba(249,244,238,.55)" }}>T.</span><span>[VERIFY PHONE]</span>
              <span style={{ color: "rgba(249,244,238,.55)" }}>A.</span><span>Brisbane, QLD</span>
            </div>
            <span className="sans" style={{ fontSize: "var(--p1)", lineHeight: 1.4, color: "rgba(249,244,238,.62)" }}>Brisbane and South East Queensland</span>
          </div>
        </div>
        <div className="lab5" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "1rem 2rem", padding: "0 var(--pad) var(--pad)", color: "rgba(249,244,238,.62)" }}>
          <span>© 2026 Quadra Build. All rights reserved.</span>
          <span style={{ display: "flex", gap: "1.5rem" }}><a href="/privacy-policy" onClick={navTo}>Privacy Policy</a><a href="/terms-of-use" onClick={navTo}>Terms of Use</a></span>
          <span>QBCC licence: [VERIFY]</span>
        </div>
      </div>
    </footer>
  );
}

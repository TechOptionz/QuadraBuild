"use client";
import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import QuadraLogo, { type LogoColors } from "./QuadraLogo";

/**
 * Logo colour-variation preview (internal design review only).
 * Classic Original is the untouched PNG asset and the default; the five alternatives are the same traced
 * geometry rendered as a flat SVG with their own exact palettes. Only the logo changes, never the site.
 */
export type LogoVariant = { id: string; num: string; name: string; colors: LogoColors };

export const LOGO_VARIANTS: LogoVariant[] = [
  { id: "classic", num: "01", name: "Classic Original", colors: { house: "#1C8EF0", roof2: "#FF8A00", roof3: "#B9C2CC", roof4: "#F02A1A", quadra: "#FFFFFF", build: "#FF8A00" } },
  { id: "ocean", num: "02", name: "Ocean Pop", colors: { house: "#00C2FF", roof2: "#FFB300", roof3: "#D5DCE3", roof4: "#FF3B3B", quadra: "#FFFFFF", build: "#FFB300" } },
  { id: "royal-flame", num: "03", name: "Royal Flame", colors: { house: "#2F5BFF", roof2: "#FFC400", roof3: "#D5DCE3", roof4: "#FF1F3D", quadra: "#FFFFFF", build: "#FFC400" } },
  { id: "emerald", num: "04", name: "Emerald Energy", colors: { house: "#00D15A", roof2: "#FF7A00", roof3: "#D5DCE3", roof4: "#FF2E2E", quadra: "#FFFFFF", build: "#FF7A00" } },
  { id: "sunset", num: "05", name: "Sunset Blaze", colors: { house: "#8A3FFF", roof2: "#FF6A00", roof3: "#D5DCE3", roof4: "#FF2D75", quadra: "#FFFFFF", build: "#FF6A00" } },
  { id: "teal", num: "06", name: "Teal Citrus", colors: { house: "#00D1B2", roof2: "#FF9100", roof3: "#D5DCE3", roof4: "#FF3D5A", quadra: "#FFFFFF", build: "#FF9100" } },
];

const KEY = "qb-logo-variant";
const EVT = "qb-logo-variant";
/** The selector is a preview tool: shown in development, or when NEXT_PUBLIC_LOGO_PREVIEW=1 is set for a review build. */
export const LOGO_PREVIEW_ENABLED = process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_LOGO_PREVIEW === "1";

const CLASSIC_PNG = "/brand/qb-lockup.png";
const PNG_W = 1179, PNG_H = 726;

function readVariant(): string {
  try { const s = localStorage.getItem(KEY); if (s && LOGO_VARIANTS.some((v) => v.id === s)) return s; } catch {}
  return "classic";
}

function useLogoVariant() {
  const [id, setId] = useState("classic");
  useEffect(() => {
    if (!LOGO_PREVIEW_ENABLED) return;
    const sync = () => setId(readVariant());
    sync();
    window.addEventListener(EVT, sync); window.addEventListener("storage", sync);
    return () => { window.removeEventListener(EVT, sync); window.removeEventListener("storage", sync); };
  }, []);
  return id;
}

/** Renders one variant at a given height; classic is the original PNG, the rest are the flat SVG. */
export function LogoArt({ variant, height, sizes = "320px", eager = false }: { variant: LogoVariant; height: string; sizes?: string; eager?: boolean }) {
  const style: CSSProperties = { height, width: "auto", aspectRatio: `${PNG_W} / ${PNG_H}`, display: "block" };
  if (variant.id === "classic") return <Image src={CLASSIC_PNG} alt="Quadra Build" width={PNG_W} height={PNG_H} sizes={sizes} loading={eager ? "eager" : undefined} priority={eager} style={style} />;
  return <QuadraLogo colors={variant.colors} style={style} />;
}

/** The header logo. Swaps palette with the chosen preview variant; always Classic Original on the public site. */
export function LogoImage() {
  const id = useLogoVariant();
  const v = LOGO_VARIANTS.find((x) => x.id === id) ?? LOGO_VARIANTS[0];
  return <LogoArt variant={v} height="var(--logo-h)" eager />;
}

const Swatches = ({ c, size = ".55rem" }: { c: LogoColors; size?: string }) => (
  <span aria-hidden="true" style={{ display: "inline-flex", gap: ".2rem", flex: "none" }}>
    {[c.house, c.roof2, c.roof3, c.roof4].map((col, i) => (
      <span key={i} style={{ width: size, height: size, borderRadius: "50%", background: col, boxShadow: "0 0 0 1px rgba(255,255,255,.1)" }} />
    ))}
  </span>
);

const LAB: CSSProperties = { fontFamily: "var(--sans)", fontWeight: 500, fontSize: "var(--l1)", letterSpacing: ".1em", textTransform: "uppercase", lineHeight: 1.4 };

export default function LogoMenu() {
  const id = useLogoVariant();
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false); // keeps the panel mounted during the close animation
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) { setShown(true); return; }
    const t = setTimeout(() => setShown(false), 260); return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: PointerEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", onDoc); document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("pointerdown", onDoc); document.removeEventListener("keydown", onKey); };
  }, [open]);

  if (!LOGO_PREVIEW_ENABLED) return null;

  const choose = (next: string) => {
    try { localStorage.setItem(KEY, next); } catch {}
    window.dispatchEvent(new Event(EVT));
    setOpen(false);
  };
  const cur = LOGO_VARIANTS.find((v) => v.id === id) ?? LOGO_VARIANTS[0];

  return (
    <div ref={ref} data-logo-menu style={{ position: "relative", display: "flex", alignItems: "center", flex: "none" }}>
      <button type="button" onClick={() => setOpen((o) => !o)} aria-haspopup="listbox" aria-expanded={open} aria-label={`Logo colour variation: ${cur.name}`} data-logo-trigger
        style={{ display: "flex", alignItems: "center", gap: ".7rem", height: "2.4rem", padding: "0 .8rem 0 .7rem", background: "#211A19", border: "1px solid rgba(255,255,255,.12)", color: "#F9F4EE", cursor: "pointer", borderRadius: "999px", transition: "border-color .3s, background .3s" }}>
        <Swatches c={cur.colors} />
        <span data-r="desk" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", lineHeight: 1.1 }}>
          <span style={{ ...LAB, fontSize: "calc(var(--l1) * .72)", opacity: 0.45, letterSpacing: ".16em" }}>Logo preview</span>
          <span style={{ ...LAB, fontWeight: 700, fontSize: "calc(var(--l1) * .95)" }}>{cur.name}</span>
        </span>
        <span aria-hidden="true" style={{ display: "inline-block", width: ".4rem", height: ".4rem", borderRight: "1px solid currentColor", borderBottom: "1px solid currentColor", transform: open ? "translateY(.12rem) rotate(-135deg)" : "translateY(-.12rem) rotate(45deg)", transition: "transform .3s", opacity: 0.6, marginLeft: ".1rem" }} />
      </button>

      {shown && (
        <div role="listbox" aria-label="Logo colour variations" data-logo-panel
          style={{ position: "absolute", top: "calc(100% + .7rem)", left: 0, zIndex: 5, width: "min(22rem, calc(100vw - 2rem))", background: "#211A19", color: "#F9F4EE", border: "1px solid rgba(255,255,255,.12)", borderRadius: "6px", padding: ".5rem", boxShadow: "0 18px 40px rgba(0,0,0,.45)", opacity: open ? 1 : 0, transform: open ? "translateY(0)" : "translateY(-.4rem)", transition: "opacity .25s ease, transform .3s cubic-bezier(.25,1,.5,1)", pointerEvents: open ? "auto" : "none" }}>
          <div style={{ ...LAB, opacity: 0.45, padding: ".5rem .7rem .55rem", borderBottom: "1px solid rgba(255,255,255,.08)", marginBottom: ".3rem" }}>Logo colour variation · preview only</div>
          {LOGO_VARIANTS.map((v) => {
            const active = v.id === id;
            return (
              <button key={v.id} type="button" role="option" aria-selected={active} onClick={() => choose(v.id)} data-logo-option
                style={{ position: "relative", display: "grid", gridTemplateColumns: "auto 5.4rem 1fr", alignItems: "center", gap: ".8rem", width: "100%", padding: ".55rem .7rem .55rem .9rem", background: active ? "rgba(255,101,0,.08)" : "transparent", border: 0, borderRadius: "4px", color: "#F9F4EE", cursor: "pointer", textAlign: "left", transition: "background .25s" }}
                onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "rgba(249,244,238,.05)"; }}
                onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}>
                <span aria-hidden="true" style={{ position: "absolute", left: 0, top: ".6rem", bottom: ".6rem", width: "2px", borderRadius: "2px", background: "#FF6500", opacity: active ? 1 : 0, transition: "opacity .25s" }} />
                <span style={{ ...LAB, fontSize: "calc(var(--l1) * .8)", opacity: active ? 0.9 : 0.4, color: active ? "#FF6500" : "#F9F4EE", width: "1.4rem" }}>{v.num}</span>
                <span style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: ".3rem .2rem", background: "rgba(249,244,238,.03)", borderRadius: "3px" }}>
                  <LogoArt variant={v} height="2.6rem" sizes="120px" />
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: ".3rem", minWidth: 0 }}>
                  <span style={{ ...LAB, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{v.name}</span>
                  <Swatches c={v.colors} size=".6rem" />
                </span>
                {active && <span aria-hidden="true" style={{ position: "absolute", right: ".8rem", top: "50%", width: ".4rem", height: ".4rem", borderRadius: "50%", background: "#FF6500", transform: "translateY(-50%)" }} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

"use client";
import Image from "next/image";
import type { CSSProperties, MouseEvent, ReactNode } from "react";
import QB from "@/lib/qb-engine";

export const navTo = (e: MouseEvent<HTMLElement>) => QB.navTo(e);
export const openDrawer = (e?: MouseEvent<HTMLElement>) => QB.openDrawer(e);

type Extra = { [key: `data-${string}`]: string | number | boolean | undefined };

/** Underline link / button (data-ul) — the design's primary text CTA. */
export function UL({ href, label, icon = "↗", dot, onClick, style, minWidth, lineOpacity, className, gap, ...rest }: {
  href?: string; label: string; icon?: string; dot?: boolean; onClick?: (e: MouseEvent<HTMLElement>) => void; style?: CSSProperties;
  minWidth?: string; lineOpacity?: number; className?: string; gap?: string;
} & Extra) {
  const inner = (
    <>
      <span className="ul-row" style={gap ? { gap } : undefined}><span>{label}</span>{dot ? <span className="dot" /> : <span>{icon}</span>}</span>
      <span className="ul-base" style={lineOpacity !== undefined ? { opacity: lineOpacity } : undefined} />
      <span data-ul-line className="ul-line" />
    </>
  );
  const st: CSSProperties = { ...(minWidth ? { minWidth } : {}), ...style };
  if (href) return <a href={href} onClick={onClick || navTo} data-ul className={className} style={st} {...rest}>{inner}</a>;
  return <button type="button" onClick={onClick || openDrawer} data-ul className={className} style={st} {...rest}>{inner}</button>;
}

/** Cover image filling its positioned parent. */
export function Img({ src, alt = "", priority, eager, sizes = "100vw", quality }: { src: string; alt?: string; priority?: boolean; eager?: boolean; sizes?: string; quality?: 60 | 75 }) {
  return <Image src={src} alt={alt} fill sizes={sizes} quality={quality} priority={priority} loading={eager ? "eager" : undefined} style={{ objectFit: "cover" }} />;
}

/** Soft dark gradient fill behind images (the design's warm placeholder background). */
export const warm = (angle = 160, hot = "#4a3b35", at = "70% 20%") =>
  `radial-gradient(120% 80% at ${at},${hot} 0%,rgba(74,59,53,0) 60%),linear-gradient(${angle}deg,#2e2522 0%,#211A19 60%,#1a1514 100%)`;

export function Eyebrow({ children, col = "1/4", style, ...rest }: { children: ReactNode; col?: string; style?: CSSProperties } & Extra) {
  return <div data-reveal="ctn" className="lab" style={{ gridColumn: col, ...style }} {...rest}>{children}</div>;
}

export const VLine = ({ color = "rgba(249,244,238,.1)", left }: { color?: string; left?: string }) => <div data-vline style={{ background: color, ...(left ? { left } : {}) }} />;
export const Diag = ({ color = "rgba(249,244,238,.08)", width = "140vw", left = "50%" }: { color?: string; width?: string; left?: string }) => (
  <div data-diag style={{ position: "absolute", left, top: "50%", width, height: 1, background: color, transform: "translate(-50%,-50%) rotate(-30deg)", pointerEvents: "none" }} />
);

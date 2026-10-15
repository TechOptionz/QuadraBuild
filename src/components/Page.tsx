"use client";
import { useEffect, useRef, type ReactNode } from "react";
import QB from "@/lib/qb-engine";
import Footer, { type FooterCurrent } from "./Footer";

/** Routed page wrapper: <main data-main> + footer, driving the engine's per-page lifecycle. */
export default function Page({ current, enter, onInit, before, children }: {
  current: FooterCurrent; enter?: "iris" | "fade" | false; onInit?: () => void; before?: ReactNode; children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const initRef = useRef(onInit);
  useEffect(() => { initRef.current = onInit; });
  useEffect(() => {
    const el = ref.current; if (!el) return; let cancelled = false; QB._entered = false;
    const wd = setTimeout(() => { if (!QB._entered) QB.failSafe(); }, 8000);
    QB.ready(() => { if (cancelled) return; clearTimeout(wd); QB.initPage(el, { enter, onInit: () => initRef.current?.() }); });
    return () => { cancelled = true; clearTimeout(wd); QB.destroyPage(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div data-page ref={ref}>
      {before}
      <main data-main style={{ opacity: 0, position: "relative" }}>{children}</main>
      <Footer current={current} />
    </div>
  );
}

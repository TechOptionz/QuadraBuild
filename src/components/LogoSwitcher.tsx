"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { DEFAULT_LOGO, LOGO_STORAGE_KEY, logos, type LogoId } from "@/content/logos";
import { Chevron } from "./Icons";

/** Header dropdown for choosing which of the three logos the site shows. */
export function LogoSwitcher() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<LogoId>(DEFAULT_LOGO);
  const rootRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    const saved = document.documentElement.dataset.logo as LogoId | undefined;
    if (saved && logos.some((l) => l.id === saved)) setCurrent(saved);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const choose = (id: LogoId) => {
    setCurrent(id);
    document.documentElement.dataset.logo = id;
    try {
      localStorage.setItem(LOGO_STORAGE_KEY, id);
    } catch {
      // Storage unavailable (private mode): the choice still applies to this page.
    }
    setOpen(false);
    btnRef.current?.focus();
  };

  return (
    <div className="logo-switch" ref={rootRef}>
      <button
        ref={btnRef}
        type="button"
        className="logo-switch-btn"
        aria-label="Choose logo"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
      >
        <Chevron />
      </button>
      <div id={panelId} className="logo-switch-panel" data-open={open} role="radiogroup" aria-label="Logo" inert={!open}>
        <p className="logo-switch-title">Logo</p>
        {logos.map((l) => (
          <button
            key={l.id}
            type="button"
            role="radio"
            aria-checked={current === l.id}
            className="logo-option"
            onClick={() => choose(l.id)}
          >
            <span className="logo-option-art">
              <Image src={l.src} alt="" sizes="120px" />
            </span>
            <span className="logo-option-text">
              <strong>{l.label}</strong>
              <span>{l.note}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

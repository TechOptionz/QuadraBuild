export function Arrow({ className = "arrow" }: { className?: string }) {
  return (
    <svg className={className} width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
      <path d="M0 6h14M9 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function Chevron() {
  return (
    <svg className="chev" width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/** Small line icons for the "Why Quadra Build" list. One weight, one size. */
const LINE_ICONS = {
  communication: "M4 5h16v11H9l-5 4V5zM8 9h8M8 12.5h5",
  tailored: "M4 7h9M17 7h3M4 17h3M11 17h9M15 4.5v5M9 14.5v5",
  coordinated: "M12 3l9 5-9 5-9-5 9-5zM3 12.5l9 5 9-5M3 17l9 5 9-5",
  detail: "M10.5 17a6.5 6.5 0 100-13 6.5 6.5 0 000 13zM15.5 15.5L21 21M10.5 8v5M8 10.5h5",
  local: "M12 21s7-6.2 7-11.5a7 7 0 10-14 0C5 14.8 12 21 12 21zM12 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5z",
} as const;

export type LineIconName = keyof typeof LINE_ICONS;

export function LineIcon({ name }: { name: LineIconName }) {
  return (
    <svg className="line-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={LINE_ICONS[name]} stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

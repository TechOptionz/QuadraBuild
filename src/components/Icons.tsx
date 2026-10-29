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

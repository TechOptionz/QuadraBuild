import { showPlaceholders } from "@/content/site";

/**
 * Clearly marked placeholder for unconfirmed business information.
 * Renders nothing unless `showPlaceholders` is on.
 */
export function Ph({ children }: { children: React.ReactNode }) {
  if (!showPlaceholders) return null;
  return (
    <em className="ph" title="Placeholder — to be confirmed by Quadra Build">
      {children}
    </em>
  );
}

/** Renders a confirmed value, or a placeholder if it is not yet available. */
export function Confirmed({ value, fallback }: { value: string | null | undefined; fallback: string }) {
  return value ? <>{value}</> : <Ph>{fallback}</Ph>;
}

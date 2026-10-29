import Link from "next/link";
import { Arrow } from "./Icons";

type Variant = "primary" | "dark" | "outline" | "light" | "outline-light";

export function ButtonLink({
  href,
  children,
  variant = "dark",
  className = "",
  arrow = true,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
}) {
  const v = variant === "dark" ? "" : `btn--${variant}`;
  return (
    <Link href={href} className={`btn ${v} ${className}`.replace(/\s+/g, " ").trim()}>
      <span>{children}</span>
      {arrow && <Arrow />}
    </Link>
  );
}

export function ArrowLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link href={href} className={`link-arrow ${className}`.trim()}>
      <span>{children}</span>
      <Arrow />
    </Link>
  );
}

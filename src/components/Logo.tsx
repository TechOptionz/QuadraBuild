import Image from "next/image";
import Link from "next/link";
import { DEFAULT_LOGO, logos } from "@/content/logos";
import { site } from "@/content/site";

/**
 * Brand logo, linking home. All supplied logos are rendered and CSS
 * shows the one named by `html[data-logo]` (see LogoSwitcher), so switching
 * needs no re-render.
 */
export function Logo({ priority = false, onDark = false }: { priority?: boolean; onDark?: boolean }) {
  return (
    <Link href="/" className="logo" aria-label={`${site.name} — home`}>
      {logos.map((l) => {
        const eager = priority && l.id === DEFAULT_LOGO;
        return (
          <span key={l.id} className="logo-art" data-logo-id={l.id}>
            <Image src={(onDark && l.srcOnDark) || l.src} alt="" sizes="260px" quality={95} priority={eager} loading={eager ? undefined : "lazy"} />
          </span>
        );
      })}
    </Link>
  );
}

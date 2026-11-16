import Image from "next/image";
import type { SiteImage } from "@/content/images";

/**
 * A slowly drifting strip of captioned photos. It pauses under the cursor or
 * keyboard focus, and becomes a plain swipeable row for visitors who prefer
 * reduced motion. The list is rendered twice so the loop is seamless; the
 * second copy is hidden from assistive technology.
 */
export function PhotoMarquee({ items, label }: { items: { image: SiteImage; caption: string }[]; label: string }) {
  return (
    <div className="marquee" role="group" aria-label={label} tabIndex={0}>
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <ul className="marquee-set" role="list" key={copy} aria-hidden={copy === 1 || undefined}>
            {items.map((it) => (
              <li key={it.caption}>
                <figure>
                  <div className="marquee-img">
                    <Image
                      src={it.image.src}
                      alt={copy === 0 ? it.image.alt : ""}
                      fill
                      placeholder="blur"
                      sizes="(max-width: 600px) 78vw, (max-width: 1100px) 44vw, 30vw"
                    />
                  </div>
                  <figcaption>{it.caption}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

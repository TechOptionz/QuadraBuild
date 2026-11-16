import Image from "next/image";
import Link from "next/link";
import { divisions } from "@/content/divisions";
import { divisionHref } from "@/content/navigation";
import { divisionKeyStyle } from "./DivisionKey";
import { Arrow } from "./Icons";

/**
 * The four divisions as photo panels: the one under the cursor (or keyboard
 * focus) widens to show its summary. Without hover (touch) and on small
 * screens every panel is shown open, stacked. CSS only.
 */
export function DivisionPanels() {
  return (
    <div className="panels" data-reveal="fade">
      {divisions.map((d) => (
        <Link key={d.slug} href={divisionHref(d.slug)} className="panel" style={divisionKeyStyle(d.slug)}>
          <Image
            src={d.heroImage.src}
            alt=""
            fill
            placeholder="blur"
            sizes="(max-width: 860px) 100vw, 50vw"
          />
          <span className="panel-num" aria-hidden="true">
            {d.number}
          </span>
          <span className="panel-body">
            <strong className="h-lg">{d.name}</strong>
            <span className="panel-more">
              <span className="panel-text">{d.headline}</span>
              <span className="link-arrow">
                <span>Explore</span>
                <Arrow />
              </span>
            </span>
          </span>
        </Link>
      ))}
    </div>
  );
}

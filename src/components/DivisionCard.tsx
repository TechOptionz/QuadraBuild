import Image from "next/image";
import Link from "next/link";
import type { Division } from "@/content/divisions";
import { divisionHref } from "@/content/navigation";
import { delay } from "@/lib/style";
import { DivisionKey, divisionKeyStyle } from "./DivisionKey";
import { Arrow } from "./Icons";

export function DivisionCard({ division, index = 0 }: { division: Division; index?: number }) {
  return (
    <article className="division-card" data-reveal style={{ ...delay(index * 90), ...divisionKeyStyle(division.slug) }}>
      <div className="media">
        <Image
          src={division.heroImage.src}
          alt={division.heroImage.alt}
          fill
          placeholder="blur"
          sizes="(max-width: 600px) 100vw, (max-width: 1080px) 50vw, 25vw"
        />
        <span className="num" aria-hidden="true">
          {division.number}
        </span>
      </div>
      <div className="body">
        <p className="kicker">
          <DivisionKey slug={division.slug} />
          {division.shortName}
        </p>
        <h3 className="h-md">{division.name}</h3>
        <p>{division.cardSummary}</p>
        <Link href={divisionHref(division.slug)} className="link-arrow stretched">
          <span>
            Explore Service<span className="sr-only">: {division.name}</span>
          </span>
          <Arrow />
        </Link>
      </div>
    </article>
  );
}

import Image from "next/image";
import type { ImageSlotContent } from "@/content/imageSlots";

/**
 * A framed photo, or — until a photo is supplied in src/content/imageSlots.ts —
 * a drafting-style placeholder that says what belongs there.
 */
export function ImageSlot({
  slot,
  ratio = "4 / 5",
  sizes = "(max-width: 860px) 100vw, 50vw",
  className = "",
}: {
  slot: ImageSlotContent;
  ratio?: string;
  sizes?: string;
  className?: string;
}) {
  const style = { aspectRatio: ratio };

  if (slot.image) {
    return (
      <div className={`image-frame ${className}`} style={style} data-reveal="clip">
        <Image src={slot.image.src} alt={slot.image.alt} fill placeholder="blur" sizes={sizes} />
      </div>
    );
  }

  return (
    <div className={`image-frame image-slot ${className}`} style={style} data-reveal="clip">
      <div className="image-slot-inner" role="img" aria-label={`Photo coming soon: ${slot.label}`}>
        <span className="image-slot-peg image-slot-peg--tl" aria-hidden="true" />
        <span className="image-slot-peg image-slot-peg--tr" aria-hidden="true" />
        <span className="image-slot-peg image-slot-peg--bl" aria-hidden="true" />
        <span className="image-slot-peg image-slot-peg--br" aria-hidden="true" />
        <svg className="image-slot-icon" width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <rect x="4.5" y="9.5" width="31" height="23" stroke="currentColor" />
          <path d="M4.5 27.5l9-8 7 6 5-4 10 8" stroke="currentColor" />
          <circle cx="27" cy="16" r="2.5" stroke="currentColor" />
        </svg>
        <span className="image-slot-label">{slot.label}</span>
        <span className="image-slot-hint">{slot.hint}</span>
      </div>
    </div>
  );
}

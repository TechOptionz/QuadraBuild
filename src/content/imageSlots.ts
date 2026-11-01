import type { SiteImage } from "./images";

/**
 * Image slots waiting for real photography.
 *
 * While `image` is null the site shows a labelled placeholder in that spot.
 * To fill a slot:
 *   1. Add the photo to src/assets/photos (JPG, roughly the size in `hint`).
 *   2. Import it in src/content/images.ts and give it alt text.
 *   3. Set `image: images.yourPhoto` on the slot below.
 */
export type ImageSlotContent = {
  image: SiteImage | null;
  /** What the photo should show. Also used as the placeholder's label. */
  label: string;
  /** Recommended orientation and size. */
  hint: string;
};

export type SlotKey =
  | "aboutTeam"
  | "contactOffice"
  | "serviceAreasMap";

export const imageSlots: Record<SlotKey, ImageSlotContent> = {
  aboutTeam: {
    image: null,
    label: "The Quadra Build team",
    hint: "Landscape photo · about 2400 × 1030 px",
  },
  contactOffice: {
    image: null,
    label: "Office, team or a site visit",
    hint: "Landscape photo · about 1600 × 1200 px",
  },
  serviceAreasMap: {
    image: null,
    label: "Service area map · Brisbane & South East Queensland",
    hint: "Landscape image · about 2400 × 1030 px",
  },
};

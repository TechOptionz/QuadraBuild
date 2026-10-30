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
  | "servicesRenovations"
  | "servicesHomes"
  | "servicesCommercial"
  | "servicesApprovals"
  | "aboutTeam"
  | "contactOffice"
  | "serviceAreasMap";

export const imageSlots: Record<SlotKey, ImageSlotContent> = {
  servicesRenovations: {
    image: null,
    label: "Renovation in progress or a finished kitchen",
    hint: "Portrait photo · about 1600 × 2000 px",
  },
  servicesHomes: {
    image: null,
    label: "New home on site or at handover",
    hint: "Portrait photo · about 1600 × 2000 px",
  },
  servicesCommercial: {
    image: null,
    label: "Commercial fit-out underway or complete",
    hint: "Portrait photo · about 1600 × 2000 px",
  },
  servicesApprovals: {
    image: null,
    label: "Plans, site assessment or a planning meeting",
    hint: "Portrait photo · about 1600 × 2000 px",
  },
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

import type { DivisionKey } from "./projects";

/* Division gallery imagery. Files live in /public/gallery/<division>/ and were sourced from Pexels (free licence,
 * no attribution required). Pexels photo ids are kept beside each entry so the originals can be traced or replaced
 * with verified Quadra project photography before launch. */

export interface GalleryItem { src: string; alt: string; caption: string; pexels: number }
export interface GalleryData { eyebrow: string; title: string; intro: string; items: GalleryItem[] }

const g = (division: DivisionKey, n: number) => `/gallery/${division}/0${n}.jpg`;

export const GALLERIES: Record<DivisionKey, GalleryData> = {
  renovations: {
    eyebrow: "In Pictures",
    title: "The kind of work Quadra Renovations is asked to explore.",
    intro: "Kitchens, bathrooms, extensions and outdoor living. A selection of the spaces renovation conversations tend to begin with.",
    items: [
      { src: g("renovations", 1), alt: "Renovated white kitchen with island bench, pendant lights and marble splashback", caption: "Kitchen · island, storage and light", pexels: 6301168 },
      { src: g("renovations", 2), alt: "Timber deck and plunge pool added to the rear of an existing house", caption: "Outdoor living · deck and pool", pexels: 17556197 },
      { src: g("renovations", 3), alt: "Compact renovated bathroom with walk-in shower and timber vanity", caption: "Bathroom · walk-in shower", pexels: 19846350 },
      { src: g("renovations", 4), alt: "Bathroom with freestanding bath, stone feature wall and glass screen", caption: "Bathroom · freestanding bath", pexels: 6207947 },
      { src: g("renovations", 5), alt: "Modern kitchen with dark pendant lights, island and glossy white cabinetry", caption: "Kitchen · whole-room refresh", pexels: 6283972 },
      { src: g("renovations", 6), alt: "Rear extension with full-height glazing opening onto a lawn", caption: "Extension · opening the home to the garden", pexels: 7587880 },
    ],
  },
  homes: {
    eyebrow: "In Pictures",
    title: "From frame to finished home.",
    intro: "New builds move through many stages. A look at the moments between the first frame and the day the furniture arrives.",
    items: [
      { src: g("homes", 1), alt: "Open-plan kitchen, dining and living area in a newly built home", caption: "New home · open-plan living", pexels: 19846360 },
      { src: g("homes", 2), alt: "Carpenter in a hard hat working on the timber frame of a new house", caption: "On site · frame stage", pexels: 17410734 },
      { src: g("homes", 3), alt: "Two-storey house under construction with roof trusses and wall sheeting in place", caption: "Custom build · lock-up stage", pexels: 209266 },
      { src: g("homes", 4), alt: "Compact living room and kitchenette in a secondary dwelling", caption: "Granny flat · compact living", pexels: 26571206 },
      { src: g("homes", 5), alt: "New kitchen with dark cabinetry and timber floors flowing into an unfurnished living room", caption: "Handover · ready to move in", pexels: 15409436 },
      { src: g("homes", 6), alt: "Interior of a house under construction showing timber framing and ceiling joists", caption: "Residential project · the structure takes shape", pexels: 4642437 },
    ],
  },
  commercial: {
    eyebrow: "In Pictures",
    title: "Spaces built for the people inside them.",
    intro: "Cafés, shops and workplaces each ask different things of a fit-out. A selection of the environments Quadra Commercial is asked about.",
    items: [
      { src: g("commercial", 1), alt: "Café interior with exposed brick, hanging plants and timber tables", caption: "Hospitality · café fit-out", pexels: 5379707 },
      { src: g("commercial", 2), alt: "Café booth seating set into arched niches with brass trim", caption: "Hospitality · booth seating", pexels: 19440344 },
      { src: g("commercial", 3), alt: "Open-plan office with workstations, lounge seating and clerestory windows", caption: "Office · open-plan workspace", pexels: 18033178 },
      { src: g("commercial", 4), alt: "Homewares retail store with shelving displays and track lighting", caption: "Retail · shop fit-out", pexels: 5490931 },
      { src: g("commercial", 5), alt: "Timber-lined office with a long shared desk and planting", caption: "Office · refurbishment", pexels: 8606292 },
      { src: g("commercial", 6), alt: "Restaurant interior with arched brick doorway and low timber tables", caption: "Hospitality · restaurant interior", pexels: 5863513 },
    ],
  },
  approvals: {
    eyebrow: "In Pictures",
    title: "Where the paperwork meets the site.",
    intro: "Approvals are about drawings, documents and conversations. A look at the work that happens before construction begins.",
    items: [
      { src: g("approvals", 1), alt: "Clients reviewing house plans together at a table", caption: "Early feasibility · reviewing the proposal", pexels: 8729977 },
      { src: g("approvals", 2), alt: "Two people in hard hats reading plans on a construction site", caption: "On site · coordinating with specialists", pexels: 8961134 },
      { src: g("approvals", 3), alt: "Close-up of an architectural floor plan showing room layouts and dimensions", caption: "Documentation · drawings and plans", pexels: 271667 },
      { src: g("approvals", 4), alt: "Engineer in a hard hat checking a structural plan against a concrete column", caption: "Building approvals · checking the detail", pexels: 8482551 },
      { src: g("approvals", 5), alt: "Two site workers in hard hats discussing a drawing inside a building under construction", caption: "Project coordination · keeping everyone aligned", pexels: 1216589 },
      { src: g("approvals", 6), alt: "Three people in hard hats reviewing a large plan in a bright, empty room", caption: "Planning pathways · the next conversation", pexels: 8470033 },
    ],
  },
};

import { images, type SiteImage } from "./images";

export type ProjectCategory = "renovations" | "new-homes" | "granny-flats" | "commercial" | "outdoor";

export const projectCategories: { value: ProjectCategory; label: string }[] = [
  { value: "renovations", label: "Renovations" },
  { value: "new-homes", label: "New Homes" },
  { value: "granny-flats", label: "Granny Flats" },
  { value: "commercial", label: "Commercial" },
  { value: "outdoor", label: "Outdoor" },
];

export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  /** Suburb, once confirmed. `null` renders a placeholder. */
  location: string | null;
  description: string;
  image: SiteImage;
  /**
   * `true` while this entry is sample content with stock imagery.
   * Set to `false` only for real, completed Quadra Build projects.
   */
  isSample: boolean;
  featured?: boolean;
};

/**
 * SAMPLE PROJECTS — replace with real completed work.
 * Each entry uses illustrative stock photography and must not be presented
 * as a Quadra Build project until real details and photos are supplied.
 */
export const projects: Project[] = [
  {
    id: "sample-open-plan-renovation",
    title: "Open-Plan Living Renovation",
    category: "renovations",
    location: null,
    description: "Reconfiguring a closed floor plan into connected living, dining and kitchen spaces.",
    image: images.openLiving,
    isSample: true,
  },
  {
    id: "sample-contemporary-new-home",
    title: "Contemporary Family Home",
    category: "new-homes",
    location: null,
    description: "A contemporary family home designed around the site, climate and how the household lives.",
    image: images.newHome,
    isSample: true,
    featured: true,
  },
  {
    id: "sample-office-fit-out",
    title: "Office Fit-Out",
    category: "commercial",
    location: null,
    description: "A commercial office fit-out combining open workspace, meeting rooms and breakout areas.",
    image: images.office,
    isSample: true,
    featured: true,
  },
  {
    id: "sample-outdoor-living",
    title: "Outdoor Living & Pool Surrounds",
    category: "outdoor",
    location: null,
    description: "Covered outdoor entertaining connected to the pool and living areas.",
    image: images.outdoorLiving,
    isSample: true,
    featured: true,
  },
  {
    id: "sample-granny-flat",
    title: "Secondary Dwelling",
    category: "granny-flats",
    location: null,
    description: "A self-contained secondary dwelling, subject to site suitability and council requirements.",
    image: images.grannyFlat,
    isSample: true,
  },
  {
    id: "sample-bathroom",
    title: "Bathroom Renovation",
    category: "renovations",
    location: null,
    description: "A bathroom renovation with improved layout, waterproofing and finishes.",
    image: images.bathroom,
    isSample: true,
    featured: true,
  },
  {
    id: "sample-new-home-dusk",
    title: "Two-Storey New Build",
    category: "new-homes",
    location: null,
    description: "A two-storey new home with open living downstairs and private spaces above.",
    image: images.newHomeDusk,
    isSample: true,
  },
  {
    id: "sample-hospitality",
    title: "Hospitality Venue",
    category: "commercial",
    location: null,
    description: "A hospitality fit-out balancing customer seating, service flow and back-of-house needs.",
    image: images.hospitality,
    isSample: true,
  },
  {
    id: "sample-yard",
    title: "Yard, Pool & Landscaping",
    category: "outdoor",
    location: null,
    description: "Landscaping, pool surrounds and yard improvements for everyday outdoor living.",
    image: images.outdoorPool,
    isSample: true,
  },
  {
    id: "sample-extension",
    title: "Home Extension",
    category: "new-homes",
    location: null,
    description: "Extending an existing home to add living space without moving house.",
    image: images.newHomeFacade,
    isSample: true,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export const categoryLabel = (c: ProjectCategory) => projectCategories.find((x) => x.value === c)?.label ?? c;

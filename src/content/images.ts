import type { StaticImageData } from "next/image";
import heroHome from "@/assets/photos/heroHome.jpg";
import openLiving from "@/assets/photos/openLiving.jpg";
import bathroom from "@/assets/photos/bathroom.jpg";
import livingWarm from "@/assets/photos/livingWarm.jpg";
import livingLounge from "@/assets/photos/livingLounge.jpg";
import bedroom from "@/assets/photos/bedroom.jpg";
import newHome from "@/assets/photos/newHome.jpg";
import newHomeFacade from "@/assets/photos/newHomeFacade.jpg";
import newHomeDusk from "@/assets/photos/newHomeDusk.jpg";
import grannyFlat from "@/assets/photos/grannyFlat.jpg";
import outdoorPool from "@/assets/photos/outdoorPool.jpg";
import outdoorLiving from "@/assets/photos/outdoorLiving.jpg";
import office from "@/assets/photos/office.jpg";
import officeCorridor from "@/assets/photos/officeCorridor.jpg";
import officeDesk from "@/assets/photos/officeDesk.jpg";
import hospitality from "@/assets/photos/hospitality.jpg";
import plansDetail from "@/assets/photos/plansDetail.jpg";
import siteAerial from "@/assets/photos/siteAerial.jpg";
import siteTeam from "@/assets/photos/siteTeam.jpg";
import interiorWorks from "@/assets/photos/interiorWorks.jpg";

/**
 * Image library.
 *
 * All images below are ILLUSTRATIVE stock photography from Unsplash
 * (https://unsplash.com/license), stored in src/assets/photos so they are
 * served from the site's own CDN with blur placeholders. None of them show
 * Quadra Build projects. When real project photography is available, add it
 * to src/assets/photos, import it here and update the alt text.
 */

export type SiteImage = {
  src: StaticImageData;
  alt: string;
};


export const images = {
  heroHome: {
    src: heroHome,
    alt: "Contemporary two-storey home with timber and dark cladding, lit at dusk",
  },
  openLiving: {
    src: openLiving,
    alt: "Open-plan living area with timber feature wall and kitchen beyond",
  },
  bathroom: {
    src: bathroom,
    alt: "Modern bathroom with frameless glass shower and timber vanity",
  },
  livingWarm: {
    src: livingWarm,
    alt: "Warm, light-filled living room with timber flooring and low furniture",
  },
  livingLounge: {
    src: livingLounge,
    alt: "Living room with high ceilings, large windows and indoor plants",
  },
  bedroom: {
    src: bedroom,
    alt: "Minimal bedroom with black-framed doors opening to the outdoors",
  },
  newHome: {
    src: newHome,
    alt: "Newly built contemporary home with timber screen and dark cladding",
  },
  newHomeFacade: {
    src: newHomeFacade,
    alt: "Modern home facade with mixed cladding and landscaped front lawn",
  },
  newHomeDusk: {
    src: newHomeDusk,
    alt: "Dark-clad modern home with warm interior lighting at dusk",
  },
  grannyFlat: {
    src: grannyFlat,
    alt: "Compact white rendered dwelling with garden path",
  },
  outdoorPool: {
    src: outdoorPool,
    alt: "Elevated home with verandah, landscaped yard and swimming pool",
  },
  outdoorLiving: {
    src: outdoorLiving,
    alt: "Indoor-outdoor living space opening onto a pool area through glass doors",
  },
  office: {
    src: office,
    alt: "Open office with polished concrete floor and floor-to-ceiling glazing",
  },
  officeCorridor: {
    src: officeCorridor,
    alt: "Office fit-out with glass partitions and a breakout kitchen",
  },
  officeDesk: {
    src: officeDesk,
    alt: "Bright office workspace with desks beside large windows",
  },
  hospitality: {
    src: hospitality,
    alt: "Hospitality venue interior with timber tables and pendant lighting",
  },
  plansDetail: {
    src: plansDetail,
    alt: "Close-up of a person marking up construction plans",
  },
  siteAerial: {
    src: siteAerial,
    alt: "Aerial view of construction workers on a building site",
  },
  siteTeam: {
    src: siteTeam,
    alt: "Construction team in high-visibility vests reviewing a large site",
  },
  interiorWorks: {
    src: interiorWorks,
    alt: "Tradesperson working on an interior ceiling during fit-out works",
  },
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;

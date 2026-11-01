import type { SiteImage } from "./images";
import renoRemodel from "@/assets/photos/services/renoRemodel.jpg";
import renoExtension from "@/assets/photos/services/renoExtension.jpg";
import renoKitchen from "@/assets/photos/services/renoKitchen.jpg";
import renoBathroom from "@/assets/photos/services/renoBathroom.jpg";
import renoAlterations from "@/assets/photos/services/renoAlterations.jpg";
import renoFinishing from "@/assets/photos/services/renoFinishing.jpg";
import renoLandscaping from "@/assets/photos/services/renoLandscaping.jpg";
import renoFencing from "@/assets/photos/services/renoFencing.jpg";
import renoOutdoorLiving from "@/assets/photos/services/renoOutdoorLiving.jpg";
import homesConstruction from "@/assets/photos/services/homesConstruction.jpg";
import homesCustom from "@/assets/photos/services/homesCustom.jpg";
import homesGrannyFlat from "@/assets/photos/services/homesGrannyFlat.jpg";
import homesBuildingWorks from "@/assets/photos/services/homesBuildingWorks.jpg";
import homesExtension from "@/assets/photos/services/homesExtension.jpg";
import homesOutdoor from "@/assets/photos/services/homesOutdoor.jpg";
import homesPlanning from "@/assets/photos/services/homesPlanning.jpg";
import commRetail from "@/assets/photos/services/commRetail.jpg";
import commOffice from "@/assets/photos/services/commOffice.jpg";
import commRenovation from "@/assets/photos/services/commRenovation.jpg";
import commPremises from "@/assets/photos/services/commPremises.jpg";
import commAlterations from "@/assets/photos/services/commAlterations.jpg";
import commFinishes from "@/assets/photos/services/commFinishes.jpg";
import commHospitality from "@/assets/photos/services/commHospitality.jpg";
import apprEnquiry from "@/assets/photos/services/apprEnquiry.jpg";
import apprFeasibility from "@/assets/photos/services/apprFeasibility.jpg";
import apprZoning from "@/assets/photos/services/apprZoning.jpg";
import apprBuildingApproval from "@/assets/photos/services/apprBuildingApproval.jpg";
import apprDevApplication from "@/assets/photos/services/apprDevApplication.jpg";
import apprConsultants from "@/assets/photos/services/apprConsultants.jpg";
import apprDocumentation from "@/assets/photos/services/apprDocumentation.jpg";
import apprCouncil from "@/assets/photos/services/apprCouncil.jpg";

/**
 * One photo per service on each division page, shown beside the service list
 * as each service is hovered.
 *
 * Like images.ts, these are ILLUSTRATIVE stock photography from Unsplash
 * (https://unsplash.com/license) and do not show Quadra Build projects.
 */
export const serviceImages = {
  renoRemodel: {
    src: renoRemodel,
    alt: "Interior mid-renovation with walls opened up and timber framing exposed",
  },
  renoExtension: {
    src: renoExtension,
    alt: "Two-storey timber and dark-clad addition lit at dusk",
  },
  renoKitchen: {
    src: renoKitchen,
    alt: "White kitchen with stone island benchtop, timber stools and hexagon tile splashback",
  },
  renoBathroom: {
    src: renoBathroom,
    alt: "Dark-toned bathroom with freestanding bath, highlight window and floating vanity",
  },
  renoAlterations: {
    src: renoAlterations,
    alt: "Bright living space opened through to a hallway with timber floors",
  },
  renoFinishing: {
    src: renoFinishing,
    alt: "Paint roller applying a fresh coat of paint",
  },
  renoLandscaping: {
    src: renoLandscaping,
    alt: "Garden path lined with clipped hedges and flowering shrubs",
  },
  renoFencing: {
    src: renoFencing,
    alt: "Contemporary home behind a black metal boundary fence and garden",
  },
  renoOutdoorLiving: {
    src: renoOutdoorLiving,
    alt: "Covered timber deck and lawn behind a modern home under a large gum tree",
  },
  homesConstruction: {
    src: homesConstruction,
    alt: "Builder working on the timber wall framing of a new house",
  },
  homesCustom: {
    src: homesCustom,
    alt: "Custom-designed modern home with dark cladding lit at dusk",
  },
  homesGrannyFlat: {
    src: homesGrannyFlat,
    alt: "Small single-storey cottage with front porch and timber door",
  },
  homesBuildingWorks: {
    src: homesBuildingWorks,
    alt: "Tradesperson cutting timber with a circular saw on site",
  },
  homesExtension: {
    src: homesExtension,
    alt: "Two-storey home with a contemporary gabled upper-level addition",
  },
  homesOutdoor: {
    src: homesOutdoor,
    alt: "Pool, deck and outdoor seating integrated with a modern timber-clad home",
  },
  homesPlanning: {
    src: homesPlanning,
    alt: "Construction plans being marked up on a desk",
  },
  commRetail: {
    src: commRetail,
    alt: "Retail store fit-out with display shelving and pendant lighting",
  },
  commOffice: {
    src: commOffice,
    alt: "Office fit-out with workstations beside floor-to-ceiling city-view windows",
  },
  commRenovation: {
    src: commRenovation,
    alt: "Refurbished office with exposed services, timber floors and meeting areas",
  },
  commPremises: {
    src: commPremises,
    alt: "Shopfront with large display windows and pendant lights",
  },
  commAlterations: {
    src: commAlterations,
    alt: "Open office with glazed partitions, plants and timber flooring",
  },
  commFinishes: {
    src: commFinishes,
    alt: "Finished breakout area with joinery, designer chairs and task lighting",
  },
  commHospitality: {
    src: commHospitality,
    alt: "Café interior with counter, plants and casual seating",
  },
  apprEnquiry: {
    src: apprEnquiry,
    alt: "Two people meeting in an office to discuss a project",
  },
  apprFeasibility: {
    src: apprFeasibility,
    alt: "Aerial view of a residential neighbourhood",
  },
  apprZoning: {
    src: apprZoning,
    alt: "Top-down aerial view of suburban lots along a street",
  },
  apprBuildingApproval: {
    src: apprBuildingApproval,
    alt: "Person signing a document",
  },
  apprDevApplication: {
    src: apprDevApplication,
    alt: "Notes and laptops on a desk during application preparation",
  },
  apprConsultants: {
    src: apprConsultants,
    alt: "Project team meeting around a table",
  },
  apprDocumentation: {
    src: apprDocumentation,
    alt: "Team planning a process on a wall of sticky notes",
  },
  apprCouncil: {
    src: apprCouncil,
    alt: "Civic building with columns facing a paved square",
  },
} satisfies Record<string, SiteImage>;

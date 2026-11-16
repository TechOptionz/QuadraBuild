import type { StaticImageData } from "next/image";

// Site-wide sections
import homeHero from "@/assets/photos/homeHero.jpg";
import homeIntroFacade from "@/assets/photos/homeIntroFacade.jpg";
import homeIntroLiving from "@/assets/photos/homeIntroLiving.jpg";
import homeCraft from "@/assets/photos/homeCraft.jpg";
import ctaDefault from "@/assets/photos/ctaDefault.jpg";
import aboutHero from "@/assets/photos/aboutHero.jpg";
import aboutStory from "@/assets/photos/aboutStory.jpg";
import serviceAreasHero from "@/assets/photos/serviceAreasHero.jpg";
import serviceAreasCta from "@/assets/photos/serviceAreasCta.jpg";
import projectsCta from "@/assets/photos/projectsCta.jpg";

// Divisions
import renovationsHero from "@/assets/photos/renovationsHero.jpg";
import renovationsBathroom from "@/assets/photos/renovationsBathroom.jpg";
import renovationsOutdoor from "@/assets/photos/renovationsOutdoor.jpg";
import renovationsCta from "@/assets/photos/renovationsCta.jpg";
import homesHero from "@/assets/photos/homesHero.jpg";
import homesGrannyFlat from "@/assets/photos/homesGrannyFlat.jpg";
import homesFrame from "@/assets/photos/homesFrame.jpg";
import homesCta from "@/assets/photos/homesCta.jpg";
import commercialHero from "@/assets/photos/commercialHero.jpg";
import commercialHospitality from "@/assets/photos/commercialHospitality.jpg";
import commercialRetail from "@/assets/photos/commercialRetail.jpg";
import commercialCta from "@/assets/photos/commercialCta.jpg";
import approvalsHero from "@/assets/photos/approvalsHero.jpg";
import approvalsReview from "@/assets/photos/approvalsReview.jpg";
import approvalsSurvey from "@/assets/photos/approvalsSurvey.jpg";
import approvalsCta from "@/assets/photos/approvalsCta.jpg";

// Projects
import projectOpenPlan from "@/assets/photos/projectOpenPlan.jpg";
import projectFamilyHome from "@/assets/photos/projectFamilyHome.jpg";
import projectOffice from "@/assets/photos/projectOffice.jpg";
import projectOutdoorLiving from "@/assets/photos/projectOutdoorLiving.jpg";
import projectGrannyFlat from "@/assets/photos/projectGrannyFlat.jpg";
import projectBathroom from "@/assets/photos/projectBathroom.jpg";
import projectTwoStorey from "@/assets/photos/projectTwoStorey.jpg";
import projectHospitality from "@/assets/photos/projectHospitality.jpg";
import projectLandscaping from "@/assets/photos/projectLandscaping.jpg";
import projectExtension from "@/assets/photos/projectExtension.jpg";

// Insights
import insightKitchen from "@/assets/photos/insightKitchen.jpg";
import insightGrannyFlat from "@/assets/photos/insightGrannyFlat.jpg";
import insightApprovals from "@/assets/photos/insightApprovals.jpg";
import insightOfficeBrief from "@/assets/photos/insightOfficeBrief.jpg";
import insightRenovateExtend from "@/assets/photos/insightRenovateExtend.jpg";
import insightConsultation from "@/assets/photos/insightConsultation.jpg";
import insightOutdoor from "@/assets/photos/insightOutdoor.jpg";

/**
 * Image library.
 *
 * One photo per slot: every section, division, project and article has its
 * own image, named after where it is used, so nothing repeats across the site.
 *
 * All images below are ILLUSTRATIVE stock photography from Unsplash
 * (https://unsplash.com/license), stored in src/assets/photos at 2400px wide
 * so they are served from the site's own CDN with blur placeholders. None of
 * them show Quadra Build projects. When real project photography is
 * available, replace the file in src/assets/photos and update the alt text.
 */

export type SiteImage = {
  src: StaticImageData;
  alt: string;
};

export const images = {
  // ---------- Site-wide sections ----------
  homeHero: {
    src: homeHero,
    alt: "Contemporary two-storey home with floor-to-ceiling glazing, lit from within at dusk",
  },
  homeIntroFacade: {
    src: homeIntroFacade,
    alt: "Modern home entry with timber cladding, stone columns and a concrete driveway",
  },
  homeIntroLiving: {
    src: homeIntroLiving,
    alt: "Bright living room with a raked ceiling, exposed timber beam and timber flooring",
  },
  homeCraft: {
    src: homeCraft,
    alt: "Carpenter in a hard hat nailing a timber wall frame on a building site",
  },
  ctaDefault: {
    src: ctaDefault,
    alt: "Home opening onto a timber deck with outdoor dining and sun loungers at dusk",
  },
  aboutHero: {
    src: aboutHero,
    alt: "Two builders in hard hats and high-visibility vests reviewing plans on site",
  },
  aboutStory: {
    src: aboutStory,
    alt: "Two-storey timber-framed home under construction with scaffolding",
  },
  serviceAreasHero: {
    src: serviceAreasHero,
    alt: "Brisbane city skyline and the Brisbane River seen from Kangaroo Point",
  },
  serviceAreasCta: {
    src: serviceAreasCta,
    alt: "Aerial view of the Story Bridge and Brisbane River at sunset",
  },
  projectsCta: {
    src: projectsCta,
    alt: "Modern home entry with a lit doorway and garage under an evening sky",
  },

  // ---------- Quadra Renovations ----------
  renovationsHero: {
    src: renovationsHero,
    alt: "Renovated kitchen with a long island bench opening through bifold doors to a patio",
  },
  renovationsBathroom: {
    src: renovationsBathroom,
    alt: "Renovated bathroom with a freestanding bath, vessel basin and wall-mounted tapware",
  },
  renovationsOutdoor: {
    src: renovationsOutdoor,
    alt: "Covered outdoor living area with a timber pergola, lounge seating and tropical planting",
  },
  renovationsCta: {
    src: renovationsCta,
    alt: "Refreshed open-plan living room with a tan leather sofa, plants and a kitchen beyond",
  },

  // ---------- Quadra Homes ----------
  homesHero: {
    src: homesHero,
    alt: "Contemporary new home with dark cladding, angled rooflines and large corner windows",
  },
  homesGrannyFlat: {
    src: homesGrannyFlat,
    alt: "Detached secondary dwelling at the rear of a fenced backyard",
  },
  homesFrame: {
    src: homesFrame,
    alt: "Aerial view of a new home's timber wall frames and roof trusses during construction",
  },
  homesCta: {
    src: homesCta,
    alt: "White two-storey home with a swimming pool and outdoor lounge area",
  },

  // ---------- Quadra Commercial ----------
  commercialHero: {
    src: commercialHero,
    alt: "Commercial office fit-out with a meeting table, polished concrete floor and black-framed glazing",
  },
  commercialHospitality: {
    src: commercialHospitality,
    alt: "Café fit-out with a timber bar, patterned floor tiles and pendant lighting",
  },
  commercialRetail: {
    src: commercialRetail,
    alt: "Bright retail store fit-out with timber display tables and wall shelving",
  },
  commercialCta: {
    src: commercialCta,
    alt: "Meeting room with a timber table, tan leather chairs and glass partitions",
  },

  // ---------- Quadra Approvals ----------
  approvalsHero: {
    src: approvalsHero,
    alt: "Architectural floor plans laid out with drafting pens and a scale rule",
  },
  approvalsReview: {
    src: approvalsReview,
    alt: "Two people reviewing and pointing at a printed site plan on a table",
  },
  approvalsSurvey: {
    src: approvalsSurvey,
    alt: "Surveyor in a hard hat and high-visibility vest taking measurements on a development site",
  },
  approvalsCta: {
    src: approvalsCta,
    alt: "Aerial view of a new residential estate with houses arranged around a roundabout",
  },

  // ---------- Projects ----------
  projectOpenPlan: {
    src: projectOpenPlan,
    alt: "Open-plan kitchen and dining area with a stone island and sliding doors to a terrace",
  },
  projectFamilyHome: {
    src: projectFamilyHome,
    alt: "Contemporary family home with white and brick cladding overlooking a pool",
  },
  projectOffice: {
    src: projectOffice,
    alt: "Open-plan office with rows of workstations under linear pendant lights",
  },
  projectOutdoorLiving: {
    src: projectOutdoorLiving,
    alt: "Covered outdoor entertaining area beside a lap pool at dusk",
  },
  projectGrannyFlat: {
    src: projectGrannyFlat,
    alt: "Compact self-contained dwelling with a red roof, front porch and landscaped garden",
  },
  projectBathroom: {
    src: projectBathroom,
    alt: "Bathroom with a frameless glass shower, long vanity and timber-framed mirror",
  },
  projectTwoStorey: {
    src: projectTwoStorey,
    alt: "White two-storey new home with glass balustrades beside a swimming pool",
  },
  projectHospitality: {
    src: projectHospitality,
    alt: "Restaurant interior with timber joinery, globe pendant lights and dining tables",
  },
  projectLandscaping: {
    src: projectLandscaping,
    alt: "Landscaped backyard with a level lawn, rendered retaining walls, steps and tropical planting",
  },
  projectExtension: {
    src: projectExtension,
    alt: "Traditional white home with a timber-clad rear extension and a swimming pool",
  },

  // ---------- Insights ----------
  insightKitchen: {
    src: insightKitchen,
    alt: "Kitchen with white cabinetry, a timber-fronted island bench and four timber stools",
  },
  insightGrannyFlat: {
    src: insightGrannyFlat,
    alt: "Small two-level garden dwelling with an upper balcony and external stairs",
  },
  insightApprovals: {
    src: insightApprovals,
    alt: "Close-up of a pencil and scale rule on dimensioned construction drawings",
  },
  insightOfficeBrief: {
    src: insightOfficeBrief,
    alt: "Office corridor with black-framed glass partitions and meeting spaces",
  },
  insightRenovateExtend: {
    src: insightRenovateExtend,
    alt: "Home mid-renovation with an internal wall opened up and structural work under way",
  },
  insightConsultation: {
    src: insightConsultation,
    alt: "Two people talking through a project together over a laptop",
  },
  insightOutdoor: {
    src: insightOutdoor,
    alt: "Wide covered timber deck with an outdoor dining setting, open to the garden",
  },
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;

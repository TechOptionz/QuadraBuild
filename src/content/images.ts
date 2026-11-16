import type { StaticImageData } from "next/image";

// Site-wide sections
import homeHero from "@/assets/photos/homeHero.jpg";
import heroHomeDusk from "@/assets/photos/heroHomeDusk.jpg";
import heroHomePool from "@/assets/photos/heroHomePool.jpg";
import heroHomeTimber from "@/assets/photos/heroHomeTimber.jpg";
import heroHomeCourtyard from "@/assets/photos/heroHomeCourtyard.jpg";
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

// About: values and commitments
import valueClarity from "@/assets/photos/valueClarity.jpg";
import valueCraft from "@/assets/photos/valueCraft.jpg";
import valueCoordination from "@/assets/photos/valueCoordination.jpg";
import valueAccountability from "@/assets/photos/valueAccountability.jpg";
import commitQuality from "@/assets/photos/commitQuality.jpg";
import commitCommunication from "@/assets/photos/commitCommunication.jpg";
import commitDelivery from "@/assets/photos/commitDelivery.jpg";

// Home: why Quadra Build
import whyCommunication from "@/assets/photos/whyCommunication.jpg";
import whyTailored from "@/assets/photos/whyTailored.jpg";
import whyCoordinated from "@/assets/photos/whyCoordinated.jpg";
import whyLocal from "@/assets/photos/whyLocal.jpg";

// Service areas
import areaBrisbane from "@/assets/photos/areaBrisbane.jpg";
import areaSeq from "@/assets/photos/areaSeq.jpg";
import regionRiver from "@/assets/photos/regionRiver.jpg";
import regionQueenslander from "@/assets/photos/regionQueenslander.jpg";
import regionGoldCoast from "@/assets/photos/regionGoldCoast.jpg";
import regionSunshineCoast from "@/assets/photos/regionSunshineCoast.jpg";
import regionSuburbs from "@/assets/photos/regionSuburbs.jpg";

// Contact
import contactHero from "@/assets/photos/contactHero.jpg";

// Division focus points
import renovationsSpace from "@/assets/photos/renovationsSpace.jpg";
import renovationsFunction from "@/assets/photos/renovationsFunction.jpg";
import renovationsComfort from "@/assets/photos/renovationsComfort.jpg";
import renovationsAppearance from "@/assets/photos/renovationsAppearance.jpg";
import homesSite from "@/assets/photos/homesSite.jpg";
import homesLiving from "@/assets/photos/homesLiving.jpg";
import homesDecisions from "@/assets/photos/homesDecisions.jpg";
import homesIndoorOutdoor from "@/assets/photos/homesIndoorOutdoor.jpg";
import commercialOperations from "@/assets/photos/commercialOperations.jpg";
import commercialBrand from "@/assets/photos/commercialBrand.jpg";
import commercialCustomers from "@/assets/photos/commercialCustomers.jpg";
import commercialStaging from "@/assets/photos/commercialStaging.jpg";
import approvalsUnderstand from "@/assets/photos/approvalsUnderstand.jpg";
import approvalsSequence from "@/assets/photos/approvalsSequence.jpg";
import approvalsCoordinate from "@/assets/photos/approvalsCoordinate.jpg";
import approvalsDecide from "@/assets/photos/approvalsDecide.jpg";

/**
 * Image library.
 *
 * One photo per slot: every section, division, project and article has its
 * own image, named after where it is used. A division's own photos are reused
 * only where that division is being linked to (cards, panels, the home hero).
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
  // Home hero slideshow, after homeHero
  heroHomeDusk: {
    src: heroHomeDusk,
    alt: "Modern home with dark cladding and a lit open-plan living area beside a large gum tree at dusk",
  },
  heroHomePool: {
    src: heroHomePool,
    alt: "White two-storey home with a timber-lined soffit and wide glazing overlooking a swimming pool",
  },
  heroHomeTimber: {
    src: heroHomeTimber,
    alt: "Contemporary home with timber and grey panel cladding, a dark garage door and a landscaped front lawn",
  },
  heroHomeCourtyard: {
    src: heroHomeCourtyard,
    alt: "White single-storey home with sliding glass doors opening to a paved courtyard and pool",
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

  // ---------- About: values and commitments ----------
  valueClarity: {
    src: valueClarity,
    alt: "Two men in business shirts talking over large printed drawings on a sloped drafting table",
  },
  valueCraft: {
    src: valueCraft,
    alt: "Close-up of a carpenter's hands marking a timber board with a pencil among wood shavings",
  },
  valueCoordination: {
    src: valueCoordination,
    alt: "Aerial view of a site team in high-visibility vests and hard hats walking across a concrete slab ringed by scaffolding",
  },
  valueAccountability: {
    src: valueAccountability,
    alt: "Two men in high-visibility vests and hard hats checking details together on a handheld tablet",
  },
  commitQuality: {
    src: commitQuality,
    alt: "Matte black mixer tap and undermount sink set in a stone island benchtop with timber cabinetry behind",
  },
  commitCommunication: {
    src: commitCommunication,
    alt: "A woman and a man seated at a laptop beside a table covered with fabric and material samples",
  },
  commitDelivery: {
    src: commitDelivery,
    alt: "Single-storey timber house frames with roof trusses behind temporary site fencing under a blue sky",
  },

  // ---------- Home: why Quadra Build ----------
  whyCommunication: {
    src: whyCommunication,
    alt: "Two people in white hard hats conferring over a tablet on a flat rooftop with safety railing",
  },
  whyTailored: {
    src: whyTailored,
    alt: "Flat lay of marble, timber, fabric and stone finish samples with ceramic bowls",
  },
  whyCoordinated: {
    src: whyCoordinated,
    alt: "Two tradesmen working inside a building, one measuring up a wall and one seated at floor level",
  },
  whyLocal: {
    src: whyLocal,
    alt: "Historic two-storey brick Brisbane home with a wrap-around timber verandah, palm tree and lawn in warm light",
  },

  // ---------- Service areas ----------
  areaBrisbane: {
    src: areaBrisbane,
    alt: "Brisbane CBD towers and the Victoria Bridge across the Brisbane River under a blue sky with clouds",
  },
  areaSeq: {
    src: areaSeq,
    alt: "Aerial view over Tallebudgera Creek and Burleigh headland along the coast to the Gold Coast skyline",
  },
  regionRiver: {
    src: regionRiver,
    alt: "Wide bend of the Brisbane River with a curving riverwalk, moored boats and riverside apartment buildings",
  },
  regionQueenslander: {
    src: regionQueenslander,
    alt: "Timber verandah of a Queenslander house with red louvred shutters, cast-iron lace balustrade and a white wicker chair",
  },
  regionGoldCoast: {
    src: regionGoldCoast,
    alt: "Aerial view of the Surfers Paradise high-rise skyline along a sandy beach and blue surf",
  },
  regionSunshineCoast: {
    src: regionSunshineCoast,
    alt: "Aerial view of Noosa Main Beach with turquoise water, swimmers and tree-covered hills behind",
  },
  regionSuburbs: {
    src: regionSuburbs,
    alt: "Aerial view of a leafy Brisbane suburb with tin-roofed houses, unit blocks and a sports field",
  },

  // ---------- Contact ----------
  contactHero: {
    src: contactHero,
    alt: "Two men talking at a timber table with a laptop showing a 3D model of a house",
  },

  // ---------- Division focus points ----------
  renovationsSpace: {
    src: renovationsSpace,
    alt: "Bright open-plan living, dining and kitchen area with timber floors and black-framed sliding doors to a garden",
  },
  renovationsFunction: {
    src: renovationsFunction,
    alt: "White kitchen with bifold doors open on a timber-lined pantry of organised shelves beside an island bench",
  },
  renovationsComfort: {
    src: renovationsComfort,
    alt: "Living room with a white sofa opening through wide sliding glass doors to a covered patio and lawn",
  },
  renovationsAppearance: {
    src: renovationsAppearance,
    alt: "Close-up of matte black tapware on a white stone vanity with an undermount basin and blue wall tiles",
  },
  homesSite: {
    src: homesSite,
    alt: "Aerial view of a cleared house site with formwork and footings set out and an excavator alongside",
  },
  homesLiving: {
    src: homesLiving,
    alt: "Spacious family living area with a large corner sofa, timber-look floors and sliding doors on both sides",
  },
  homesDecisions: {
    src: homesDecisions,
    alt: "A man and a woman leaning over a table of fabric swatches and printed samples beside a laptop",
  },
  homesIndoorOutdoor: {
    src: homesIndoorOutdoor,
    alt: "Single-storey modern home with glass walls and a covered alfresco area beside a swimming pool",
  },
  commercialOperations: {
    src: commercialOperations,
    alt: "Commercial kitchen with stainless steel benches, a pass-through dishwasher and wheeled racks",
  },
  commercialBrand: {
    src: commercialBrand,
    alt: "Lobby with a stone reception desk set in a timber-slat and travertine feature wall, with lounge seating",
  },
  commercialCustomers: {
    src: commercialCustomers,
    alt: "Busy café with customers ordering at a white-tiled counter and seated at timber tables under pendant lights",
  },
  commercialStaging: {
    src: commercialStaging,
    alt: "Interior mid fit-out with steel stud wall frames, stacked plasterboard sheets and an exposed timber ceiling",
  },
  approvalsUnderstand: {
    src: approvalsUnderstand,
    alt: "Top-down aerial of a vacant grassy lot across a tree-lined street from established houses",
  },
  approvalsSequence: {
    src: approvalsSequence,
    alt: "Stack of printed floor plan drawings resting on a red folder on a timber table",
  },
  approvalsCoordinate: {
    src: approvalsCoordinate,
    alt: "Overhead view of four people gathered around a table discussing a printed floor plan with tablets",
  },
  approvalsDecide: {
    src: approvalsDecide,
    alt: "White architectural scale model of a small pavilion house on a base",
  },
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;

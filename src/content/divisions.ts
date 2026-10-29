import { images, type SiteImage } from "./images";

export type DivisionSlug = "renovations" | "homes" | "commercial" | "approvals";

export type Faq = { q: string; a: string };

export type Division = {
  slug: DivisionSlug;
  number: string;
  name: string;
  shortName: string;
  headline: string;
  cardSummary: string;
  metaDescription: string;
  intro: string[];
  heroImage: SiteImage;
  supportImages: [SiteImage, SiteImage];
  services: { title: string; text: string }[];
  focus: { title: string; text: string }[];
  journeyTitle: string;
  journey: { title: string; text: string }[];
  notice?: { title: string; text: string[] };
  faqs: Faq[];
  cta: { title: string; text: string };
};

export const divisions: Division[] = [
  {
    slug: "renovations",
    number: "01",
    name: "Quadra Renovations",
    shortName: "Renovations",
    headline: "Transform the Home You Already Love.",
    cardSummary:
      "Renovations, extensions, kitchens, bathrooms and outdoor improvements that make your home work better for the way you live.",
    metaDescription:
      "Home renovations, extensions, kitchens, bathrooms, landscaping, fencing and outdoor living in Brisbane and South East Queensland by Quadra Renovations.",
    intro: [
      "Most homes don't need to be replaced — they need to be rethought. Quadra Renovations helps Brisbane homeowners improve the space, function, comfort and appearance of the home they already have.",
      "Whether it's a single room, a reconfigured floor plan, an extension or a new outdoor living area, we start by understanding how you use your home today and what needs to change. From there we shape a scope that fits your priorities and budget, and coordinate the work through to completion.",
    ],
    heroImage: images.openLiving,
    supportImages: [images.bathroom, images.outdoorLiving],
    services: [
      { title: "Home renovations & remodelling", text: "Whole-of-home or staged renovations that refresh layouts, finishes and functionality." },
      { title: "Extensions & additions", text: "Additional bedrooms, living areas or levels, designed to connect with the existing home." },
      { title: "Kitchen renovations", text: "Practical, well-planned kitchens built around storage, workflow and everyday use." },
      { title: "Bathroom renovations", text: "Bathrooms and ensuites with considered layouts, waterproofing coordination and durable finishes." },
      { title: "Internal alterations", text: "Reconfiguring walls and spaces to open up living areas or create rooms that suit how you live now." },
      { title: "Flooring, painting & finishing", text: "The detail work that pulls a renovation together — floors, paint, joinery and trims." },
      { title: "Landscaping & outdoor improvements", text: "Gardens, paving, retaining and outdoor upgrades that extend the usable space of your home." },
      { title: "Fencing & boundary upgrades", text: "New or replacement fencing, gates and boundary treatments for privacy, security and street appeal." },
      { title: "Outdoor living & entertaining", text: "Decks, patios and covered entertaining areas suited to South East Queensland living." },
    ],
    focus: [
      { title: "Space", text: "Layouts that make better use of the footprint you already have." },
      { title: "Function", text: "Kitchens, bathrooms and storage designed around daily routines." },
      { title: "Comfort", text: "Light, flow and indoor–outdoor connection that suit the local climate." },
      { title: "Appearance", text: "Finishes and details selected to work together and last." },
    ],
    journeyTitle: "How a renovation comes together",
    journey: [
      { title: "Discover", text: "We talk through your goals, how you use the home, your budget range and timing." },
      { title: "Assess", text: "We review the existing home, the scope and anything that may need approvals or specialist input." },
      { title: "Plan", text: "Design, selections, documentation and pricing are coordinated so the scope is clear before work starts." },
      { title: "Build", text: "Works are scheduled and coordinated, with regular updates so you know what's happening and when." },
      { title: "Complete", text: "We walk through the finished work with you and cover any handover items." },
    ],
    notice: {
      title: "Approvals & structural work",
      text: [
        "Some renovations — particularly extensions, structural changes, and certain outdoor structures — may require building approval or input from engineers and other qualified professionals. We'll identify these requirements early and coordinate them where needed, or connect you with Quadra Approvals.",
      ],
    },
    faqs: [
      {
        q: "Can you renovate while we're living in the home?",
        a: "It depends on the scope. Some projects can be staged so parts of the home stay usable; others are more practical with the home vacated for a period. We'll discuss the options during planning.",
      },
      {
        q: "Do you handle small renovations as well as large ones?",
        a: "We're happy to discuss projects of different sizes. Let us know what you have in mind and we'll tell you honestly whether it's a good fit.",
      },
      {
        q: "Will my renovation need council or building approval?",
        a: "Some will and some won't — it depends on the type of work, the property and local requirements. We'll help identify what applies to your project during the assessment stage.",
      },
    ],
    cta: {
      title: "Ready to rethink your home?",
      text: "Tell us about the spaces you'd like to change and we'll talk through the possibilities.",
    },
  },
  {
    slug: "homes",
    number: "02",
    name: "Quadra Homes",
    shortName: "Homes",
    headline: "Build a Home That Works for Your Future.",
    cardSummary:
      "New homes, custom builds, granny flats and additional living spaces — planned carefully from feasibility through to handover.",
    metaDescription:
      "New home construction, custom homes, granny flats and secondary dwellings in Brisbane and South East Queensland by Quadra Homes.",
    intro: [
      "Building a new home or adding a secondary dwelling is a significant decision. Quadra Homes brings structure to the process — helping you understand what's possible on your site, planning carefully, and coordinating construction so the finished home suits your needs now and into the future.",
      "We work on new homes, custom builds, granny flats, extensions and additional living areas, with attention to how the building sits on the site and connects to the outdoors.",
    ],
    heroImage: images.newHome,
    supportImages: [images.grannyFlat, images.newHomeDusk],
    services: [
      { title: "New home construction", text: "New residential builds planned and coordinated from early feasibility through to completion." },
      { title: "Custom home builds", text: "Homes tailored to your site, lifestyle and brief, working with your designer or ours." },
      { title: "Granny flats & secondary dwellings", text: "Additional dwellings for family, guests or flexible living — subject to site and planning assessment." },
      { title: "Residential building works", text: "A range of residential construction works coordinated under one team." },
      { title: "Extensions & additional living areas", text: "Extra space added to existing homes, integrated with the original structure." },
      { title: "Outdoor integration & landscaping", text: "Decks, outdoor rooms and landscaping considered as part of the overall home." },
      { title: "Construction planning & coordination", text: "Scheduling, trades, consultants and documentation managed in a clear sequence." },
    ],
    focus: [
      { title: "Site first", text: "Orientation, slope, access and services shape what can be built and how." },
      { title: "Long-term living", text: "Layouts that can adapt as households and needs change." },
      { title: "Clear decisions", text: "Selections and scope agreed upfront to reduce surprises later." },
      { title: "Indoor–outdoor", text: "Homes designed to make the most of the South East Queensland climate." },
    ],
    journeyTitle: "The project journey",
    journey: [
      { title: "Discover", text: "We learn about your household, your brief, your site and your budget range." },
      { title: "Assess", text: "Site conditions, zoning, planning requirements and feasibility are reviewed with the right professionals." },
      { title: "Plan", text: "Design, engineering, approvals, selections and pricing are coordinated into a clear construction scope." },
      { title: "Build", text: "Construction is scheduled and managed, with regular communication at each stage." },
      { title: "Complete", text: "Final inspections, walk-through and the relevant handover requirements are completed." },
    ],
    notice: {
      title: "Every site is different",
      text: [
        "Not every property is suitable for a new home design, a granny flat or further development. Feasibility depends on factors such as zoning, lot size and shape, site conditions, easements, services, flood or overlay constraints, and council requirements.",
        "These need to be assessed for your specific site before design and construction proceed. We'll help coordinate that assessment and be upfront about what we find.",
      ],
    },
    faqs: [
      {
        q: "Can I build a granny flat on my property?",
        a: "Possibly — it depends on your property and the planning rules that apply to it. We can help coordinate an initial feasibility review to understand what may be possible before you commit to design.",
      },
      {
        q: "Do I need my own plans?",
        a: "Not necessarily. If you already have plans we can review them; if not, we can discuss coordinating design with appropriately qualified designers or architects.",
      },
      {
        q: "How long does a new home take?",
        a: "Timeframes vary with the size and complexity of the home, approvals, site conditions, weather and selections. We'll discuss realistic timing once the scope is understood.",
      },
    ],
    cta: {
      title: "Planning a new home or granny flat?",
      text: "Start with a conversation about your site and your goals — we'll help you understand the next steps.",
    },
  },
  {
    slug: "commercial",
    number: "03",
    name: "Quadra Commercial",
    shortName: "Commercial",
    headline: "Spaces Designed to Move Business Forward.",
    cardSummary:
      "Retail, office and commercial fit-outs and refurbishments that support how your business operates and how customers experience it.",
    metaDescription:
      "Retail and shop fit-outs, office fit-outs and refurbishments, and commercial renovations in Brisbane and South East Queensland by Quadra Commercial.",
    intro: [
      "A well-planned commercial space supports the people who work in it, reflects the brand behind it and shapes how customers feel when they walk in. Quadra Commercial delivers fit-outs and refurbishments focused on function, presentation and practical delivery.",
      "We understand that downtime costs money. We plan works around your operational needs, coordinate trades and consultants, and keep communication clear so you can stay focused on your business.",
    ],
    heroImage: images.office,
    supportImages: [images.hospitality, images.officeCorridor],
    services: [
      { title: "Retail & shop fit-outs", text: "Shopfronts, display areas, counters and back-of-house built to support sales and brand presentation." },
      { title: "Office fit-outs & refurbishments", text: "Workspaces, meeting rooms and breakout areas planned around how your team works." },
      { title: "Commercial renovations", text: "Upgrades to existing commercial premises, from finishes refreshes to larger reconfigurations." },
      { title: "Business premises upgrades", text: "Targeted improvements to entries, amenities, lighting and finishes." },
      { title: "Interior alterations & space optimisation", text: "Partitioning and layout changes that make better use of your floor area." },
      { title: "Commercial finishes & coordination", text: "Joinery, flooring, ceilings and finishes coordinated with services trades." },
      { title: "Hospitality & other commercial spaces", text: "Cafés, venues and specialised spaces, subject to project suitability and requirements." },
    ],
    focus: [
      { title: "Operations", text: "Layouts that support workflow, storage and day-to-day use." },
      { title: "Brand", text: "Spaces that reflect your identity in materials, light and detail." },
      { title: "Customers", text: "Clear circulation and an experience that feels considered." },
      { title: "Minimal disruption", text: "Staging and scheduling planned around your trading needs." },
    ],
    journeyTitle: "How a fit-out is delivered",
    journey: [
      { title: "Discover", text: "We understand your business, your brief, your lease requirements and your timeline." },
      { title: "Assess", text: "We review the tenancy, existing services, landlord requirements and any approvals needed." },
      { title: "Plan", text: "Design, documentation, budget and approvals are coordinated, along with a works schedule." },
      { title: "Build", text: "The fit-out is delivered and coordinated, with progress reporting throughout." },
      { title: "Complete", text: "Defects review, handover documentation and readiness for trading or occupation." },
    ],
    notice: {
      title: "Landlord, building & compliance requirements",
      text: [
        "Commercial projects may involve landlord approvals, building approval, fire and accessibility requirements, and input from certifiers and engineers. These are identified during assessment and coordinated with the relevant parties.",
      ],
    },
    faqs: [
      {
        q: "Can works be done outside trading hours?",
        a: "Where the project and building allow, we can discuss staging or scheduling works to reduce disruption. This is planned case by case.",
      },
      {
        q: "Do you work with our designer or landlord's requirements?",
        a: "Yes. We can work from your designer's documentation and coordinate with landlord or building management requirements as part of planning.",
      },
      {
        q: "Do you take on hospitality projects?",
        a: "We consider hospitality and other specialised spaces on a case-by-case basis, depending on scope and project requirements.",
      },
    ],
    cta: {
      title: "Planning a fit-out or refurbishment?",
      text: "Share your brief, location and timing — we'll help you work out the right next step.",
    },
  },
  {
    slug: "approvals",
    number: "04",
    name: "Quadra Approvals",
    shortName: "Approvals",
    headline: "Clarity Before Construction.",
    cardSummary:
      "Planning, approval and development coordination that helps you understand requirements and move forward with confidence.",
    metaDescription:
      "Development enquiries, feasibility coordination, planning and building approval coordination and consultant management in Brisbane and South East Queensland.",
    intro: [
      "Before a project can be built, it often needs to be understood — what the planning rules allow, what approvals are required, which consultants are needed, and what information council will expect. Quadra Approvals helps you navigate that early stage with structure and clarity.",
      "We coordinate the process and the people involved, guide you through documentation, and help you identify the council requirements relevant to your site — so you can make informed decisions before committing to design or construction.",
    ],
    heroImage: images.plansDetail,
    supportImages: [images.officeDesk, images.siteTeam],
    services: [
      { title: "Initial development enquiries", text: "A first look at what you're hoping to achieve and the questions that need answering." },
      { title: "Preliminary feasibility coordination", text: "Coordinating early site and project feasibility input from the appropriate professionals." },
      { title: "Planning & zoning enquiries", text: "Helping identify the zoning, overlays and planning provisions that may apply to a site." },
      { title: "Building approval coordination", text: "Coordinating documentation and liaison with a building certifier for building approval." },
      { title: "Development application support", text: "Supporting the preparation and coordination of development applications with qualified planners." },
      { title: "Consultant coordination", text: "Engaging and coordinating town planners, designers, engineers, surveyors and certifiers as required." },
      { title: "Documentation & process guidance", text: "Helping you understand what's needed, in what order, and why." },
      { title: "Council requirement identification", text: "Support identifying relevant local council requirements for your project." },
    ],
    focus: [
      { title: "Understand", text: "What's possible on your site and what may limit it." },
      { title: "Sequence", text: "The approvals, reports and consultants needed — in the right order." },
      { title: "Coordinate", text: "One point of contact across the professionals involved." },
      { title: "Decide", text: "Better information before you commit to design or construction." },
    ],
    journeyTitle: "How approvals support works",
    journey: [
      { title: "Discover", text: "We discuss your site, your intentions and any information you already have." },
      { title: "Assess", text: "We help identify relevant planning provisions, constraints and the consultants likely to be needed." },
      { title: "Plan", text: "Consultants are coordinated and documentation prepared for the relevant approval pathway." },
      { title: "Lodge & respond", text: "Applications are lodged by the appropriate party, and information requests are coordinated." },
      { title: "Next steps", text: "Once a decision is issued, we help you understand the conditions and plan what comes next — including construction, if applicable." },
    ],
    notice: {
      title: "What Quadra Approvals does — and doesn't — do",
      text: [
        "Quadra Approvals provides coordination, process guidance and advisory support. Regulated services — such as town planning advice, building certification, engineering, surveying and architectural design — are provided by appropriately qualified and, where required, registered or licensed professionals engaged for your project.",
        "Approval decisions are made by the relevant assessment manager, council or certifier. No approval outcome or timeframe can be guaranteed.",
      ],
    },
    faqs: [
      {
        q: "Can you guarantee my application will be approved?",
        a: "No one can guarantee an approval outcome. Decisions are made by the relevant authority or certifier. Our role is to help coordinate a well-prepared process with the right professionals involved.",
      },
      {
        q: "Do I need approvals support if I'm not building with Quadra?",
        a: "Approvals support can be discussed as a standalone service or as part of a broader project. Get in touch and we'll discuss what suits your situation.",
      },
      {
        q: "What should I have ready for an initial enquiry?",
        a: "The property address, a description of what you'd like to achieve, and any existing plans, surveys, reports or council correspondence are all helpful.",
      },
    ],
    cta: {
      title: "Exploring a development opportunity?",
      text: "Start with a conversation about your site and your goals. We'll help you understand the likely pathway.",
    },
  },
];

export const getDivision = (slug: string) => divisions.find((d) => d.slug === slug);

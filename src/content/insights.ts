import { images, type SiteImage } from "./images";

export type Article = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  image: SiteImage;
  /** Draft outline sections. Replace with the final, reviewed article copy. */
  outline: { heading: string; body: string }[];
  isSample: boolean;
};

/**
 * SAMPLE ARTICLES — draft outlines only.
 * These are structured placeholders for future guides. They intentionally avoid
 * specific regulatory, cost or timeframe claims. Final articles should be
 * written and fact-checked (including against current council and state
 * requirements) before publishing.
 */
export const articles: Article[] = [
  {
    slug: "planning-a-kitchen-renovation",
    title: "Planning a Kitchen Renovation: Questions to Ask Before You Start",
    category: "Renovation",
    excerpt:
      "A practical checklist of questions to work through before you talk to a builder — from how you cook to where the bins go.",
    image: images.openLiving,
    isSample: true,
    outline: [
      { heading: "Start with how you use the space", body: "Who cooks, how often, and what frustrates you about the current layout? Notes on daily routines are often more useful than inspiration photos alone." },
      { heading: "Think about storage early", body: "List what needs a home — appliances, pantry items, bins, recycling — so storage is designed in rather than added later." },
      { heading: "Consider what stays and what moves", body: "Relocating plumbing, gas or walls can change the scope considerably. Knowing your priorities helps shape realistic options." },
      { heading: "Bring the right information", body: "Photos, rough measurements, a budget range and your preferred timing all help make a first conversation productive." },
    ],
  },
  {
    slug: "granny-flat-first-considerations",
    title: "Thinking About a Granny Flat? What to Consider First",
    category: "Granny Flats",
    excerpt:
      "Before you picture the floor plan, it's worth understanding the site, planning and practical questions that shape what's possible.",
    image: images.grannyFlat,
    isSample: true,
    outline: [
      { heading: "Why suitability comes first", body: "Whether a secondary dwelling is possible depends on the property and the planning rules that apply to it. Requirements vary, so they need to be checked for each site." },
      { heading: "Site factors to look at", body: "Access, slope, existing structures, services and available space all influence design and cost. A site review helps identify these early." },
      { heading: "Who will live there?", body: "Family, guests, or a flexible workspace — the intended use affects layout, privacy and amenity." },
      { heading: "Where to get reliable information", body: "Your local council and appropriately qualified professionals are the best sources for current requirements that apply to your property." },
    ],
  },
  {
    slug: "understanding-the-approvals-process",
    title: "Building and Planning Approvals: Understanding the Basics",
    category: "Planning",
    excerpt:
      "An introduction to why approvals exist, who is typically involved, and how to prepare for the process.",
    image: images.plansDetail,
    isSample: true,
    outline: [
      { heading: "Planning versus building approval", body: "Draft section explaining, in general terms, the difference between planning matters and building matters. To be reviewed by a qualified professional before publishing." },
      { heading: "Who's involved", body: "Town planners, building certifiers, engineers, surveyors and designers may each play a role depending on the project." },
      { heading: "Preparing your information", body: "Existing plans, surveys and any previous council correspondence can help the process start on the right foot." },
      { heading: "Managing expectations", body: "Outcomes and timeframes depend on the project and the assessing authority, so they can't be guaranteed." },
    ],
  },
  {
    slug: "office-fit-out-brief",
    title: "Writing a Clear Brief for Your Office Fit-Out",
    category: "Commercial",
    excerpt: "How a well-prepared brief helps align your team, your designer and your builder from day one.",
    image: images.officeCorridor,
    isSample: true,
    outline: [
      { heading: "Describe how your team works", body: "Focus work, collaboration, client meetings, storage — capture how the space needs to perform." },
      { heading: "Know your lease obligations", body: "Landlord requirements and make-good clauses can affect scope. Review them early." },
      { heading: "Set priorities, not just a wish list", body: "Ranking must-haves and nice-to-haves makes budget conversations far easier." },
      { heading: "Plan around operations", body: "Think about move dates, trading hours and any periods where disruption must be avoided." },
    ],
  },
  {
    slug: "renovate-or-extend",
    title: "Renovate, Extend or Rebuild? Framing the Decision",
    category: "Homeowner Guides",
    excerpt: "A simple framework for thinking through the options when your home no longer fits the way you live.",
    image: images.livingWarm,
    isSample: true,
    outline: [
      { heading: "Define the problem", body: "Is it space, layout, condition, or all three? Being specific helps narrow the options." },
      { heading: "Look at the existing structure", body: "The condition and layout of the current home influence which approaches are practical." },
      { heading: "Consider the site", body: "Planning provisions and site constraints can affect what is possible for each option." },
      { heading: "Compare on more than cost", body: "Disruption, timing and how long you plan to stay are all part of the decision." },
    ],
  },
  {
    slug: "preparing-for-an-initial-consultation",
    title: "Getting the Most From Your First Project Conversation",
    category: "Homeowner Guides",
    excerpt: "What to gather, what to ask and what to expect when you first talk to a builder about your project.",
    image: images.livingLounge,
    isSample: true,
    outline: [
      { heading: "Gather what you already have", body: "Address details, photos, any existing plans or surveys, and notes on what you'd like to change." },
      { heading: "Be open about budget and timing", body: "A realistic budget range and preferred timing help shape options that suit your situation." },
      { heading: "Ask about process", body: "Understanding the steps, who is involved and how communication will work is as important as the end result." },
      { heading: "Leave with clear next steps", body: "A good first conversation ends with an understanding of what information or assessments are needed next." },
    ],
  },
  {
    slug: "outdoor-living-planning",
    title: "Designing Outdoor Living for the South East Queensland Climate",
    category: "Outdoor",
    excerpt: "Ideas to consider when planning decks, patios and entertaining areas that get used all year.",
    image: images.outdoorLiving,
    isSample: true,
    outline: [
      { heading: "Follow the sun and breeze", body: "Orientation affects shade, comfort and how often a space is used." },
      { heading: "Connect inside and out", body: "Door placement, floor levels and sightlines can make an outdoor area feel like part of the home." },
      { heading: "Choose durable materials", body: "Select finishes suited to sun, rain and humidity, and think about ongoing maintenance." },
      { heading: "Check what may need approval", body: "Some outdoor structures may require approval. Confirm requirements for your property before you build." },
    ],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);

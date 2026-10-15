/* Quadra Build — SAMPLE project records for layout review. Imagery: Pexels (free licence). Replace with verified Quadra projects before launch. */
export const px = (id: number, w = 2400) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export type DivisionKey = "renovations" | "homes" | "commercial" | "approvals";

export interface InsideSlide { eyebrow: string; title: string; body: string; img: string }
export interface Project {
  slug: string; title: string; location: string; division: string; divisionKey: DivisionKey;
  caption: string; overview: string; specs: [string, string][]; hero: string; gallery: string[]; inside: InsideSlide[];
}

export const PROJECTS: Project[] = [
  {
    slug: "ashgrove-residence", title: "Ashgrove Residence", location: "Ashgrove, QLD", division: "Renovation", divisionKey: "renovations",
    caption: "A Queenslander opened up to light and garden.",
    overview: "A 1930s timber home with a closed, compartmented plan and little connection to its north-facing garden. The brief asked for a kitchen at the heart of the house, a generous living room and a bathroom that felt calm rather than cramped. Walls came out, the rear elevation opened onto a new deck, and finishes were kept warm and simple.",
    specs: [["Location", "Ashgrove, QLD"], ["Scope", "Rear extension, kitchen, bathroom, deck"], ["Division", "Quadra Renovations"], ["Duration", "7 months"], ["Completion", "2025"]],
    hero: px(30484316),
    gallery: [px(10153052), px(5982764), px(6301168), px(7045358), px(4180974), px(9976121)],
    inside: [
      { eyebrow: "Kitchen", title: "The new centre", body: "Timber cabinetry and a long stone bench run the width of the room, with the old kitchen wall removed so cooking and gathering share one space that opens onto the deck.", img: px(10153052) },
      { eyebrow: "Living", title: "Garden room", body: "Full-height glazing replaces the former sleep-out, drawing afternoon light deep into the plan and framing the established jacaranda at the rear boundary.", img: px(5982764) },
      { eyebrow: "Bathroom", title: "Quiet finishes", body: "A wall-hung vanity, floor-to-ceiling tiles and a frameless shower keep the small room uncluttered, with a skylight borrowing daylight from the roof above.", img: px(7045358) },
    ],
  },
  {
    slug: "paddington-house", title: "Paddington House", location: "Paddington, QLD", division: "Home", divisionKey: "homes",
    caption: "A new family home shaped by its sloping site.",
    overview: "A steep, narrow block close to the city with views to the west. The clients wanted a home that stepped down the site rather than fighting it, with living spaces that flow onto a pool terrace and bedrooms tucked quietly below. Deep overhangs and operable screens manage the Brisbane sun while keeping the plan open.",
    specs: [["Location", "Paddington, QLD"], ["Scope", "New two-storey home, pool and landscaping"], ["Division", "Quadra Homes"], ["Duration", "14 months"], ["Completion", "2025"]],
    hero: px(8134821),
    gallery: [px(8134745), px(6077368), px(19345426), px(8134746), px(12420730), px(8089093)],
    inside: [
      { eyebrow: "Terrace", title: "Pool level", body: "The main living floor extends onto a terrace and lap pool held within the slope, so the water sits at eye level from the kitchen and the garden drops away beyond.", img: px(8134745) },
      { eyebrow: "Living", title: "West light", body: "A double-height living room faces the view, with a timber-lined ceiling and screened glazing that softens the afternoon sun without closing the room in.", img: px(6077368) },
      { eyebrow: "Kitchen", title: "Working wall", body: "A single run of integrated joinery hides appliances and pantry behind flush doors, leaving the island and its stone top as the only object in the room.", img: px(19345426) },
    ],
  },
  {
    slug: "valley-espresso", title: "Valley Espresso", location: "Fortitude Valley, QLD", division: "Commercial", divisionKey: "commercial",
    caption: "A corner café fit-out built for a busy trade.",
    overview: "A former retail tenancy on a busy Valley corner, converted into a 48-seat café with a visible brew bar. Services, extraction and a compliant kitchen had to fit within an existing heritage shell, and the operator needed to trade within a tight programme. The result balances fast service with a room people want to stay in.",
    specs: [["Location", "Fortitude Valley, QLD"], ["Scope", "Hospitality fit-out, kitchen, services, joinery"], ["Division", "Quadra Commercial"], ["Duration", "11 weeks"], ["Completion", "2025"]],
    hero: px(5490827),
    gallery: [px(2813132), px(33794446), px(3745526), px(4450334), px(8847017), px(38292581)],
    inside: [
      { eyebrow: "Counter", title: "The brew bar", body: "A long terrazzo counter puts the espresso machine and pastry display in full view of the street, with a service corridor behind that keeps staff moving without crossing the floor.", img: px(38292581) },
      { eyebrow: "Dining", title: "The long room", body: "Banquette seating along the heritage brick wall and loose tables toward the glazing give the operator flexibility between a quick morning trade and slower weekend brunches.", img: px(3745526) },
      { eyebrow: "Entry", title: "Corner presence", body: "Existing shopfront frames were retained and reglazed, with new signage, lighting and planting that signal the café from both approaching streets.", img: px(2813132) },
    ],
  },
];

export const projectHref = (slug: string) => `/projects/${slug}`;
export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);

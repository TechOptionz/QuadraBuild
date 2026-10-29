/** Shared enquiry schema and validation (used by the form and the API route). */

export const enquiryTypes = [
  { value: "renovations", label: "Quadra Renovations", hint: "Renovations, extensions, kitchens, bathrooms, outdoor" },
  { value: "homes", label: "Quadra Homes", hint: "New homes, custom builds, granny flats" },
  { value: "commercial", label: "Quadra Commercial", hint: "Retail, office and commercial fit-outs" },
  { value: "approvals", label: "Quadra Approvals", hint: "Planning, approvals and feasibility" },
  { value: "unsure", label: "Not sure / multiple", hint: "We'll help work out the right fit" },
] as const;

export const budgetOptions = [
  "Under $50,000",
  "$50,000 – $150,000",
  "$150,000 – $300,000",
  "$300,000 – $600,000",
  "$600,000 – $1,000,000",
  "Over $1,000,000",
  "Not sure yet",
];

export const timeframeOptions = [
  "As soon as possible",
  "Within 3 months",
  "3 – 6 months",
  "6 – 12 months",
  "More than 12 months",
  "Just exploring",
];

export type EnquiryType = (typeof enquiryTypes)[number]["value"];

export type Enquiry = {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  location: string;
  budget: string;
  timeframe: string;
  description: string;
};

export type EnquiryErrors = Partial<Record<keyof Enquiry, string>>;

export const emptyEnquiry: Enquiry = {
  name: "",
  email: "",
  phone: "",
  projectType: "",
  location: "",
  budget: "",
  timeframe: "",
  description: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\d\s-]{8,20}$/;

export function validateEnquiry(e: Enquiry): EnquiryErrors {
  const errors: EnquiryErrors = {};
  if (e.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(e.email.trim())) errors.email = "Please enter a valid email address.";
  if (e.phone.trim() && !PHONE_RE.test(e.phone.trim())) errors.phone = "Please enter a valid phone number, or leave it blank.";
  if (!enquiryTypes.some((t) => t.value === e.projectType)) errors.projectType = "Please choose an enquiry type.";
  if (e.location.trim().length < 2) errors.location = "Please tell us the suburb or location of the project.";
  if (e.budget && !budgetOptions.includes(e.budget)) errors.budget = "Please choose a budget range from the list.";
  if (e.timeframe && !timeframeOptions.includes(e.timeframe)) errors.timeframe = "Please choose a timeframe from the list.";
  const len = e.description.trim().length;
  if (len < 20) errors.description = "Please describe your project in a little more detail (at least 20 characters).";
  else if (len > 4000) errors.description = "Please keep your description under 4,000 characters.";
  return errors;
}

/** Coerces unknown input (e.g. a JSON body) into an Enquiry with trimmed, length-limited strings. */
export function normaliseEnquiry(input: unknown): Enquiry {
  const src = (typeof input === "object" && input !== null ? input : {}) as Record<string, unknown>;
  const str = (k: keyof Enquiry, max = 300) => (typeof src[k] === "string" ? (src[k] as string).trim().slice(0, max) : "");
  return {
    name: str("name", 120),
    email: str("email", 200),
    phone: str("phone", 40),
    projectType: str("projectType", 40),
    location: str("location", 160),
    budget: str("budget", 60),
    timeframe: str("timeframe", 60),
    description: str("description", 4001),
  };
}

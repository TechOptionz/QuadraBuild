import type { Metadata } from "next";
import ServicesView from "@/components/ServicesView";

export const metadata: Metadata = {
  title: "Our Services | Renovations, Homes, Commercial & Approvals Brisbane | Quadra Build",
  description: "Explore Quadra Build's four divisions: home renovations and extensions, new homes and granny flats, commercial fit-outs and development approval support across Brisbane and South East Queensland.",
};

export default function Services() {
  return <ServicesView />;
}

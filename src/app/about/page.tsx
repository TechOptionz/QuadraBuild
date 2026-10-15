import type { Metadata } from "next";
import AboutView from "@/components/AboutView";

export const metadata: Metadata = {
  title: "About Quadra Build | Building & Renovations Brisbane",
  description: "Discover Quadra Build's approach to thoughtful renovations, new homes, commercial spaces and coordinated project planning across Brisbane and South East Queensland.",
};

export default function About() {
  return <AboutView />;
}

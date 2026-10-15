import type { Metadata } from "next";
import LegalView from "@/components/LegalView";

export const metadata: Metadata = { title: "Terms of Use | Quadra Build", robots: { index: false } };

const SECTIONS = ["Acceptance of these terms", "Use of this website", "Information, not advice", "Projects, imagery and credits", "Intellectual property", "Third-party links", "Limitation of liability", "Privacy", "Changes to these terms", "Governing law — Queensland"];

export default function Page() {
  return <LegalView title="Terms of Use" sections={SECTIONS} />;
}

import type { Metadata } from "next";
import LegalView from "@/components/LegalView";

export const metadata: Metadata = { title: "Privacy Policy | Quadra Build", robots: { index: false } };

const SECTIONS = ["Who we are", "Information we collect", "How we use your information", "Enquiry form and communications", "Cookies and analytics", "Disclosure to third parties", "Storage and security", "Access and correction", "Complaints", "Contact"];

export default function Page() {
  return <LegalView title="Privacy Policy" sections={SECTIONS} />;
}

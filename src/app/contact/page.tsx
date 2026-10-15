import type { Metadata } from "next";
import ContactView from "@/components/ContactView";

export const metadata: Metadata = {
  title: "Contact Quadra Build | Discuss Your Brisbane Project",
  description: "Tell Quadra Build about your renovation, home, fit-out or approvals enquiry in Brisbane and South East Queensland. Start a conversation about next steps.",
};

export default function Page() {
  return <ContactView />;
}

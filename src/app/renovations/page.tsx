import type { Metadata } from "next";
import DivisionView from "@/components/DivisionView";
import { DIVISIONS } from "@/lib/divisions";

const d = DIVISIONS.renovations;
export const metadata: Metadata = { title: d.title, description: d.description };

export default function Page() {
  return <DivisionView division="renovations" />;
}

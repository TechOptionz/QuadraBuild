import type { Metadata } from "next";
import DivisionView from "@/components/DivisionView";
import { DIVISIONS } from "@/lib/divisions";

const d = DIVISIONS.homes;
export const metadata: Metadata = { title: d.title, description: d.description };

export default function Page() {
  return <DivisionView division="homes" />;
}

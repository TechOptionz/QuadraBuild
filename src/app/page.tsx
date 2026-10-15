import type { Metadata } from "next";
import HomeView from "@/components/home/HomeView";

export const metadata: Metadata = {
  title: "Quadra Build | Renovations, Homes & Commercial in Brisbane",
  description: "Explore residential renovations, new homes, granny flats, commercial fit-outs and development approval support with Quadra Build in Brisbane, Queensland.",
};

export default function Home() {
  return <HomeView />;
}

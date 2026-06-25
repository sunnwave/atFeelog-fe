import { JSX } from "react";
import HomeDashBoard from "./HomeDashBoard/HomeDashBoard";
import BestRecords from "./BestRecords";
import LatestRecords from "./LatestRecords";
import HomeHero from "./ui/HomeHero";

export default function HomeScreen(): JSX.Element {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden lg:p-4">
      <div className="space-y-8 lg:space-y-10">
        <HomeHero />
        <HomeDashBoard />
        <BestRecords />
        <LatestRecords />
      </div>
    </div>
  );
}

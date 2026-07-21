import { JSX } from "react";
import { useRecoilValue } from "recoil";
import { loggedInUserState } from "@/shared/stores";
import HomeDashBoard from "./HomeDashBoard/HomeDashBoard";
import BestRecords from "./BestRecords";
import LatestRecords from "./LatestRecords";
import HomeHero from "./ui/HomeHero";
import BoxOfficeSection from "./BoxOffice/BoxOfficeSection";

export default function HomeScreen(): JSX.Element {
  const me = useRecoilValue(loggedInUserState);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden lg:p-4">
      <div className="space-y-8 lg:space-y-10">
        {!me && <HomeHero />}
        {/* <HomeDashBoard /> */}
        <BoxOfficeSection />
        <BestRecords />
        <LatestRecords />
      </div>
    </div>
  );
}

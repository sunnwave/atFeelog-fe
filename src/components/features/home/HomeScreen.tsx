import { JSX } from "react";
import { useRecoilValue } from "recoil";
import { loggedInUserState } from "@/shared/stores";
import HomeHero from "./ui/HomeHero";
import BoxOfficeSection from "./BoxOfficeSection";
import { ResponsiveLayout } from "@/components/commons/layout/ResponsiveLayout";
import BestRecordsSection from "./BestRecordsSection";
import LatestRecordsSection from "./LatestRecordsSection";

export default function HomeScreen(): JSX.Element {
  const me = useRecoilValue(loggedInUserState);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {!me && <HomeHero />}
      <ResponsiveLayout
        contentType="wide"
        className="py-4 space-y-8 lg:space-y-10"
      >
        {/* <HomeDashBoard /> */}
        <BoxOfficeSection />
        <BestRecordsSection />
        <LatestRecordsSection />
      </ResponsiveLayout>
    </div>
  );
}

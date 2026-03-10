import { JSX } from "react";
import HomeDashBoard from "./HomeDashBoard/HomeDashBoard";
import BestRecords from "./BestRecords";
import { useRecoilValue } from "recoil";
import MyDashBoard from "./HomeDashBoard/MyDashBoard/MyDashBoard";
import { loggedInUserState } from "@/shared/stores";

export default function HomePage(): JSX.Element {
  const me = useRecoilValue(loggedInUserState);
  const isLoggedIn = !!me;

  return (
    <div className="min-h-screen bg-background overflow-x-hidden px-4 py-4 lg:px-6 lg:pb-8">
      <div className="mx-auto max-w-5xl space-y-4 lg:space-y-4">
        {isLoggedIn && <MyDashBoard />}
        <HomeDashBoard />
        <BestRecords />
      </div>
    </div>
  );
}

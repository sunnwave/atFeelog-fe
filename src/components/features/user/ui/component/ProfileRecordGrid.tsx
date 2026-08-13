import { useState } from "react";
import type { TabKey } from "../../types";
import { CardSkeleton, RecordPosterCard } from "@/components/commons/card";
import { ResponsiveGrid } from "@/components/commons/layout";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { loggedInUserState } from "@/shared/stores";
import { useFetchBoardsByUser } from "../../hooks/useFetchBoardsByUser";
import { useFetchBoardsLikeByUser } from "../../hooks/useFetchBoardsLikeByUser";

const TABS: { key: TabKey; label: string }[] = [
  { key: "log", label: "My Logs" },
  { key: "likes", label: "Likes" },
];

export default function ProfileRecordGrid() {
  const router = useRouter();
  const loggedInUser = useRecoilValue(loggedInUserState);
  const userId =
    typeof router.query.userId === "string"
      ? router.query.userId
      : loggedInUser?.id;

  const { records, loading } = useFetchBoardsByUser(userId);
  const { records: likedRecords, loading: likedLoading } =
    useFetchBoardsLikeByUser(userId);

  const [activeTab, setActiveTab] = useState<TabKey>("log");
  const displayRecords = activeTab === "log" ? records : likedRecords;
  const isLoading = activeTab === "log" ? loading : likedLoading;

  return (
    <section>
      {/* 탭 */}
      <div className="inline-flex border-[1.5px] border-foreground mb-4">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={[
              "px-3 py-2 text-base font-bold tracking-wide transition-all",
              activeTab === key
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground",
            ].join(" ")}
          >
            {label}
          </button>
        ))}
      </div>

      {/* 그리드 */}
      {isLoading ? (
        <ResponsiveGrid cols={2} colsMd={3} colsLg={4} bordered>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border-r-[1.5px] border-b-[1.5px] border-foreground @container">
              <CardSkeleton showMeta={false} />
            </div>
          ))}
        </ResponsiveGrid>
      ) : displayRecords.length === 0 ? (
        <p className="py-16 text-center text-sm text-muted-foreground">
          {activeTab === "log"
            ? "아직 작성한 기록이 없어요."
            : "좋아요한 기록이 없어요."}
        </p>
      ) : (
        <ResponsiveGrid cols={2} colsMd={3} colsLg={4} bordered>
          {displayRecords.map((record) => (
            <div
              key={record.id}
              className="border-r-[1.5px] border-b-[1.5px] border-foreground"
            >
              <RecordPosterCard record={record} showBorder={false} />
            </div>
          ))}
        </ResponsiveGrid>
      )}
    </section>
  );
}

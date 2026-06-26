import { useState } from "react";
import RecordPosterCard from "@/components/features/record/list/RecordPosterCard/RecordPosterCard";
import type { ProfileRecordGridProps, TabKey } from "../../types";

const TABS: { key: TabKey; label: string }[] = [
  { key: "log", label: "Log" },
  { key: "likes", label: "Likes" },
];

export default function ProfileRecordGrid({
  records,
  likedRecords,
}: ProfileRecordGridProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("log");
  const displayRecords = activeTab === "log" ? records : likedRecords;

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
      {displayRecords.length === 0 ? (
        <p className="py-16 text-center text-sm text-muted-foreground">
          {activeTab === "log"
            ? "아직 작성한 기록이 없어요."
            : "좋아요한 기록이 없어요."}
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 border-t-[1.5px] border-l-[1.5px] border-foreground">
          {displayRecords.map((record) => (
            <RecordPosterCard key={record.id} record={record} />
          ))}
        </div>
      )}
    </section>
  );
}

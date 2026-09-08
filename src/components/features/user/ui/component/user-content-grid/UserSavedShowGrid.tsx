import { Sparkles } from "lucide-react";
import { ResponsiveGrid } from "@/components/commons/layout";
import { CardGridSkeleton } from "@/components/ui/feedback";
import ShowCard from "@/components/commons/card/ShowCard/ShowCard";
import { useFetchSavedShows } from "../../../hooks";

export default function UserSavedShowGrid() {
  const { shows, loading, error } = useFetchSavedShows();

  if (loading) {
    return (
      <CardGridSkeleton
        showMeta={false}
        count={4}
        bordered
        className="border-t-0"
      />
    );
  }
  if (error) {
    return (
      <div className="flex items-center gap-2 py-5 text-muted-foreground">
        <Sparkles className="h-5 w-5" />
        <span className="text-sm">
          찜한 공연을 불러오는 중 오류가 발생했어요
        </span>
      </div>
    );
  }

  if (shows.length === 0) {
    return (
      <div className="flex items-center gap-2 py-5 text-muted-foreground">
        <Sparkles className="h-5 w-5" />
        <span className="text-sm">찜한 공연이 없어요</span>
      </div>
    );
  }

  return (
    <ResponsiveGrid
      cols={2}
      colsMd={3}
      colsLg={4}
      bordered
      className="border-t-0"
    >
      {shows.map((show) => (
        <ShowCard key={show.mt20id} performance={show} showBorder />
      ))}
    </ResponsiveGrid>
  );
}

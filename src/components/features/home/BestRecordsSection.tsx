import { JSX } from "react";
import { useFetchBestRecords } from "./hooks/queries/useFetchBestRecords";
import { ChevronRight, Flame } from "lucide-react";
import { useNavigation } from "@/shared/hooks/ui/useNavigation";
import { Button } from "@/components/ui/button/Button";
import { RecordPosterCard } from "@/components/commons/card";

export default function BestRecordsSection(): JSX.Element {
  const { records, loading } = useFetchBestRecords();
  const { onClickNavigation } = useNavigation();

  if (loading || records.length === 0) return <></>;

  return (
    <div className="w-full overflow-x-hidden flex flex-col space-y-6">
      <div className="flex flex-row ">
        <h2 className="w-full text-2xl font-bold flex flex-row items-center justify-start gap-1.5">
          <Flame className="w-5 h-5" />
          <span>이번 주 베스트 필로그</span>
        </h2>

        <Button
          variant="ghost"
          className="justify-end hover:bg-background"
          onClick={onClickNavigation("/feelog?view=best")}
        >
          더보기
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
      <div className="w-full max-w-full min-w-0 overflow-x-auto">
        <div className="flex flex-nowrap border-l-[1.5px] border-foreground">
          {records.map((board) => (
            <div
              key={board.id}
              className="shrink-0 w-46 md:w-52 border-t-[1.5px] border-foreground @container"
            >
              <RecordPosterCard record={board} showMeta />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

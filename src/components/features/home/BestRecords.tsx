import { JSX } from "react";
import { useFetchBestRecords } from "./hooks/queries/useFetchBestRecords";
import RecordCard from "../record/list/RecordCard/RecordCard";
import { ChevronRight, Flame } from "lucide-react";
import { useNavigation } from "@/shared/hooks/ui/useNavigation";
import { Button } from "@/components/ui/button/Button";

export default function BestRecords(): JSX.Element {
  const { records } = useFetchBestRecords();
  const { onClickNavigation } = useNavigation();

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
          onClick={onClickNavigation("/records")}
        >
          더보기
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
      <div className="w-full max-w-full min-w-0 overflow-x-auto">
        <div className="flex flex-nowrap gap-5">
          {records.map((board) => (
            <div key={board.id} className="shrink-0 w-55 md:w-65">
              <div className="w-full aspect-[3/4]">
                <RecordCard record={board} size="sm" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

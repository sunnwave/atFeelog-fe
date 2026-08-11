import { RecordDetail } from "@/api/adapters/types/record";
import { RecordSummary } from "@/api/adapters/types/record-summary";
import { BookMarkIcon } from "@/components/ui/icons";
import HeartIcon from "@/components/ui/icons/heartIcon/HeartIcon";
import { useLikeRecord } from "@/shared/hooks/record/useLikeRecord";

export default function RecordActions({
  record,
}: {
  record: RecordSummary | RecordDetail;
}) {
  const { onLikeRecord } = useLikeRecord();
  return (
    <div className="flex flex-row gap-2 items-center py-2 px-3 border-b-[1.5px]">
      <div className="flex flex-1 items-center justify-center border-[1.5px] p-2">
        <HeartIcon
          isLiked={record.isLiked ?? false}
          likeCount={record.likeCount ?? 0}
          direction="row"
          iconSize="md"
          iconColor="neutral"
          onToggle={() => onLikeRecord(record.id)}
        />
      </div>
      <div className="flex flex-1 items-center justify-center border-[1.5px] p-2">
        <BookMarkIcon isSaved={false} iconColor="neutral" iconSize="md" />
      </div>
    </div>
  );
}

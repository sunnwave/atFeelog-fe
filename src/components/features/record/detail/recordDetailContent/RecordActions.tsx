import { RecordDetail } from "@/api/adapters/types/record";
import { RecordSummary } from "@/api/adapters/types/record-summary";
import { BookMarkIcon } from "@/components/ui/icons";
import HeartIcon from "@/components/ui/icons/heartIcon/HeartIcon";
import { useToggleRecordLike } from "@/shared/hooks/record/useToggleRecordLike";

export default function RecordActions({
  record,
}: {
  record: RecordSummary | RecordDetail;
}) {
  const { toggle } = useToggleRecordLike();
  return (
    <div className="flex flex-row gap-2 items-center py-2 px-3 border-b-[1.5px]">
      <div className="flex flex-1 items-center justify-center border-[1.5px] p-2">
        <HeartIcon
          isLiked={record.isLiked ?? false}
          likeCount={record.likeCount ?? 0}
          direction="row"
          iconSize="md"
          iconColor="neutral"
          onToggle={() => toggle(record.id).catch(() => {})}
        />
      </div>
      <div className="flex flex-1 items-center justify-center border-[1.5px] p-2">
        <BookMarkIcon isSaved={false} iconColor="neutral" iconSize="md" />
      </div>
    </div>
  );
}

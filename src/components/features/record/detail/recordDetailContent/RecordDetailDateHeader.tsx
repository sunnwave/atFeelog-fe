import { RecordDetail } from "@/api/adapters/types/record";
import WriterMenu from "@/components/commons/writerMenu/WriterMenu";
import { useConfirmPreset } from "@/shared/hooks/ui/useConfirmPreset";
import { formatDate } from "@/shared/utils";
import { useRouter } from "next/router";
import { JSX } from "react";
import { useDeleteBoard } from "../hooks/mutations/useDeleteRecord";

export default function RecordDetailDateHeader({
  record,
  isWriter,
}: {
  record: RecordDetail;
  isWriter: boolean;
}): JSX.Element {
  const formatted = formatDate(record.showDate); // "YYYY.MM.DD"
  const [year, month, day] = formatted.split(".");

  const router = useRouter();
  const { openConfirmPreset } = useConfirmPreset();
  const { onDeleteRecord } = useDeleteBoard();

  const onEdit = () => {
    router.push(`/feelog/${record.id}/edit`);
  };

  const onDelete = () => {
    openConfirmPreset("deleteRecord", {
      onConfirm: async () => {
        await onDeleteRecord(record.id);
      },
    });
  };

  return (
    <div className="flex items-start gap-6 p-4 border-b-[1.5px] ">
      {/* 날짜 */}
      <div className="flex-shrink-0">
        <div className="text-6xl font-black tracking-tighter text-foreground leading-none">
          {day}
        </div>
        <div className="text-xs font-bold text-muted-foreground mt-1.5">
          {year}년 {month}월
        </div>
      </div>

      <div className="w-full mt-3 flex justify-between">
        {/* 제목 */}
        <h1 className="text-xl font-black tracking-tight text-foreground leading-snug">
          {record.title}
        </h1>

        {/* 작성자 메뉴 */}
        {isWriter && (
          <div data-testid="record-writer-menu">
            <WriterMenu
              onEditClick={onEdit}
              onDeleteClick={onDelete}
              icon="m"
            />
          </div>
        )}
      </div>
    </div>
  );
}

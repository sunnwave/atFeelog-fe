import { RecordDetail } from "@/api/adapters/types/record";
import Profile from "@/components/commons/profile/Profile";
import { JSX } from "react";
import RecordDetailContentSubInfo from "./RecordDetailContentSubInfo";
import RecordDetailContentMain from "./RecordDetailContentMain";
import WriterMenu from "@/components/commons/writerMenu/WriterMenu";
import { cn } from "@/shared/utils";
import { useConfirmPreset } from "@/shared/hooks/ui/useConfirmPreset";
import { useDeleteBoard } from "../hooks/mutations/useDeleteRecord";
import RecordComments from "../../../record-comments/RecordComments";
import { BookMarkIcon, HeartIcon } from "@/components/ui/icons";
import { stripMetaFromContents } from "../../lib";
import { useNavigation } from "@/shared/hooks/ui/useNavigation";

export default function RecordDetailContent({
  record,
  isWriter,
  className,
}: {
  record: RecordDetail;
  isWriter: boolean;
  className?: string;
}): JSX.Element {
  const { openConfirmPreset } = useConfirmPreset();
  const { onDeleteRecord } = useDeleteBoard();
  const { onClickNavigation } = useNavigation();

  const onDelete = () => {
    openConfirmPreset("deleteRecord", {
      onConfirm: async () => {
        await onDeleteRecord(record.id);
      },
    });
  };

  const contents = stripMetaFromContents(record.contents);

  return (
    <div className={cn(className)}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold leading-tight">{record.title}</h1>

        {/* contents container */}
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          {/* contents top */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <Profile record={record} tone="primary" size="sm" />
            {isWriter && (
              <WriterMenu
                onEditClick={onClickNavigation(`/records/update/${record.id}`)}
                onDeleteClick={onDelete}
              />
            )}
          </div>
          {/* sub info */}
          <RecordDetailContentSubInfo record={record} />
          {/* main */}
          <RecordDetailContentMain contents={contents} />

          <div className="flex flex-row gap-6 items-center justify-end p-4">
            <HeartIcon
              isLiked={record.isLiked ?? false}
              likeCount={record.likeCount ?? 0}
              direction="row"
              iconSize="md"
              iconColor="neutral"
            />
            <BookMarkIcon isSaved={false} iconColor="neutral" iconSize="md" />
          </div>
        </div>

        <div className="border-t border-border" />

        <RecordComments />
      </div>
    </div>
  );
}

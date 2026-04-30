import WriterMenu from "@/components/commons/writerMenu/WriterMenu";
import Avatar from "@/components/ui/avatar/Avatar";
import { useState } from "react";
import { CommentUpdate } from "../commentUpdate/CommentUpdate";
import { useCommentActions } from "../context/CommentActionsContext";
import { fromNow } from "@/shared/utils";
import { RecordComment } from "@/api/adapters/types/record-comment";

export default function CommentItem({ comment }: { comment: RecordComment }) {
  const { canEdit, onSave, onStartEdit, onRequestDelete } = useCommentActions();

  const isWriter = canEdit(comment);

  const [isUpdate, setIsUpdate] = useState(false);

  const handleEditClick = () => {
    onStartEdit?.(comment.id);
    setIsUpdate(true);
  };

  const handleSave = async (newContents: string) => {
    await onSave(comment.id, newContents);
    setIsUpdate(false);
  };

  const handleDelete = async () => {
    onRequestDelete(comment.id);
  };
  return (
    <div className="w-full flex items-start gap-3">
      <Avatar user={comment.user ?? undefined} size="md" type="filled" />
      <div className="flex flex-1 justify-between">
        <div className="w-full flex flex-col gap-1">
          <div className="flex items-baseline gap-2">
            <span className="font-medium text-sm">{comment.user?.name}</span>
            <span className="text-xs font-regular text-muted-foreground">
              {comment.isEdited
                ? `${fromNow(comment.updatedAt!)} 수정됨`
                : `${fromNow(comment.createdAt)} 작성됨`}
            </span>
          </div>

          {isUpdate ? (
            <CommentUpdate
              initialContent={comment.content}
              onSave={handleSave}
              onCancel={() => setIsUpdate(false)}
            />
          ) : (
            <p className="w-full text-sm leading-relaxed text-foreground mb-2 whitespace-pre-wrap">
              {comment.content}
            </p>
          )}
        </div>
        {isWriter && (
          <WriterMenu
            onEditClick={handleEditClick}
            onDeleteClick={handleDelete}
          />
        )}
      </div>
    </div>
  );
}

import { createContext, useContext } from "react";
import { RecordComment } from "@/api/adapters/types/record-comment";

export type CommentActions = {
  canEdit: (comment: RecordComment) => boolean;
  onStartEdit?: (commentId: string) => void;
  onSave: (commentId: string, newContents: string) => Promise<void> | void;
  onRequestDelete: (commentId: string) => void;
};

const CommentActionsContext = createContext<CommentActions | null>(null);

export function CommentActionsProvider({
  value,
  children,
}: {
  value: CommentActions;
  children: React.ReactNode;
}) {
  return (
    <CommentActionsContext.Provider value={value}>
      {children}
    </CommentActionsContext.Provider>
  );
}

export function useCommentActions() {
  const ctx = useContext(CommentActionsContext);
  if (!ctx) {
    throw new Error(
      "useCommentActions must be used within <CommentActionsProvider>",
    );
  }
  return ctx;
}

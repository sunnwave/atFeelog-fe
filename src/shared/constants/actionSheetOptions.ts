import type { ActionSheetOption } from "@/components/commons/actionSheet/type";
import { Pencil, Ticket } from "lucide-react";

export function buildWriteActionSheetOptions(
  onClickNavigation: (href: string) => () => void
): ReadonlyArray<ActionSheetOption> {
  const WRITE_ACTION_SHEET_OPTIONS = [
    {
      icon: Pencil,
      label: "에필로그 쓰기",
      description: "공연 후기와 감상을 기록해보세요",
      onClick: onClickNavigation("/feelog/new"),
    },
    {
      icon: Ticket,
      label: "거래글 작성",
      description: "티켓이나 MD를 거래해보세요",
      onClick: onClickNavigation("/market/new"),
      variant: "default",
    },
  ] as const satisfies ReadonlyArray<ActionSheetOption>;
  return WRITE_ACTION_SHEET_OPTIONS;
}

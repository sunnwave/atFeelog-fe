import { IBoard } from "@/shared/graphql/generated/types";
import { formatDate } from "@/shared/utils";
import { Calendar, MapPin } from "lucide-react";
import { JSX } from "react";
import { RecordMeta } from "../../model";

export default function RecordDetailContentSubInfo({
  record,
  meta,
}: {
  record: IBoard;
  meta?: RecordMeta | null;
}): JSX.Element {
  console.log(record, meta);
  return (
    <div className="p-4 border-b border-border">
      <div className="flex flex-wrap gap-4">
        {record.boardAddress?.addressDetail?.trim() && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{record.boardAddress.addressDetail}</span>
          </div>
        )}
        {meta?.showDate && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(meta?.showDate)}</span>
          </div>
        )}
      </div>
    </div>
  );
}

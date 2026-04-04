import { IBoard } from "@/shared/graphql/generated/types";
import { formatDate } from "@/shared/utils";
import { Calendar, MapPin } from "lucide-react";
import { JSX } from "react";

export default function RecordDetailContentSubInfo({
  record,
}: {
  record: IBoard;
}): JSX.Element {
  return (
    <div className="p-4 border-b border-border">
      <div className="flex flex-wrap gap-4">
        {record.boardAddress && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{record.boardAddress.addressDetail}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(record.createdAt)}</span>
        </div>
      </div>
    </div>
  );
}

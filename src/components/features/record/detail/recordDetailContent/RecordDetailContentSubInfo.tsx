import { RecordDetail } from "@/api/adapters/types/record";
import { formatDate } from "@/shared/utils";
import { Calendar, MapPin } from "lucide-react";
import { JSX } from "react";

export default function RecordDetailContentSubInfo({
  record,
}: {
  record: RecordDetail;
}): JSX.Element {
  return (
    <div className="p-4 border-b border-border">
      <div className="flex flex-wrap gap-4">
        {record.boardAddress?.placeName?.trim() && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{record.boardAddress.placeName}</span>
          </div>
        )}
        {record.showDate && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(record.showDate)}</span>
          </div>
        )}
      </div>
    </div>
  );
}

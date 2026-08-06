import { RecordDetail } from "@/api/adapters/types/record";
import { cn, formatDate } from "@/shared/utils";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { JSX } from "react";

interface Props {
  record: RecordDetail;
  className?: string;
}

const CELLS = [
  { key: "showName", label: "공연명", accent: true },
  { key: "artistName", label: "아티스트", accent: false },
  { key: "showDate", label: "공연날짜", accent: true },
  { key: "place", label: "공연장소", accent: false },
] as const;

export default function RecordDetailShowInfo({
  record,
  className,
}: Props): JSX.Element {
  const values: Record<(typeof CELLS)[number]["key"], React.ReactNode> = {
    showName: record.mt20id ? (
      <Link
        href={`/shows/${record.mt20id}`}
        className="inline-flex items-center gap-1 hover:text-point transition-colors"
      >
        {record.showName}
        <ExternalLink className="w-2.5 h-2.5" />
      </Link>
    ) : (
      record.showName
    ),
    artistName: record.artistName ?? "—",
    showDate: formatDate(record.showDate),
    place: record.boardAddress?.placeName ?? "—",
  };

  return (
    <div
      className={cn(
        `p-3 border border-border grid grid-cols-2 gap-x-6 gap-y-3`,
        className,
      )}
    >
      {CELLS.map(({ key, label, accent }) => (
        <div key={key} className="flex gap-2.5 items-stretch">
          <div
            className={`w-0.5 rounded-sm shrink-0 ${accent ? "bg-point" : "bg-border"}`}
          />
          <div>
            <div className="text-[9px] font-black tracking-widest uppercase text-muted-foreground mb-0.5">
              {label}
            </div>
            <div className="text-xs font-bold text-foreground">
              {values[key]}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

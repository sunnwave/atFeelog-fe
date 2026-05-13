import { RecordSummary } from "@/api/adapters/types/record-summary";
import { CARD_UI_SIZE, UI_SIZE } from "@/shared/tokens";
import { JSX } from "react";

export default function RecordCardContent({
  record,
  size = "lg",
}: {
  record: RecordSummary;
  size?: CARD_UI_SIZE;
}): JSX.Element {
  const s = UI_SIZE[size];

  const artists = record.artistName
    ? record.artistName
        .split(",")
        .map((n) => n.trim())
        .filter(Boolean)
    : [];

  return (
    <div className="mb-2 truncate">
      <h3 className={`${s.title} text-white font-bold ${s.titleClamp}`}>
        {record.title}
      </h3>

      {record.showName?.trim() && (
        <p className={`${s.body} text-white font-medium truncate`}>
          {record.showName}
        </p>
      )}

      {artists.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-1">
          {artists.map((name, i) => (
            <span
              key={`${i}-${name}`}
              className="px-2 py-0.5 rounded-full bg-white/20 text-white text-xs font-medium backdrop-blur-sm"
            >
              {name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

import { CARD_UI_SIZE, UI_SIZE } from "@/shared/tokens";
import { JSX } from "react";

type Props = {
  title: string;
  showName?: string | null;
  artistName?: string | null;
  size?: CARD_UI_SIZE;
};

export default function RecordPosterCardContent({
  title,
  showName,
  artistName,
  size = "lg",
}: Props): JSX.Element {
  const s = UI_SIZE[size];

  const artists = artistName
    ? artistName
        .split(",")
        .map((n) => n.trim())
        .filter(Boolean)
    : [];

  return (
    <div className="mb-2 truncate">
      <h3 className={`${s.title} font-bold ${s.titleClamp}`}>{title}</h3>

      {showName?.trim() && (
        <p className={`${s.body} text-white font-medium truncate`}>{showName}</p>
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

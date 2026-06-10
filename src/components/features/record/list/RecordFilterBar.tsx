import { Clock, Flame, Globe, Users } from "lucide-react";
import { JSX } from "react";
import { cn } from "@/shared/utils";

export type SortMode = "recent" | "best";
export type FeedMode = "all" | "following";

type Props = {
  sortMode: SortMode;
  feedMode: FeedMode;
  onSortChange: (mode: SortMode) => void;
  onFeedChange: (mode: FeedMode) => void;
};

const FEED_OPTIONS: { mode: FeedMode; label: string; icon: JSX.Element }[] = [
  { mode: "all", label: "전체", icon: <Globe className="w-3.5 h-3.5" /> },
  {
    mode: "following",
    label: "팔로잉",
    icon: <Users className="w-3.5 h-3.5" />,
  },
];

function SortCycleButton({
  value,
  onChange,
}: {
  value: SortMode;
  onChange: (mode: SortMode) => void;
}) {
  const next = value === "recent" ? "best" : "recent";
  return (
    <button
      type="button"
      onClick={() => onChange(next)}
      className="flex items-center gap-1.5 px-3 py-1.5 border-[1.5px] cursor-pointer border-foreground rounded-full text-xs font-black tracking-widest transition-colors bg-background text-foreground"
    >
      {value === "recent" ? (
        <Clock className="w-3.5 h-3.5" />
      ) : (
        <Flame className="w-3.5 h-3.5" />
      )}
      {value === "recent" ? "최신순" : "인기순"}
      <span className="text-muted-foreground">↕</span>
    </button>
  );
}

function ToggleGroup<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { mode: T; label: string; icon: JSX.Element }[];
  value: T;
  onChange: (mode: T) => void;
}) {
  return (
    <div className="flex items-center p-1 border-[1.5px] border-foreground rounded-full">
      {options.map(({ mode, label, icon }) => (
        <button
          key={mode}
          type="button"
          onClick={() => onChange(mode)}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-full border-[1.5px] text-xs font-black tracking-widest cursor-pointer uppercase transition-colors",
            value === mode
              ? "bg-accent text-foreground border-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground",
          )}
        >
          {icon}
          {label}
        </button>
      ))}
    </div>
  );
}

export default function RecordFilterBar({
  sortMode,
  feedMode,
  onSortChange,
  onFeedChange,
}: Props) {
  return (
    <div className="flex items-center justify-between">
      <ToggleGroup
        options={FEED_OPTIONS}
        value={feedMode}
        onChange={onFeedChange}
      />
      <SortCycleButton value={sortMode} onChange={onSortChange} />
    </div>
  );
}

import { Clock, Flame, Globe, Users } from "lucide-react";
import ToggleGroup, { ToggleOption } from "@/components/ui/button/ToggleGroup";
import CycleButton from "@/components/ui/button/CycleButton";
import { FeedMode } from "../types";
import { IBoardSortType } from "@/api/graphql/generated/types.new";

type RecordFilterBarProps = {
  sortMode: IBoardSortType;
  feedMode: FeedMode;
  onSortChange: (mode: IBoardSortType) => void;
  onFeedChange: (mode: FeedMode) => void;
};

const FEED_OPTIONS: ToggleOption<FeedMode>[] = [
  { value: "all", label: "전체", icon: <Globe className="w-3.5 h-3.5" /> },
  {
    value: "following",
    label: "팔로잉",
    icon: <Users className="w-3.5 h-3.5" />,
  },
];

const SORT_OPTIONS: ToggleOption<IBoardSortType>[] = [
  {
    value: IBoardSortType.Latest,
    label: "최신순",
    icon: <Clock className="w-3.5 h-3.5" />,
  },
  {
    value: IBoardSortType.Popular,
    label: "인기순",
    icon: <Flame className="w-3.5 h-3.5" />,
  },
];

export default function RecordFilterBar({
  sortMode,
  feedMode,
  onSortChange,
  onFeedChange,
}: RecordFilterBarProps) {
  return (
    <div className="flex items-center justify-between">
      <ToggleGroup
        options={FEED_OPTIONS}
        value={feedMode}
        onChange={onFeedChange}
      />
      <CycleButton
        options={SORT_OPTIONS}
        value={sortMode}
        onChange={onSortChange}
      />
    </div>
  );
}

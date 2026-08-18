import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { Clock, Flame, Globe, Users } from "lucide-react";
import ToggleGroup, { type ToggleOption } from "./ToggleGroup";

// ── Fixtures ──────────────────────────────────────────────────────────────

type FeedMode = "all" | "following";
type SortMode = "recent" | "best";

const FEED_OPTIONS: ToggleOption<FeedMode>[] = [
  { value: "all", label: "전체", icon: <Globe className="w-3.5 h-3.5" /> },
  {
    value: "following",
    label: "팔로잉",
    icon: <Users className="w-3.5 h-3.5" />,
  },
];

const SORT_OPTIONS: ToggleOption<SortMode>[] = [
  { value: "recent", label: "최신순", icon: <Clock className="w-3.5 h-3.5" /> },
  { value: "best", label: "인기순", icon: <Flame className="w-3.5 h-3.5" /> },
];

// ── Meta ──────────────────────────────────────────────────────────────────

const meta = {
  title: "ui/Button/ToggleGroup",
  component: ToggleGroup,
  parameters: {
    layout: "centered",
  },
  args: {
    options: FEED_OPTIONS,
    value: "all" as string,
    onChange: () => {},
  },
} satisfies Meta<typeof ToggleGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

// ── Stories ───────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<FeedMode>("all");
    return (
      <ToggleGroup options={FEED_OPTIONS} value={value} onChange={setValue} />
    );
  },
};

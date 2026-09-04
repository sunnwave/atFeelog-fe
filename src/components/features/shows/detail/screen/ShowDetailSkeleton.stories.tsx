import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ShowDetailSkeleton from "./ShowDetailSkeleton";

const meta: Meta<typeof ShowDetailSkeleton> = {
  title: "features/shows/detail/ShowDetailSkeleton",
  component: ShowDetailSkeleton,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof ShowDetailSkeleton>;

export const Default: Story = {
  name: "로딩 스켈레톤",
};

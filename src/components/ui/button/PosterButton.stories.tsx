import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArrowRight } from "lucide-react";
import { PosterButton } from "./PosterButton";

const meta = {
  title: "ui/Button/PosterButton",
  component: PosterButton,
  parameters: { layout: "centered" },
  argTypes: {
    tone: {
      control: "select",
      options: ["primary", "accent", "neutral", "destructive"],
    },
    shape: { control: "select", options: ["square", "pill"] },
    asChild: { control: false },
    leadingIcon: { control: false },
    trailingIcon: { control: false },
  },
  args: {
    children: "Start Record",
    tone: "primary",
    shape: "square",
  },
} satisfies Meta<typeof PosterButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Tones: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-5 bg-background p-8">
      <PosterButton>Start Record</PosterButton>
      <PosterButton tone="accent">Explore Feed</PosterButton>
      <PosterButton tone="neutral">View Archive</PosterButton>
      <PosterButton tone="destructive">Delete Record</PosterButton>
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    children: "Explore Feed",
    trailingIcon: <ArrowRight />,
  },
};

export const States: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-5 bg-background p-8">
      <PosterButton>Default</PosterButton>
      <PosterButton disabled>Disabled</PosterButton>
      <PosterButton loading loadingLabel="Loading">
        Start Record
      </PosterButton>
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";
import ImageCarousel from "./ImageCarousel";

const meta: Meta<typeof ImageCarousel> = {
  title: "commons/ImageCarousel",
  component: ImageCarousel,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen w-full bg-background p-8 flex items-start justify-center">
        <div className="w-[340px] md:w-[420px]">
          <Story />
        </div>
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof ImageCarousel>;

const IMAGES_3 = [
  "https://picsum.photos/id/64/600/800",
  "https://picsum.photos/id/65/600/800",
  "https://picsum.photos/id/66/600/800",
];

const IMAGES_1 = ["https://picsum.photos/id/67/600/800"];

export const Default: Story = {
  args: {
    images: IMAGES_3,
  },
};

export const SingleImage: Story = {
  args: {
    images: IMAGES_1,
  },
};

export const ManyImages: Story = {
  args: {
    images: [
      "https://picsum.photos/id/10/600/800",
      "https://picsum.photos/id/11/600/800",
      "https://picsum.photos/id/12/600/800",
      "https://picsum.photos/id/13/600/800",
      "https://picsum.photos/id/14/600/800",
    ],
  },
};

// src/components/commons/imageUploader/ImageUploader.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { ImageUploader } from "./ImageUploader";

const meta: Meta<typeof ImageUploader> = {
  title: "commons/ImageUploader",
  component: ImageUploader,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    label: { control: "text" },
    maxImages: { control: { type: "number", min: 1, max: 10, step: 1 } },
    value: { control: false },
    onImagesChange: { action: "onImagesChange" },
  },
  decorators: [
    (Story) => (
      <div className="min-h-[520px] bg-background p-8">
        <div className="mx-auto w-full max-w-[520px] rounded-2xl border border-border bg-card p-6">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ImageUploader>;

export const Default: Story = {
  args: {
    label: "사진 추가",
    maxImages: 5,
  },
  render: (args) => {
    const [files, setFiles] = useState<File[]>([]);

    const onImagesChange = (next: File[]) => {
      setFiles(next);
      args.onImagesChange?.(next);
    };

    return (
      <ImageUploader {...args} value={files} onImagesChange={onImagesChange} />
    );
  },
};

export const Max3: Story = {
  args: {
    label: "최대 3장",
    maxImages: 3,
  },
  render: (args) => {
    const [files, setFiles] = useState<File[]>([]);

    const onImagesChange = (next: File[]) => {
      setFiles(next);
      args.onImagesChange?.(next);
    };

    return (
      <ImageUploader {...args} value={files} onImagesChange={onImagesChange} />
    );
  },
};

export const WithInitialOne: Story = {
  args: {
    label: "초기 1장(가짜 파일)",
    maxImages: 5,
  },
  render: (args) => {
    const [files, setFiles] = useState<File[]>(() => {
      const blob = new Blob(["fake"], { type: "image/png" });
      return [new File([blob], "sample.png", { type: "image/png" })];
    });

    const onImagesChange = (next: File[]) => {
      setFiles(next);
      args.onImagesChange?.(next);
    };

    return (
      <div className="space-y-3">
        <ImageUploader
          {...args}
          value={files}
          onImagesChange={onImagesChange}
        />
        <p className="text-xs text-muted-foreground">
          * 실제 미리보기 이미지는 사용자가 파일을 선택해야 자연스럽게 보입니다.
        </p>
      </div>
    );
  },
};

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

import RecordEditorForm from "./RecordEditorForm";
import {
  RECORD_WRITE_DEFAULTS,
  type RecordEditFormValues,
} from "../../../model";
import type { KakaoPlace } from "@/shared/types/kakao";

import {
  installKakaoPlacesFetchMock,
  type MockMode,
} from "@/storybook/mocks/kakaoPlaceMock";

type StoryArgs = React.ComponentProps<typeof RecordEditorForm> & {
  mockMode: MockMode;
  defaultValues?: Partial<RecordEditFormValues>;
};

const meta: Meta<StoryArgs> = {
  title: "features/record/editor/RecordEditorForm",
  component: RecordEditorForm,
  parameters: { layout: "fullscreen" },
  argTypes: {
    formId: { control: "text" },

    form: { control: false },
    onPickPlace: { control: false },
    onImagesChange: { control: false },
    onSubmit: { control: false },

    mockMode: {
      control: "inline-radio",
      options: ["success", "empty", "error", "slow"] as const,
    },
    defaultValues: { control: false },
  },
  args: {
    formId: "record-write-form",
    mockMode: "success",
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-background p-8">
        <div className="mx-auto w-full max-w-[760px] rounded-2xl border border-border bg-card p-6">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<StoryArgs>;

function Demo(args: StoryArgs) {
  const defaultValues = useMemo<RecordEditFormValues>(() => {
    return {
      ...RECORD_WRITE_DEFAULTS,
      ...(args.defaultValues ?? {}),
    };
  }, [args.defaultValues]);

  const form = useForm<RecordEditFormValues>({
    mode: "onChange",
    defaultValues,
  });

  useEffect(() => {
    const uninstall = installKakaoPlacesFetchMock(args.mockMode);
    return uninstall;
  }, [args.mockMode]);

  const onPickPlace = (p: KakaoPlace) => {
    form.setValue("placeName", p.place_name, { shouldDirty: true });
    form.setValue("roadAddress", p.road_address_name ?? "", {
      shouldDirty: true,
    });
    form.setValue("jibunAddress", p.address_name ?? "", { shouldDirty: true });
    form.setValue("x", p.x ?? "", { shouldDirty: false });
    form.setValue("y", p.y ?? "", { shouldDirty: false });
  };

  const onImagesChange = (next: File[]) => {
    form.setValue("imageFiles", next, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const onSubmit = form.handleSubmit(async (values) => {
    console.log(values);
  });

  return (
    <RecordEditorForm
      formId={args.formId}
      form={form}
      onPickPlace={onPickPlace}
      onImagesChange={onImagesChange}
      onSubmit={onSubmit}
    />
  );
}

export const Default: Story = {
  render: (args) => <Demo {...args} />,
};

export const Prefilled: Story = {
  args: {
    mockMode: "success",
    defaultValues: {
      showName: "서울재즈페스티벌 2026",
      artistName: "아이유",
      showDate: "2026-05-10",
      placeName: "올림픽공원 체조경기장",
      roadAddress: "서울 송파구 올림픽로 424",
      jibunAddress: "서울 송파구 올림픽로 424",
      x: "127.1214",
      y: "37.5201",
      contents: "<p>너무 좋았어요… 앵콜 때 소름!</p>",
    },
  },
  render: (args) => <Demo {...args} />,
};

export const PlaceSearchEmpty: Story = {
  args: { mockMode: "empty" },
  render: (args) => <Demo {...args} />,
};

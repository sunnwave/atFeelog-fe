import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";

import RecordEditorForm from "./RecordEditorForm";
import {
  RECORD_WRITE_DEFAULTS,
  type RecordEditFormValues,
} from "../../../model";
import type { KakaoPlace } from "@/shared/types/kakao";
import type {
  Performance,
  PerformanceDetail,
} from "@/shared/types/performance";

type StoryArgs = React.ComponentProps<typeof RecordEditorForm> & {
  defaultValues?: Partial<RecordEditFormValues>;
};

const meta: Meta<StoryArgs> = {
  title: "features/record-write/RecordEditorForm",
  component: RecordEditorForm,
  parameters: { layout: "fullscreen" },
  argTypes: {
    formId: { control: "text" },
    form: { control: false },
    onPickPlace: { control: false },
    onImagesChange: { control: false },
    onSubmit: { control: false },
    defaultValues: { control: false },
  },
  args: {
    formId: "record-write-form",
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-background p-8">
        <div className="mx-auto w-full max-w-190 rounded-2xl border border-border bg-card p-6">
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

  const onPickPerformance = async (p: Performance) => {
    // 1) 즉시 채울 수 있는 필드
    form.setValue("showName", p.title, {
      shouldValidate: true,
      shouldDirty: true,
    });
    form.setValue("mt20id", p.mt20id, { shouldDirty: true });
    form.setValue("genre", p.genre, { shouldDirty: true });
    form.setValue("posterUrl", p.posterUrl, { shouldDirty: true });
    form.setValue("placeName", p.venueName, {
      shouldValidate: true,
      shouldDirty: true,
    });
    form.setValue("showDate", p.startDate.replace(/\./g, "-"), {
      shouldValidate: true,
      shouldDirty: true,
    });

    // 2) 공연장 이름으로 카카오 장소 검색 → 좌표·주소 자동 채움 (MSW 인터셉트)
    try {
      const kakaoRes = await fetch(
        `/api/kakao/places?q=${encodeURIComponent(p.venueName)}&size=1`,
      );
      if (kakaoRes.ok) {
        const kakaoData = await kakaoRes.json();
        const first = kakaoData?.documents?.[0];
        if (first) {
          form.setValue("roadAddress", first.road_address_name ?? "", {
            shouldDirty: true,
          });
          form.setValue("jibunAddress", first.address_name ?? "", {
            shouldDirty: true,
          });
          form.setValue("x", first.x ?? undefined, { shouldDirty: true });
          form.setValue("y", first.y ?? undefined, { shouldDirty: true });
        }
      }
    } catch {}

    // 3) 아티스트명 — kopis 상세 API (MSW 인터셉트)
    try {
      const res = await fetch(
        `/api/kopis/performances/${encodeURIComponent(p.mt20id)}`,
      );
      if (res.ok) {
        const detail = (await res.json()) as PerformanceDetail;
        if (detail.cast) {
          form.setValue("artistName", detail.cast, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }
      }
    } catch {}
  };

  const onSubmit = form.handleSubmit(async (values) => {
    console.log(values);
  });

  return (
    <RecordEditorForm
      formId={args.formId}
      form={form}
      onPickPlace={onPickPlace}
      onPickPerformance={onPickPerformance}
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

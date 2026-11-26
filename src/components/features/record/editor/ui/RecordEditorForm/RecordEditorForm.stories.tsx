import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { ComponentProps } from "react";
import { action } from "storybook/actions";
import { useRecordEditorForm } from "../../hooks/useRecordEditorForm";
import type { RecordEditFormValues } from "../../../model";
import RecordEditorForm from "./RecordEditorForm";
import RecordEditorFormSkeleton from "./RecordEditorFormSkeleton";

type StoryArgs = ComponentProps<typeof RecordEditorForm> & {
  defaultValues?: Partial<RecordEditFormValues>;
};

const meta: Meta<StoryArgs> = {
  title: "features/record-editor/RecordEditorForm",
  component: RecordEditorForm,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: [
          "공연 기록 작성과 수정에 공통으로 사용하는 폼입니다. 제목, 공연 정보, 사진, 후기 입력을 제공합니다.",
          "`useRecordEditorForm`에서 만든 React Hook Form 인스턴스와 각 입력의 처리 함수를 전달합니다. 저장 버튼을 폼 밖에 배치할 때는 버튼의 `form` 속성에 폼의 `formId`를 지정합니다.",
          "스토리에서도 실제 폼 훅을 사용합니다. 검증을 통과한 제출은 Storybook의 Actions 패널에 기록됩니다.",
        ].join("\n\n"),
      },
    },
  },
  argTypes: {
    formId: {
      control: "text",
      description: "폼의 HTML id입니다. 외부 제출 버튼을 이 폼에 연결할 때 사용합니다.",
      table: { defaultValue: { summary: "record-write-form" } },
    },
    form: {
      control: false,
      description: "입력값과 검증 오류를 관리하는 React Hook Form 인스턴스입니다.",
    },
    onPickPlace: {
      control: false,
      description: "장소 검색에서 선택을 확정하면 호출됩니다. 장소명, 주소, 좌표를 채우는 데 사용합니다.",
    },
    onPickPerformance: {
      control: false,
      description: "공연 검색에서 선택을 확정하면 호출됩니다. 선택한 공연의 정보를 폼에 채우는 데 사용합니다.",
    },
    onImagesChange: {
      control: false,
      description: "사진 추가·삭제 후 현재 사진 파일 목록을 전달합니다.",
    },
    onSubmit: {
      control: false,
      description: "폼의 제출 이벤트를 처리합니다. 훅에서 제공하는 함수는 검증을 통과한 값만 제출 콜백에 전달합니다.",
    },
    defaultValues: { control: false, table: { disable: true } },
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

const onSubmitValid = action("기록 폼 제출");

function Demo({ formId, defaultValues }: StoryArgs) {
  const editor = useRecordEditorForm(onSubmitValid, defaultValues);

  return <RecordEditorForm formId={formId} {...editor} />;
}

export const Default: Story = {
  parameters: {
    docs: { description: { story: "빈 폼에서 공연·장소 검색, 사진 선택, 후기 입력 흐름을 확인합니다." } },
  },
  render: (args) => <Demo {...args} />,
};

export const Prefilled: Story = {
  parameters: {
    docs: { description: { story: "스토리 전용 `defaultValues`로 기존 기록 값이 채워진 수정 화면의 폼 상태를 재현합니다." } },
  },
  args: {
    defaultValues: {
      title: "서울재즈페스티벌 후기",
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

export const Skeleton: Story = {
  parameters: {
    docs: { description: { story: "수정 화면에서 기록을 불러오는 동안 표시하는 폼 본문의 스켈레톤입니다." } },
  },
  render: () => <RecordEditorFormSkeleton />,
};

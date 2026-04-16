import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React, { useEffect, useState } from "react";
import PlaceSearchModal from "./PlaceSearchModal";
import { Button } from "@/components/ui/button/Button";
import { KakaoPlace } from "@/shared/types/kakao";

// ✅ 스토리 전용 타입 분리
type MockMode = "success" | "error" | "empty" | "slow";

type StoryArgs = React.ComponentProps<typeof PlaceSearchModal> & {
  mockMode: MockMode;
};

const MOCK_PLACES: KakaoPlace[] = [
  {
    id: "1",
    place_name: "올림픽공원 체조경기장",
    address_name: "서울 송파구 올림픽로 424",
    road_address_name: "서울 송파구 올림픽로 424",
    x: "127.1214",
    y: "37.5201",
  },
  {
    id: "2",
    place_name: "블루스퀘어 마스터카드홀",
    address_name: "서울 용산구 이태원로 294",
    road_address_name: "서울 용산구 이태원로 294",
    x: "126.9943",
    y: "37.5395",
  },
  {
    id: "3",
    place_name: "세종문화회관",
    address_name: "서울 종로구 세종대로 175",
    road_address_name: "서울 종로구 세종대로 175",
    x: "126.9769",
    y: "37.5728",
  },
];

function installFetchMock(mode: MockMode) {
  const original = window.fetch.bind(window);

  window.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url =
      typeof input === "string"
        ? input
        : input instanceof URL
        ? input.href
        : (input as Request).url;

    if (url.startsWith("/api/kakao/places")) {
      if (mode === "slow") await new Promise((r) => setTimeout(r, 1200));

      if (mode === "error") {
        return new Response(JSON.stringify({ message: "Mock 검색 실패" }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }
      if (mode === "empty") {
        return new Response(JSON.stringify({ documents: [] }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ documents: MOCK_PLACES }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return original(input, init);
  }) as typeof window.fetch;

  return () => {
    window.fetch = original;
  };
}

// ✅ StoryArgs 타입 사용
const meta: Meta<StoryArgs> = {
  title: "commons/modal/PlaceSearchModal",
  component: PlaceSearchModal,
  parameters: { layout: "fullscreen" },
  argTypes: {
    open: { control: false },
    onOpenChange: { control: false },
    onConfirm: { action: "confirm(place)" },
    className: { control: "text" },
    mockMode: {
      control: "inline-radio",
      options: ["success", "empty", "error", "slow"] satisfies MockMode[],
    },
  },
  args: {
    className: "",
    mockMode: "success",
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-background p-8">
        <div className="mx-auto max-w-3xl space-y-3">
          <div className="h-10 rounded-lg border border-border bg-card" />
          <div className="h-10 rounded-lg border border-border bg-card" />
          <div className="h-10 rounded-lg border border-border bg-card" />
        </div>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<StoryArgs>;

function Demo({ mockMode, ...props }: StoryArgs) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    return installFetchMock(mockMode);
  }, [mockMode]);

  return (
    <>
      <div className="fixed bottom-6 right-6">
        <Button onClick={() => setOpen(true)} size="lg">
          장소 검색 모달 열기
        </Button>
      </div>
      <PlaceSearchModal
        {...props}
        open={open}
        onOpenChange={setOpen}
        onConfirm={(place) => {
          props.onConfirm?.(place);
          setOpen(false);
        }}
      />
    </>
  );
}

export const Playground: Story = {
  render: (args) => <Demo {...args} />,
};

export const EmptyResult: Story = {
  args: { mockMode: "empty" },
  render: (args) => <Demo {...args} />,
};

export const ErrorState: Story = {
  args: { mockMode: "error" },
  render: (args) => <Demo {...args} />,
};

export const SlowNetwork: Story = {
  args: { mockMode: "slow" },
  render: (args) => <Demo {...args} />,
};

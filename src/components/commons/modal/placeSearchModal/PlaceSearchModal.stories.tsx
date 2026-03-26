import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React, { useEffect, useMemo, useState } from "react";
import PlaceSearchModal from "./PlaceSearchModal";
import { Button } from "@/components/ui/button/Button";

type KakaoPlace = {
  id: string;
  place_name: string;
  address_name: string;
  road_address_name: string;
  x: string;
  y: string;
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

function installFetchMock({
  mode,
}: {
  mode: "success" | "error" | "empty" | "slow";
}) {
  const original = window.fetch.bind(window);

  window.fetch = (async (input: any, init?: any) => {
    const url = typeof input === "string" ? input : input?.url ?? "";

    if (url.startsWith("/api/kakao/places")) {
      if (mode === "slow") {
        await new Promise((r) => setTimeout(r, 1200));
      }
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
      // success
      return new Response(JSON.stringify({ documents: MOCK_PLACES }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return original(input, init);
  }) as any;

  return () => {
    window.fetch = original;
  };
}

const meta: Meta<typeof PlaceSearchModal> = {
  title: "commons/modal/PlaceSearchModal",
  component: PlaceSearchModal,
  parameters: { layout: "fullscreen" },
  argTypes: {
    open: { control: false },
    onOpenChange: { control: false },
    onConfirm: { action: "confirm(place)" },
    closeOnOverlayClick: { control: "boolean" },
    className: { control: "text" },
    // story 전용
    __mockMode: {
      name: "mockMode",
      control: "inline-radio",
      options: ["success", "empty", "error", "slow"],
    },
  } as any,
  args: {
    closeOnOverlayClick: true,
    className: "",
    __mockMode: "success",
  } as any,
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

type Story = StoryObj<typeof PlaceSearchModal>;

function Demo(props: any) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const uninstall = installFetchMock({ mode: props.__mockMode });
    return uninstall;
  }, [props.__mockMode]);

  return (
    <>
      <div className="fixed bottom-6 right-6">
        <Button onClick={() => setOpen(true)} size="lg">
          장소 검색 모달 열기
        </Button>
      </div>

      <PlaceSearchModal
        open={open}
        onOpenChange={setOpen}
        closeOnOverlayClick={props.closeOnOverlayClick}
        className={props.className}
        onConfirm={(place) => {
          props.onConfirm?.(place);
        }}
      />
    </>
  );
}

export const Playground: Story = {
  render: (args) => <Demo {...args} />,
};

export const OverlayLocked: Story = {
  args: { closeOnOverlayClick: false, __mockMode: "success" } as any,
  render: (args) => <Demo {...args} />,
};

export const EmptyResult: Story = {
  args: { __mockMode: "empty" } as any,
  render: (args) => <Demo {...args} />,
};

export const ErrorState: Story = {
  args: { __mockMode: "error" } as any,
  render: (args) => <Demo {...args} />,
};

export const SlowNetwork: Story = {
  args: { __mockMode: "slow" } as any,
  render: (args) => <Demo {...args} />,
};

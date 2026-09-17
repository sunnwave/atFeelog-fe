import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React, { useState } from "react";
import PlaceSearchModal from "./PlaceSearchModal";
import { Button } from "@/components/ui/button/Button";
import { KakaoPlace } from "@/shared/types/kakao";
import {
  kakaoEmptyHandler,
  kakaoErrorHandler,
  kakaoInfiniteHandler,
  kakaoSlowHandler,
} from "@/mocks/handlers/kakao";

const meta: Meta<typeof PlaceSearchModal> = {
  title: "commons/modal/PlaceSearchModal",
  component: PlaceSearchModal,
  parameters: { layout: "fullscreen" },
  argTypes: {
    open: { control: false },
    onOpenChange: { control: false },
    onConfirm: { action: "confirm(place)" },
    className: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof PlaceSearchModal>;

function Demo(props: React.ComponentProps<typeof PlaceSearchModal>) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<KakaoPlace | null>(null);

  return (
    <>
      <Button onClick={() => setOpen(true)} size="lg">
        장소 검색 모달 열기
      </Button>
      <PlaceSearchModal
        {...props}
        open={open}
        onOpenChange={setOpen}
        onConfirm={(place) => {
          props.onConfirm?.(place);
          setSelected(place);
          console.log(selected);
          setOpen(false);
        }}
      />
    </>
  );
}

export const Default: Story = {
  render: (args) => <Demo {...args} />,
};

export const EmptyResult: Story = {
  parameters: {
    msw: { handlers: [kakaoEmptyHandler] },
  },
  render: (args) => <Demo {...args} />,
};

export const ErrorState: Story = {
  parameters: {
    msw: { handlers: [kakaoErrorHandler] },
  },
  render: (args) => <Demo {...args} />,
};

export const SlowNetwork: Story = {
  parameters: {
    msw: { handlers: [kakaoSlowHandler] },
  },
  render: (args) => <Demo {...args} />,
};

export const InfiniteScroll: Story = {
  parameters: {
    msw: { handlers: [kakaoInfiniteHandler] },
  },
  render: (args) => <Demo {...args} />,
};

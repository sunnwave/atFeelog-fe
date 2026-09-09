import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React, { useState } from "react";
import PerformanceSearchModal from "./PerformanceSearchModal";
import { Button } from "@/components/ui/button/Button";
import {
  kopisEmptyHandler,
  kopisErrorHandler,
  kopisInfiniteHandler,
  kopisSlowHandler,
} from "@/mocks/handlers/kopis";
import type { Performance } from "@/shared/types/performance";

const meta: Meta<typeof PerformanceSearchModal> = {
  title: "commons/modal/PerformanceSearchModal",
  component: PerformanceSearchModal,
  parameters: { layout: "fullscreen" },
  argTypes: {
    open: { control: false },
    onOpenChange: { control: false },
    onConfirm: { action: "confirm(performance)" },
    className: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof PerformanceSearchModal>;

function Demo(props: React.ComponentProps<typeof PerformanceSearchModal>) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Performance | null>(null);

  return (
    <>
      <Button onClick={() => setOpen(true)} size="lg">
        공연 검색 모달 열기
      </Button>

      <PerformanceSearchModal
        {...props}
        open={open}
        onOpenChange={setOpen}
        onConfirm={(performance) => {
          props.onConfirm?.(performance);
          setSelected(performance);
          console.log(selected);
          setOpen(false);
        }}
      />
    </>
  );
}

export const Default: Story = {
  name: "Success",
  render: (args) => <Demo {...args} />,
};

export const EmptyResult: Story = {
  parameters: {
    msw: { handlers: [kopisEmptyHandler] },
  },
  render: (args) => <Demo {...args} />,
};

export const ErrorState: Story = {
  parameters: {
    msw: { handlers: [kopisErrorHandler] },
  },
  render: (args) => <Demo {...args} />,
};

export const SlowNetwork: Story = {
  parameters: {
    msw: { handlers: [kopisSlowHandler] },
  },
  render: (args) => <Demo {...args} />,
};

export const InfiniteScroll: Story = {
  name: "무한스크롤",
  parameters: {
    msw: { handlers: [kopisInfiniteHandler] },
  },
  render: (args) => <Demo {...args} />,
};

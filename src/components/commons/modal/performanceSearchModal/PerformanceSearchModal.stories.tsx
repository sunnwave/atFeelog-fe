import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React, { useEffect, useState } from "react";
import PerformanceSearchModal from "./PerformanceSearchModal";
import { Button } from "@/components/ui/button/Button";
import {
  installKopisPerformanceFetchMock,
  MockMode,
} from "@/storybook/mocks/kopisPerformanceMock";
import type { Performance } from "@/shared/types/performance";

type StoryArgs = React.ComponentProps<typeof PerformanceSearchModal> & {
  mockMode: MockMode;
};

const meta: Meta<StoryArgs> = {
  title: "commons/modal/PerformanceSearchModal",
  component: PerformanceSearchModal,
  parameters: { layout: "fullscreen" },
  argTypes: {
    open: { control: false },
    onOpenChange: { control: false },
    onConfirm: { action: "confirm(performance)" },
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
  const [selected, setSelected] = useState<Performance | null>(null);

  useEffect(() => {
    return installKopisPerformanceFetchMock(mockMode);
  }, [mockMode]);

  return (
    <>
      <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3">
        {selected && (
          <div className="rounded-2xl border border-border bg-card px-4 py-3 text-sm shadow-md">
            <p className="font-bold text-foreground">{selected.title}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {selected.venueName}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {selected.startDate} ~ {selected.endDate}
            </p>
          </div>
        )}
        <Button onClick={() => setOpen(true)} size="lg">
          공연 검색 모달 열기
        </Button>
      </div>

      <PerformanceSearchModal
        {...props}
        open={open}
        onOpenChange={setOpen}
        onConfirm={(performance) => {
          props.onConfirm?.(performance);
          setSelected(performance);
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
  name: "Empty Result",
  args: { mockMode: "empty" },
  render: (args) => <Demo {...args} />,
};

export const ErrorState: Story = {
  name: "Error State",
  args: { mockMode: "error" },
  render: (args) => <Demo {...args} />,
};

export const SlowNetwork: Story = {
  name: "Slow Network",
  args: { mockMode: "slow" },
  render: (args) => <Demo {...args} />,
};

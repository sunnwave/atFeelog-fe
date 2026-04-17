import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React, { useEffect, useState } from "react";
import PlaceSearchModal from "./PlaceSearchModal";
import { Button } from "@/components/ui/button/Button";
import {
  installKakaoPlacesFetchMock,
  MockMode,
} from "@/storybook/mocks/kakaoPlaceMock";

type StoryArgs = React.ComponentProps<typeof PlaceSearchModal> & {
  mockMode: MockMode;
};

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
    return installKakaoPlacesFetchMock(mockMode);
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

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Alert, AlertTitle, AlertDescription, AlertIcon } from "./Alert";

const meta: Meta<typeof Alert> = {
  title: "commons/ui/Alert",
  component: Alert,
  parameters: { layout: "padded" },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["default", "success", "destructive"],
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-background p-8">
        <div className="mx-auto w-full max-w-180 space-y-6">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: { variant: "default" },
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>안내</AlertTitle>
      <AlertDescription>
        <p>기본 알림 메시지입니다.</p>
      </AlertDescription>
    </Alert>
  ),
};

export const DefaultWithIcon: Story = {
  args: { variant: "default" },
  render: (args) => (
    <Alert {...args}>
      <AlertIcon variant="default" />
      <AlertTitle>안내</AlertTitle>
      <AlertDescription>
        <p>아이콘이 포함된 기본 알림입니다.</p>
      </AlertDescription>
    </Alert>
  ),
};

export const Success: Story = {
  args: { variant: "success" },
  render: (args) => (
    <Alert {...args}>
      <AlertIcon variant="success" />
      <AlertTitle>완료</AlertTitle>
      <AlertDescription>
        <p>정상적으로 처리되었습니다.</p>
      </AlertDescription>
    </Alert>
  ),
};

export const Destructive: Story = {
  args: { variant: "destructive" },
  render: (args) => (
    <Alert {...args}>
      <AlertIcon variant="destructive" />
      <AlertTitle>오류</AlertTitle>
      <AlertDescription>
        <p>문제가 발생했습니다. 다시 시도해주세요.</p>
      </AlertDescription>
    </Alert>
  ),
};

export const LongDescription: Story = {
  args: { variant: "default" },
  render: (args) => (
    <Alert {...args}>
      <AlertIcon variant="default" />
      <AlertTitle>긴 설명</AlertTitle>
      <AlertDescription>
        <p>
          아주 긴 설명 텍스트가 들어갔을 때 줄바꿈과 레이아웃이 어떻게 보이는지
          확인합니다. 내용이 길어지면 여러 줄로 내려가며, 아이콘이 있을 경우
          아이콘 옆(2열)로 정렬됩니다.
        </p>
      </AlertDescription>
    </Alert>
  ),
};

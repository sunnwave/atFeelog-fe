import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AlertCircle, FileX, WifiOff, Lock } from "lucide-react";
import PageFallback from "./PageFallback";

const meta: Meta<typeof PageFallback> = {
  title: "ui/feedback/PageFallback",
  component: PageFallback,
  parameters: { layout: "fullscreen" },
  argTypes: {
    label: { control: "text" },
    message: { control: "text" },
    fallbackHref: { control: "text" },
  },
  args: {
    label: "Record",
    fallbackHref: "/feelog",
    message: "기록을 불러오지 못했어요",
  },
};

export default meta;
type Story = StoryObj<typeof PageFallback>;

/** 기본 — AlertCircle 아이콘 */
export const Default: Story = {
  name: "기본 (에러)",
};

/** 잘못된 접근 */
export const InvalidAccess: Story = {
  name: "잘못된 접근",
  args: {
    message: "잘못된 접근이에요",
  },
};

/** 데이터 없음 */
export const NotFound: Story = {
  name: "데이터 없음",
  args: {
    message: "기록을 찾을 수 없어요",
    icon: FileX,
  },
};

/** 네트워크 에러 */
export const NetworkError: Story = {
  name: "네트워크 에러",
  args: {
    message: "네트워크 연결을 확인해주세요",
    icon: WifiOff,
  },
};

/** 권한 없음 */
export const Unauthorized: Story = {
  name: "권한 없음",
  args: {
    message: "접근 권한이 없어요",
    icon: Lock,
  },
};

/** 전체 케이스 비교 */
export const AllCases: Story = {
  name: "All Cases 비교",
  render: () => (
    <div className="flex flex-col divide-y divide-border">
      {[
        { message: "기록을 불러오지 못했어요", icon: AlertCircle },
        { message: "기록을 찾을 수 없어요", icon: FileX },
        { message: "네트워크 연결을 확인해주세요", icon: WifiOff },
        { message: "접근 권한이 없어요", icon: Lock },
      ].map(({ message, icon }) => (
        <div key={message} className="border-[1.5px] border-foreground">
          <PageFallback
            label="Record"
            fallbackHref="/feelog"
            message={message}
            icon={icon}
          />
        </div>
      ))}
    </div>
  ),
};

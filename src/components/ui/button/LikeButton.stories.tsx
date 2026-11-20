import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CARD_CQ_WIDTHS } from "@/storybook/constants";
import LikeButton from "./LikeButton";

const CQWrapper = ({
  children,
  width = 280,
}: {
  children: React.ReactNode;
  width?: number;
}) => (
  <div className="@container" style={{ width }}>
    {children}
  </div>
);

const meta: Meta<typeof LikeButton> = {
  title: "ui/Button/LikeButton",
  component: LikeButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    controls: { expanded: true },
    docs: {
      description: {
        component:
          "좋아요 토글 버튼입니다. isLiked · likeCount를 외부에서 제어하고 onToggle로 상태 변경을 전달받습니다. 카운트는 Optimistic update로 즉시 반영되며, 카드 클릭 이벤트와 충돌을 막기 위해 e.stopPropagation()이 내부 처리됩니다. 아이콘 크기는 @container 쿼리로 카드 너비에 따라 자동 조정됩니다.",
      },
    },
  },
  argTypes: {
    isLiked: {
      description:
        "좋아요 상태입니다. 외부에서 초기값을 제어하며, prop이 변경되면 내부 상태도 동기화됩니다.",
      control: "boolean",
      table: {
        category: "Props",
        defaultValue: { summary: "false" },
      },
    },
    likeCount: {
      description: "좋아요 수입니다. undefined이면 숫자를 표시하지 않습니다.",
      control: "number",
      table: {
        category: "Props",
        type: { summary: "number" },
      },
    },
    onToggle: {
      description: "토글 시 다음 상태값(boolean)을 전달하는 콜백입니다.",
      control: false,
      table: {
        category: "Props",
        type: { summary: "(nextLiked: boolean) => void" },
      },
    },
    className: {
      description: "추가 스타일입니다.",
      control: "text",
      table: {
        category: "Props",
      },
    },
  },
  args: {
    isLiked: false,
    likeCount: 12,
  },
};

export default meta;
type Story = StoryObj<typeof LikeButton>;

export const DocsPreview: Story = {
  tags: ["!dev"],
  decorators: [
    (Story) => (
      <CQWrapper>
        <Story />
      </CQWrapper>
    ),
  ],
};

// ── States ────────────────────────────────────────────────────────────────
export const States: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 bg-background p-8">
      <div className="flex flex-col items-start gap-2">
        <span className="text-[10px] font-bold text-muted-foreground uppercase">
          기본
        </span>
        <CQWrapper>
          <LikeButton isLiked={false} />
        </CQWrapper>
      </div>
      <div className="flex flex-col items-start gap-2">
        <span className="text-[10px] font-bold text-muted-foreground uppercase">
          좋아요
        </span>
        <CQWrapper>
          <LikeButton isLiked={true} />
        </CQWrapper>
      </div>
      <div className="flex flex-col items-start gap-2">
        <span className="text-[10px] font-bold text-muted-foreground uppercase">
          카운트
        </span>
        <CQWrapper>
          <LikeButton isLiked={false} likeCount={12} />
        </CQWrapper>
      </div>
      <div className="flex flex-col items-start gap-2">
        <span className="text-[10px] font-bold text-muted-foreground uppercase">
          좋아요 + 카운트
        </span>
        <CQWrapper>
          <LikeButton isLiked={true} likeCount={12} />
        </CQWrapper>
      </div>
    </div>
  ),
};

// ── Sizes (Container Query) ───────────────────────────────────────────────
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 bg-background p-8">
      {CARD_CQ_WIDTHS.map(({ label, desc, width }) => (
        <div key={label} className="flex items-center gap-4">
          <span className="w-28 shrink-0 text-xs text-muted-foreground">
            {desc} ({label})
          </span>
          <div className="@container flex items-center gap-4" style={{ width }}>
            <LikeButton isLiked={false} likeCount={12} />
            <LikeButton isLiked={true} likeCount={12} />
          </div>
        </div>
      ))}
    </div>
  ),
};

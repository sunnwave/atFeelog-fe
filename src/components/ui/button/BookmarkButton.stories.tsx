import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CARD_CQ_WIDTHS } from "@/storybook/constants";
import BookmarkButton from "./BookmarkButton";

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

const meta: Meta<typeof BookmarkButton> = {
  title: "ui/Button/BookmarkButton",
  component: BookmarkButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    controls: { expanded: true },
    docs: {
      description: {
        component:
          "찜 토글 버튼입니다. isSaved prop으로 초기 상태를 제어하고 onToggle로 상태 변경을 전달받습니다. 아이콘 크기는 @container 쿼리로 카드 너비에 따라 자동 조정됩니다. 카드 클릭 이벤트와 충돌을 막기 위해 e.stopPropagation()이 내부 처리됩니다.",
      },
    },
  },
  argTypes: {
    isSaved: {
      description:
        "찜 상태입니다. 외부에서 초기값을 제어하며, prop이 변경되면 내부 상태도 동기화됩니다.",
      control: "boolean",
      table: {
        category: "Props",
        defaultValue: { summary: "false" },
      },
    },
    onToggle: {
      description: "토글 시 다음 상태값(boolean)을 전달하는 콜백입니다.",
      control: false,
      table: {
        category: "Props",
        type: { summary: "(nextSaved: boolean) => void" },
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
    isSaved: false,
  },
};

export default meta;
type Story = StoryObj<typeof BookmarkButton>;

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
            <BookmarkButton isSaved={false} />
            <BookmarkButton isSaved={true} />
          </div>
        </div>
      ))}
    </div>
  ),
};

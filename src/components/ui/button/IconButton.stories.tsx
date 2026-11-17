import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Canvas,
  Controls,
  Description,
  Title,
} from "@storybook/addon-docs/blocks";
import { ArrowLeft, Camera, Eye, Plus, RotateCcw, Send, X } from "lucide-react";
import { IconButton } from "./IconButton";

const variants = ["ghost", "outline", "solid"] as const;
const tones = ["primary", "neutral", "accent"] as const;
const sizes = ["xs", "sm", "md", "lg"] as const;
const shapes = ["square", "pill"] as const;

const meta = {
  title: "ui/Button/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    controls: { expanded: true },
    docs: {
      page: () => (
        <>
          <Title />
          <Description />
          <Canvas of={DocsPreview} />
          <Controls of={DocsPreview} />
        </>
      ),
      description: {
        component:
          "아이콘만 표시하는 버튼입니다. aria-label은 필수입니다. loading과 asChild는 지원하지 않습니다. 크기는 xs부터 lg까지 제공하며 기본값은 sm(28px)입니다. 네이티브 button 속성도 전달할 수 있습니다.",
      },
    },
  },
  argTypes: {
    shape: {
      description: "square 각진 모서리 · pill 둥근 모서리.",
      control: "select",
      table: {
        category: "Props",
        defaultValue: {
          summary: "square",
        },
      },
      options: ["square", "pill"],
    },
    disabled: {
      description: "버튼을 비활성화합니다.",
      control: "boolean",
      table: {
        category: "Props",
        defaultValue: {
          summary: "false",
        },
      },
    },
    onClick: {
      description: "클릭 이벤트 핸들러입니다.",
      control: false,
      table: {
        category: "Props",
        type: {
          summary: "MouseEventHandler<HTMLButtonElement>",
        },
      },
    },
    className: {
      description:
        "추가 스타일입니다. 충돌하는 Tailwind 클래스는 전달한 className이 우선합니다.",
      control: "text",
      table: {
        category: "Props",
      },
    },
    children: {
      description: "아이콘 요소를 전달합니다. SVG 크기는 size가 지정합니다.",
      control: false,
      table: {
        category: "Props",
        type: {
          summary: "ReactNode (필수)",
        },
      },
    },
    "aria-label": {
      description:
        "아이콘의 동작을 설명하는 필수 접근성 이름입니다. 예: 닫기, 비밀번호 보기.",
      control: "text",
      table: {
        category: "Props",
        type: {
          summary: "string (필수)",
        },
      },
    },
    variant: {
      description: "ghost 투명 배경 · outline 테두리 · solid 채움.",
      control: "select",
      table: {
        category: "Props",
        defaultValue: {
          summary: "ghost",
        },
      },
      options: ["ghost", "outline", "solid"],
    },
    tone: {
      description: "primary 기본 강조 · neutral 보조 · accent 브랜드 강조.",
      control: "select",
      table: {
        category: "Props",
        defaultValue: {
          summary: "neutral",
        },
      },
      options: ["primary", "neutral", "accent"],
    },
    size: {
      description:
        "버튼/아이콘 크기 — xs 20/12px · sm 28/16px · md 36/20px · lg 44/24px.",
      control: "select",
      table: {
        category: "Props",
        defaultValue: {
          summary: "sm",
        },
      },
      options: ["xs", "sm", "md", "lg"],
    },
    type: {
      description: "네이티브 버튼 타입입니다. 기본은 button입니다.",
      control: "select",
      table: {
        category: "Props",
        defaultValue: {
          summary: "button",
        },
      },
      options: ["button", "submit", "reset"],
    },
  },
  args: {
    children: <Plus />,
    "aria-label": "기록 추가",
    variant: "ghost",
    tone: "neutral",
    size: "sm",
    shape: "square",
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DocsPreview: Story = {
  tags: ["!dev"],
  render: (args) => <IconButton {...args} />,
};

export const FigmaMatrix: Story = {
  render: () => (
    <div className="grid gap-8 bg-background p-8 text-foreground">
      {shapes.map((shape) => (
        <section key={shape} className="grid gap-4">
          <h3 className="label-strong text-muted-foreground uppercase">
            {shape}
          </h3>
          {tones.map((tone) => (
            <div key={tone} className="flex items-center gap-4">
              <span className="w-16 text-xs text-muted-foreground">{tone}</span>
              {variants.flatMap((variant) => [
                <IconButton
                  key={`${tone}-${variant}-default`}
                  aria-label={`${variant} ${tone} default`}
                  variant={variant}
                  tone={tone}
                  size="md"
                  shape={shape}
                >
                  <Plus />
                </IconButton>,
                <IconButton
                  key={`${tone}-${variant}-disabled`}
                  aria-label={`${variant} ${tone} disabled`}
                  variant={variant}
                  tone={tone}
                  size="md"
                  shape={shape}
                  disabled
                >
                  <Plus />
                </IconButton>,
              ])}
            </div>
          ))}
        </section>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8 bg-background p-8">
      {shapes.map((shape) => (
        <div key={shape} className="flex flex-col gap-3">
          <span className="text-xs text-muted-foreground uppercase font-bold">{shape}</span>
          <div className="flex items-center gap-3">
            {sizes.map((size) => (
              <IconButton
                key={`${shape}-${size}`}
                aria-label={`${shape} ${size}`}
                shape={shape}
                size={size}
                variant="solid"
                tone="primary"
              >
                <Plus />
              </IconButton>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const UsageIcons: Story = {
  render: () => (
    <div className="flex items-center gap-4 bg-background p-8">
      <IconButton aria-label="닫기">
        <X />
      </IconButton>
      <IconButton aria-label="뒤로가기">
        <ArrowLeft />
      </IconButton>
      <IconButton aria-label="초기화">
        <RotateCcw />
      </IconButton>
      <IconButton aria-label="전송" variant="solid" tone="primary">
        <Send />
      </IconButton>
      <IconButton aria-label="비밀번호 보기">
        <Eye />
      </IconButton>
      <IconButton aria-label="프로필 사진 변경" variant="solid">
        <Camera />
      </IconButton>
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArrowRight, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "./Button";

const matrixVariants = ["solid", "outline", "ghost"] as const;
const tones = ["primary", "accent", "neutral", "destructive"] as const;
const sizes = ["sm", "md", "lg"] as const;
const shapes = ["square", "pill"] as const;

const sizeLabels: Record<string, string> = {
  sm: "sm · 28px",
  md: "md · 36px",
  lg: "lg · 44px",
};

const meta = {
  title: "ui/Button/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    controls: { expanded: true },
    docs: {
      description: {
        component:
          "텍스트와 아이콘을 조합하는 공통 버튼입니다. 아래 Props 표에서 옵션과 기본값을 확인하고 Default의 Controls로 변경할 수 있습니다. variant는 표현 방식, tone은 의미, size는 크기, shape는 모서리를 지정합니다. 네이티브 button 속성(form, name, value, aria-* 등)도 전달할 수 있습니다.",
      },
    },
  },
  argTypes: {
    children: {
      description: "버튼에 표시할 내용입니다.",
      control: "text",
      table: {
        category: "Props",
        type: {
          summary: "ReactNode",
        },
      },
    },
    tone: {
      description:
        "primary 기본 강조 · accent 브랜드 강조 · neutral 보조 · destructive 삭제 등 위험 동작.",
      control: "select",
      table: {
        category: "Props",
        defaultValue: {
          summary: "primary",
        },
      },
      options: ["primary", "accent", "neutral", "destructive"],
    },
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
    loading: {
      description:
        "스피너와 loadingLabel을 표시하고 버튼을 비활성화합니다. 앞뒤 아이콘은 숨깁니다.",
      control: "boolean",
      table: {
        category: "Props",
        defaultValue: {
          summary: "false",
        },
      },
    },
    loadingLabel: {
      description: "로딩 중 children 대신 표시할 문구입니다.",
      control: "text",
      table: {
        category: "Props",
        defaultValue: {
          summary: "처리 중",
        },
      },
    },
    leadingIcon: {
      description:
        "내용 앞에 표시할 아이콘입니다. 크기는 size에 따라 정해집니다.",
      control: false,
      table: {
        category: "Props",
        type: {
          summary: "ReactNode",
        },
      },
    },
    trailingIcon: {
      description: "내용 뒤에 표시할 아이콘입니다. 로딩 중에는 숨깁니다.",
      control: false,
      table: {
        category: "Props",
        type: {
          summary: "ReactNode",
        },
      },
    },
    asChild: {
      description:
        "하나의 자식 요소에 버튼 스타일과 props를 전달합니다. 링크의 비활성화는 aria-disabled로 표시되며 키보드 동작 차단은 호출부에서 처리해야 합니다. loading은 자식 요소를 대체하므로 함께 사용하지 마세요.",
      control: false,
      table: {
        category: "Props",
        defaultValue: {
          summary: "false",
        },
      },
    },
    type: {
      description:
        "네이티브 버튼 타입입니다. 일반 Button은 기본값을 지정하지 않으므로 폼 안에서는 button 또는 submit을 명시하세요.",
      control: "select",
      table: {
        category: "Props",
      },
      options: ["button", "submit", "reset"],
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
    variant: {
      description:
        "solid 채움 · outline 테두리 · ghost 투명 배경 · link 텍스트 링크 스타일. link는 높이 auto와 패딩 0이 적용됩니다.",
      control: "select",
      table: {
        category: "Props",
        defaultValue: {
          summary: "solid",
        },
      },
      options: ["solid", "outline", "ghost", "link"],
    },
    size: {
      description: "sm 높이 28px/글자 12px · md 36px/14px · lg 44px/16px.",
      control: "select",
      table: {
        category: "Props",
        defaultValue: {
          summary: "md",
        },
      },
      options: ["sm", "md", "lg"],
    },
  },
  args: {
    children: "Button",
    variant: "solid",
    tone: "primary",
    size: "md",
    shape: "square",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DocsPreview: Story = {
  tags: ["!dev"],
  render: (args) => <Button {...args} />,
};

export const VariantToneMatrix: Story = {
  render: () => (
    <div className="grid min-w-[760px] gap-8 bg-card p-8 text-foreground">
      {matrixVariants.map((variant) => (
        <section key={variant} className="grid gap-2">
          <h3 className="label-strong text-muted-foreground uppercase mb-1">
            {variant}
          </h3>
          {/* 헤더 행 */}
          <div
            className="grid items-center gap-3"
            style={{ gridTemplateColumns: "64px repeat(4, 1fr) 1px repeat(4, 1fr)" }}
          >
            <span />
            {tones.map((tone) => (
              <span key={tone} className="text-[10px] font-bold text-muted-foreground text-center uppercase tracking-wide">
                {tone}
              </span>
            ))}
            <span />
            {tones.map((tone) => (
              <span key={tone} className="text-[10px] font-bold text-muted-foreground text-center uppercase tracking-wide">
                {tone}
              </span>
            ))}
          </div>
          {/* default 행 */}
          <div
            className="grid items-center gap-3"
            style={{ gridTemplateColumns: "64px repeat(4, 1fr) 1px repeat(4, 1fr)" }}
          >
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Default</span>
            {tones.map((tone) => (
              <Button key={tone} variant={variant} tone={tone}>{tone}</Button>
            ))}
            <div className="h-full w-px bg-border" />
            {tones.map((tone) => (
              <Button key={`${tone}-disabled`} variant={variant} tone={tone} disabled>{tone}</Button>
            ))}
          </div>
          {/* 구분선 역할의 레이블 행 */}
          <div
            className="grid items-center gap-3 mt-1"
            style={{ gridTemplateColumns: "64px repeat(4, 1fr) 1px repeat(4, 1fr)" }}
          >
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide col-start-6">Disabled</span>
          </div>
        </section>
      ))}

      <section className="grid gap-3">
        <h3 className="label-strong text-muted-foreground uppercase">link</h3>
        <p className="text-xs text-muted-foreground">
          높이 auto, 패딩 0. primary · neutral에서 주로 사용.
        </p>
        <div className="flex items-center gap-8">
          <div className="flex flex-col items-start gap-1.5">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">primary</span>
            <Button variant="link" tone="primary">링크 텍스트</Button>
          </div>
          <div className="flex flex-col items-start gap-1.5">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">neutral</span>
            <Button variant="link" tone="neutral">링크 텍스트</Button>
          </div>
          <div className="flex flex-col items-start gap-1.5">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">disabled</span>
            <Button variant="link" tone="primary" disabled>링크 텍스트</Button>
          </div>
        </div>
      </section>
    </div>
  ),
};

export const SizesAndShapes: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8 bg-background p-8">
      {shapes.map((shape) => (
        <div key={shape} className="flex flex-col items-start gap-3">
          <h3 className="text-sm font-medium">{shape}</h3>
          {sizes.map((size) => (
            <Button key={size} size={size} shape={shape}>
              {sizeLabels[size]}
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-6 bg-background p-8">
      <div className="flex flex-col items-start gap-2">
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">
          solid · primary · leadingIcon
        </span>
        <Button leadingIcon={<Plus />}>기록하기</Button>
      </div>
      <div className="flex flex-col items-start gap-2">
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">
          link · neutral · trailingIcon
        </span>
        <Button variant="link" tone="neutral" trailingIcon={<ArrowRight />}>
          공연 정보 불러오기
        </Button>
      </div>
      <div className="flex flex-col items-start gap-2">
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">
          ghost · destructive · leadingIcon
        </span>
        <Button variant="ghost" tone="destructive" leadingIcon={<Trash2 />}>
          삭제
        </Button>
      </div>
    </div>
  ),
};

export const AsChild: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-6 bg-background p-8">
      <div className="flex flex-col items-start gap-2">
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">
          solid · primary — 주요 페이지 이동
        </span>
        <Button asChild variant="solid" tone="primary">
          <Link href="/shows">공연 목록 보기</Link>
        </Button>
      </div>
      <div className="flex flex-col items-start gap-2">
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">
          outline · primary — 보조 페이지 이동
        </span>
        <Button asChild variant="outline" tone="primary">
          <Link href="/record/write">기록 작성</Link>
        </Button>
      </div>
      <div className="flex flex-col items-start gap-2">
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">
          ghost · neutral — 텍스트 링크 대체
        </span>
        <Button asChild variant="ghost" tone="neutral">
          <Link href="/profile">프로필 <ArrowRight className="inline w-3.5 h-3.5" /></Link>
        </Button>
      </div>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3 bg-background p-8">
      <Button>Default</Button>
      <Button disabled>Disabled</Button>
      <Button loading>저장</Button>
      <Button loading loadingLabel="불러오는 중" variant="outline">
        다시 시도
      </Button>
    </div>
  ),
};

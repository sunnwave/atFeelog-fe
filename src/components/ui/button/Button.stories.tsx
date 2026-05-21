import type { Meta, StoryObj } from "@storybook/react";
import { Archive, Heart, Plus, Search, Trash2 } from "lucide-react";
import { Button } from "./Button";

const meta = {
  title: "ui/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "solid",
        "outline",
        "ghost",
        "link",
        "soft",
        "ticket",
        "poster",
      ],
    },
    tone: {
      control: "select",
      options: [
        "primary",
        "accent",
        "alice",
        "honeydew",
        "point",
        "neutral",
        "destructive",
      ],
    },
    size: {
      control: "select",
      options: ["sm", "default", "md", "lg", "icon"],
    },
    asChild: {
      control: false,
    },
  },
  args: {
    children: "Button",
    variant: "solid",
    tone: "primary",
    size: "default",
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

const variants = [
  "solid",
  "outline",
  "ghost",
  "link",
  "soft",
  "ticket",
  "poster",
] as const;

const tones = [
  "primary",
  "accent",
  "alice",
  "honeydew",
  "point",
  "neutral",
  "destructive",
] as const;

const sizes = ["sm", "default", "md", "lg"] as const;

const toneLabels: Record<(typeof tones)[number], string> = {
  primary: "Primary",
  accent: "Accent",
  alice: "Alice",
  honeydew: "Honeydew",
  point: "Point",
  neutral: "Neutral",
  destructive: "Destructive",
};

const variantLabels: Record<(typeof variants)[number], string> = {
  solid: "Solid",
  outline: "Outline",
  ghost: "Ghost",
  link: "Link",
  soft: "Soft",
  ticket: "Ticket",
  poster: "Poster",
};

export const Playground: Story = {
  render: (args) => <Button {...args} />,
};

export const AllVariants: Story = {
  render: () => (
    <div className="min-w-[980px] space-y-8 rounded-2xl bg-background p-8 text-foreground">
      <div>
        <h2 className="text-xl font-semibold">Button Variants</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          variant와 tone 조합을 한눈에 확인합니다.
        </p>
      </div>

      <div className="space-y-7">
        {variants.map((variant) => (
          <section key={variant} className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              {variantLabels[variant]}
            </h3>

            <div className="grid grid-cols-7 gap-3">
              {tones.map((tone) => (
                <Button key={tone} variant={variant} tone={tone}>
                  {toneLabels[tone]}
                </Button>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  ),
};

export const CoreVariants: Story = {
  render: () => (
    <div className="min-w-[860px] space-y-8 rounded-2xl bg-background p-8 text-foreground">
      <div>
        <h2 className="text-xl font-semibold">Core Variants</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          기본적으로 가장 자주 사용할 버튼 조합입니다.
        </p>
      </div>

      <div className="grid gap-8">
        <section className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Solid
          </h3>
          <div className="flex flex-wrap gap-3">
            <Button tone="primary">새 기록 작성</Button>
            <Button tone="accent">피드 둘러보기</Button>
            <Button tone="alice">LIVE</Button>
            <Button tone="honeydew">EXHIBIT</Button>
            <Button tone="point">좋아요</Button>
            <Button tone="neutral">취소</Button>
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Outline
          </h3>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" tone="primary">
              취소
            </Button>
            <Button variant="outline" tone="neutral">
              취소
            </Button>
            <Button variant="outline" tone="accent">
              보조 액션
            </Button>
            <Button variant="outline" tone="point">
              포인트
            </Button>
            <Button variant="outline" tone="destructive">
              삭제
            </Button>
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Ghost / Link
          </h3>
          <div className="flex flex-wrap gap-3">
            <Button variant="ghost" tone="primary">
              댓글 보기
            </Button>
            <Button variant="ghost" tone="point">
              <Heart />
              좋아요
            </Button>
            <Button variant="link" tone="primary">
              자세히 보기
            </Button>
            <Button variant="link" tone="point">
              신고하기
            </Button>
          </div>
        </section>
      </div>
    </div>
  ),
};

export const FeelogCustomVariants: Story = {
  render: () => (
    <div className="min-w-[920px] space-y-8 rounded-2xl bg-background p-8 text-foreground">
      <div>
        <h2 className="text-xl font-semibold">atFeelog Custom Variants</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          atFeelog의 피드, 티켓 아카이브, 포스터형 히어로에 어울리는 추가
          variant입니다.
        </p>
      </div>

      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          Soft — 사이드바 / 가벼운 CTA
        </h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="soft" tone="primary">
            Records
          </Button>
          <Button variant="soft" tone="accent">
            이번 달 기록
          </Button>
          <Button variant="soft" tone="alice">
            이미지 포함
          </Button>
          <Button variant="soft" tone="honeydew">
            전시 기록
          </Button>
          <Button variant="soft" tone="point">
            인기 기록
          </Button>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          Ticket — 마이페이지 아카이브
        </h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="ticket" tone="primary">
            Archive
          </Button>
          <Button variant="ticket" tone="accent">
            Ticket 0512
          </Button>
          <Button variant="ticket" tone="alice">
            Live Ticket
          </Button>
          <Button variant="ticket" tone="honeydew">
            Exhibit
          </Button>
          <Button variant="ticket" tone="point">
            Favorite
          </Button>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          Poster — Hero / 강한 CTA
        </h3>
        <div className="flex flex-wrap gap-5">
          <Button variant="poster" tone="primary" size="lg">
            Start Record
          </Button>
          <Button variant="poster" tone="accent" size="lg">
            Explore Feed
          </Button>
          <Button variant="poster" tone="point" size="lg">
            Hot Records
          </Button>
        </div>
      </section>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6 rounded-2xl bg-background p-8 text-foreground">
      <div>
        <h2 className="text-xl font-semibold">Button Sizes</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          size별 버튼 높이와 텍스트 크기를 확인합니다.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {sizes.map((size) => (
          <Button key={size} size={size}>
            {size}
          </Button>
        ))}

        <Button size="icon" aria-label="Add record">
          <Plus />
        </Button>
      </div>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 rounded-2xl bg-background p-8">
      <Button>
        <Plus />새 기록 작성
      </Button>

      <Button tone="alice">
        <Search />
        검색
      </Button>

      <Button variant="ticket" tone="accent">
        <Archive />
        아카이브
      </Button>

      <Button tone="point" variant="ghost">
        <Heart />
        좋아요
      </Button>

      <Button tone="destructive" variant="outline">
        <Trash2 />
        삭제
      </Button>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="grid gap-4 rounded-2xl bg-background p-8">
      <div className="flex flex-wrap gap-3">
        <Button disabled>Primary</Button>
        <Button tone="accent" disabled>
          Accent
        </Button>
        <Button tone="point" disabled>
          Point
        </Button>
        <Button variant="poster" tone="accent" disabled>
          Poster
        </Button>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button variant="outline" disabled>
          Outline
        </Button>
        <Button variant="soft" tone="alice" disabled>
          Soft
        </Button>
        <Button variant="ticket" tone="honeydew" disabled>
          Ticket
        </Button>
        <Button variant="link" disabled>
          Link
        </Button>
      </div>
    </div>
  ),
};

export const UseCases: Story = {
  render: () => (
    <div className="min-w-[860px] space-y-8 rounded-2xl bg-background p-8 text-foreground">
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          Hero CTA
        </h3>
        <div className="flex flex-wrap gap-5">
          <Button variant="poster" tone="primary" size="lg">
            새 기록 작성
          </Button>
          <Button variant="poster" tone="accent" size="lg">
            피드 둘러보기
          </Button>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          Feed Filter
        </h3>
        <div className="flex flex-wrap gap-3">
          <Button tone="primary" size="sm">
            All
          </Button>
          <Button tone="alice" size="sm">
            Live
          </Button>
          <Button tone="honeydew" size="sm">
            Exhibit
          </Button>
          <Button variant="outline" tone="primary" size="sm">
            Text Note
          </Button>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          Sidebar Navigation
        </h3>
        <div className="w-64 rounded-2xl border border-border bg-card p-3">
          <div className="grid gap-2">
            <Button variant="soft" tone="primary" className="justify-start">
              Records
            </Button>
            <Button variant="ghost" tone="primary" className="justify-start">
              Archive
            </Button>
            <Button variant="ghost" tone="primary" className="justify-start">
              My Page
            </Button>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          My Page Archive
        </h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="ticket" tone="accent">
            Ticket 0512
          </Button>
          <Button variant="ticket" tone="alice">
            Live Archive
          </Button>
          <Button variant="ticket" tone="honeydew">
            Exhibit Archive
          </Button>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          Engagement
        </h3>
        <div className="flex flex-wrap gap-3">
          <Button tone="point" variant="ghost" size="sm">
            <Heart />
            좋아요
          </Button>
          <Button tone="primary" variant="ghost" size="sm">
            댓글 보기
          </Button>
          <Button tone="destructive" variant="outline" size="sm">
            삭제
          </Button>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          Cancel / Secondary Action
        </h3>
        <div className="flex flex-wrap gap-3">
          <Button tone="primary">저장</Button>
          <Button tone="neutral" variant="outline">취소</Button>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button tone="destructive" variant="solid">삭제</Button>
          <Button tone="neutral" variant="ghost">아니요</Button>
        </div>
      </section>
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Sparkles, Search, BookOpen, Heart, Ghost } from "lucide-react";
import EmptyState from "./EmptyState";
import { Button } from "@/components/ui/button/Button";

const meta: Meta<typeof EmptyState> = {
  title: "ui/feedback/EmptyState",
  component: EmptyState,
  parameters: { layout: "fullscreen" },
  argTypes: {
    variant: {
      control: "select",
      options: ["section", "inline"],
    },
    status: {
      control: "select",
      options: ["empty", "error"],
    },
    title: { control: "text" },
    description: { control: "text" },
  },
  args: {
    variant: "section",
    description: "첫 번째 공연 감상을 기록해보세요",
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

// ─── 래퍼 ─────────────────────────────────────────────────────────────────────

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      {children}
    </div>
  );
}

function SectionWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background p-8 max-w-xl mx-auto">
      <div className="border-[1.5px] border-foreground">{children}</div>
    </div>
  );
}

// ─── Section variant ──────────────────────────────────────────────────────────

/** 기본 — 아이콘(기본값) + 제목 + 설명 */
export const Section: Story = {
  name: "Section — 기본",
  render: (args) => (
    <PageWrapper>
      <EmptyState {...args} />
    </PageWrapper>
  ),
  args: {
    variant: "section",
    title: "아직 필로그가 없어요",
    description: "첫 번째 공연 감상을 기록해보세요",
    icon: <Ghost className="h-10 w-10" />,
  },
};

/** 커스텀 아이콘 */
export const SectionCustomIcon: Story = {
  name: "Section — 커스텀 아이콘",
  render: (args) => (
    <PageWrapper>
      <EmptyState {...args} />
    </PageWrapper>
  ),
  args: {
    variant: "section",
    title: "찜한 공연이 없어요",
    description: "관심 있는 공연을 찜해보세요",
    icon: <Heart className="h-10 w-10" />,
  },
};

/** 제목 없이 설명만 */
export const SectionDescriptionOnly: Story = {
  name: "Section — 설명만",
  render: (args) => (
    <PageWrapper>
      <EmptyState {...args} />
    </PageWrapper>
  ),
  args: {
    variant: "section",
    description: "아직 이 공연의 필로그가 없어요",
  },
};

/** 버튼 포함 */
export const SectionWithButton: Story = {
  name: "Section — 버튼 포함",
  render: (args) => (
    <PageWrapper>
      <EmptyState {...args}>
        <Button variant="outline" size="sm">
          공연 찾아보기
        </Button>
      </EmptyState>
    </PageWrapper>
  ),
  args: {
    variant: "section",
    title: "아직 필로그가 없어요",
    description: "첫 번째 공연 감상을 기록해보세요",
  },
};

// ─── Error status ─────────────────────────────────────────────────────────────

/** 에러 — section */
export const SectionError: Story = {
  name: "Section — 에러",
  render: (args) => (
    <PageWrapper>
      <EmptyState {...args} />
    </PageWrapper>
  ),
  args: {
    variant: "section",
    status: "error",
    description: "기록을 불러오지 못했어요",
  },
};

/** 에러 — section + 재시도 버튼 */
export const SectionErrorWithRetry: Story = {
  name: "Section — 에러 + 재시도",
  render: (args) => (
    <PageWrapper>
      <EmptyState {...args}>
        <Button variant="outline" size="sm">
          다시 시도
        </Button>
      </EmptyState>
    </PageWrapper>
  ),
  args: {
    variant: "section",
    status: "error",
    description: "기록을 불러오지 못했어요",
  },
};

/** 에러 — inline */
export const InlineError: Story = {
  name: "Inline — 에러",
  render: (args) => (
    <SectionWrapper>
      <EmptyState {...args} />
    </SectionWrapper>
  ),
  args: {
    variant: "inline",
    status: "error",
    description: "검색 중 오류가 발생했어요.",
  },
};

// ─── Inline variant ───────────────────────────────────────────────────────────

/** 모달·패널 내부 — 텍스트만 */
export const Inline: Story = {
  name: "Inline — 모달/패널",
  render: (args) => (
    <SectionWrapper>
      <EmptyState {...args} />
    </SectionWrapper>
  ),
  args: {
    variant: "inline",
    description: "검색 결과가 없어요. 다른 키워드로 검색해보세요.",
  },
};

// ─── 전체 비교 ────────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: "All Variants 비교",
  render: () => (
    <div className="bg-background min-h-screen p-10 flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
          section — 기본
        </p>
        <div className="border-[1.5px] border-foreground">
          <EmptyState
            variant="section"
            title="아직 필로그가 없어요"
            description="첫 번째 공연 감상을 기록해보세요"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
          section — 버튼 포함
        </p>
        <div className="border-[1.5px] border-foreground">
          <EmptyState
            variant="section"
            title="아직 필로그가 없어요"
            description="첫 번째 공연 감상을 기록해보세요"
          >
            <Button variant="outline" size="sm">
              공연 찾아보기
            </Button>
          </EmptyState>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
          inline — 모달/패널
        </p>
        <div className="border-[1.5px] border-foreground max-w-sm">
          <EmptyState
            variant="inline"
            description="검색 결과가 없어요. 다른 키워드로 검색해보세요."
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
          section — 에러
        </p>
        <div className="border-[1.5px] border-foreground">
          <EmptyState
            variant="section"
            status="error"
            description="기록을 불러오지 못했어요"
          >
            <Button variant="outline" size="sm">다시 시도</Button>
          </EmptyState>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
          inline — 에러
        </p>
        <div className="border-[1.5px] border-foreground max-w-sm">
          <EmptyState
            variant="inline"
            status="error"
            description="검색 중 오류가 발생했어요."
          />
        </div>
      </div>
    </div>
  ),
  parameters: { layout: "fullscreen" },
};

// ─── 아이콘별 showcase ────────────────────────────────────────────────────────

export const IconShowcase: Story = {
  name: "Icon Showcase",
  render: () => (
    <div className="bg-background min-h-screen p-10 flex flex-col gap-6">
      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
        section variant — 아이콘별
      </p>
      <div className="flex flex-col gap-4 max-w-md">
        {[
          { icon: undefined, description: "icon 생략 시 기본 Sparkles 아이콘" },
          {
            icon: <Sparkles className="h-10 w-10" />,
            description: "아직 필로그가 없어요",
          },
          {
            icon: <Search className="h-10 w-10" />,
            description: "검색 결과가 없어요",
          },
          {
            icon: <BookOpen className="h-10 w-10" />,
            description: "기록이 없어요",
          },
          {
            icon: <Heart className="h-10 w-10" />,
            description: "찜한 공연이 없어요",
          },
        ].map(({ icon, description }) => (
          <div key={description} className="border-[1.5px] border-foreground">
            <EmptyState
              variant="section"
              icon={icon}
              description={description}
            />
          </div>
        ))}
      </div>
    </div>
  ),
  parameters: { layout: "fullscreen" },
};

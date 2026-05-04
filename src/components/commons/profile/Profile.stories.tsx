import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { RecordSummary } from "@/api/adapters/types/record-summary";
import Profile from "./Profile";

const IMG = "https://picsum.photos/id/64/200/200";

const recordWithUser: RecordSummary = {
  id: "record_1",
  title: "테스트",
  showName: "아이유 콘서트",
  createdAt: "2026-02-06T00:00:00.000Z",
  user: {
    name: "Alice",
    picture: IMG,
  },
};

const recordAnonymous: RecordSummary = {
  ...recordWithUser,
  user: undefined,
};

const meta: Meta<typeof Profile> = {
  title: "commons/Profile",
  component: Profile,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen w-screen bg-gray-900 p-6 flex items-center justify-center">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Profile>;

export const DefaultProfile: Story = {
  args: {
    record: recordWithUser,
    tone: "white",
    size: "lg",
  },
};

export const WhiteAnonymous: Story = {
  args: { record: recordAnonymous, tone: "primary", size: "sm" },
  decorators: [
    (Story) => (
      <div className="w-90 p-6 rounded-2xl border border-white/10 bg-white">
        <Story />
      </div>
    ),
  ],
};

export const SizeGallery: Story = {
  args: {
    record: recordWithUser,
  },
  render: (args) => (
    <div className="w-full min-h-screen bg-background p-8 space-y-10">
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">tone: primary</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="mb-3 text-sm text-muted-foreground">size: sm</p>
            <Profile {...args} tone="primary" size="sm" />
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="mb-3 text-sm text-muted-foreground">size: lg</p>
            <Profile {...args} tone="primary" size="lg" />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">tone: white</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-black/80 p-5">
            <p className="mb-3 text-sm text-white/60">size: sm</p>
            <Profile {...args} tone="white" size="sm" />
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/80 p-5">
            <p className="mb-3 text-sm text-white/60">size: lg</p>
            <Profile {...args} tone="white" size="lg" />
          </div>
        </div>
      </section>
    </div>
  ),
};

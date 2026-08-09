import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Avatar, { AvatarSize, AvatarType } from "./Avatar";
import type { User } from "@/api/adapters/types/user";

const meta: Meta<typeof Avatar> = {
  title: "UI/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "card"],
    },
    type: {
      control: "select",
      options: ["filled", "outlined"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

const mockUser: User = {
  id: "user-1",
  name: "선",
  picture: "",
};

const mockUserWithImage: User = {
  id: "user-2",
  name: "아티스트",
  picture: "https://i.pravatar.cc/150?img=32",
};

const sizes: AvatarSize[] = ["xs", "sm", "md", "lg"];

export const Default: Story = {
  render: (args) => (
    <div className="flex gap-3">
      <div className="rounded-2xl bg-background p-8">
        <Avatar {...args} />
      </div>
      <div className="rounded-2xl bg-foreground p-8">
        <Avatar {...args} />
      </div>
    </div>
  ),
  args: {
    user: mockUser,
  },
};

export const SizeVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-end gap-6 rounded-2xl bg-background p-8">
        {sizes.map((size) => (
          <div key={size} className="flex flex-col items-center gap-3">
            <Avatar user={mockUser} size={size} type="filled" />
            <span className="text-sm font-medium text-muted-foreground">
              {size}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-end gap-6 rounded-2xl bg-foreground p-8">
        {sizes.map((size) => (
          <div key={size} className="flex flex-col items-center gap-3">
            <Avatar user={mockUser} size={size} type="filled" />
            <span className="text-sm font-medium text-white/40">{size}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => {
    const rows: { label: string; user: User | undefined; type: AvatarType }[] =
      [
        { label: "filled", user: mockUser, type: "filled" },
        { label: "outlined", user: mockUser, type: "outlined" },
        { label: "with image", user: mockUserWithImage, type: "filled" },
        { label: "guest", user: undefined, type: "filled" },
      ];

    return (
      <div className="flex flex-col gap-3">
        {(
          [
            {
              dark: false,
              mutedCls: "text-muted-foreground",
              bgCls: "bg-background",
            },
            { dark: true, mutedCls: "text-white/40", bgCls: "bg-foreground" },
          ] as const
        ).map(({ dark, mutedCls, bgCls }) => (
          <div key={String(dark)} className={`rounded-2xl p-8 ${bgCls}`}>
            <div className="grid gap-6">
              {rows.map(({ label, user, type }) => (
                <div
                  key={label}
                  className="grid grid-cols-[96px_1fr] items-center gap-6"
                >
                  <span className={`text-sm font-semibold ${mutedCls}`}>
                    {label}
                  </span>
                  <div className="flex items-center gap-6">
                    {sizes.map((size) => (
                      <div
                        key={`${label}-${size}`}
                        className="flex flex-col items-center gap-2"
                      >
                        <Avatar user={user} size={size} type={type} />
                        <span className={`text-xs font-medium ${mutedCls}`}>
                          {size}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};

// ─── CQ 너비별 쇼케이스 ──────────────────────────────────────────────────────
// 현재 RecordPosterCardMeta에서 className으로 w/h만 CQ override하는 방식 검증
// 이미지 아바타는 object-cover로 채워지지만,
// 이니셜/게스트 아바타는 컨테이너는 커져도 내부 텍스트·아이콘 사이즈가 고정돼 어색할 수 있음

const CARD_WIDTHS = [
  { label: "160px", desc: "< @card-xs", width: 160 },
  { label: "180px", desc: "@card-xs", width: 180 },
  { label: "220px", desc: "@card-sm", width: 220 },
  { label: "280px", desc: "@card-md", width: 280 },
] as const;

const avatarCases: { label: string; user: User | undefined; type: AvatarType }[] = [
  { label: "이미지", user: mockUserWithImage, type: "filled" },
  { label: "이니셜 filled", user: mockUser, type: "filled" },
  { label: "이니셜 outlined", user: mockUser, type: "outlined" },
  { label: "guest", user: undefined, type: "filled" },
];

export const CardContextShowcase: Story = {
  name: "Card Context — CQ w/h override 검증",
  render: () => (
    <div className="p-8 bg-background flex flex-col gap-8">
      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
        className으로 w/h만 CQ override — 이니셜·게스트 내부 사이즈 확인
      </p>
      {avatarCases.map(({ label, user, type }) => (
        <div key={label} className="flex flex-col gap-3">
          <p className="text-xs font-bold text-foreground uppercase tracking-widest">{label}</p>
          <div className="flex items-end gap-8 flex-wrap">
            {CARD_WIDTHS.map(({ label: wLabel, desc, width }) => (
              <div key={wLabel} className="flex flex-col gap-2">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-bold bg-muted px-2 py-0.5 rounded w-fit">{wLabel}</span>
                  <span className="text-[11px] text-muted-foreground">{desc}</span>
                </div>
                {/* @container — 카드 CQ 컨텍스트 시뮬레이션 */}
                <div className="@container border-[1.5px] border-foreground/20 bg-foreground/5 p-2" style={{ width }}>
                  <Avatar
                    user={user}
                    size="sm"
                    type={type}
                    className="w-6 h-6 @card-xs:w-8 @card-xs:h-8 @card-md:w-10 @card-md:h-10"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: { layout: "fullscreen" },
};

export const ProfileEntryUsage: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="w-75 rounded-none border border-border bg-card">
        <div className="border-b border-border px-5 py-5">
          <button
            type="button"
            className="flex w-full items-center justify-start gap-3 bg-transparent p-0 text-left"
          >
            <Avatar user={mockUser} size="sm" type="filled" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-base font-semibold leading-tight text-foreground">
                선 님
              </p>
              <p className="mt-1 truncate text-sm font-medium leading-tight text-muted-foreground">
                내 프로필과 활동 보기
              </p>
            </div>
          </button>
        </div>
        <div className="px-5 py-5">
          <button
            type="button"
            className="flex w-full items-center justify-start gap-3 bg-transparent p-0 text-left"
          >
            <Avatar size="sm" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-base font-semibold leading-tight text-foreground">
                로그인해주세요
              </p>
              <p className="mt-1 truncate text-sm font-medium leading-tight text-muted-foreground">
                나만의 기록 공간을 시작해요
              </p>
            </div>
          </button>
        </div>
      </div>

      <div className="w-75 rounded-none border border-white/10 bg-foreground">
        <div className="border-b border-white/10 px-5 py-5">
          <button
            type="button"
            className="flex w-full items-center justify-start gap-3 bg-transparent p-0 text-left"
          >
            <Avatar user={mockUser} size="sm" type="outlined" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-base font-semibold leading-tight text-white">
                선 님
              </p>
              <p className="mt-1 truncate text-sm font-medium leading-tight text-white/40">
                내 프로필과 활동 보기
              </p>
            </div>
          </button>
        </div>
        <div className="px-5 py-5">
          <button
            type="button"
            className="flex w-full items-center justify-start gap-3 bg-transparent p-0 text-left"
          >
            <Avatar size="sm" type="outlined" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-base font-semibold leading-tight text-white">
                로그인해주세요
              </p>
              <p className="mt-1 truncate text-sm font-medium leading-tight text-white/40">
                나만의 기록 공간을 시작해요
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  ),
};

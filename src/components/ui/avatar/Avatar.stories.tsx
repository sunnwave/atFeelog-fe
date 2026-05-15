import type { Meta, StoryObj } from "@storybook/react";

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
      options: ["xs", "sm", "md", "lg"],
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

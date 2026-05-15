import type { Meta, StoryObj } from "@storybook/react";

import { AVATAR_COLORS } from "@/shared/utils";

const meta: Meta = {
  title: "ui/AvatarPalette",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj;

export const ColorPalette: Story = {
  render: () => {
    return (
      <div className="min-h-screen bg-background p-8 text-foreground">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Avatar Color Palette
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            새로 만든 아바타 배경 컬러 팔레트입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {AVATAR_COLORS.map((color, index) => (
            <div
              key={`${color.bg}-${index}`}
              className="overflow-hidden rounded-2xl border bg-card"
              style={{
                borderColor: color.border,
              }}
            >
              <div
                className="flex h-32 items-center justify-center"
                style={{
                  backgroundColor: color.bg,
                  color: color.text,
                }}
              >
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-full border text-2xl font-bold"
                  style={{
                    backgroundColor: color.bg,
                    color: color.text,
                    borderColor: color.border,
                  }}
                >
                  선
                </div>
              </div>

              <div className="p-4">
                <div className="mb-3 text-sm font-bold text-foreground">
                  Color {index + 1}
                </div>

                <div className="grid gap-2 text-xs">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-muted-foreground">bg</span>
                    <code className="font-semibold text-foreground">
                      {color.bg}
                    </code>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <span className="text-muted-foreground">text</span>
                    <code className="font-semibold text-foreground">
                      {color.text}
                    </code>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <span className="text-muted-foreground">border</span>
                    <code className="font-semibold text-foreground">
                      {color.border}
                    </code>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div>
                    <div
                      className="h-10 rounded-lg border"
                      style={{
                        backgroundColor: color.bg,
                        borderColor: color.border,
                      }}
                    />
                    <p className="mt-1 text-[10px] text-muted-foreground">bg</p>
                  </div>

                  <div>
                    <div
                      className="h-10 rounded-lg border"
                      style={{
                        backgroundColor: color.text,
                        borderColor: color.text,
                      }}
                    />
                    <p className="mt-1 text-[10px] text-muted-foreground">
                      text
                    </p>
                  </div>

                  <div>
                    <div
                      className="h-10 rounded-lg border"
                      style={{
                        backgroundColor: color.border,
                        borderColor: color.border,
                      }}
                    />
                    <p className="mt-1 text-[10px] text-muted-foreground">
                      border
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

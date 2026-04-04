import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { TiptapEditor } from "./TiptapEditor";

const meta: Meta<typeof TiptapEditor> = {
  title: "commons/editor/TiptapEditor",
  component: TiptapEditor,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    content: { control: false },
    onChange: { action: "change" },
    placeholder: { control: "text" },
    readOnly: { control: "boolean" },
    maxLength: { control: "number" },
    error: { control: "text" },
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-background p-8">
        <div className="mx-auto w-full max-w-[760px] rounded-2xl border border-border bg-card p-6">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TiptapEditor>;

function ControlledDemo(
  args: Omit<React.ComponentProps<typeof TiptapEditor>, "value" | "onChange">
) {
  const [content, setContent] = useState<string>(
    "<p>스토리북에서 <strong>tiptap</strong> 테스트 중입니다 ✨</p>"
  );

  return (
    <div className="space-y-4">
      {/* ✅ 외부 컨트롤: value를 바꿔서 setContent 동작 확인 */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-xl border border-border bg-background px-3 py-2 text-sm hover:bg-muted"
          onClick={() =>
            setContent("<p>외부에서 <em>내용을 교체</em>했어요.</p>")
          }
        >
          외부에서 내용 교체
        </button>

        <button
          type="button"
          className="rounded-xl border border-border bg-background px-3 py-2 text-sm hover:bg-muted"
          onClick={() => setContent("<h2>제목</h2><p>본문입니다.</p>")}
        >
          제목 + 본문 넣기
        </button>

        <button
          type="button"
          className="rounded-xl border border-border bg-background px-3 py-2 text-sm hover:bg-muted"
          onClick={() => setContent("<p></p>")}
        >
          비우기
        </button>
      </div>

      <TiptapEditor
        {...args}
        content={content}
        onChange={(html) => {
          setContent(html);
          // 스토리북 액션 로그에도 찍히게 하려면 아래처럼도 가능
          // args.onChange?.(html as any);
        }}
      />

      {/* ✅ 디버그: 현재 HTML */}
      <div className="rounded-xl bg-muted/40 p-3">
        <p className="mb-2 text-xs font-semibold text-muted-foreground">
          현재 value(HTML)
        </p>
        <pre className="whitespace-pre-wrap break-words text-xs text-foreground">
          {content}
        </pre>
      </div>
    </div>
  );
}

export const Default: Story = {
  args: {
    placeholder: "후기를 작성해보세요...",
    readOnly: false,
  },
  render: (args) => <ControlledDemo {...args} />,
};

export const Disabled: Story = {
  args: {
    placeholder: "비활성화 상태",
    readOnly: true,
  },
  render: (args) => <ControlledDemo {...args} />,
};

export const Empty: Story = {
  args: {
    placeholder: "비어있는 상태",
    readOnly: false,
  },
  render: (args) => {
    const [content, setContent] = useState<string>("");
    return (
      <div className="space-y-4">
        <TiptapEditor
          {...args}
          content={content}
          onChange={(html) => setContent(html)}
        />
      </div>
    );
  },
};

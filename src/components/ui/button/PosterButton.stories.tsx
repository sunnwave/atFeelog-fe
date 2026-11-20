import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArrowRight } from "lucide-react";
import { PosterButton } from "./PosterButton";

const meta = {
  title: "ui/Button/PosterButton",
  component: PosterButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    controls: { expanded: true },
    docs: { description: { component: "두꺼운 글씨와 오프셋 그림자를 사용하는 강조 버튼입니다. Button의 props를 상속하며 variant와 size는 받지 않습니다. solid와 lg를 기반으로 높이 48px, 좌우 패딩 28px을 적용합니다. tone, shape, 아이콘, loading은 변경할 수 있습니다." } },
  },
  argTypes: {
    "children": {
        "description": "버튼에 표시할 내용입니다.",
        "control": "text",
        "table": {
            "category": "Props",
            "type": {
                "summary": "ReactNode"
            }
        }
    },
    "tone": {
        "description": "primary 기본 강조 · accent 브랜드 강조 · neutral 보조 · destructive 삭제 등 위험 동작.",
        "control": "select",
        "table": {
            "category": "Props",
            "defaultValue": {
                "summary": "primary"
            }
        },
        "options": [
            "primary",
            "accent",
            "neutral",
            "destructive"
        ]
    },
    "shape": {
        "description": "square 각진 모서리 · pill 둥근 모서리.",
        "control": "select",
        "table": {
            "category": "Props",
            "defaultValue": {
                "summary": "square"
            }
        },
        "options": [
            "square",
            "pill"
        ]
    },
    "disabled": {
        "description": "버튼을 비활성화합니다.",
        "control": "boolean",
        "table": {
            "category": "Props",
            "defaultValue": {
                "summary": "false"
            }
        }
    },
    "loading": {
        "description": "스피너와 loadingLabel을 표시하고 버튼을 비활성화합니다. 앞뒤 아이콘은 숨깁니다.",
        "control": "boolean",
        "table": {
            "category": "Props",
            "defaultValue": {
                "summary": "false"
            }
        }
    },
    "loadingLabel": {
        "description": "로딩 중 children 대신 표시할 문구입니다.",
        "control": "text",
        "table": {
            "category": "Props",
            "defaultValue": {
                "summary": "처리 중"
            }
        }
    },
    "leadingIcon": {
        "description": "내용 앞에 표시할 아이콘입니다. 크기는 size에 따라 정해집니다.",
        "control": false,
        "table": {
            "category": "Props",
            "type": {
                "summary": "ReactNode"
            }
        }
    },
    "trailingIcon": {
        "description": "내용 뒤에 표시할 아이콘입니다. 로딩 중에는 숨깁니다.",
        "control": false,
        "table": {
            "category": "Props",
            "type": {
                "summary": "ReactNode"
            }
        }
    },
    "asChild": {
        "description": "하나의 자식 요소에 버튼 스타일과 props를 전달합니다. 링크의 비활성화는 aria-disabled로 표시되며 키보드 동작 차단은 호출부에서 처리해야 합니다. loading은 자식 요소를 대체하므로 함께 사용하지 마세요.",
        "control": false,
        "table": {
            "category": "Props",
            "defaultValue": {
                "summary": "false"
            }
        }
    },
    "type": {
        "description": "네이티브 버튼 타입입니다. 일반 Button은 기본값을 지정하지 않으므로 폼 안에서는 button 또는 submit을 명시하세요.",
        "control": "select",
        "table": {
            "category": "Props"
        },
        "options": [
            "button",
            "submit",
            "reset"
        ]
    },
    "onClick": {
        "description": "클릭 이벤트 핸들러입니다.",
        "control": false,
        "table": {
            "category": "Props",
            "type": {
                "summary": "MouseEventHandler<HTMLButtonElement>"
            }
        }
    },
    "className": {
        "description": "추가 스타일입니다. 충돌하는 Tailwind 클래스는 전달한 className이 우선합니다.",
        "control": "text",
        "table": {
            "category": "Props"
        }
    }
},
  args: {
    children: "Start Record",
    tone: "primary",
    shape: "square",
  },
} satisfies Meta<typeof PosterButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Tones: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-5 bg-background p-8">
      <PosterButton>Start Record</PosterButton>
      <PosterButton tone="accent">Explore Feed</PosterButton>
      <PosterButton tone="neutral">View Archive</PosterButton>
      <PosterButton tone="destructive">Delete Record</PosterButton>
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    children: "Explore Feed",
    trailingIcon: <ArrowRight />,
  },
};

export const States: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-5 bg-background p-8">
      <PosterButton>Default</PosterButton>
      <PosterButton disabled>Disabled</PosterButton>
      <PosterButton loading loadingLabel="Loading">
        Start Record
      </PosterButton>
    </div>
  ),
};

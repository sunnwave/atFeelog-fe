import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ShowTicketLinks from "./ShowTicketLinks";

const meta: Meta<typeof ShowTicketLinks> = {
  title: "features/shows/detail/ShowTicketLinks",
  component: ShowTicketLinks,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ShowTicketLinks>;

/** 유효한 링크만 있는 경우 — 네오브루탈 shadow 버튼 확인. */
export const Default: Story = {
  name: "유효한 링크",
  args: {
    links: [
      { name: "인터파크", url: "https://ticket.interpark.com" },
      { name: "예스24", url: "https://ticket.yes24.com" },
      { name: "멜론티켓", url: "https://ticket.melon.com" },
    ],
  },
};

/** 링크가 준비 중인 항목 포함 — dashed border 처리 확인. */
export const WithInvalidLinks: Story = {
  name: "준비 중 링크 포함",
  args: {
    links: [
      { name: "인터파크", url: "https://ticket.interpark.com" },
      { name: "예스24", url: "-" },
      { name: "멜론티켓", url: "" },
    ],
  },
};

/** 모두 준비 중인 경우. */
export const AllInvalid: Story = {
  name: "전체 준비 중",
  args: {
    links: [
      { name: "인터파크", url: "-" },
      { name: "예스24", url: "" },
    ],
  },
};

/** links가 빈 배열이면 null을 반환해 아무것도 렌더링하지 않습니다. */
export const Empty: Story = {
  name: "링크 없음 (null 반환)",
  args: {
    links: [],
  },
};

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import LogoWordmark from "./LogoWordmark";

const meta: Meta<typeof LogoWordmark> = {
  title: "ui/Logo",
  component: LogoWordmark,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen w-screen bg-white p-6 flex items-center justify-center">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LogoWordmark>;

export const DefaultLogo: Story = {};

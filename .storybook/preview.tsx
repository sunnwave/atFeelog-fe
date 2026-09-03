import type { Preview } from "@storybook/nextjs-vite";
import { MockedProvider } from "@apollo/client/testing";
import "../src/styles/globals.css";
import { ToastProvider } from "@/components/commons/toast";

const preview: Preview = {
  decorators: [
    (Story) => (
      <MockedProvider mocks={[]} addTypename={false}>
        <ToastProvider>
          <Story />
        </ToastProvider>
      </MockedProvider>
    ),
  ],
  parameters: {
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

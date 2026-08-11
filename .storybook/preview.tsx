import type { Preview } from "@storybook/nextjs-vite";
import { MockedProvider } from "@apollo/client/testing";
import "../src/styles/globals.css";

const preview: Preview = {
  decorators: [
    (Story) => (
      <MockedProvider mocks={[]} addTypename={false}>
        <Story />
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

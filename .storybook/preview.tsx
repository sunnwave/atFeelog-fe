import type { Preview } from "@storybook/nextjs-vite";
import { MockedProvider } from "@apollo/client/testing";
import { initialize, mswDecorator } from "msw-storybook-addon";
import "../src/styles/globals.css";
import { ToastProvider } from "@/components/commons/toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { handlers } from "../src/mocks/handlers";

initialize({ onUnhandledRequest: "bypass" }, handlers);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

const preview: Preview = {
  decorators: [
    mswDecorator,
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <MockedProvider mocks={[]} addTypename={false}>
          <ToastProvider>
            <Story />
          </ToastProvider>
        </MockedProvider>
      </QueryClientProvider>
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

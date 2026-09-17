import type { Preview } from "@storybook/nextjs-vite";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
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

const apolloClient = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
});

const preview: Preview = {
  decorators: [
    mswDecorator,
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <ApolloProvider client={apolloClient}>
          <ToastProvider>
            <Story />
          </ToastProvider>
        </ApolloProvider>
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

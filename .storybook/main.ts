import type { StorybookConfig } from "@storybook/nextjs-vite";
import { mergeConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
  ],
  framework: { name: "@storybook/nextjs-vite", options: {} },
  staticDirs: ["../public"],
  viteFinal: (baseConfig) =>
    mergeConfig(baseConfig, {
      plugins: [tailwindcss()],
      optimizeDeps: {
        include: ["@apollo/client", "@apollo/client/testing", "recoil"],
      },
      resolve: {
        dedupe: [
          "react",
          "react-dom",
          "react/jsx-runtime",
          "react/jsx-dev-runtime",
          "recoil",
          "@apollo/client",
        ],
      },
    }),
};

export default config;

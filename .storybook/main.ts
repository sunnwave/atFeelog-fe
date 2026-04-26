import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
  ],
  framework: { name: "@storybook/nextjs-vite", options: {} },
  staticDirs: ["../public"],
  viteFinal: (config) => ({
    ...config,
    resolve: {
      ...config.resolve,
      // Ensure a single React + Recoil instance across all Storybook bundles.
      // Without this, Recoil's cached ESM bundle uses a different React copy
      // and crashes when accessing __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.
      dedupe: ["react", "react-dom", "recoil"],
    },
  }),
};

export default config;

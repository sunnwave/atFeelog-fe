import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MockedProvider } from "@apollo/client/testing";

import { UPLOAD_FILE } from "@/shared/hooks/image/useUploadImages";
import RecordEditorForm from "./RecordEditorForm";

const apolloMocks = [
  {
    request: { query: UPLOAD_FILE },
    result: { data: { uploadFile: { url: "mock.jpg" } } },
  },
];

const meta: Meta<typeof RecordEditorForm> = {
  title: "features/record/editor/RecordEditorForm",
  component: RecordEditorForm,
  parameters: { layout: "padded" },
  args: {
    formId: "record-write-form",
    onSubmitValid: async (values) => {
      console.log("submit", values);
    },
  },
  decorators: [
    (Story) => (
      <MockedProvider mocks={apolloMocks} addTypename={false}>
        <div className="min-h-screen bg-background p-8">
          <div className="mx-auto w-full max-w-[720px] rounded-2xl border border-border bg-card p-6">
            <Story />
          </div>
        </div>
      </MockedProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RecordEditorForm>;

export const Default: Story = {};

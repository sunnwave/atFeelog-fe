// src/components/features/records/write/recordWriteForm/RecordWriteForm.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MockedProvider } from "@apollo/client/testing";

import RecordWriteForm from "./RecordWriteForm";
import { UPLOAD_FILE } from "@/shared/hooks/image/useUploadImages";

const apolloMocks = [
  {
    request: { query: UPLOAD_FILE },
    result: { data: { uploadFile: { url: "mock.jpg" } } },
  },
];

const meta: Meta<typeof RecordWriteForm> = {
  title: "features/record-write/RecordWriteForm",
  component: RecordWriteForm,
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
type Story = StoryObj<typeof RecordWriteForm>;

export const Default: Story = {};

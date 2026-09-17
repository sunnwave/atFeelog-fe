import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import SearchBar from "./SearchBar";
import { useSearch } from "./useSearch";

const meta: Meta<typeof SearchBar> = {
  title: "commons/SearchBar",
  component: SearchBar,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div
        className="min-h-screen w-screen p-8"
        style={{ background: "#0B1220" }}
      >
        <div className="mx-auto w-full max-w-xl rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

function OnlySearchDemo() {
  const [committed, setCommitted] = useState<string | null>(null);
  const { search, setSearch, submit, reset } = useSearch({
    initValue: { search: "" },
    onCommit: (values) => setCommitted(JSON.stringify(values, null, 2)),
  });

  return (
    <>
      <SearchBar
        variant="onlySearch"
        search={search}
        onSearchChange={setSearch}
        onSubmit={submit}
        onReset={reset}
      />
      <div className="rounded border border-white/10 bg-white/5 p-3 text-xs text-white/60">
        <p className="mb-1 font-bold text-white/40">
          committed (Search 클릭 후 반영)
        </p>
        <pre>{committed ?? "—"}</pre>
      </div>
    </>
  );
}

function WithDateDemo() {
  const [committed, setCommitted] = useState<string | null>(null);
  const {
    search,
    setSearch,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    submit,
    reset,
  } = useSearch({
    initValue: { search: "", startDate: "", endDate: "" },
    onCommit: (values) => setCommitted(JSON.stringify(values, null, 2)),
  });

  return (
    <>
      <SearchBar
        variant="withDate"
        search={search}
        onSearchChange={setSearch}
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onSubmit={submit}
        onReset={reset}
      />
      <div className="rounded border border-white/10 bg-white/5 p-3 text-xs text-white/60">
        <p className="mb-1 font-bold text-white/40">
          committed (Search 클릭 후 반영)
        </p>
        <pre>{committed ?? "—"}</pre>
      </div>
    </>
  );
}

export const OnlySearch: Story = {
  render: () => <OnlySearchDemo />,
};

export const WithDate: Story = {
  render: () => <WithDateDemo />,
};

import Header from "@/components/commons/layout/Header/Header";
import SearchBar from "@/components/commons/search/SearchBar";
import { JSX } from "react";
import RecordFeed from "./RecordFeed";

export default function RecordFeedPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-background px-6 py-4 lg:px-6 lg:py-8">
      <div className="max-w-5xl space-y-2 lg:space-y-4">
        <Header text="필로그" />
        <SearchBar variant="withDate" />
        <RecordFeed />
      </div>
    </div>
  );
}

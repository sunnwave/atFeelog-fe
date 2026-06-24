import { JSX } from "react";
import KeywordDashBoard from "./KeywordDashBoard/KeywordDashBoard";
import { useFetchBoardsKeyword } from "../hooks/queries/useFetchBoardsKeyword";

export default function HomeDashBoard(): JSX.Element | null {
  const { keywords } = useFetchBoardsKeyword();

  if (keywords.length === 0) return null;

  return (
    <div className="max-w-xs">
      <KeywordDashBoard keywords={keywords} variant="feelog" />
    </div>
  );
}
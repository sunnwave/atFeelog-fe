import { JSX } from "react";
import KeywordDashBoard from "../KeywordDashBoard/KeywordDashBoard";

type Keyword = { rank: number; name: string };

export default function TwoColumnDashboard({
  feelogKeywords,
}: {
  feelogKeywords: Keyword[];
}): JSX.Element {
  return (
    <div className="hidden lg:grid lg:grid-cols-2 gap-6">
      {feelogKeywords.length > 0 && (
        <section>
          <KeywordDashBoard keywords={feelogKeywords} variant="feelog" />
        </section>
      )}
    </div>
  );
}

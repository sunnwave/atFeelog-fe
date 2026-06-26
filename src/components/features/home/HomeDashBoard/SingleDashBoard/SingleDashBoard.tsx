import { JSX } from "react";
import KeywordDashBoard from "../KeywordDashBoard/KeywordDashBoard";

type Keyword = { rank: number; name: string };

export default function SingleDashBoard({
  feelogKeywords,
}: {
  feelogKeywords: Keyword[];
}): JSX.Element {
  return (
    <div className="lg:hidden">
      {feelogKeywords.length > 0 && (
        <section>
          <KeywordDashBoard keywords={feelogKeywords} variant="feelog" />
        </section>
      )}
    </div>
  );
}

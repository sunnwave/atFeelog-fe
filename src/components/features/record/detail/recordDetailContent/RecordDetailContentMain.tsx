import { IBoard } from "@/shared/graphql/generated/types";
import { useMemo, useState } from "react";

export default function RecordContents({ record }: { record: IBoard }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // ✅ "더 보기" 버튼을 띄울지(대충 길이 기준)
  //    필요하면 실제로 line-clamp가 잘렸는지 DOM으로 측정하는 방식으로도 바꿀 수 있어.
  const shouldShowMoreButton = useMemo(
    () => record.contents.length > 180,
    [record.contents]
  );

  return (
    <div className="p-4 border-b border-border prose prose-base max-w-none">
      <p
        className={[
          "whitespace-pre-wrap leading-relaxed text-foreground",
          !isExpanded &&
            "overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {record.contents}
      </p>

      {shouldShowMoreButton && (
        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="mt-2 text-primary text-sm font-bold hover:text-primary/80 transition-colors"
        >
          {isExpanded ? "접기" : "더 보기"}
        </button>
      )}
    </div>
  );
}

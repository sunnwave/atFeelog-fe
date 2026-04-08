import { useMemo, useState } from "react";
import DOMPurify from "dompurify";

export default function RecordContents({ contents }: { contents: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const sanitizedContents = DOMPurify.sanitize(contents);

  const shouldShowMoreButton = useMemo(() => contents.length > 180, [contents]);

  return (
    <div className="p-4 border-b border-border prose prose-base max-w-none">
      <p
        dangerouslySetInnerHTML={{ __html: sanitizedContents }} // ✅ HTML 태그가 포함된 콘텐츠를 렌더링
        className={[
          "whitespace-pre-wrap leading-relaxed text-foreground",
          !isExpanded &&
            "overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]",
        ]
          .filter(Boolean)
          .join(" ")}
      ></p>

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

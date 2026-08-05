import { RecordDetail } from "@/api/adapters/types/record";
import DOMPurify from "dompurify";
import { JSX, useMemo, useState } from "react";
import { stripMetaFromContents } from "../../lib";

// 줄 노트 배경: 32px 라인 높이에 맞춰 1px 선 반복
// --border는 hex 값(#e8e8df)이므로 hsl() 래퍼 없이 var()로 직접 참조
// 대비를 높이기 위해 --feelog-neutral-muted(#70736b)를 20% 혼합
const LINED_PAPER_STYLE: React.CSSProperties = {
  background: "var(--muted)",
  backgroundImage: `repeating-linear-gradient(
    to bottom,
    transparent,
    transparent 31px,
    color-mix(in srgb, var(--muted-foreground) 20%, transparent) 31px,
    color-mix(in srgb, var(--muted-foreground) 20%, transparent) 32px
  )`,
  backgroundPosition: "0 24px",
};

export default function RecordDetailBody({
  record,
}: {
  record: RecordDetail;
}): JSX.Element {
  const [isExpanded, setIsExpanded] = useState(false);

  const body = useMemo(
    () => stripMetaFromContents(record.contents),
    [record.contents]
  );
  const sanitized = DOMPurify.sanitize(body);
  const shouldShowToggle = useMemo(() => body.length > 200, [body]);

  return (
    <div
      className="px-5 py-5 border-b border-border"
      style={LINED_PAPER_STYLE}
    >
      <p
        dangerouslySetInnerHTML={{ __html: sanitized }}
        className={[
          "whitespace-pre-wrap text-sm text-foreground leading-8",
          !isExpanded && shouldShowToggle
            ? "overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:6]"
            : "",
        ]
          .filter(Boolean)
          .join(" ")}
      />
      {shouldShowToggle && (
        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="mt-3 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
        >
          {isExpanded ? "접기" : "더 보기"}
        </button>
      )}
    </div>
  );
}

import { useMemo, useState } from "react";
import DOMPurify from "dompurify";

export default function RecordContents({
  contents,
  showName,
  artistName,
}: {
  contents: string;
  showName?: string;
  artistName?: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const sanitizedContents = DOMPurify.sanitize(contents);
  const shouldShowMoreButton = useMemo(() => contents.length > 180, [contents]);

  const artists = artistName
    ? artistName
        .split(",")
        .map((n) => n.trim())
        .filter(Boolean)
    : [];

  return (
    <div className="p-4 border-b border-border prose prose-base max-w-none">
      {(showName?.trim() || artists.length > 0) && (
        <div className=" px-3 py-2 flex flex-wrap items-center gap-2 mb-4 not-prose">
          {showName?.trim() && (
            <span className="text-base font-semibold text-foreground">
              {showName}
            </span>
          )}
          {showName?.trim() && artists.length > 0 && (
            <span className="text-muted-foreground/40 text-xs">|</span>
          )}
          {artists.map((name) => (
            <span
              key={name}
              className="px-2 py-0.5 rounded-full bg-background text-foreground text-xs font-medium shadow-sm"
            >
              {name}
            </span>
          ))}
        </div>
      )}
      <p
        dangerouslySetInnerHTML={{ __html: sanitizedContents }}
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

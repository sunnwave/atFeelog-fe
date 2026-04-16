import { ChevronRight } from "lucide-react";
import { JSX } from "react";

type KeywordVariant = "feelog" | "market";

const colors: Record<
  KeywordVariant,
  {
    hover: string;
    button: string;
    overlay: string;
    rank: string;
    text: string;
    arrow: string;
  }
> = {
  feelog: {
    hover: "hover:border-point-indigo/50",
    button: "border-point-indigo bg-point-indigo/5",
    overlay: "via-point-indigo/10",
    rank: "bg-point-indigo",
    text: "text-point-indigo",
    arrow: "group-hover:text-point-indigo",
  },
  market: {
    hover: "hover:border-point-emerald/50",
    button: "border-point-emerald bg-point-emerald/5",
    overlay: "via-point-emerald/10",
    rank: "bg-point-emerald",
    text: "text-point-emerald",
    arrow: "group-hover:text-point-emerald",
  },
};

export default function KeywordItem({
  keyword,
  active,
  variant,
}: {
  keyword: { rank: number; name: string };
  active: boolean;
  variant: KeywordVariant;
}): JSX.Element {
  // TODO: 키워드 클릭 시 해당 키워드로 검색 페이지 이동 (현재는 클릭 이벤트만 정의)
  const onKeywordClick = (name: string) => {
    console.log(name);
  };

  const c = colors[variant];

  return (
    <button
      key={keyword.rank}
      onClick={() => onKeywordClick(keyword.name)}
      className={`w-full flex items-center gap-3 p-3 rounded-xl bg-background/60 backdrop-blur-sm border transition-all duration-300 group relative overflow-hidden cursor-pointer
              ${
                active
                  ? `${c.button} scale-[1.02] shadow-md`
                  : `border-border/50 ${c.hover} hover:bg-muted`
              }
            `}
    >
      {/* Highlight animation overlay */}
      {active && (
        <div
          className={`absolute inset-0 bg-gradient-to-r from-transparent ${c.overlay} to-transparent animate-shimmer`}
        />
      )}

      {/* rank */}
      <div
        className={`
              flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm transition-transform relative z-10
              ${
                active
                  ? `scale-110 ${c.rank} text-white`
                  : "bg-muted text-muted-foreground"
              }
            `}
      >
        {keyword.rank}
      </div>

      {/* keyword */}
      <div className="flex-1 min-w-0 text-left relative z-10">
        <p
          className={`font-semibold truncate transition-colors ${
            active ? `${c.text}` : "text-foreground"
          }`}
        >
          {keyword.name}
        </p>
      </div>

      <ChevronRight
        className={`w-5 h-5 transition-all flex-shrink-0 relative z-10 ${
          active
            ? `translate-x-1 ${c.text}`
            : `text-muted-foreground group-hover:translate-x-1 ${c.arrow}`
        }`}
      />
    </button>
  );
}

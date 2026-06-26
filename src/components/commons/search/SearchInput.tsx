import { Search, X } from "lucide-react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
};

export default function SearchInput({
  value,
  onChange,
  placeholder = "공연, 아티스트 검색",
}: Props) {
  return (
    <>
      <Search
        className="h-4 w-4 shrink-0 text-muted-foreground"
        strokeWidth={1.8}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-foreground outline-none placeholder:text-muted-foreground"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="검색어 초기화"
          className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </>
  );
}

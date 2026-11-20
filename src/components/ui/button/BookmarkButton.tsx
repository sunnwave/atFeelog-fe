import { cn } from "@/shared/utils";
import { JSX, useEffect, useState } from "react";
import { Bookmark } from "lucide-react";

type BookmarkButtonProps = {
  isSaved: boolean;
  onToggle?: (nextSaved: boolean) => void;
  className?: string;
};

export default function BookmarkButton({
  isSaved,
  onToggle,
  className,
}: BookmarkButtonProps): JSX.Element {
  const [saved, setSaved] = useState(isSaved);

  useEffect(() => {
    setSaved(isSaved);
  }, [isSaved]);

  const handleClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
    const nextSaved = !saved;
    setSaved(nextSaved);
    onToggle?.(nextSaved);
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "flex items-center transition-colors group/like gap-1 cursor-pointer",
        className,
      )}
      aria-label="북마크"
    >
      <Bookmark
        className={cn(
          "w-3 h-3 @card-xs:w-3.5 @card-xs:h-3.5 @card-sm:w-4 @card-sm:h-4 @card-md:w-5 @card-md:h-5 transition-colors",
          saved ? "text-point" : "text-muted-foreground",
        )}
        fill={saved ? "currentColor" : "none"}
      />
    </button>
  );
}

import { ICON_COLOR, IconColor, IconSize, ICON_SIZE } from "@/shared/tokens";
import { cn } from "@/shared/utils";
import { Heart } from "lucide-react";
import { JSX, useEffect, useState } from "react";

export default function HeartIcon({
  isLiked,
  likeCount,
  iconSize = "sm",
  direction = "col",
  iconColor = "white",
  className,
  onToggle,
}: {
  isLiked: boolean;
  likeCount?: number;
  iconSize?: IconSize;
  iconColor?: IconColor;
  direction?: "col" | "row";
  className?: string;
  onToggle?: (nextLiked: boolean) => void;
}): JSX.Element {
  const s = ICON_SIZE[iconSize];
  const c = ICON_COLOR[iconColor];

  const [liked, setLiked] = useState(isLiked);
  const [likes, setLikes] = useState(likeCount ?? 0);

  useEffect(() => { setLiked(isLiked); }, [isLiked]);
  useEffect(() => { setLikes(likeCount ?? 0); }, [likeCount]);

  const isRow = direction === "row";

  const handelClickLike = (e: React.MouseEvent): void => {
    e.stopPropagation();
    const nextLiked = !liked;
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
    setLiked(nextLiked);
    onToggle?.(nextLiked);
  };

  return (
    <button
      onClick={handelClickLike}
      className={cn(
        "flex items-center transition-colors group/like",
        isRow ? `flex-row ${s.gapRow}` : `flex-col ${s.gapCol}`,
        className,
      )}
      aria-label="좋아요"
    >
      <Heart
        className={cn(
          s.icon,
          "transition-colors",
          liked ? "text-point" : `${c.icon} group-hover/like:text-point`,
          className,
        )}
        fill={liked ? "currentColor" : "none"}
      />
      <span className={cn(s.text, liked ? "text-point" : c.text, className)}>
        {likes}
      </span>
    </button>
  );
}

// import { ICON_COLOR, IconColor, IconSize, ICON_SIZE } from "@/shared/tokens";
import { cn } from "@/shared/utils";
import { Heart } from "lucide-react";
import { JSX, useEffect, useState } from "react";

type LikeButtonProps = {
  isLiked: boolean;
  onToggle?: (nextLiked: boolean) => void;
  likeCount?: number;
  className?: string;
};

export default function LikeButton({
  isLiked,
  onToggle,
  likeCount,
  className,
}: LikeButtonProps): JSX.Element {
  const [liked, setLiked] = useState(isLiked);
  const [likes, setLikes] = useState(likeCount ?? 0);

  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);
  useEffect(() => {
    setLikes(likeCount ?? 0);
  }, [likeCount]);

  const handleClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
    const nextLiked = !liked;
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
    setLiked(nextLiked);
    onToggle?.(nextLiked);
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "flex items-center transition-colors group/like gap-1 ",
        className,
      )}
      aria-label="좋아요"
    >
      <Heart
        className={cn(
          "w-3 h-3  @card-sm:w-4 @card-sm:h-4 @card-md:w-4.5 @card-md:h-4.5 transition-colors",
          liked ? "text-point" : "text-muted-foreground",
        )}
        fill={liked ? "currentColor" : "none"}
      />
      {likeCount !== undefined && (
        <span
          className={cn(
            `text-[10px] @card-sm:text-xs @card-md:text-base`,
            liked ? "text-point" : "text-muted-foreground",
          )}
        >
          {likes}
        </span>
      )}
    </button>
  );
}

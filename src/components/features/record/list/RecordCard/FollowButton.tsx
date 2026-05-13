import { cn } from "@/shared/utils/cn";
import { Check } from "lucide-react";
import { JSX, useState } from "react";
import { CARD_UI_SIZE } from "@/shared/tokens";

export default function FollowButton({
  initialIsFollowing = false,
  size = "lg",
}: {
  initialIsFollowing?: boolean;
  size?: CARD_UI_SIZE;
}): JSX.Element {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

  const sizeCls =
    size === "lg"
      ? "px-4 py-1.5 text-sm rounded-full"
      : "px-3 py-1 text-xs rounded-full";

  const onClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFollowing((prev) => !prev);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        sizeCls,
        "font-semibold transition-colors backdrop-blur-sm shrink-0 flex items-center gap-1",
        isFollowing
          ? "  border-white/40 text-white hover:bg-white/30 active:bg-white/40"
          : "border border-white/50 text-white/90 hover:bg-white/20 active:bg-white/30",
      )}
      aria-label={isFollowing ? "팔로우 취소" : "팔로우"}
    >
      {isFollowing && <Check className="w-3 h-3" />}
      {isFollowing ? "팔로우중" : "팔로우"}
    </button>
  );
}

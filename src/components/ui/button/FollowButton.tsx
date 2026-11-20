import { Button } from "./Button";
import { cn } from "@/shared/utils/cn";

export default function FollowButton({
  isFollowing,
  onFollow,
  className,
  size = "md",
}: {
  isFollowing?: boolean;
  onFollow?: () => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}): JSX.Element {
  return (
    <Button
      variant={isFollowing ? "outline" : "solid"}
      tone={isFollowing ? "neutral" : "primary"}
      size={size}
      onClick={onFollow}
      className={cn("rounded-full font-semibold", className)}
    >
      {isFollowing ? "팔로잉" : "팔로우"}
    </Button>
  );
}

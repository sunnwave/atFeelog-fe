import { useState } from "react";
import { Button } from "./Button";
import { cn } from "@/shared/utils/cn";

export default function FollowButton({
  isFollowing,
  className,
}: {
  isFollowing: boolean;
  className?: string;
}): JSX.Element {
  const [isFollowingState, setIsFollowingState] = useState(isFollowing);

  const handleClickFollow = (e: React.MouseEvent): void => {
    e.stopPropagation();
    setIsFollowingState((prev) => !prev);
  };

  return (
    <Button
      variant={isFollowingState ? "outline" : "solid"}
      size="sm"
      tone={isFollowingState ? "neutral" : "primary"}
      onClick={handleClickFollow}
      className={cn("rounded-full font-semibold", className)}
    >
      {isFollowingState ? "팔로잉" : "팔로우"}
    </Button>
  );
}

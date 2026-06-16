import { useState } from "react";
import Avatar from "@/components/ui/avatar/Avatar";
import { Button } from "@/components/ui/button/Button";
import type { UserRowProps } from "../../types";

export default function UserRow({
  user,
  isFollowing,
  isMe,
  onFollow,
}: UserRowProps) {
  const [following, setFollowing] = useState(isFollowing);
  const [loading, setLoading] = useState(false);

  const handleFollow = async () => {
    setLoading(true);
    try {
      await onFollow();
      setFollowing((f) => !f);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
      <Avatar user={user} size="sm" type="filled" clickable />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-foreground truncate">
          {user.name}
        </p>
      </div>
      {!isMe && (
        <Button
          variant={following ? "outline" : "solid"}
          tone={following ? "neutral" : "primary"}
          size="sm"
          disabled={loading}
          onClick={handleFollow}
        >
          {following ? "팔로잉" : "+ 팔로우"}
        </Button>
      )}
    </div>
  );
}

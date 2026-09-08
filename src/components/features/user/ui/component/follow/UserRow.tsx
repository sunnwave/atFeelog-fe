import Avatar from "@/components/ui/avatar/Avatar";
import type { UserRowProps } from "../../../types";
import FollowButton from "@/components/ui/button/FollowButton";
import { useAddFollow, useIsConnected } from "@/shared/hooks/user";

export default function UserRow({ user, isMe }: UserRowProps) {
  const { isConnected } = useIsConnected(user.id);
  const { onAddFollow } = useAddFollow();

  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
      <Avatar user={user} size="sm" clickable />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-foreground truncate">
          {user.name}
        </p>
      </div>
      {!isMe && (
        <FollowButton
          isFollowing={isConnected}
          onFollow={() => onAddFollow(user.id)}
        />
      )}
    </div>
  );
}

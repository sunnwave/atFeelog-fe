import { Button } from "@/components/ui/button/Button";
import { useRouter } from "next/router";
import FollowButton from "@/components/ui/button/FollowButton";
import { useToggleFollow, useIsConnected } from "@/shared/hooks/user";

type ProfileActionsProps = {
  isMe: boolean;
  userId: string;
};

export default function ProfileActions({ isMe, userId }: ProfileActionsProps) {
  const router = useRouter();

  const handleEditProfile = () => {
    router.push("/user/me/edit");
  };

  const { isConnected } = useIsConnected(userId);
  const { onToggleFollow } = useToggleFollow();

  if (isMe) {
    return (
      <div className="flex gap-2 shrink-0">
        <Button
          variant="solid"
          tone="primary"
          size="default"
          onClick={handleEditProfile}
        >
          프로필 수정
        </Button>
      </div>
    );
  }

  return (
    <div className="flex gap-2 shrink-0">
      <FollowButton
        isFollowing={isConnected}
        onFollow={() => onToggleFollow(userId)}
      />
    </div>
  );
}

import { Button } from "@/components/ui/button/Button";
import type { ProfileActionsProps } from "../../types";
import { useRouter } from "next/router";
import FollowButton from "@/components/ui/button/FollowButton";

export default function ProfileActions({
  isMe,
  isFollowing,
  onFollow,
}: ProfileActionsProps) {
  const router = useRouter();

  const handleEditProfile = () => {
    router.push("/user/me/edit");
  };

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
      <FollowButton isFollowing={isFollowing} onFollow={onFollow} />
    </div>
  );
}

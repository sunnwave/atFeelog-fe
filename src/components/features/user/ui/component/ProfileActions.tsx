import { Button } from "@/components/ui/button/Button";
import type { ProfileActionsProps } from "../../types";
import { useRouter } from "next/router";

export default function ProfileActions({
  isMe,
  isFollowing,
  onAddFollow,
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
      <Button
        variant={isFollowing ? "outline" : "solid"}
        tone={isFollowing ? "neutral" : "primary"}
        size="default"
        onClick={onAddFollow}
      >
        {isFollowing ? "팔로잉" : "팔로우"}
      </Button>
    </div>
  );
}

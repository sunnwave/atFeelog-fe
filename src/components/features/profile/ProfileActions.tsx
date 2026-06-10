import { Button } from "@/components/ui/button/Button";

type Props = {
  isMe: boolean;
  isFollowing?: boolean;
  onAddFollow?: () => void;
};

export default function ProfileActions({
  isMe,
  isFollowing,
  onAddFollow,
}: Props) {
  if (isMe) {
    return (
      <div className="flex gap-2 shrink-0">
        <Button variant="solid" tone="primary" size="default">
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

import { Button } from "@/components/ui/button/Button";

type Props = {
  isMe: boolean;
  isFollowing?: boolean;
};

export default function ProfileActions({ isMe, isFollowing }: Props) {
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
      >
        {isFollowing ? "Following" : "Follow"}
      </Button>
    </div>
  );
}

import { useRef } from "react";
import { Camera } from "lucide-react";
import Avatar from "@/components/ui/avatar/Avatar";
import { User } from "@/api/adapters/types/user";
import { Button } from "@/components/ui/button/Button";
import { IconButton } from "@/components/ui/button/IconButton";

interface ProfileAvatarEditorProps {
  user: User | null;
  isUploading: boolean;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ProfileAvatarEditor({
  user,
  isUploading,
  onFileChange,
}: ProfileAvatarEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="px-8 py-10 border-b border-foreground/15 flex items-center gap-7">
      <div className="relative">
        <Avatar user={user} size="lg" />

        <IconButton
          aria-label="프로필 사진 변경"
          size="sm"
          variant="solid"
          tone="primary"
          shape="pill"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="absolute bottom-0 right-0"
        >
          <Camera />
        </IconButton>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onFileChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-md font-medium text-foreground">{user?.name}</p>
        <p className="text-xs text-muted-foreground">{user?.email}</p>
        <Button
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          size="sm"
        >
          사진 변경
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        {isUploading ? "업로드 중..." : ""}
      </p>
    </div>
  );
}

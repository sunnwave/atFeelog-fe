import { useRef } from "react";
import { Camera } from "lucide-react";
import Avatar from "@/components/ui/avatar/Avatar";
import { User } from "@/api/adapters/types/user";
import { Button } from "@/components/ui/button/Button";

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
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-foreground border-2 border-background flex items-center justify-center text-background hover:bg-foreground/90 transition-colors disabled:opacity-50"
          aria-label="프로필 사진 변경"
        >
          <Camera className="w-3.5 h-3.5" />
        </button>
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
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="text-xs font-semibold text-primary mt-2"
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

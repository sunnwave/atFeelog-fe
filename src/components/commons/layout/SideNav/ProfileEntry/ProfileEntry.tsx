import { useNavigation } from "@/shared/hooks/ui/useNavigation";
import Avatar from "@/components/ui/avatar/Avatar";
import { ChevronRight } from "lucide-react";
import { JSX } from "react";
import { Button } from "@/components/ui/button/Button";
import type { LoggedInUser } from "@/shared/stores";

interface ProfileEntryProps {
  user?: LoggedInUser;
}

export default function ProfileEntry({ user: me = null }: ProfileEntryProps): JSX.Element {
  const isLoggedIn = !!me?._id;

  const { onClickNavigation } = useNavigation();

  return (
    <div className="p-4 border-b border-border">
      <Button
        variant="outline"
        onClick={
          isLoggedIn ? onClickNavigation("/me") : onClickNavigation("/login")
        }
        className="w-full h-auto rounded-2xl !p-4 text-left flex items-center gap-3 group-hover:flex border-border"
      >
        {isLoggedIn && (
          <Avatar user={me ?? undefined} size="md" type="filled" />
        )}
        <div className="flex-1 min-w-0 flex flex-col items-start">
          <p className="font-semibold text-base text-foreground truncate">
            {isLoggedIn ? me?.name : "로그인해주세요"}
          </p>
          <p className="text-sm font-medium text-muted-foreground">
            {isLoggedIn ? "마이페이지로 이동" : "로그인하고 내 기록을 관리해요"}
          </p>
        </div>
        <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
      </Button>
    </div>
  );
}

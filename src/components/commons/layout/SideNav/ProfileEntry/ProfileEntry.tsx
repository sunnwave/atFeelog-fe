import Avatar from "@/components/ui/avatar/Avatar";
import { Button } from "@/components/ui/button/Button";
import { User } from "@/api/adapters/types/user";
import { useNavigation } from "@/shared/hooks/ui/useNavigation";

interface ProfileEntryProps {
  user?: User | null;
}

export default function ProfileEntry({ user: me = null }: ProfileEntryProps) {
  const isLoggedIn = !!me?.id;
  const { onClickNavigation } = useNavigation();

  return (
    <div className="px-5 py-5 border-b-[1.5px] border-foreground">
      <Button
        variant="ghost"
        tone="primary"
        onClick={
          isLoggedIn ? onClickNavigation("/settings") : onClickNavigation("/login")
        }
        className={[
          "h-auto w-full rounded-none px-0! py-0!",
          "justify-start gap-3 text-left",
          "normal-case tracking-normal hover:bg-transparent active:bg-transparent",
        ].join(" ")}
      >
        {isLoggedIn ? (
          <Avatar user={me} size="md" type="filled" />
        ) : (
          <Avatar size="md" />
        )}

        <div className="min-w-0 flex-1">
          <p className="w-full truncate text-base font-semibold leading-tight text-foreground">
            {isLoggedIn ? `${me?.name} 님` : "로그인해주세요"}
          </p>

          <p className="mt-1 w-full truncate text-sm font-medium leading-tight text-muted-foreground">
            {isLoggedIn ? "내 프로필 관리" : "나만의 기록 공간을 시작해요"}
          </p>
        </div>
      </Button>
    </div>
  );
}

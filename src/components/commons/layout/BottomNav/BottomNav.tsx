import Link from "next/link";
import { useRecoilValue } from "recoil";
import BottomNavItem from "./BottomNavItem";
import { Plus, User } from "lucide-react";
import Avatar from "@/components/ui/avatar/Avatar";
import { Button } from "@/components/ui/button/Button";
import { useNavigation } from "@/shared/hooks/ui/useNavigation";
import { useConfirmPreset } from "@/shared/hooks/ui/useConfirmPreset";
import { SIDE_NAV_ITEMS } from "@/shared/constants";
import { loggedInUserState } from "@/shared/stores";
import { useRouter } from "next/router";

export default function BottomNav() {
  const router = useRouter();
  const me = useRecoilValue(loggedInUserState);
  const isLoggedIn = !!me;

  const { onClickNavigation } = useNavigation();
  const { openConfirmPreset } = useConfirmPreset();

  const onClickWrite = () => {
    if (!isLoggedIn) {
      openConfirmPreset("loginRequired", {
        onConfirm: onClickNavigation("/login"),
      });
      return;
    }

    router.push("/feelog/new");
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border safe-area-inset-bottom">
      <div className="grid grid-cols-6 items-center h-16 max-w-2xl mx-auto px-2">
        {SIDE_NAV_ITEMS.slice(0, 2).map((item) => (
          <BottomNavItem key={item.href} {...item} />
        ))}
        {/* Write (+) */}
        <div className="relative flex flex-col items-center gap-1 h-full justify-center">
          <Button
            className="size-12 rounded-full -mt-3 shadow-lg hover:shadow-xl hover:scale-105"
            onClick={onClickWrite}
          >
            <Plus className="w-6 h-6" strokeWidth={2.5} />
          </Button>
          <span className="text-xs font-semibold">작성</span>
        </div>
        {SIDE_NAV_ITEMS.slice(2).map((item) => (
          <BottomNavItem key={item.href} {...item} />
        ))}

        {isLoggedIn ? (
          <Link
            href="/user/me/edit"
            className="flex flex-1 flex-col items-center justify-center"
          >
            <Avatar user={me ?? undefined} size="md" />
          </Link>
        ) : (
          <BottomNavItem href="/login" label="로그인" icon={User} />
        )}
      </div>
    </nav>
  );
}

import Link from "next/link";
import { useRecoilValue } from "recoil";
import BottomNavItem from "./BottomNavItem";
import { Plus, User } from "lucide-react";
import Avatar from "@/components/ui/avatar/Avatar";
import { Button } from "@/components/ui/button/Button";
import { useNavigation } from "@/shared/hooks/ui/useNavigation";
import { useConfirmPreset } from "@/shared/hooks/ui/useConfirmPreset";
import { BOTTOM_NAV_ITEMS } from "@/shared/constants";
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
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t-[1.5px] border-foreground safe-area-inset-bottom">
      <div className="grid grid-cols-5 items-center h-[50px] max-w-2xl mx-auto px-2">
        {BOTTOM_NAV_ITEMS.slice(0, 2).map((item) => (
          <BottomNavItem key={item.href} {...item} />
        ))}
        {/* Write (+) */}
        <div className="flex items-center justify-center h-full">
          <Button
            className="size-11 rounded-full  shadow-lg hover:shadow-xl hover:scale-105"
            onClick={onClickWrite}
          >
            <Plus className="w-5 h-5" strokeWidth={2.5} />
          </Button>
        </div>
        {BOTTOM_NAV_ITEMS.slice(2).map((item) => (
          <BottomNavItem key={item.href} {...item} />
        ))}

        {isLoggedIn ? (
          <div className="flex items-center justify-center h-full">
            <Avatar user={me ?? undefined} size="sm" clickable />
          </div>
        ) : (
          <BottomNavItem href="/login" label="로그인" icon={User} />
        )}
      </div>
    </nav>
  );
}

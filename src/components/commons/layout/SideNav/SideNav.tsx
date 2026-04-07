import { useRecoilValue } from "recoil";
import Logo from "../../../ui/logo/Logo";
import ProfileEntry from "./ProfileEntry/ProfileEntry";
import NavItem from "./NavItem";
import { LogOut } from "lucide-react";
import { useNavigation } from "@/shared/hooks/ui/useNavigation";
import { useState } from "react";
import { ActionSheet } from "../../actionSheet/ActionSheet";
import { buildWriteActionSheetOptions } from "@/shared/constants/actionSheetOptions";
import { SIDE_NAV_ITEMS } from "@/shared/constants/navigation";
import { Button } from "@/components/ui/button/Button";
import { useConfirmPreset } from "@/shared/hooks/ui/useConfirmPreset";
import useLogoutUser from "@/shared/hooks/auth/useLogoutUser";
import { loggedInUserState } from "@/shared/stores";

export default function SideNav() {
  const me = useRecoilValue(loggedInUserState);
  const isLoggedIn = !!me;

  const { onClickNavigation } = useNavigation();
  const { openConfirmPreset } = useConfirmPreset();

  const { onLogoutUser } = useLogoutUser();

  const [writeSheetOpen, setWriteSheetOpen] = useState(false);
  const options = buildWriteActionSheetOptions(onClickNavigation);

  const onClickWrite = () => {
    if (!isLoggedIn) {
      openConfirmPreset("loginRequired", {
        onConfirm: onClickNavigation("/login"),
      });
      return;
    }
    setWriteSheetOpen(true);
  };

  const onClickLogout = () => {
    openConfirmPreset("logout", {
      onConfirm: () => {
        onLogoutUser();
      },
    });
  };

  return (
    <div className="h-full w-full bg-card border-r border-border">
      <div className="p-6 border-b border-border">
        <Logo size="lg" showSubtitle />
      </div>
      <ProfileEntry />
      <nav className="flex flex-col overflow-y-auto p-4 space-y-2">
        <Button
          variant="outline"
          size="lg"
          className="hover:scale-[0.98]"
          onClick={onClickWrite}
        >
          작성하기
        </Button>
        {SIDE_NAV_ITEMS.map((item) => (
          <NavItem key={item.label} nav={item} />
        ))}
      </nav>
      {isLoggedIn && (
        <div className="pt-2 px-4 border-t border-border">
          <Button
            variant="ghost"
            className="justify-start w-full"
            onClick={onClickLogout}
          >
            <LogOut className="w-4.5 h-4.5" />
            <span>로그아웃</span>
          </Button>
        </div>
      )}

      <ActionSheet
        options={options}
        isOpen={writeSheetOpen}
        onClose={() => setWriteSheetOpen(false)}
        title="무엇을 작성할까요?"
      />
    </div>
  );
}

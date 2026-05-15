import { useState } from "react";
import { LogOut } from "lucide-react";
import { useRecoilValue } from "recoil";

import Logo from "../../../ui/logo/Logo";
import ProfileEntry from "./ProfileEntry/ProfileEntry";
import NavItem from "./NavItem";

import { ActionSheet } from "../../actionSheet/ActionSheet";
import { Button } from "@/components/ui/button/Button";

import { buildWriteActionSheetOptions } from "@/shared/constants/actionSheetOptions";
import { SIDE_NAV_ITEMS } from "@/shared/constants/navigation";
import { useNavigation } from "@/shared/hooks/ui/useNavigation";
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
    <aside className="flex h-full w-full flex-col border-r-[1.5px] border-foreground bg-card">
      <div className="border-b-[1.5px] border-foreground px-6 py-6">
        <Logo size="lg" />
      </div>

      <ProfileEntry user={me} />

      <div className="px-6 py-5">
        <Button
          variant="solid"
          tone="primary"
          size="lg"
          className={[
            "w-full rounded-none",
            "font-black uppercase tracking-[0.14em]",
            "hover:translate-x-px hover:translate-y-px",
            "active:translate-x-0.5 active:translate-y-0.5",
            "active:shadow-none",
          ].join(" ")}
          onClick={onClickWrite}
        >
          Write
        </Button>
      </div>

      <nav className="flex flex-1 flex-col overflow-y-auto ">
        {SIDE_NAV_ITEMS.map((item) => (
          <NavItem key={item.label} nav={item} />
        ))}
      </nav>

      {isLoggedIn && (
        <div className="border-t border-border px-6 py-5">
          <Button
            variant="ghost"
            tone="primary"
            size="default"
            className={[
              "w-full justify-start rounded-none px-0",
              "normal-case tracking-normal",
              "text-muted-foreground",
              "hover:bg-transparent hover:text-foreground",
            ].join(" ")}
            onClick={onClickLogout}
          >
            <LogOut className="h-4.5 w-4.5" />
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
    </aside>
  );
}

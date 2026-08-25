import { useRecoilValue } from "recoil";

import Logo from "../../../ui/logo/Logo";
import NavItem from "./NavItem";

import {
  SIDE_NAV_ITEMS,
  WRITE_NAV_ITEM,
  LOGOUT_NAV_ITEM,
} from "@/shared/constants/navigation";
import { useNavigation } from "@/shared/hooks/ui/useNavigation";
import { useConfirmPreset } from "@/shared/hooks/ui/useConfirmPreset";
import useLogoutUser from "@/shared/hooks/auth/useLogoutUser";
import { loggedInUserState } from "@/shared/stores";
import { useRouter } from "next/router";
import Avatar from "@/components/ui/avatar/Avatar";

export default function SideNav() {
  const router = useRouter();
  const me = useRecoilValue(loggedInUserState);
  const isLoggedIn = !!me;

  const { onClickNavigation } = useNavigation();
  const { openConfirmPreset } = useConfirmPreset();

  const { onLogoutUser } = useLogoutUser();

  const onClickWrite = () => {
    if (!isLoggedIn) {
      openConfirmPreset("loginRequired", {
        onConfirm: onClickNavigation("/login"),
      });
      return;
    }
    router.push("/feelog/new");
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
      <div className="border-b-[1.5px] border-foreground flex justify-center items-center px-3.5 py-4">
        {/* TODO: 정사각 로고 디자인 후 교체 */}
        <Logo size="sm" />
      </div>

      {/* profile entry */}
      <div className="flex items-center border-b-[1.5px] py-3">
        <div className="w-16 flex justify-center shrink-0">
          <Avatar user={me} size="sm" clickable />
        </div>
        <span className="hidden group-hover:inline truncate text-sm font-semibold leading-tight text-foreground whitespace-nowrap">
          {isLoggedIn ? `${me!.name}` : "로그인해주세요"}
        </span>
      </div>

      <NavItem
        nav={WRITE_NAV_ITEM}
        onClick={onClickWrite}
        cta
        className="border-b-[1.5px] border-foreground"
      />
      <nav className="flex flex-1 flex-col overflow-y-auto ">
        {SIDE_NAV_ITEMS.map((item) => (
          <NavItem key={item.label} nav={item} />
        ))}
      </nav>

      {isLoggedIn && (
        <NavItem
          nav={LOGOUT_NAV_ITEM}
          onClick={onClickLogout}
          className="border-t"
        />
      )}
    </aside>
  );
}

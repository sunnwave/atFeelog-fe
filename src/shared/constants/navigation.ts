import { Archive, Home, LayoutGrid, LucideIcon, Search } from "lucide-react";

export const SIDE_NAV_ITEMS = [
  { tab: "home", href: "/", label: "Home", icon: Home },
  { tab: "feelog", href: "/feelog", label: "Feed", icon: LayoutGrid },
  { tab: "shows", href: "/shows", label: "Shows", icon: Search },
  { tab: "user-me", href: "/user/me", label: "My Log", icon: Archive },
] as const satisfies ReadonlyArray<{
  tab: string;
  label: string;
  href: string;
  icon: LucideIcon;
}>;

export type TabType = (typeof SIDE_NAV_ITEMS)[number]["tab"];
export type SideNavItemType = (typeof SIDE_NAV_ITEMS)[number];

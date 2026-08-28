import {
  Home,
  LayoutGrid,
  LogOut,
  LucideIcon,
  Plus,
  Search,
} from "lucide-react";

export const WRITE_NAV_ITEM = {
  tab: "write",
  label: "write",
  icon: Plus,
} as const;
export const LOGOUT_NAV_ITEM = {
  tab: "logout",
  label: "Logout",
  icon: LogOut,
} as const;

export const SIDE_NAV_ITEMS = [
  { tab: "home", href: "/", label: "Home", icon: Home },
  { tab: "feelog", href: "/feelog", label: "Feed", icon: LayoutGrid },
  { tab: "shows", href: "/shows", label: "Shows", icon: Search },
] as const satisfies ReadonlyArray<{
  tab: string;
  label: string;
  href?: string;
  icon: LucideIcon;
}>;

export const BOTTOM_NAV_ITEMS = [
  { tab: "home", href: "/", label: "Home", icon: Home },
  { tab: "feelog", href: "/feelog", label: "Feed", icon: LayoutGrid },
  { tab: "shows", href: "/shows", label: "Shows", icon: Search },
] as const satisfies ReadonlyArray<{
  tab: string;
  label: string;
  href: string;
  icon: LucideIcon;
}>;

export const BOTTOM_NAV_ITEMS = [
  { tab: "home", href: "/", label: "Home", icon: Home },
  { tab: "feelog", href: "/feelog", label: "Feed", icon: LayoutGrid },
  { tab: "shows", href: "/shows", label: "Shows", icon: Search },
] as const satisfies ReadonlyArray<{
  tab: string;
  label: string;
  href: string;
  icon: LucideIcon;
}>;

export type TabType = (typeof SIDE_NAV_ITEMS)[number]["tab"];
export type SideNavItemType = (typeof SIDE_NAV_ITEMS)[number];
export type NavItemType = {
  tab: string;
  label: string;
  href?: string;
  icon: LucideIcon;
};

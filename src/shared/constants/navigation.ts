import { Archive, Home, LayoutGrid, LucideIcon } from "lucide-react";

export const SIDE_NAV_ITEMS = [
  { tab: "home", href: "/", label: "Home", icon: Home },
  { tab: "records", href: "/records", label: "Feelog", icon: LayoutGrid },
  { tab: "my-log", href: "/my-log", label: "My Log", icon: Archive },
] as const satisfies ReadonlyArray<{
  tab: string;
  label: string;
  href: string;
  icon: LucideIcon;
}>;

export type TabType = (typeof SIDE_NAV_ITEMS)[number]["tab"];
export type SideNavItemType = (typeof SIDE_NAV_ITEMS)[number];

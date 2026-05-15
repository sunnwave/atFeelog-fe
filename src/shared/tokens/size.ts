import { AvatarSize } from "@/components/ui/avatar/Avatar";
import { IconSize } from "./iconSize";

export type CARD_UI_SIZE = "sm" | "lg";

export type UISizeToken = {
  pad: string;
  bookmarkPos: string;
  bottomPos: string;

  title: string;
  body: string;
  meta: string;
  caption: string;

  icon: IconSize;
  bookmarkIcon: string;

  avatar: AvatarSize;
  gap: string;

  titleClamp: string;
  bodyClamp: string;
};

export const UI_SIZE: Record<CARD_UI_SIZE, UISizeToken> = {
  sm: {
    pad: "p-4",
    bookmarkPos: "top-4 right-4",
    bottomPos: "bottom-4 left-4 right-4",

    title: "text-lg mb-1",
    body: "text-xs",
    meta: "text-sm",
    caption: "text-xs",

    icon: "sm" as IconSize,
    bookmarkIcon: "w-6 h-6",

    avatar: "xs" as AvatarSize,
    gap: "gap-3",

    titleClamp: "overflow-hidden whitespace-nowrap text-ellipsis",
    bodyClamp:
      "overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]",
  },

  lg: {
    pad: "p-8",
    bookmarkPos: "top-8 right-8",
    bottomPos: "bottom-8 left-8 right-8",

    title: "text-3xl mb-2",
    body: "text-lg",
    meta: "text-xl",
    caption: "text-base",

    icon: "xl" as IconSize,
    bookmarkIcon: "w-8 h-8",

    avatar: "sm" as AvatarSize,
    gap: "gap-4",

    titleClamp: "overflow-hidden whitespace-nowrap text-ellipsis",
    bodyClamp:
      "overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]",
  },
};

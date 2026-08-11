import { User } from "@/api/adapters/types/user";
import { cn, getProfileImage, pickAvatarColor } from "@/shared/utils";
import { User as UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { JSX } from "react";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "card";

const AVATAR_SIZE: Record<
  AvatarSize,
  { px: number; cls: string; iconCls: string }
> = {
  xs: { px: 24, cls: "h-6 w-6 text-xs font-medium", iconCls: "w-3 h-3" },
  sm: { px: 32, cls: "h-8 w-8 text-sm font-medium", iconCls: "w-4 h-4" },
  md: { px: 44, cls: "h-11 w-11 text-base font-semibold", iconCls: "w-6 h-6" },
  lg: {
    px: 72,
    cls: "h-[72px] w-[72px] text-2xl font-bold",
    iconCls: "w-10 h-10",
  },
  card: {
    px: 40,
    cls: "w-6 h-6 @card-xs:w-8 @card-xs:h-8 @card-md:w-10 @card-md:h-10 text-xs @card-xs:text-sm @card-md:text-base font-medium @card-md:font-semibold",
    iconCls: "w-3 h-3 @card-xs:w-4 @card-xs:h-4 @card-md:w-5 @card-md:h-5",
  },
};

/** 이름 정보 없는 유저의 이니셜 폴백 ("익명"에서 따옴) */
const INITIAL_FALLBACK = "익";

export default function Avatar({
  user,
  size = "sm",
  clickable = false,
  className,
}: {
  user?: User | null;
  size?: AvatarSize;
  clickable?: boolean;
  className?: string;
}): JSX.Element {
  const avatarUrl = getProfileImage(user?.picture);
  const s = AVATAR_SIZE[size];

  const isGuest = !user;

  const base =
    "rounded-full flex shrink-0 items-center justify-center overflow-hidden border border-foreground";

  const href =
    clickable && user?.id
      ? `/user/${user.id}?name=${encodeURIComponent(user.name)}${user.picture ? `&picture=${encodeURIComponent(user.picture)}` : ""}`
      : undefined;

  const wrap = (node: JSX.Element) =>
    href ? (
      <Link
        href={href}
        onClick={(e) => e.stopPropagation()}
        className="cursor-pointer hover:opacity-80 transition-opacity shrink-0"
      >
        {node}
      </Link>
    ) : (
      node
    );

  if (isGuest) {
    return (
      <>
        <div
          className={cn(
            base,
            s.cls,
            "bg-surface-soft text-foreground",
            className,
          )}
          aria-label="Guest Avatar"
        >
          <UserIcon className={s.iconCls} />
        </div>
      </>
    );
  }

  if (avatarUrl) {
    return wrap(
      <Image
        className={cn(base, s.cls, "object-cover", className)}
        src={avatarUrl}
        alt={`${user.name} 아바타`}
        width={s.px}
        height={s.px}
      />,
    );
  }

  // 이니셜 아바타 — color는 이 분기에서만 필요
  const color = pickAvatarColor(user.id);

  return wrap(
    <div
      className={cn(base, s.cls, color.bg, color.text, className)}
      aria-label={`${user.name} 아바타`}
    >
      {user.name[0] || INITIAL_FALLBACK}
    </div>,
  );
}

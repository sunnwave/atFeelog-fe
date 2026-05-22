import { User } from "@/api/adapters/types/user";
import { getProfileImage, pickAvatarColor } from "@/shared/utils";
import { User as UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { JSX } from "react";

export type AvatarSize = "xs" | "sm" | "md" | "lg";

export type AvatarType = "filled" | "outlined";

const AVATAR_SIZE: Record<
  AvatarSize,
  { px: number; cls: string; iconCls: string }
> = {
  xs: { px: 24, cls: "h-6 w-6 text-xs font-medium",    iconCls: "w-3 h-3"   },
  sm: { px: 32, cls: "h-8 w-8 text-sm font-medium",    iconCls: "w-4 h-4"   },
  md: { px: 44, cls: "h-11 w-11 text-base font-semibold", iconCls: "w-6 h-6" },
  lg: { px: 72, cls: "h-[72px] w-[72px] text-2xl font-bold", iconCls: "w-10 h-10" },
};

export default function Avatar({
  user,
  size = "sm",
  type = "outlined",
  clickable = false,
}: {
  user?: User | null;
  size?: AvatarSize;
  type?: AvatarType;
  clickable?: boolean;
}): JSX.Element {
  const avatarUrl = getProfileImage(user?.picture);
  const s = AVATAR_SIZE[size];

  const isGuest = !user;

  const key = user?.id || "guest";
  const color = pickAvatarColor(key);

  const base =
    "rounded-full flex shrink-0 items-center justify-center overflow-hidden";

  const href = clickable && user?.id ? `/feelog/${user.id}` : undefined;

  const wrap = (node: JSX.Element) =>
    href ? (
      <Link href={href} onClick={(e) => e.stopPropagation()} className="cursor-pointer hover:opacity-80 transition-opacity shrink-0">
        {node}
      </Link>
    ) : (
      node
    );

  if (isGuest) {
    return wrap(
      <div
        className={[
          base,
          s.cls,
          "border border-border bg-surface-soft text-muted-foreground",
        ].join(" ")}
        aria-label="Guest Avatar"
      >
        <UserIcon className={s.iconCls} />
      </div>
    );
  }

  if (avatarUrl) {
    return wrap(
      <Image
        className={`${base} object-cover`}
        src={avatarUrl}
        alt="User Avatar"
        width={s.px}
        height={s.px}
      />
    );
  }

  if (type === "outlined") {
    return wrap(
      <div
        className={[
          base,
          s.cls,
          "text-white font-semibold border border-white/30 bg-card/20",
        ].join(" ")}
        aria-label="User Avatar"
      >
        {user?.name?.[0] || "익"}
      </div>
    );
  }

  return wrap(
    <div
      className={[base, s.cls, "border"].join(" ")}
      style={{
        backgroundColor: color.bg,
        color: color.text,
        borderColor: color.border,
      }}
      aria-label="User Avatar"
    >
      {user?.name?.[0] || "익"}
    </div>
  );
}

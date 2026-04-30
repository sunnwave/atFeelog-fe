import { User } from "@/api/adapters/types/user";
import { getProfileImage, pickAvatarGradient } from "@/shared/utils";
import Image from "next/image";
import { JSX } from "react";

export type AvatarSize = "xs" | "sm" | "md" | "lg";

export type AvatarType = "filled" | "outlined";

const AVATAR_SIZE: Record<AvatarSize, { px: number; cls: string }> = {
  xs: { px: 32, cls: "h-8 w-8 text-sm font-semibold" },
  sm: { px: 36, cls: "h-9 w-9 text-sm font-semibold" },
  md: { px: 40, cls: "h-[40px] w-[40px] text-xl font-semibold" },
  lg: { px: 72, cls: "h-[72px] w-[72px] text-3xl font-bold" },
};

export default function Avatar({
  user,
  size = "sm",
  type = "outlined",
}: {
  user?: User | null;
  size?: AvatarSize;
  type?: AvatarType;
}): JSX.Element {
  const avatarUrl = getProfileImage(user?.picture);
  const s = AVATAR_SIZE[size];

  const key = user?.id || "anonymous";
  const g = pickAvatarGradient(key);
  const filledStyle =
    type === "filled"
      ? { backgroundImage: `linear-gradient(135deg, ${g.from}, ${g.to})` }
      : undefined;

  const base = "rounded-full flex items-center justify-center";

  return avatarUrl ? (
    <Image
      className={`${base} object-cover`}
      src={avatarUrl}
      alt="User Avatar"
      width={s.px}
      height={s.px}
    />
  ) : (
    <div
      className={`${base} ${s.cls} text-white font-semibold overflow-hidden ${
        type === "outlined" ? "bg-white/20 border border-white/30" : ""
      }`}
      style={filledStyle}
    >
      {user?.name?.[0] || "익"}
    </div>
  );
}

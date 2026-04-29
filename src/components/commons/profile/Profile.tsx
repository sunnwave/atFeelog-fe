import Avatar, { AvatarType } from "@/components/ui/avatar/Avatar";
import { JSX } from "react";
import { CARD_UI_SIZE, UI_SIZE } from "@/shared/tokens";
import { formatDate } from "@/shared/utils";
import { RecordDetail } from "@/api/adapters/types/record";

type ProfileTone = "primary" | "white";

export default function Profile({
  record,
  size = "lg",
  tone = "white",
}: {
  record: RecordDetail;
  tone?: ProfileTone;
  size?: CARD_UI_SIZE;
}): JSX.Element {
  const s = UI_SIZE[size];

  const Tone = {
    primary: {
      text: "text-foreground",
      subText: "text-muted-foreground",
      avatar: "filled",
    },
    white: {
      text: "text-white/90",
      subText: "text-white/70",
      avatar: "outlined",
    },
  } satisfies Record<
    ProfileTone,
    { text: string; subText: string; avatar: AvatarType }
  >;

  return (
    <div className={`flex items-center ${s.gap}`}>
      <Avatar
        user={record.user || undefined}
        size={s.avatar}
        type={Tone[tone].avatar}
      />
      <div className={`flex flex-col ${Tone[tone].text}`}>
        <p className={`${s.meta} font-bold max-w-35 truncate`}>
          {record.user?.name ?? "익명"}
        </p>
        <p className={`${s.caption} ${Tone[tone].subText}`}>
          {formatDate(record.createdAt)}
        </p>
      </div>
    </div>
  );
}

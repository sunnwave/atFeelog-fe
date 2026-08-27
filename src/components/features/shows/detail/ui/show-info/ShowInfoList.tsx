import { Calendar, Clock, MapPin, Ticket } from "lucide-react";
import type { JSX } from "react";
import type { PerformanceDetail } from "@/shared/types/performance";
import { cn } from "@/shared/utils/cn";

// "금요일(19:30), 토요일(19:30)" → "금 19:30 · 토 19:30"
function parseShowTime(showTime: string): string {
  const dayMap: Record<string, string> = {
    월요일: "월",
    화요일: "화",
    수요일: "수",
    목요일: "목",
    금요일: "금",
    토요일: "토",
    일요일: "일",
  };
  return showTime
    .split(",")
    .map((item) => {
      const match = item.trim().match(/^(.+?)\((.+?)\)$/);
      if (!match) return item.trim();
      const day = dayMap[match[1].trim()] ?? match[1].trim();
      return `${day} ${match[2]}`;
    })
    .join(" · ");
}

type InfoRowProps = {
  icon: JSX.Element;
  text: string;
};

function InfoRow({ icon, text }: InfoRowProps) {
  return (
    <div className={`flex gap-3 py-1 items-start `}>
      <span className="mt-px shrink-0 text-muted-foreground">{icon}</span>
      <span className="text-xs @md:text-[13.5px] leading-relaxed text-foreground">
        {text}
      </span>
    </div>
  );
}

type ShowInfoListProps = {
  detail: PerformanceDetail;
  className?: string;
};

export default function ShowInfoList({ detail, className }: ShowInfoListProps) {
  const period = detail.isOpenRun
    ? `${detail.startDate} – 오픈런`
    : `${detail.startDate} – ${detail.endDate}`;

  const timeText = [
    detail.showTime ? parseShowTime(detail.showTime) : null,
    detail.runtime ? `· ${detail.runtime}` : null,
  ]
    .filter(Boolean)
    .join(" ");

  const ageLimitText = detail.ageLimit ? `${detail.ageLimit} 관람가` : null;

  type InfoRowData = { icon: JSX.Element; text: string };

  const rows: InfoRowData[] = [
    { icon: <Calendar size={16} strokeWidth={2} />, text: period },
    ...(timeText
      ? [{ icon: <Clock size={16} strokeWidth={2} />, text: timeText }]
      : []),
    { icon: <MapPin size={16} strokeWidth={2} />, text: detail.venueName },
    ...(ageLimitText
      ? [{ icon: <Ticket size={16} strokeWidth={2} />, text: ageLimitText }]
      : []),
  ];

  return (
    <div className={cn(`flex w-full flex-col`, className)}>
      {rows.map((row, i) => (
        <InfoRow key={i} icon={row.icon} text={row.text} />
      ))}
    </div>
  );
}

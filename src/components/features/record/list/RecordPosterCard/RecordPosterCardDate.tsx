import { parseDateLabel } from "@/shared/utils/date";

type RecordPosterCardDateVariant = "dark" | "light";

const monStyles: Record<RecordPosterCardDateVariant, string> = {
  dark: "text-white/50",
  light:
    "text-muted-foreground group-hover:text-background/50 transition-colors duration-300",
};

const dayStyles: Record<RecordPosterCardDateVariant, string> = {
  dark: "text-white/90",
  light:
    "text-foreground group-hover:text-background transition-colors duration-300",
};

export default function RecordPosterCardDate({
  date,
  variant = "dark",
}: {
  date: string;
  variant?: RecordPosterCardDateVariant;
}) {
  const { mon, day } = parseDateLabel(date);
  return (
    <div className="flex flex-col items-end leading-none">
      <span
        className={`text-[10px] font-black tracking-widest uppercase ${monStyles[variant]}`}
      >
        {mon}
      </span>
      <span
        className={`text-lg md:text-2xl font-black tracking-tight ${dayStyles[variant]}`}
      >
        {day}
      </span>
    </div>
  );
}

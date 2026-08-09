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
    <div className="flex flex-col items-center leading-none">
      <span
        className={`text-[8px] @card-xs:text-[10px] @card-sm:text-xs @card-md:text-sm @card-lg:text-base font-black tracking-widest uppercase ${monStyles[variant]}`}
      >
        {mon}
      </span>
      <span
        className={`text-base @card-xs:text-lg @card-sm:text-xl @card-md:text-2xl @card-lg:text-3xl font-black tracking-tight ${dayStyles[variant]}`}
      >
        {day}
      </span>
    </div>
  );
}

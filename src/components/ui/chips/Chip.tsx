import { cn } from "@/shared/utils/cn";

type ChipProps = {
  label: string;
  className?: string;
};

export default function Chip({ label, className }: ChipProps) {
  return (
    <span
      className={cn(
        "border-[1.5px] border-foreground px-2.5 py-1 text-[13.5px] font-semibold leading-none",
        className,
      )}
    >
      {label}
    </span>
  );
}

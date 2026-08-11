import { cn } from "@/shared/utils/cn";

export default function RankBadge({
  rank,
  className,
}: {
  rank: number;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center aspect-square font-black tracking-widest",
        "border border-foreground bg-accent text-foreground",
        "w-5 @card-xs:w-6 @card-sm:w-7 @card-md:w-8",
        "text-xs @card-xs:text-sm @card-sm:text-base @card-md:text-lg",
        className,
      )}
    >
      {rank}
    </span>
  );
}

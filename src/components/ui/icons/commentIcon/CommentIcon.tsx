import { cn } from "@/shared/utils";
import { MessageCircle } from "lucide-react";
import { JSX } from "react";

type CommentIconProps = {
  count?: number;
  className?: string;
};

export default function CommentIcon({
  count,
  className,
}: CommentIconProps): JSX.Element {
  return (
    <div
      className={cn("flex items-center transition-colors  gap-1", className)}
      aria-label="댓글"
    >
      <MessageCircle className="w-3 h-3 @card-sm:w-4 @card-sm:h-4 @card-md:w-4.5 @card-md:h-4.5 transition-colors text-muted-foreground" />
      <span className="text-[10px] @card-sm:text-xs @card-md:text-base text-muted-foreground">
        {count ?? 0}
      </span>
    </div>
  );
}

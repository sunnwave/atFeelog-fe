import { JSX } from "react";
import { CardSkeleton } from "@/components/commons/card";

export default function SectionSkeleton({
  count = 5,
}: {
  count?: number;
}): JSX.Element {
  return (
    <div className="w-full max-w-full min-w-0 overflow-x-auto">
      <div className="flex flex-nowrap border-l-[1.5px] border-foreground">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="shrink-0 w-46 md:w-52 @container border-t-[1.5px] border-r-[1.5px] border-b-[1.5px] border-foreground"
          >
            <CardSkeleton showMeta />
          </div>
        ))}
      </div>
    </div>
  );
}

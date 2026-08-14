import { JSX } from "react";

export default function CardSkeleton({
  showMeta = true,
}: {
  showMeta?: boolean;
}): JSX.Element {
  return (
    <div>
      <div className="relative overflow-hidden aspect-3/4 bg-border">
        <div className="absolute inset-y-0 w-1/2 bg-linear-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.5s_infinite]" />
      </div>
      {showMeta && (
        <div className="p-2 @card-xs:p-3 space-y-2">
          <div className="relative overflow-hidden h-2.5 @card-xs:h-3 bg-border rounded">
            <div className="absolute inset-y-0 w-1/2 bg-linear-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.5s_infinite]" />
          </div>
          <div className="relative overflow-hidden h-2.5 @card-xs:h-3 bg-border rounded w-2/3">
            <div className="absolute inset-y-0 w-1/2 bg-linear-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.5s_infinite]" />
          </div>
        </div>
      )}
    </div>
  );
}

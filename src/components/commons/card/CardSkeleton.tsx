import { JSX } from "react";

export default function CardSkeleton({
  showMeta = true,
}: {
  showMeta?: boolean;
}): JSX.Element {
  return (
    <div>
      <div className="aspect-3/4 bg-muted animate-pulse" />
      {showMeta && (
        <div className="p-2 @card-xs:p-3 space-y-2">
          <div className="h-2.5 @card-xs:h-3 bg-muted animate-pulse rounded" />
          <div className="h-2.5 @card-xs:h-3 bg-muted animate-pulse rounded w-2/3" />
        </div>
      )}
    </div>
  );
}

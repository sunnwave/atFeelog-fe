import Badge from "@/components/ui/badge";

type Props = {
  showName?: string | null;
  artists: string[];
};

export default function RecordFeedCardShowMeta({ showName, artists }: Props) {
  if (!showName && artists.length === 0) return null;

  return (
    <div className="mt-3 pt-3 border-t border-border space-y-2">
      {showName && (
        <p className="text-[14px] font-bold text-foreground/75 truncate">
          {showName}
        </p>
      )}
      {artists.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {artists.map((name, i) => (
            <Badge key={i}>{name}</Badge>
          ))}
        </div>
      )}
    </div>
  );
}

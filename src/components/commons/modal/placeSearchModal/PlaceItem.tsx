import { KakaoPlace } from "@/shared/hooks/kakao/types";

export default function PlaceItem({
  place: p,
  onConfirm,
  onOpenChange,
}: {
  place: KakaoPlace;
  onConfirm: (place: KakaoPlace) => void;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <li key={p.id}>
      <button
        className="w-full rounded-2xl border border-border bg-card p-4 text-left hover:bg-muted/40 transition-colors"
        onClick={() => {
          onConfirm(p);
          onOpenChange(false);
        }}
      >
        <div className="font-semibold text-foreground">{p.place_name}</div>
        <div className="mt-1 text-xs text-muted-foreground">
          {p.road_address_name || p.address_name}
        </div>
      </button>
    </li>
  );
}

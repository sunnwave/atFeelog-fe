import { CardGridSkeleton } from "@/components/ui/feedback";
import { useSubscribedShows } from "@/shared/hooks/show/useSubscribedShows";

export default function UserSavedShowGrid() {
  const { subscribedIds, loading } = useSubscribedShows();
  //  TODO:
  if (loading) {
    return (
      <CardGridSkeleton
        showMeta={false}
        count={4}
        bordered
        className="border-t-0"
      />
    );
  }
  return (
    <div>
      {subscribedIds.map((s) => (
        <p key={s}>{s}</p>
      ))}
    </div>
  );
}

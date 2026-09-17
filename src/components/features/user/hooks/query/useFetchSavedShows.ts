import { queryKeys } from "@/api/rest/queryKeys";
import { fetchShowDetail } from "@/components/features/shows/detail/hooks/useFetchShowDetail";
import { useFetchSubscribedShowIds } from "@/shared/hooks/show/useFetchSubscribedShowIds";
import { PerformanceDetail } from "@/shared/types/performance";
import { useQueries } from "@tanstack/react-query";

export const useFetchSavedShows = () => {
  const {
    subscribedIds,
    loading: idsLoading,
    error,
    refetch: refetchIds,
  } = useFetchSubscribedShowIds();

  const results = useQueries({
    queries: subscribedIds.map((id) => ({
      queryKey: queryKeys.kopis.performanceDetail(id),
      queryFn: () => fetchShowDetail(id),
      enabled: !idsLoading,
    })),
  });

  const shows = results
    .map((r) => r.data)
    .filter((d): d is PerformanceDetail => !!d);

  const loading = idsLoading || results.some((r) => r.isLoading);

  const refetch = () => {
    refetchIds();
    results.forEach((r) => r.refetch());
  };

  return { shows, loading, error, refetch };
};

import type { PerformanceDetail } from "@/shared/types/performance";
import { queryKeys } from "@/api/rest/queryKeys";
import { useQuery } from "@tanstack/react-query";

async function fetchShowDetail(id: string): Promise<PerformanceDetail> {
  const res = await fetch(`/api/kopis/performances/${encodeURIComponent(id)}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch show detail: ${res.status}`);
  }
  const data = (await res.json()) as PerformanceDetail;
  return data?.mt20id
    ? data
    : Promise.reject(new Error("Invalid show detail data"));
}

export function useFetchShowDetail(id: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.kopis.performanceDetail(id),
    queryFn: () => fetchShowDetail(id),
    enabled: !!id,
  });

  return {
    detail: data ?? undefined,
    loading: isLoading,
    error,
  };
}

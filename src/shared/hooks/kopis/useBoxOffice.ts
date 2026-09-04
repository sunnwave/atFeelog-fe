import { useQuery } from "@tanstack/react-query";
import type { BoxOffice } from "@/shared/types/performance";
import type { BoxOfficeGenreCatecode } from "@/shared/constants/kopis";
import { queryKeys } from "@/api/rest/queryKeys";

async function fetchBoxOffice(
  type: "day" | "week" | "month",
  catecode: BoxOfficeGenreCatecode,
): Promise<BoxOffice[]> {
  const params = new URLSearchParams({ type });
  if (catecode) params.set("catecode", catecode);
  const res = await fetch(`/api/kopis/boxoffice?${params.toString()}`);
  if (!res.ok) throw new Error(`${res.status}`);
  return res.json() as Promise<BoxOffice[]>;
}

export function useBoxOffice(
  type: "day" | "week" | "month" = "week",
  catecode: BoxOfficeGenreCatecode = "",
) {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.kopis.boxOffice({ type, catecode }),
    queryFn: () => fetchBoxOffice(type, catecode),
  });

  return {
    items: data ?? [],
    loading: isLoading,
    error: error ? "박스오피스 정보를 불러오지 못했어요." : null,
  };
}

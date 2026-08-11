import { useEffect, useState } from "react";
import type { BoxOffice } from "@/shared/types/performance";
import type { BoxOfficeGenreCatecode } from "@/shared/constants/kopis";

type UseBoxOfficeResult = {
  items: BoxOffice[];
  loading: boolean;
  error: string | null;
};

export function useBoxOffice(
  type: "week" | "month" = "week",
  catecode: BoxOfficeGenreCatecode = ""
): UseBoxOfficeResult {
  const [items, setItems] = useState<BoxOffice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchBoxOffice() {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({ type });
        if (catecode) params.set("catecode", catecode);
        const res = await fetch(`/api/kopis/boxoffice?${params.toString()}`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error(`${res.status}`);
        const data = (await res.json()) as BoxOffice[];
        if (!cancelled) setItems(data);
      } catch {
        if (!cancelled) setError("박스오피스 정보를 불러오지 못했어요.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void fetchBoxOffice();
    return () => {
      cancelled = true;
    };
  }, [type, catecode]);

  return { items, loading, error };
}

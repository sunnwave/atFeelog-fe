import { useEffect, useState } from "react";
import type { PerformanceDetail } from "@/shared/types/performance";

export function useFetchShowDetail(id: string) {
  const [detail, setDetail] = useState<PerformanceDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    fetch(`/api/kopis/performances/${encodeURIComponent(id)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data: PerformanceDetail | null) => setDetail(data))
      .catch(() => setError("공연 정보를 불러오는 중 에러가 발생했어요."))
      .finally(() => setLoading(false));
  }, [id]);

  return { detail, loading, error };
}

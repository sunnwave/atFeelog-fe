import { useEffect, useState } from "react";
import type { PerformanceDetail } from "@/shared/types/performance";

export function useFetchShowDetail(id: string) {
  const [detail, setDetail] = useState<PerformanceDetail | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    fetch(`/api/kopis/performances/${encodeURIComponent(id)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data: PerformanceDetail | null) =>
        setDetail(data?.mt20id ? data : undefined),
      )
      .catch(() => setError("공연 정보를 불러오는 중 에러가 발생했어요."))
      .finally(() => setLoading(false));
  }, [id]);

  return { detail, loading, error };
}

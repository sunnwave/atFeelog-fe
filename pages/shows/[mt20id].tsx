import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ShowDetailScreen from "@/components/features/shows/ShowDetailScreen";
import type { PerformanceDetail } from "@/shared/types/performance";

const ShowDetailPage: NextPage = () => {
  const { query, isReady } = useRouter();
  const mt20id = typeof query.mt20id === "string" ? query.mt20id : "";

  const [detail, setDetail] = useState<PerformanceDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(true);

  useEffect(() => {
    if (!isReady || !mt20id) return;

    setDetailLoading(true);
    fetch(`/api/kopis/performances/${encodeURIComponent(mt20id)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data: PerformanceDetail | null) => setDetail(data))
      .catch(() => setDetail(null))
      .finally(() => setDetailLoading(false));
  }, [mt20id, isReady]);

  if (!isReady || !mt20id) return <></>;

  return (
    <ShowDetailScreen mt20id={mt20id} detail={detail} detailLoading={detailLoading} />
  );
};

export default ShowDetailPage;

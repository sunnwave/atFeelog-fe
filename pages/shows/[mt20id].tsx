import type { NextPage } from "next";
import { useRouter } from "next/router";

/** 5단계 — 공연 상세 페이지 (미구현, placeholder) */
const ShowDetailPage: NextPage = () => {
  const { query } = useRouter();
  return (
    <div className="min-h-screen flex items-center justify-center text-muted-foreground text-sm">
      공연 상세 페이지 준비 중이에요. (mt20id: {query.mt20id})
    </div>
  );
};

export default ShowDetailPage;

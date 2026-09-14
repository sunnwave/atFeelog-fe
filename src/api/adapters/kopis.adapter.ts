import type {
  KopisRawPerformance,
  KopisRawPerformanceDetail,
  KopisRawBoxOffice,
  ShowApiParams,
} from "@/api/adapters/types/kopis";
import type { ShowFilters } from "@/components/features/shows/list/type/type";
import type {
  Performance,
  PerformanceDetail,
  PerformanceStatus,
  BoxOffice,
} from "@/shared/types/performance";

export function normalizeKopisPerformance(
  raw: KopisRawPerformance,
): Performance {
  return {
    mt20id: raw.mt20id,
    title: raw.prfnm,
    venueName: raw.fcltynm,
    posterUrl: raw.poster,
    genre: raw.genrenm,
    status: raw.prfstate as PerformanceStatus,
    startDate: raw.prfpdfrom,
    endDate: raw.prfpdto,
    isOpenRun: raw.openrun === "Y",
  };
}

export function normalizeKopisPerformanceDetail(
  raw: KopisRawPerformanceDetail,
): PerformanceDetail {
  const ticketLinks = (
    Array.isArray(raw.relates?.relate)
      ? raw.relates.relate
      : raw.relates?.relate
        ? [raw.relates.relate]
        : []
  ).map((r) => ({
    name: r.relatenm,
    url: r.relateurl,
  }));

  const introImages = raw.styurls
    ? (Array.isArray(raw.styurls.styurl)
        ? raw.styurls.styurl
        : [raw.styurls.styurl]
      ).filter(Boolean)
    : [];
  return {
    ...normalizeKopisPerformance(raw),
    cast: raw.prfcast,
    runtime: raw.prfruntime,
    ageLimit: raw.prfage,
    ticketPrice: raw.pcseguidance,
    showTime: raw.dtguidance,
    ticketLinks,
    description: raw.sty || undefined,
    introImages,
  };
}

export function normalizeBoxOffice(raw: KopisRawBoxOffice): BoxOffice {
  return {
    rank: Number(raw.rnum),
    mt20id: raw.mt20id,
    title: raw.prfnm,
    venueName: raw.prfplcnm,
    posterUrl: raw.poster,
    genre: raw.cate,
    period: raw.prfpd,
    area: raw.area,
  };
}

/** ShowFilters(UI/URL) → ShowApiParams(KOPIS API 요청 파라미터) 변환 */
export function toShowApiParams(filters: ShowFilters): ShowApiParams {
  return {
    q: filters.search || undefined,
    genre: filters.genre || undefined,
    status: filters.status || undefined,
    area: filters.area || undefined,
    kidstate: filters.kidstate || undefined,
    stdate: filters.startDate || undefined,
    eddate: filters.endDate || undefined,
  };
}

/** BoxOffice → Performance 변환 (ShowCard 등 공용 컴포넌트에 전달할 때 사용) */
export function boxOfficeToPerformance(item: BoxOffice): Performance {
  const [startDate = "", endDate = ""] = item.period.split("~");
  return {
    mt20id: item.mt20id,
    title: item.title,
    venueName: item.venueName,
    posterUrl: item.posterUrl,
    genre: item.genre,
    startDate: startDate.trim(),
    endDate: endDate.trim(),
    isOpenRun: false,
  };
}

export const queryKeys = {
  kopis: {
    all: ["kopis"] as const,
    boxOffice: (params: Record<string, unknown>) =>
      [...queryKeys.kopis.all, "boxOffice", params] as const,
    performanceDetail: (id: string) =>
      [...queryKeys.kopis.all, "performanceDetail", id] as const,
    performances: (params: Record<string, unknown>) =>
      [...queryKeys.kopis.all, "performances", params] as const,
  },
  kakao: {
    all: ["kakao"] as const,
    places: (query: string) =>
      [...queryKeys.kakao.all, "places", query] as const,
  },
} as const;

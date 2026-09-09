import { graphql, HttpResponse } from "msw";

const MOCK_RECORDS = [
  {
    id: "1",
    title: "봄날의 콘서트",
    showName: "IU Concert HEREH",
    mt20id: "PF220846",
    genre: "콘서트",
    posterUrl: null,
    artistName: "아이유",
    likeCount: 42,
    commentCount: 12,
    isLiked: false,
    images: ["https://picsum.photos/id/21/400/600"],
    user: { id: "u1", name: "홍길동", picture: "https://picsum.photos/id/64/200/200" },
    createdAt: "2026-03-10T00:00:00.000Z",
  },
  {
    id: "2",
    title: "BTS 라스트 콘서트 후기",
    showName: "BTS Permission to Dance",
    mt20id: "PF241234",
    genre: "콘서트",
    posterUrl: null,
    artistName: "RM, Jin, SUGA, j-hope, Jimin, V, Jung Kook",
    likeCount: 130,
    commentCount: 35,
    isLiked: true,
    images: ["https://picsum.photos/id/29/400/600"],
    user: { id: "u2", name: "아미", picture: "https://picsum.photos/id/91/200/200" },
    createdAt: "2026-02-20T00:00:00.000Z",
  },
  {
    id: "3",
    title: "잔잔한 재즈의 밤",
    showName: "Seoul Jazz Festival",
    mt20id: "PF210034",
    genre: "콘서트",
    posterUrl: null,
    artistName: "윤석철, 권지혜",
    likeCount: 8,
    commentCount: 2,
    isLiked: false,
    images: [],
    user: { id: "u3", name: "재즈러버", picture: null },
    createdAt: "2026-01-15T00:00:00.000Z",
  },
  {
    id: "4",
    title: "처음 본 뮤지컬, 레베카",
    showName: "레베카",
    mt20id: "PF231122",
    genre: "뮤지컬",
    posterUrl: null,
    artistName: "신영숙, 홍지민",
    likeCount: 17,
    commentCount: 6,
    isLiked: false,
    images: ["https://picsum.photos/id/49/400/600"],
    user: { id: "u4", name: "뮤지컬팬", picture: "https://picsum.photos/id/22/200/200" },
    createdAt: "2025-12-01T00:00:00.000Z",
  },
  {
    id: "5",
    title: "슈가 솔로 투어",
    showName: "Agust D TOUR D-DAY",
    mt20id: "PF240987",
    genre: "콘서트",
    posterUrl: null,
    artistName: "SUGA",
    likeCount: 78,
    commentCount: 20,
    isLiked: true,
    images: ["https://picsum.photos/id/93/400/600"],
    user: { id: "u1", name: "홍길동", picture: "https://picsum.photos/id/64/200/200" },
    createdAt: "2025-11-10T00:00:00.000Z",
  },
  {
    id: "6",
    title: "록 페스티벌의 열기",
    showName: "Jisan Rock Festival",
    mt20id: null,
    genre: "콘서트",
    posterUrl: null,
    artistName: "검정치마, YB, 이승환",
    likeCount: 55,
    commentCount: 14,
    isLiked: false,
    images: [],
    user: { id: "u5", name: "록커", picture: null },
    createdAt: "2025-10-05T00:00:00.000Z",
  },
];

// 기본 핸들러
export const recordHandlers = [
  graphql.query("fetchBoards", () =>
    HttpResponse.json({ data: { fetchBoards: MOCK_RECORDS } }),
  ),
  graphql.query("fetchFollowingFeed", () =>
    HttpResponse.json({ data: { fetchFollowingFeed: MOCK_RECORDS } }),
  ),
  graphql.query("fetchBoardsOfBest", () =>
    HttpResponse.json({ data: { fetchBoardsOfBest: MOCK_RECORDS } }),
  ),
  graphql.query("fetchBoardsByMt20id", () =>
    HttpResponse.json({ data: { fetchBoardsByMt20id: MOCK_RECORDS } }),
  ),
];

// 스토리별 override용
export const recordEmptyHandler = graphql.query("fetchBoards", () =>
  HttpResponse.json({ data: { fetchBoards: [] } }),
);

export const recordErrorHandler = graphql.query("fetchBoards", () =>
  HttpResponse.json({
    errors: [{ message: "서버 오류가 발생했어요." }],
  }),
);

export const followingEmptyHandler = graphql.query("fetchFollowingFeed", () =>
  HttpResponse.json({ data: { fetchFollowingFeed: [] } }),
);

// 무한스크롤 확인용 — 3페이지에서 종료
// RecordFeed의 RECORDS_PER_PAGE = 10이므로 페이지당 10개 반환해야 hasMore 유지
const INFINITE_PAGE_RECORDS = [...MOCK_RECORDS, ...MOCK_RECORDS].slice(0, 10).map(
  (r, i) => ({ ...r, id: `inf-${i + 1}` }),
);

export const recordInfiniteHandler = graphql.query(
  "fetchBoards",
  ({ variables }) => {
    const page = (variables.page as number) ?? 1;
    const isLastPage = page >= 3;

    return HttpResponse.json({
      data: {
        fetchBoards: isLastPage ? MOCK_RECORDS.slice(0, 2) : INFINITE_PAGE_RECORDS,
      },
    });
  },
);

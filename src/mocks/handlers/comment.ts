import { graphql, HttpResponse } from "msw";

const MOCK_COMMENTS = [
  {
    id: "c1",
    content: "정말 감동적인 공연이었어요! 다음에도 꼭 가고 싶네요.",
    user: { id: "u1", name: "홍길동", picture: "https://picsum.photos/id/64/200/200" },
    createdAt: "2026-03-10T10:00:00.000Z",
    updatedAt: "2026-03-10T10:00:00.000Z",
  },
  {
    id: "c2",
    content: "저도 봤는데 진짜 최고였어요 ㅠㅠ",
    user: { id: "u2", name: "아미", picture: "https://picsum.photos/id/91/200/200" },
    createdAt: "2026-03-10T11:30:00.000Z",
    updatedAt: "2026-03-10T11:30:00.000Z",
  },
  {
    id: "c3",
    content: "사진도 너무 잘 찍으셨네요!",
    user: { id: "u3", name: "재즈러버", picture: null },
    createdAt: "2026-03-11T09:00:00.000Z",
    updatedAt: "2026-03-11T09:00:00.000Z",
  },
];

// 기본 핸들러
export const commentHandlers = [
  graphql.query("fetchBoardComments", () =>
    HttpResponse.json({ data: { fetchBoardComments: MOCK_COMMENTS } }),
  ),
];

// 스토리별 override용
export const commentEmptyHandler = graphql.query("fetchBoardComments", () =>
  HttpResponse.json({ data: { fetchBoardComments: [] } }),
);

export const commentErrorHandler = graphql.query("fetchBoardComments", () =>
  HttpResponse.json({
    errors: [{ message: "댓글을 불러올 수 없어요." }],
  }),
);

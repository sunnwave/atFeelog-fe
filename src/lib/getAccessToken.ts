import { gql } from "@apollo/client";
import { GraphQLClient, ClientError } from "graphql-request";

const RESTORE_ACCESS_TOKEN = gql`
  mutation restoreAccessToken {
    restoreAccessToken {
      accessToken
    }
  }
`;

type RestoreAccessTokenResponse = {
  restoreAccessToken: {
    accessToken: string;
  };
};

// 동시 refresh 방지용(싱글플라이트)
let refreshingPromise: Promise<string | null> | null = null;

export function getAccessToken(): Promise<string | null> {
  if (refreshingPromise) return refreshingPromise;

  refreshingPromise = (async () => {
    // ✅ 쿠키 기반 refresh는 "브라우저"에서만 의미가 있음
    if (typeof window === "undefined") return null;

    const uri = process.env.NEXT_PUBLIC_GRAPHQL_URI;
    if (!uri) {
      console.error("NEXT_PUBLIC_GRAPHQL_URI is not set");
      return null;
    }

    try {
      const graphqlClient = new GraphQLClient(uri, {
        credentials: "include",
      });

      const result = await graphqlClient.request<RestoreAccessTokenResponse>(
        RESTORE_ACCESS_TOKEN
      );

      return result?.restoreAccessToken?.accessToken ?? null;
    } catch (e) {
      if (e instanceof ClientError) {
        const code = e.response.errors?.[0]?.extensions?.code;
        const msg = e.response.errors?.[0]?.message ?? "";

        // 비로그인 정상 케이스 → 조용히 null 반환
        if (msg === "" || msg.includes("jwt") || code === "UNAUTHENTICATED") {
          return null;
        }
      }

      // 그 외 진짜 에러만 로깅
      console.error("Failed to refresh access token", e);
      return null;
    } finally {
      refreshingPromise = null;
    }
  })();

  return refreshingPromise;
}

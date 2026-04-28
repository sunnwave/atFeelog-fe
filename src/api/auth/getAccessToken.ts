import { gql } from "@apollo/client";
import { GraphQLClient, ClientError } from "graphql-request";
import { getGraphqlUri } from "./config";

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
    const uri = getGraphqlUri();

    if (!uri) {
      console.error("GRAPHQL_URI is not set");
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
        const ext = e.response.errors?.[0]?.extensions ?? {};
        const code = ext.code as string | undefined;
        const classification = ext.classification as string | undefined;
        const msg = e.response.errors?.[0]?.message ?? "";

        // 비로그인 정상 케이스 → 조용히 null 반환
        // DataFetchingException: 새 백엔드가 유효하지 않은 토큰에 대해 반환하는 분류
        if (
          msg === "" ||
          msg.includes("jwt") ||
          code === "UNAUTHENTICATED" ||
          classification === "DataFetchingException"
        ) {
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

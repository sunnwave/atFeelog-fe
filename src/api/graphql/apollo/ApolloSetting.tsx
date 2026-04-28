import React, { useMemo } from "react";
import { useRecoilState } from "recoil";

import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
  fromPromise,
} from "@apollo/client";
import { Observable } from "@apollo/client/utilities";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";

import { getAccessToken } from "../getAccessToken";
import { IS_NEW_API } from "../config";
import { useRouter } from "next/router";
import { accessTokenState } from "@/shared/stores";
import { makeTypePolicy, TYPE_NAMES_WITH_ID } from "./cachePolicies";

const cache = new InMemoryCache({
  typePolicies: Object.fromEntries(
    TYPE_NAMES_WITH_ID.map((name) => [name, makeTypePolicy(IS_NEW_API)]),
  ),
});

interface IApolloSettingProps {
  children: React.ReactNode;
}

/**
 * ApolloSetting: Apollo Client 구성만 담당
 * - authLink: accessToken이 있을 때만 Authorization 주입(빈 문자열 덮어쓰기 금지)
 * - errorLink: UNAUTHENTICATED 발생 시 refresh → 성공하면 1회 재시도, 실패하면 종료/로그인 이동
 * - uploadLink: GraphQL endpoint + 쿠키 전송(credentials include)
 *
 * ⚠️ 앱 시작 시 토큰 복구(restoreAccessToken)는 여기서 하지 말고 useAuthInitialize에서 처리 권장
 *    (중복 요청/경쟁 상태 방지)
 */
export default function ApolloSetting({ children }: IApolloSettingProps) {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const router = useRouter();

  /**
   * 매 요청마다 accessToken이 있을 때만 Authorization을 설정한다.
   * accessToken이 없을 때 Authorization을 ""로 덮어쓰면,
   * 다른 곳(context)에서 넣은 Authorization까지 지워져서 인증이 깨질 수 있음.
   */
  const authLink = useMemo(
    () =>
      setContext((_, { headers }) => {
        const nextHeaders = { ...headers };

        if (accessToken) {
          nextHeaders.Authorization = `Bearer ${accessToken}`;
        }

        return { headers: nextHeaders };
      }),
    [accessToken],
  );

  /**
   * 토큰 만료(UNAUTHENTICATED) 처리:
   * 1) refreshToken 쿠키로 accessToken 재발급(getAccessToken)
   * 2) 성공: 헤더 갱신 후 실패했던 요청 1회 재시도
   * 3) 실패: accessToken 비우고(로그아웃 처리), 필요 시 로그인 페이지로 이동
   */
  const errorLink = useMemo(
    () =>
      onError(({ graphQLErrors, operation, forward }) => {
        const isUnauthenticated = graphQLErrors?.some(
          (e) => e.extensions?.code === "UNAUTHENTICATED",
        );
        if (!isUnauthenticated) return;

        const redirectPath = router.asPath || "/";

        return fromPromise(getAccessToken()).flatMap((newAccessToken) => {
          // refresh 실패 → 재시도하지 않고 종료
          if (!newAccessToken) {
            setAccessToken("");

            // 이미 로그인 상태였던 경우에만 튕기고 싶다면 조건 추가 가능
            if (accessToken) {
              router.replace(
                `/login?redirect=${encodeURIComponent(redirectPath)}`,
              );
            }

            return new Observable((observer) => observer.complete());
          }

          // refresh 성공 → 토큰 저장 + 요청 헤더 갱신 후 1회 재시도
          setAccessToken(newAccessToken);

          operation.setContext(({ headers = {} }) => ({
            headers: {
              ...headers,
              Authorization: `Bearer ${newAccessToken}`,
              authorization: `Bearer ${newAccessToken}`,
            },
          }));

          return forward(operation);
        });
      }),
    [router, setAccessToken, accessToken],
  );

  /**
   * 실제 네트워크 전송 링크
   * credentials: "include" → refreshToken 쿠키가 서버로 전송됨
   */
  const uploadLink = useMemo(
    () =>
      createUploadLink({
        uri: "/api/graphql",
        credentials: "include",
      }),
    [],
  );

  const client = useMemo(
    () =>
      new ApolloClient({
        link: ApolloLink.from([
          errorLink,
          authLink,
          uploadLink as unknown as ApolloLink,
        ]),
        cache,
      }),
    [errorLink, authLink, uploadLink],
  );

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

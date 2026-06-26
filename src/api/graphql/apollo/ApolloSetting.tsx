import React, { useMemo, useRef } from "react";
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

import { getAccessToken } from "../../auth/getAccessToken";
import { IS_NEW_API } from "../../config";
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

  // ref로 토큰을 읽어 client/link를 재생성하지 않도록 함
  const accessTokenRef = useRef(accessToken);
  accessTokenRef.current = accessToken;

  const authLink = useMemo(
    () =>
      setContext((_, { headers }) => {
        const nextHeaders = { ...headers };
        if (accessTokenRef.current) {
          nextHeaders.Authorization = `Bearer ${accessTokenRef.current}`;
        }
        return { headers: nextHeaders };
      }),
    [],
  );

  const errorLink = useMemo(
    () =>
      onError(({ graphQLErrors, operation, forward }) => {
        const isUnauthenticated = graphQLErrors?.some(
          (e) => e.extensions?.code === "UNAUTHENTICATED",
        );
        if (!isUnauthenticated) return;

        const redirectPath = router.asPath || "/";

        return fromPromise(getAccessToken()).flatMap((newAccessToken) => {
          if (!newAccessToken) {
            setAccessToken("");
            if (accessTokenRef.current) {
              router.replace(
                `/login?redirect=${encodeURIComponent(redirectPath)}`,
              );
            }
            return new Observable((observer) => observer.complete());
          }

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
    [router, setAccessToken],
  );

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

import { gql, useLazyQuery } from "@apollo/client";
import { IQuery } from "@/shared/graphql/generated/types";
import { useCallback } from "react";
import { IS_NEW_API } from "@/lib/config";

const idField = IS_NEW_API ? "id" : "_id";

export const FETCH_USER_LOGGED_IN = gql`
  query fetchUserLoggedIn {
    fetchUserLoggedIn {
      _id: ${idField}
      email
      name
      picture
      createdAt
    }
  }
`;

export function useFetchUserLoggedInLazy() {
  const [fetchUserLoggedIn] = useLazyQuery<Pick<IQuery, "fetchUserLoggedIn">>(
    FETCH_USER_LOGGED_IN,
    { fetchPolicy: "network-only" },
  );

  const run = useCallback(
    async (token?: string) => {
      const res = await fetchUserLoggedIn({
        context: {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        },
      });

      if (res.error) throw res.error;
      return res.data?.fetchUserLoggedIn ?? null;
    },
    [fetchUserLoggedIn],
  );

  return { run };
}

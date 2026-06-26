import { gql, useLazyQuery } from "@apollo/client";
import { IQuery } from "@/api/graphql/generated/types";
import { useCallback } from "react";
import { IS_NEW_API } from "@/api/config";
import { toUser } from "@/api/adapters/user.adapter";
import type { User } from "@/api/adapters/types/user";

const idField = IS_NEW_API ? "id" : "_id";

export const FETCH_USER_LOGGED_IN = gql`
  query fetchUserLoggedIn {
    fetchUserLoggedIn {
      ${idField}
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
    async (token?: string): Promise<User | null> => {
      const res = await fetchUserLoggedIn({
        context: {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        },
      });

      if (res.error) throw res.error;
      const dto = res.data?.fetchUserLoggedIn;
      return dto ? toUser(dto) : null;
    },
    [fetchUserLoggedIn],
  );

  return { run };
}

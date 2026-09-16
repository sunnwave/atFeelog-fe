import { gql, useQuery } from "@apollo/client";
import { useMemo } from "react";
import {
  IQuery,
  IQueryFetchBoardsLikeByUserArgs,
} from "@/api/graphql/generated/types.new";

export const FETCH_LIKED_BOARD_IDS = gql`
  query fetchBoardsLikeByUser($userId: ID!) {
    fetchBoardsLikeByUser(userId: $userId) {
      id
    }
  }
`;

export function useFetchLikedBoardIds(userId?: string) {
  const { data, loading, error } = useQuery<
    Pick<IQuery, "fetchBoardsLikeByUser">,
    IQueryFetchBoardsLikeByUserArgs
  >(FETCH_LIKED_BOARD_IDS, {
    variables: { userId: userId ?? "" },
    skip: !userId,
    fetchPolicy: "cache-and-network",
  });

  const likedIds = useMemo(
    () =>
      new Set(
        (data?.fetchBoardsLikeByUser ?? [])
          .filter((b): b is NonNullable<typeof b> => b != null)
          .map((b) => b.id),
      ),
    [data],
  );

  const isLiked = (id: string) => likedIds.has(id);

  return { likedIds, isLiked, loading, error };
}

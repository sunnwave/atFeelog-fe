import { IS_NEW_API } from "@/api/config";
import {
  IQuery as INewQuery,
  IQueryFetchBoardsLikeCountByUserArgs,
} from "@/api/graphql/generated/types.new";
import { gql, useQuery } from "@apollo/client";

const FETCH_BOARDS_LIKE_COUNT_BY_USER = gql`
  query fetchBoardsLikeCountByUser($userId: ID!) {
    fetchBoardsLikeCountByUser(userId: $userId)
  }
`;

export const useFetchBoardsLikeCountByUser = (userId?: string) => {
  const { data, loading, refetch } = useQuery<
    Pick<INewQuery, "fetchBoardsLikeCountByUser">,
    IQueryFetchBoardsLikeCountByUserArgs
  >(FETCH_BOARDS_LIKE_COUNT_BY_USER, {
    variables: { userId: userId ?? "" },
    skip: !IS_NEW_API || !userId,
    fetchPolicy: "cache-and-network",
  });

  return {
    count: data?.fetchBoardsLikeCountByUser ?? 0,
    loading,
    refetch,
  };
};
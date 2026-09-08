import { IS_NEW_API } from "@/api/config";
import {
  IQuery as INewQuery,
  IQueryFetchBoardsCountByUserArgs,
} from "@/api/graphql/generated/types.new";
import { gql, useQuery } from "@apollo/client";

const FETCH_BOARDS_COUNT_BY_USER = gql`
  query fetchBoardsCountByUser($userId: ID!) {
    fetchBoardsCountByUser(userId: $userId)
  }
`;

export const useFetchBoardsCountByUser = (userId?: string) => {
  const { data, loading, refetch } = useQuery<
    Pick<INewQuery, "fetchBoardsCountByUser">,
    IQueryFetchBoardsCountByUserArgs
  >(FETCH_BOARDS_COUNT_BY_USER, {
    variables: { userId: userId ?? "" },
    skip: !IS_NEW_API || !userId,
    fetchPolicy: "cache-and-network",
  });

  return {
    count: data?.fetchBoardsCountByUser ?? 0,
    loading,
    refetch,
  };
};
import { IS_NEW_API } from "@/api/config";
import {
  IQuery as INewQuery,
  IQueryFetchBoardsLikeCountArgs,
} from "@/api/graphql/generated/types.new";
import { gql, useQuery } from "@apollo/client";

const FETCH_BOARDS_LIKE_COUNT = gql`
  query fetchBoardsLikeCount($boardId: ID!) {
    fetchBoardsLikeCount(boardId: $boardId)
  }
`;

export const useFetchBoardsLikeCountByUser = (boardId?: string) => {
  const { data, loading, refetch } = useQuery<
    Pick<INewQuery, "fetchBoardsLikeCount">,
    IQueryFetchBoardsLikeCountArgs
  >(FETCH_BOARDS_LIKE_COUNT, {
    variables: { boardId: boardId ?? "" },
    skip: !IS_NEW_API || !boardId,
    fetchPolicy: "cache-and-network",
  });

  return {
    count: data?.fetchBoardsLikeCount ?? 0,
    loading,
    refetch,
  };
};

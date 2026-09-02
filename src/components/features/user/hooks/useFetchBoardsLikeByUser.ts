import { IS_NEW_API } from "@/api/config";
import {
  IQuery as INewQuery,
  IQueryFetchBoardsLikeByUserArgs,
} from "@/api/graphql/generated/types.new";
import { gql, useQuery } from "@apollo/client";
import { toRecordSummary } from "@/api/adapters/record-summary.adapter";

const FETCH_BOARDS_LIKE_BY_USER = gql`
  query fetchBoardsLikeByUser($userId: ID!) {
    fetchBoardsLikeByUser(userId: $userId) {
      id
      title
      showName
      artistName
      likeCount
      commentCount
      isLiked
      images
      user {
        id
        name
        picture
      }
      createdAt
    }
  }
`;

export const useFetchBoardsLikeByUser = (userId?: string) => {
  const { data, loading, error, refetch } = useQuery<
    Pick<INewQuery, "fetchBoardsLikeByUser">,
    IQueryFetchBoardsLikeByUserArgs
  >(FETCH_BOARDS_LIKE_BY_USER, {
    variables: { userId: userId ?? "" },
    skip: !IS_NEW_API || !userId,
    fetchPolicy: "cache-and-network",
  });

  const records = (data?.fetchBoardsLikeByUser ?? [])
    .filter((b): b is NonNullable<typeof b> => b != null)
    .map(toRecordSummary);

  return { records, loading, error, refetch };
};

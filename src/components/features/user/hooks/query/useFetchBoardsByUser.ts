import { IS_NEW_API } from "@/api/config";
import {
  IQuery as INewQuery,
  IQueryFetchBoardsByUserArgs,
} from "@/api/graphql/generated/types.new";
import { gql, useQuery } from "@apollo/client";
import { toRecordSummary } from "@/api/adapters/record-summary.adapter";

const FETCH_BOARDS_BY_USER = gql`
  query fetchBoardsByUser($userId: ID!) {
    fetchBoardsByUser(userId: $userId) {
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

export const useFetchBoardsByUser = (userId?: string) => {
  const { data, loading, error, refetch } = useQuery<
    Pick<INewQuery, "fetchBoardsByUser">,
    IQueryFetchBoardsByUserArgs
  >(FETCH_BOARDS_BY_USER, {
    variables: { userId: userId ?? "" },
    skip: !IS_NEW_API || !userId,
    fetchPolicy: "cache-and-network",
  });

  const records = (data?.fetchBoardsByUser ?? [])
    .filter((b): b is NonNullable<typeof b> => b != null)
    .map(toRecordSummary);

  return { records, loading, error, refetch };
};

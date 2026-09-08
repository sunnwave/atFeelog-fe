import { IS_NEW_API } from "@/api/config";
import {
  IQuery as INewQuery,
  IQueryFetchCountOfFollowingArgs,
} from "@/api/graphql/generated/types.new";
import { gql, useQuery } from "@apollo/client";

const FETCH_COUNT_OF_FOLLOWING = gql`
  query fetchCountOfFollowing($userId: ID!) {
    fetchCountOfFollowing(userId: $userId)
  }
`;

export const useFetchCountOfFollowing = (userId?: string) => {
  const { data, loading, refetch } = useQuery<
    Pick<INewQuery, "fetchCountOfFollowing">,
    IQueryFetchCountOfFollowingArgs
  >(FETCH_COUNT_OF_FOLLOWING, {
    variables: { userId: userId ?? "" },
    skip: !IS_NEW_API || !userId,
    fetchPolicy: "cache-and-network",
  });

  return {
    count: data?.fetchCountOfFollowing ?? 0,
    loading,
    refetch,
  };
};
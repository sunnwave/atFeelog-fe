import { IS_NEW_API } from "@/api/config";
import {
  IQuery as INewQuery,
  IQueryFetchCountOfFollowersArgs,
} from "@/api/graphql/generated/types.new";
import { gql, useQuery } from "@apollo/client";

const FETCH_COUNT_OF_FOLLOWERS = gql`
  query fetchCountOfFollowers($userId: ID!) {
    fetchCountOfFollowers(userId: $userId)
  }
`;

export const useFetchCountOfFollowers = (userId?: string) => {
  const { data, loading, refetch } = useQuery<
    Pick<INewQuery, "fetchCountOfFollowers">,
    IQueryFetchCountOfFollowersArgs
  >(FETCH_COUNT_OF_FOLLOWERS, {
    variables: { userId: userId ?? "" },
    skip: !IS_NEW_API || !userId,
    fetchPolicy: "cache-and-network",
  });

  return {
    count: data?.fetchCountOfFollowers ?? 0,
    loading,
    refetch,
  };
};
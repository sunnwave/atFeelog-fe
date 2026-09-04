import { IS_NEW_API } from "@/api/config";
import {
  IQuery as INewQuery,
  IQueryFetchFollowersArgs,
} from "@/api/graphql/generated/types.new";
import { gql, useQuery } from "@apollo/client";
import { toUser } from "@/api/adapters/user.adapter";

const FETCH_FOLLOWERS = gql`
  query fetchFollowers($userId: ID!) {
    fetchFollowers(userId: $userId) {
      id
      name
      email
      picture
      createdAt
    }
  }
`;

export const useFetchFollowers = (userId?: string) => {
  const { data, loading, refetch } = useQuery<
    Pick<INewQuery, "fetchFollowers">,
    IQueryFetchFollowersArgs
  >(FETCH_FOLLOWERS, {
    variables: { userId: userId ?? "" },
    skip: !IS_NEW_API || !userId,
    fetchPolicy: "cache-and-network",
  });

  const users = (data?.fetchFollowers ?? [])
    .filter((u): u is NonNullable<typeof u> => u != null)
    .map(toUser);

  return { users, loading, refetch };
};
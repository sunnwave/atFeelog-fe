import { IS_NEW_API } from "@/api/config";
import {
  IQuery as INewQuery,
  IQueryFetchFollowingArgs,
} from "@/api/graphql/generated/types.new";
import { gql, useQuery } from "@apollo/client";
import { toUser } from "@/api/adapters/user.adapter";

const FETCH_FOLLOWING = gql`
  query fetchFollowing($userId: ID!) {
    fetchFollowing(userId: $userId) {
      id
      name
      email
      picture
      createdAt
    }
  }
`;

export const useFetchFollowing = (userId?: string) => {
  const { data, loading, refetch } = useQuery<
    Pick<INewQuery, "fetchFollowing">,
    IQueryFetchFollowingArgs
  >(FETCH_FOLLOWING, {
    variables: { userId: userId ?? "" },
    skip: !IS_NEW_API || !userId,
    fetchPolicy: "cache-and-network",
  });

  const users = (data?.fetchFollowing ?? [])
    .filter((u): u is NonNullable<typeof u> => u != null)
    .map(toUser);

  return { users, loading, refetch };
};
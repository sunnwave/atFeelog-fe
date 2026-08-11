import { IS_NEW_API } from "@/api/config";
import {
  IQuery as INewQuery,
  IQueryFetchFollowingsArgs,
} from "@/api/graphql/generated/types.new";
import { gql, useQuery } from "@apollo/client";
import { toUser } from "@/api/adapters/user.adapter";

type FetchFollowingsData = { fetchFollowings?: INewQuery["fetchFollowings"] };

const FETCH_FOLLOWING = gql`
  query fetchFollowings($userId: ID!) {
    fetchFollowings(userId: $userId) {
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
    FetchFollowingsData,
    IQueryFetchFollowingsArgs
  >(FETCH_FOLLOWING, {
    variables: { userId: userId ?? "" },
    skip: !IS_NEW_API || !userId,
    fetchPolicy: "cache-and-network",
  });

  const users = (data?.fetchFollowings ?? [])
    .filter((u): u is NonNullable<typeof u> => u != null)
    .map(toUser);

  return { users, loading, refetch };
};
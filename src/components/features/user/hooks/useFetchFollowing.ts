import { IS_NEW_API } from "@/api/config";
import {
  IQuery as INewQuery,
  IQueryFetchFollowingArgs,
} from "@/api/graphql/generated/types.new";
import { gql, useQuery } from "@apollo/client";
import { toUser } from "@/api/adapters/user.adapter";

// 서버 필드명은 fetchFollowings(복수), 생성된 타입의 fetchFollowing(단수)와 불일치
type FetchFollowingsData = { fetchFollowings?: INewQuery["fetchFollowing"] };

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
    IQueryFetchFollowingArgs
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
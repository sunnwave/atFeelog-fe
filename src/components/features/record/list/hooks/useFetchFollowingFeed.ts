import { IBoard as INewBoard, IQuery as INewQuery, IQueryFetchFollowingFeedArgs } from "@/api/graphql/generated/types.new";
import { gql, useQuery } from "@apollo/client";
import { toRecordSummary } from "@/api/adapters/record-summary.adapter";

export const FETCH_FOLOWING_FEED = gql`
  query fetchFollowingFeed($page: Int) {
    fetchFollowingFeed(page: $page) {
      id
      title
      showName
      artistName
      likeCount
      commentCount
      isLiked
      images
      createdAt
      user {
        id
        name
        picture
      }
    }
  }
`;

export const useFetchFollowingFeed = () => {
  const { data, loading, refetch, fetchMore } = useQuery<
    Pick<INewQuery, "fetchFollowingFeed">,
    IQueryFetchFollowingFeedArgs
  >(FETCH_FOLOWING_FEED, {
    variables: { page: 1 },
  });

  const seen = new Set<string>();
  const records = (data?.fetchFollowingFeed ?? [])
    .map((item) => toRecordSummary(item as INewBoard))
    .filter((r) => {
      if (seen.has(r.id)) return false;
      seen.add(r.id);
      return true;
    });

  return {
    records,
    data,
    loading,
    refetch,
    fetchMore,
  };
};

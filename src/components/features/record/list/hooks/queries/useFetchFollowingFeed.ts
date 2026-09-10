import {
  IBoard as INewBoard,
  IQuery as INewQuery,
  // IQueryFetchFollowingFeedArgs,
} from "@/api/graphql/generated/types.new";
import { gql, useQuery } from "@apollo/client";
import { toRecordSummary } from "@/api/adapters/record-summary.adapter";
import { RecordFilterVars } from "../../types";

export const FETCH_FOLOWING_FEED = gql`
  query fetchFollowingFeed(
    $page: Int
    $startDate: DateTime
    $endDate: DateTime
    $search: String
    $sort: String
  ) {
    fetchFollowingFeed(
      page: $page
      startDate: $startDate
      endDate: $endDate
      search: $search
      sort: $sort
    ) {
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

type FetchFollowingFeedArgs = RecordFilterVars & { page?: number };

export const useFetchFollowingFeed = (filters: RecordFilterVars = {}) => {
  const { data, loading, refetch, fetchMore, error } = useQuery<
    Pick<INewQuery, "fetchFollowingFeed">,
    // IQueryFetchFollowingFeedArgs
    FetchFollowingFeedArgs
  >(FETCH_FOLOWING_FEED, {
    variables: { page: 1, ...filters },
    fetchPolicy: "cache-and-network",
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
    error,
  };
};

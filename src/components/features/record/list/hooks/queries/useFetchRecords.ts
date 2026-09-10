import { IS_NEW_API } from "@/api/config";
import { IQuery } from "@/api/graphql/generated/types";
import { IQuery as INewQuery } from "@/api/graphql/generated/types.new";
import { gql, useQuery } from "@apollo/client";
import { toRecordSummary } from "@/api/adapters/record-summary.adapter";
import { RecordFilterVars } from "../../types";

const FETCH_RECORDS_LEGACY = gql`
  query fetchBoards(
    $page: Int
    $startDate: DateTime
    $endDate: DateTime
    $search: String
  ) {
    fetchBoards(
      page: $page
      startDate: $startDate
      endDate: $endDate
      search: $search
    ) {
      _id
      writer
      title
      contents
      likeCount
      images
      user {
        _id
        name
        picture
      }
      createdAt
    }
  }
`;

const FETCH_RECORDS_NEW = gql`
  query fetchBoards(
    $page: Int
    $startDate: DateTime
    $endDate: DateTime
    $search: String
    $sort: String
  ) {
    fetchBoards(
      page: $page
      startDate: $startDate
      endDate: $endDate
      search: $search
      sort: $sort
    ) {
      id
      title
      showName
      mt20id
      genre
      posterUrl
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

const FETCH_RECORDS = IS_NEW_API ? FETCH_RECORDS_NEW : FETCH_RECORDS_LEGACY;

type FetchBoardsArgs = RecordFilterVars & { page?: number };

export const useFetchRecords = (filter: RecordFilterVars = {}) => {
  const { data, loading, error, fetchMore, refetch } = useQuery<
    Pick<IQuery, "fetchBoards"> | Pick<INewQuery, "fetchBoards">,
    // IQueryFetchBoardsArgs
    FetchBoardsArgs
  >(FETCH_RECORDS, {
    variables: { page: 1, ...filter },
    fetchPolicy: "cache-and-network",
  });

  const seen = new Set<string>();
  const records = (data?.fetchBoards ?? []).map(toRecordSummary).filter((r) => {
    if (seen.has(r.id)) return false;
    seen.add(r.id);
    return true;
  });

  return {
    records,
    data,
    loading,
    error,
    fetchMore,
    refetch,
  };
};

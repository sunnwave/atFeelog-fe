import { IS_NEW_API } from "@/api/config";
import {
  IQuery,
  IQueryFetchBoardsArgs,
} from "@/api/graphql/generated/types";
import { IQuery as INewQuery } from "@/api/graphql/generated/types.new";
import { gql, useQuery } from "@apollo/client";
import { toRecordSummary } from "@/api/adapters/record-summary.adapter";

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
  ) {
    fetchBoards(
      page: $page
      startDate: $startDate
      endDate: $endDate
      search: $search
    ) {
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

const FETCH_RECORDS = IS_NEW_API ? FETCH_RECORDS_NEW : FETCH_RECORDS_LEGACY;

export type RecordFilterVars = Pick<
  IQueryFetchBoardsArgs,
  "search" | "startDate" | "endDate"
>;

export const useFetchRecords = (filter: RecordFilterVars = {}) => {
  const { data, loading, fetchMore, refetch } = useQuery<
    Pick<IQuery, "fetchBoards"> | Pick<INewQuery, "fetchBoards">,
    IQueryFetchBoardsArgs
  >(FETCH_RECORDS, {
    variables: { page: 1, ...filter },
  });

  const seen = new Set<string>();
  const records = (data?.fetchBoards ?? [])
    .map(toRecordSummary)
    .filter((r) => {
      if (seen.has(r.id)) return false;
      seen.add(r.id);
      return true;
    });

  return {
    records,
    data,
    loading,
    fetchMore,
    refetch,
  };
};

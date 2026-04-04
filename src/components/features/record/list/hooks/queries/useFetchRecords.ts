import {
  IQuery,
  IQueryFetchBoardsArgs,
} from "@/shared/graphql/generated/types";
import { gql, useQuery } from "@apollo/client";

const FETCH_RECORDS = gql`
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
      createdAt
      images
    }
  }
`;

export const useFetchRecords = () => {
  const { data, loading, fetchMore, refetch } = useQuery<
    Pick<IQuery, "fetchBoards">,
    IQueryFetchBoardsArgs
  >(FETCH_RECORDS);

  return {
    data,
    loading,
    fetchMore,
    refetch,
  };
};

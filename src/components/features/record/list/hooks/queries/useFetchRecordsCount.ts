import {
  IQuery,
  IQueryFetchBoardsCountArgs,
} from "@/shared/graphql/generated/types";
import { gql, useQuery } from "@apollo/client";

export const FETCH_RECORDS_COUNT = gql`
  query fetchBoardsCount(
    $startDate: DateTime
    $endDate: DateTime
    $search: String
  ) {
    fetchBoardsCount(startDate: $startDate, endDate: $endDate, search: $search)
  }
`;

export const useFetchRecordsCount = () => {
  const { data, refetch } = useQuery<
    Pick<IQuery, "fetchBoardsCount">,
    IQueryFetchBoardsCountArgs
  >(FETCH_RECORDS_COUNT);

  return {
    data,
    refetch,
  };
};

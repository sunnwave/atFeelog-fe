import { IS_NEW_API } from "@/api/config";
import {
  IQuery,
  IQueryFetchBoardsArgs,
} from "@/api/graphql/generated/types";
import { gql, useQuery } from "@apollo/client";

const idField = IS_NEW_API ? "id" : "_id";

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
      _id: ${idField}
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

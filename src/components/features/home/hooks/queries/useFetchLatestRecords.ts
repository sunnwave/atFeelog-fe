import { IS_NEW_API } from "@/api/config";
import { IQuery as ILegacyQuery, IQueryFetchBoardsArgs as ILegacyArgs } from "@/api/graphql/generated/types";
import { IQuery as INewQuery, IQueryFetchBoardsArgs as INewArgs } from "@/api/graphql/generated/types.new";
import { toRecordSummary } from "@/api/adapters/record-summary.adapter";
import { gql, useQuery } from "@apollo/client";

const FETCH_LATEST_RECORDS_LEGACY = gql`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
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

const FETCH_LATEST_RECORDS_NEW = gql`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
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

export const useFetchLatestRecords = (page = 1) => {
  const legacyResult = useQuery<Pick<ILegacyQuery, "fetchBoards">, ILegacyArgs>(
    FETCH_LATEST_RECORDS_LEGACY,
    { variables: { page }, skip: IS_NEW_API, fetchPolicy: "cache-and-network" },
  );

  const newResult = useQuery<Pick<INewQuery, "fetchBoards">, INewArgs>(
    FETCH_LATEST_RECORDS_NEW,
    { variables: { page }, skip: !IS_NEW_API, fetchPolicy: "cache-and-network" },
  );

  const raw = IS_NEW_API
    ? (newResult.data?.fetchBoards ?? [])
    : (legacyResult.data?.fetchBoards ?? []);

  const records = raw.map(toRecordSummary);

  return {
    records,
    loading: IS_NEW_API ? newResult.loading : legacyResult.loading,
    error: IS_NEW_API ? newResult.error : legacyResult.error,
  };
};
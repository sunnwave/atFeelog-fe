import { IS_NEW_API } from "@/api/config";
import { IQuery as ILegacyQuery } from "@/api/graphql/generated/types";
import {
  IQuery as INewQuery,
  IQueryFetchBoardsOfBestArgs,
} from "@/api/graphql/generated/types.new";
import { gql, useQuery } from "@apollo/client";
import { toRecordSummary } from "@/api/adapters/record-summary.adapter";

const FETCH_BEST_RECORDS_LEGACY = gql`
  query fetchBoardsOfTheBest {
    fetchBoardsOfTheBest {
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

const FETCH_BEST_RECORDS_NEW = gql`
  query fetchBoardsOfBest($isTop5: Boolean, $page: Int) {
    fetchBoardsOfBest(isTop5: $isTop5, page: $page) {
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

export const useFetchBestRecords = (
  vars: IQueryFetchBoardsOfBestArgs = { isTop5: true },
) => {
  const legacyResult = useQuery<Pick<ILegacyQuery, "fetchBoardsOfTheBest">>(
    FETCH_BEST_RECORDS_LEGACY,
    { skip: IS_NEW_API },
  );

  const newResult = useQuery<
    Pick<INewQuery, "fetchBoardsOfBest">,
    IQueryFetchBoardsOfBestArgs
  >(FETCH_BEST_RECORDS_NEW, {
    variables: vars,
    skip: !IS_NEW_API,
  });

  const raw = IS_NEW_API
    ? (newResult.data?.fetchBoardsOfBest ?? [])
    : (legacyResult.data?.fetchBoardsOfTheBest ?? []);

  const seen = new Set<string>();
  const records = raw
    .map(toRecordSummary)
    .filter((r) => {
      if (seen.has(r.id)) return false;
      seen.add(r.id);
      return true;
    });

  return {
    records,
    data: newResult.data,
    loading: IS_NEW_API ? newResult.loading : legacyResult.loading,
    fetchMore: newResult.fetchMore,
    refetch: IS_NEW_API ? newResult.refetch : legacyResult.refetch,
  };
};
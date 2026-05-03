import { IS_NEW_API } from "@/api/config";
import { IQuery as ILegacyQuery } from "@/api/graphql/generated/types";
import { IQuery as INewQuery } from "@/api/graphql/generated/types.new";
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
  query fetchBoardsOfBest {
    fetchBoardsOfBest {
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

const FETCH_BEST_RECORDS = IS_NEW_API
  ? FETCH_BEST_RECORDS_NEW
  : FETCH_BEST_RECORDS_LEGACY;

export const useFetchBestRecords = () => {
  const { data, refetch } = useQuery<
    Pick<ILegacyQuery, "fetchBoardsOfTheBest"> | Pick<INewQuery, "fetchBoardsOfBest">
  >(FETCH_BEST_RECORDS);

  const raw = IS_NEW_API
    ? (data as Pick<INewQuery, "fetchBoardsOfBest">)?.fetchBoardsOfBest ?? []
    : (data as Pick<ILegacyQuery, "fetchBoardsOfTheBest">)?.fetchBoardsOfTheBest ?? [];

  const records = raw.map(toRecordSummary);

  return { records, refetch };
};

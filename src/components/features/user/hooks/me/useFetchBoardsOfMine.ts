import { IS_NEW_API } from "@/api/config";
import { IQuery as ILegacyQuery } from "@/api/graphql/generated/types";
import { IQuery as INewQuery } from "@/api/graphql/generated/types.new";
import { gql, useQuery } from "@apollo/client";
import { toRecordSummary } from "@/api/adapters/record-summary.adapter";

const FETCH_BOARDS_OF_MINE_LEGACY = gql`
  query fetchBoardsOfMine {
    fetchBoardsOfMine {
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

const FETCH_BOARDS_OF_MINE_NEW = gql`
  query fetchBoardsOfMine {
    fetchBoardsOfMine {
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

export const useFetchBoardsOfMine = () => {
  const legacyResult = useQuery<Pick<ILegacyQuery, "fetchBoardsOfMine">>(
    FETCH_BOARDS_OF_MINE_LEGACY,
    { skip: IS_NEW_API, fetchPolicy: "cache-and-network" },
  );

  const newResult = useQuery<Pick<INewQuery, "fetchBoardsOfMine">>(
    FETCH_BOARDS_OF_MINE_NEW,
    { skip: !IS_NEW_API, fetchPolicy: "cache-and-network" },
  );

  const raw = IS_NEW_API
    ? (newResult.data?.fetchBoardsOfMine ?? [])
    : (legacyResult.data?.fetchBoardsOfMine ?? []);

  const seen = new Set<string>();
  const records = raw.map(toRecordSummary).filter((r) => {
    if (seen.has(r.id)) return false;
    seen.add(r.id);
    return true;
  });

  return {
    records,
    loading: IS_NEW_API ? newResult.loading : legacyResult.loading,
    refetch: IS_NEW_API ? newResult.refetch : legacyResult.refetch,
  };
};

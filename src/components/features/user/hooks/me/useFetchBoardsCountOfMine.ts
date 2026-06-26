import { IS_NEW_API } from "@/api/config";
import { IQuery as ILegacyQuery } from "@/api/graphql/generated/types";
import { IQuery as INewQuery } from "@/api/graphql/generated/types.new";
import { gql, useQuery } from "@apollo/client";

const FETCH_BOARDS_COUNT_OF_MINE_LEGACY = gql`
  query fetchBoardsCountOfMine {
    fetchBoardsCountOfMine
  }
`;

const FETCH_BOARDS_COUNT_OF_MINE_NEW = gql`
  query fetchBoardsCountOfMine {
    fetchBoardsCountOfMine
  }
`;

export const useFetchBoardsCountOfMine = () => {
  const legacyResult = useQuery<Pick<ILegacyQuery, "fetchBoardsCountOfMine">>(
    FETCH_BOARDS_COUNT_OF_MINE_LEGACY,
    { skip: IS_NEW_API, fetchPolicy: "cache-and-network" },
  );

  const newResult = useQuery<Pick<INewQuery, "fetchBoardsCountOfMine">>(
    FETCH_BOARDS_COUNT_OF_MINE_NEW,
    { skip: !IS_NEW_API, fetchPolicy: "cache-and-network" },
  );

  const count = IS_NEW_API
    ? (newResult.data?.fetchBoardsCountOfMine ?? 0)
    : (legacyResult.data?.fetchBoardsCountOfMine ?? 0);

  return {
    count,
    loading: IS_NEW_API ? newResult.loading : legacyResult.loading,
    refetch: IS_NEW_API ? newResult.refetch : legacyResult.refetch,
  };
};
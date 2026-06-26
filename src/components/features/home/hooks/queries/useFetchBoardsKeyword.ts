import { IS_NEW_API } from "@/api/config";
import { IQuery as INewQuery } from "@/api/graphql/generated/types.new";
import { gql, useQuery } from "@apollo/client";

const FETCH_BOARDS_KEYWORD = gql`
  query fetchBoardsKeyword {
    fetchBoardsKeyword
  }
`;

export const useFetchBoardsKeyword = () => {
  const { data, loading, error } = useQuery<
    Pick<INewQuery, "fetchBoardsKeyword">
  >(FETCH_BOARDS_KEYWORD, { fetchPolicy: "cache-and-network", skip: !IS_NEW_API });

  const keywords = (data?.fetchBoardsKeyword ?? []).map((name, i) => ({
    rank: i + 1,
    name,
  }));

  return { keywords, loading, error };
};
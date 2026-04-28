import { IS_NEW_API } from "@/lib/config";
import { IQuery } from "@/shared/graphql/generated/types";
import { gql, useQuery } from "@apollo/client";

const idField = IS_NEW_API ? "id" : "_id";

const FETCH_BEST_RECORDS = gql`
  query fetchBoardsOfTheBest {
    fetchBoardsOfTheBest {
      _id: ${idField}
      writer
      title
      likeCount
      images
      user {
        name
        picture
      }
      createdAt
    }
  }
`;

export const useFetchBestRecords = () => {
  const { data, refetch } =
    useQuery<Pick<IQuery, "fetchBoardsOfTheBest">>(FETCH_BEST_RECORDS);

  return {
    data,
    refetch,
  };
};

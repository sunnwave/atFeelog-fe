import { IS_NEW_API } from "@/api/config";
import { IQuery, IQueryFetchBoardArgs } from "@/api/graphql/generated/types";
import { gql, useQuery } from "@apollo/client";

const idField = IS_NEW_API ? "id" : "_id";

const FETCH_RECORD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id: ${idField}
      writer
      title
      contents
      youtubeUrl
      likeCount
      images
      boardAddress {
        zipcode
        address
        addressDetail
      }
      createdAt
    }
  }
`;

export const useFetchRecord = (recordId?: string) => {
  return useQuery<Pick<IQuery, "fetchBoard">, IQueryFetchBoardArgs>(
    FETCH_RECORD,
    {
      variables: { boardId: recordId ?? "" },
      skip: !recordId,
    }
  );
};

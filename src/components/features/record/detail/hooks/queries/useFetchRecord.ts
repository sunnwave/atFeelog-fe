import { IQuery, IQueryFetchBoardArgs } from "@/shared/graphql/generated/types";
import { gql, useQuery } from "@apollo/client";

const FETCH_RECORD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
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

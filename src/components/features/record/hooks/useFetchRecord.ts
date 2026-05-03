import { IS_NEW_API } from "@/api/config";
import {
  IQuery as ILegacyQuery,
  IQueryFetchBoardArgs,
} from "@/api/graphql/generated/types";
import { IQuery as INewQuery } from "@/api/graphql/generated/types.new";
import { gql, useQuery } from "@apollo/client";
import { toRecordDetail } from "@/api/adapters/record.adapter";

const FETCH_RECORD_LEGACY = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      likeCount
      images
      boardAddress {
        _id
        zipcode
        address
        addressDetail
      }
      user {
        _id
        name
        picture
      }
      createdAt
      updatedAt
    }
  }
`;

const FETCH_RECORD_NEW = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      id
      title
      showName
      artistName
      showDate
      contents
      likeCount
      commentCount
      isLiked
      images
      boardAddress {
        id
        placeName
        roadAddress
        jibunAddress
        x
        y
      }
      user {
        id
        name
        picture
      }
      createdAt
      updatedAt
    }
  }
`;

export const FETCH_RECORD = IS_NEW_API ? FETCH_RECORD_NEW : FETCH_RECORD_LEGACY;

export const useFetchRecord = (recordId?: string) => {
  const { data, loading, error } = useQuery<
    Pick<ILegacyQuery, "fetchBoard"> | Pick<INewQuery, "fetchBoard">,
    IQueryFetchBoardArgs
  >(FETCH_RECORD, {
    variables: { boardId: recordId ?? "" },
    skip: !recordId,
  });

  const rawBoard = data?.fetchBoard;
  const record = rawBoard ? toRecordDetail(rawBoard) : undefined;

  return { record, loading, error };
};

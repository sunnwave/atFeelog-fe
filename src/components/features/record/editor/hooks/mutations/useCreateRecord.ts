import {
  ICreateBoardInput,
  IMutation,
  IMutationCreateBoardArgs,
} from "@/shared/graphql/generated/types";
import { gql, useMutation } from "@apollo/client";

export const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
      youtubeUrl
      likeCount
      images
      createdAt
      updatedAt
      deletedAt
      boardAddress {
        zipcode
        address
        addressDetail
      }
    }
  }
`;

export const useCreateRecord = () => {
  const [createBoard, { loading }] = useMutation<
    Pick<IMutation, "createBoard">,
    IMutationCreateBoardArgs
  >(CREATE_BOARD);

  const onCreateRecord = async (createBoardInput: ICreateBoardInput) => {
    const res = await createBoard({ variables: { createBoardInput } });

    const id = res.data?.createBoard._id;

    if (!id) throw new Error("필로그 기록에 실패했어요😢");

    return id;
  };

  return { onCreateRecord, loading };
};

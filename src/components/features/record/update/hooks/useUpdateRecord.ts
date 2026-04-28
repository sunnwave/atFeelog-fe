import { IS_NEW_API } from "@/api/config";
import {
  IMutation,
  IMutationUpdateBoardArgs,
} from "@/api/graphql/generated/types";
import { gql, useMutation } from "@apollo/client";

const idField = IS_NEW_API ? "id" : "_id";

export const UPDATE_RECORD = gql`
  mutation updateBoard(
    $updateBoardInput: UpdateBoardInput!
    $password: String
    $boardId: ID!
  ) {
    updateBoard(
      updateBoardInput: $updateBoardInput
      password: $password
      boardId: $boardId
    ) {
      _id: ${idField}
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

export const useUpdateRecord = () => {
  const [updateBoard, { loading }] = useMutation<
    Pick<IMutation, "updateBoard">,
    IMutationUpdateBoardArgs
  >(UPDATE_RECORD);

  const onUpdateRecord = async (args: IMutationUpdateBoardArgs) => {
    const { boardId, updateBoardInput, password } = args;
    const res = await updateBoard({
      variables: { boardId, updateBoardInput, password },
    });

    const id = res.data?.updateBoard._id;

    if (!id) throw new Error("필로그 수정에 실패했어요😢");

    return id;
  };

  return { onUpdateRecord, loading };
};

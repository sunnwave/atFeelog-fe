import { IS_NEW_API } from "@/api/config";
import { IMutationUpdateBoardArgs as ILegacyUpdateArgs } from "@/api/graphql/generated/types";
import { IMutationUpdateBoardArgs as INewUpdateArgs } from "@/api/graphql/generated/types.new";
import { gql, useMutation } from "@apollo/client";
import { FETCH_RECORD } from "../../hooks/useFetchRecord";

export const UPDATE_RECORD_LEGACY = gql`
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
      _id
    }
  }
`;

export const UPDATE_RECORD_NEW = gql`
  mutation updateBoard($updateBoardInput: UpdateBoardInput!, $boardId: ID!) {
    updateBoard(updateBoardInput: $updateBoardInput, boardId: $boardId) {
      _id: id
    }
  }
`;

const UPDATE_RECORD = IS_NEW_API ? UPDATE_RECORD_NEW : UPDATE_RECORD_LEGACY;

type UpdateRecordResponse = {
  updateBoard: { _id: string };
};

export const useUpdateRecord = () => {
  const [updateBoard, { loading }] = useMutation<
    UpdateRecordResponse,
    ILegacyUpdateArgs | INewUpdateArgs
  >(UPDATE_RECORD);

  const onUpdateRecord = async (args: ILegacyUpdateArgs | INewUpdateArgs) => {
    const { boardId, updateBoardInput } = args;
    const password = IS_NEW_API
      ? undefined
      : (args as ILegacyUpdateArgs).password;

    const res = await updateBoard({
      variables: { boardId, updateBoardInput, password },
      refetchQueries: [{ query: FETCH_RECORD, variables: { boardId } }],
      awaitRefetchQueries: true,
    });

    const id = res.data?.updateBoard._id;
    if (!id) throw new Error("필로그 수정에 실패했어요😢");

    return id;
  };

  return { onUpdateRecord, loading };
};

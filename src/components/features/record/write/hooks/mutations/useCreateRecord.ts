import { IS_NEW_API } from "@/api/config";
import { ICreateBoardInput } from "@/api/graphql/generated/types";
import { ICreateBoardInput as ICreateBoardInputNew } from "@/api/graphql/generated/types.new";
import { gql, useMutation } from "@apollo/client";
import { toCreateBoardInput } from "@/api/adapters/record-input.adapter";
import { RecordEditFormValues } from "@/components/features/record/model";

export const CREATE_RECORD_LEGACY = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      id: _id
      images
    }
  }
`;

export const CREATE_RECORD_NEW = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      id
      images
    }
  }
`;

const CREATE_RECORD = IS_NEW_API ? CREATE_RECORD_NEW : CREATE_RECORD_LEGACY;

type CreateRecordResponse = { createBoard: { id: string } };

type CreateRecordVars = {
  createBoardInput: ICreateBoardInput | ICreateBoardInputNew;
};

export const useCreateRecord = () => {
  const [createRecord, { loading }] = useMutation<
    CreateRecordResponse,
    CreateRecordVars
  >(CREATE_RECORD);

  const onCreateRecord = async (args: {
    values: RecordEditFormValues;
    writer?: string;
    password?: string;
  }) => {
    const createBoardInput = toCreateBoardInput(args);
    console.log("[createBoard] input:", JSON.stringify(createBoardInput, null, 2));
    const res = await createRecord({ variables: { createBoardInput } });
    console.log("[createBoard] response:", res.data);

    const id = res.data?.createBoard.id;
    if (!id) throw new Error("필로그 기록에 실패했어요😢");

    return id;
  };

  return { onCreateRecord, loading };
};

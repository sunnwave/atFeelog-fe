import { useToast } from "@/components/commons/toast/ToastProvider";
import {
  IMutation,
  IMutationDeleteBoardArgs,
} from "@/shared/graphql/generated/types";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

const DELETE_RECORD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;

export const useDeleteBoard = () => {
  const router = useRouter();

  const [deleteBoard] = useMutation<
    Pick<IMutation, "deleteBoard">,
    IMutationDeleteBoardArgs
  >(DELETE_RECORD);

  const { error, success } = useToast();

  const onDeleteRecord = async (recordId: string) => {
    try {
      await deleteBoard({
        variables: { boardId: recordId },
      });
      success("게시글이 삭제되었습니다");
      router.push("/records");
    } catch (err) {
      if (err instanceof Error) {
        error(err.message || "게시글 삭제에 실패했습니다😢");
        console.error(err);
      }
    }
  };

  return {
    onDeleteRecord,
  };
};

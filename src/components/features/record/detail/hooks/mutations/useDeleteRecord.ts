import { useToast } from "@/components/commons/toast/ToastProvider";
import {
  IMutation as ILegacyMutation,
  IMutationDeleteBoardArgs as ILegacyDeleteArgs,
} from "@/api/graphql/generated/types";
import {
  IMutation as INewMutation,
  IMutationDeleteBoardArgs as INewDeleteArgs,
} from "@/api/graphql/generated/types.new";
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
    Pick<ILegacyMutation | INewMutation, "deleteBoard">,
    ILegacyDeleteArgs | INewDeleteArgs
  >(DELETE_RECORD, { errorPolicy: "all" });

  const { error, success } = useToast();

  const onDeleteRecord = async (recordId: string) => {
    try {
      const result = await deleteBoard({
        variables: { boardId: recordId },
      });

      if (result.errors?.length) {
        const msg = result.errors[0].message;
        console.error("[deleteBoard] GraphQL error:", result.errors);
        error(msg || "게시글 삭제에 실패했어요😢");
        return;
      }

      success("게시글이 삭제되었습니다");
      router.push("/records");
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "게시글 삭제에 실패했어요😢";
      console.error("[deleteBoard] error:", err);
      error(msg);
    }
  };

  return {
    onDeleteRecord,
  };
};

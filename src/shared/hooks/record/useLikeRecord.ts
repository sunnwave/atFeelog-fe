import {
  IMutation as ILegacyMutation,
  IMutationLikeBoardArgs as ILegacyLikeArgs,
} from "@/api/graphql/generated/types";
import {
  IMutation as INewMutation,
  IMutationLikeBoardArgs as INewLikeArgs,
} from "@/api/graphql/generated/types.new";
import { gql, useMutation } from "@apollo/client";

const LIKE_RECORD = gql`
  mutation likeBoard($boardId: ID!) {
    likeBoard(boardId: $boardId)
  }
`;

export const useLikeRecord = () => {
  const [likeBoard] = useMutation<
    Pick<ILegacyMutation | INewMutation, "likeBoard">,
    ILegacyLikeArgs | INewLikeArgs
  >(LIKE_RECORD, { errorPolicy: "all" });

  const onLikeRecord = async (recordId: string) => {
    const result = await likeBoard({ variables: { boardId: recordId } });
    return result.data?.likeBoard;
  };

  return { onLikeRecord };
};
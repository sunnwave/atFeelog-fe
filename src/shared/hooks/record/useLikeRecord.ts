import { IS_NEW_API } from "@/api/config";
import {
  IMutation as ILegacyMutation,
  IMutationLikeBoardArgs as ILegacyLikeArgs,
} from "@/api/graphql/generated/types";
import {
  IMutation as INewMutation,
  IMutationLikeBoardArgs as INewLikeArgs,
} from "@/api/graphql/generated/types.new";
import { gql, useMutation } from "@apollo/client";

const LIKE_RECORD_LEGACY = gql`
  mutation likeBoard($boardId: ID!) {
    likeBoard(boardId: $boardId)
  }
`;

const LIKE_RECORD_NEW = gql`
  mutation likeBoard($boardId: ID!) {
    likeBoard(boardId: $boardId) {
      isLike
      likeCount
    }
  }
`;

const LIKE_RECORD = IS_NEW_API ? LIKE_RECORD_NEW : LIKE_RECORD_LEGACY;

export const useLikeRecord = () => {
  const [likeBoard] = useMutation<
    Pick<ILegacyMutation | INewMutation, "likeBoard">,
    ILegacyLikeArgs | INewLikeArgs
  >(LIKE_RECORD, {
    errorPolicy: "all",
    update(cache, result, { variables }) {
      if (!IS_NEW_API || result.errors?.length || !variables?.boardId) return;

      const data = result.data?.likeBoard;
      if (!data || typeof data === "number") return;

      const id = cache.identify({
        __typename: "Board",
        id: variables.boardId,
      });
      if (!id) return;

      cache.modify({
        id,
        fields: {
          isLiked: () => data.isLike,
          likeCount: () => data.likeCount,
        },
      });
    },
  });

  const onLikeRecord = async (recordId: string) => {
    const result = await likeBoard({ variables: { boardId: recordId } });
    return result.data?.likeBoard;
  };

  return { onLikeRecord };
};

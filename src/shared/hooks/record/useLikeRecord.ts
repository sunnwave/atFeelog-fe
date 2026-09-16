import { IS_NEW_API } from "@/api/config";
import {
  IMutation as ILegacyMutation,
  IMutationLikeBoardArgs as ILegacyLikeArgs,
} from "@/api/graphql/generated/types";
import {
  IMutation as INewMutation,
  IMutationLikeBoardArgs as INewLikeArgs,
  IQuery,
} from "@/api/graphql/generated/types.new";
import { gql, useMutation } from "@apollo/client";
import { useRecoilValue } from "recoil";
import { loggedInUserState } from "@/shared/stores";
import { FETCH_LIKED_BOARD_IDS } from "./useFetchLikedBoardIds";

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
  const me = useRecoilValue(loggedInUserState);

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

      if (!me?.id) return;

      const existing = cache.readQuery<Pick<IQuery, "fetchBoardsLikeByUser">>({
        query: FETCH_LIKED_BOARD_IDS,
        variables: { userId: me.id },
      });
      if (!existing) return;

      const current = existing.fetchBoardsLikeByUser ?? [];
      const nextList = data.isLike
        ? current.some((b) => b?.id === variables.boardId)
          ? current
          : [...current, { __typename: "Board" as const, id: variables.boardId }]
        : current.filter((b) => b?.id !== variables.boardId);

      cache.writeQuery({
        query: FETCH_LIKED_BOARD_IDS,
        variables: { userId: me.id },
        data: { fetchBoardsLikeByUser: nextList },
      });
    },
  });

  const onLikeRecord = async (recordId: string) => {
    const result = await likeBoard({ variables: { boardId: recordId } });
    return result.data?.likeBoard;
  };

  return { onLikeRecord };
};

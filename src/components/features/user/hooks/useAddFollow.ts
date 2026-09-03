import { IS_NEW_API } from "@/api/config";
import {
  IMutation as INewMutation,
  IMutationAddFollowArgs,
} from "@/api/graphql/generated/types.new";
import { gql, useMutation } from "@apollo/client";

const ADD_FOLLOW = gql`
  mutation addFollow($followerId: ID!) {
    addFollow(followerId: $followerId)
  }
`;

export const useAddFollow = () => {
  const [addFollow, { loading }] = useMutation<
    Pick<INewMutation, "addFollow">,
    IMutationAddFollowArgs
  >(ADD_FOLLOW, {
    errorPolicy: "all",
    refetchQueries: ["fetchCountOfFollowers", "fetchCountOfFollowing", "fetchFollowings", "fetchFollowers", "isConnected"],
  });

  const onAddFollow = async (followerId: string) => {
    if (!IS_NEW_API) return;
    const result = await addFollow({ variables: { followerId } });
    if (result.errors?.length) {
      throw new Error(result.errors[0].message);
    }
    return result.data?.addFollow;
  };

  return { onAddFollow, loading };
};
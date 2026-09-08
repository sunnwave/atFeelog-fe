import { gql, useMutation } from "@apollo/client";
import { IS_NEW_API } from "@/api/config";
import {
  IMutation as INewMutation,
  IMutationUpdateUserArgs,
  IUpdateUserInput as INewUpdateUserInput,
} from "@/api/graphql/generated/types.new";
import {
  IMutation as ILegacyMutation,
  IMutationUpdateUserArgs as ILegacyUpdateUserArgs,
} from "@/api/graphql/generated/types";
import { toUser } from "@/api/adapters/user.adapter";

const UPDATE_USER_LEGACY = gql`
  mutation updateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      _id
      name
      email
      picture
    }
  }
`;

const UPDATE_USER_NEW = gql`
  mutation updateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      id
      name
      email
      picture
    }
  }
`;

export const useUpdateUser = () => {
  const [updateUserLegacy, { loading: legacyLoading }] = useMutation<
    Pick<ILegacyMutation, "updateUser">,
    ILegacyUpdateUserArgs
  >(UPDATE_USER_LEGACY, { errorPolicy: "all" });

  const [updateUserNew, { loading: newLoading }] = useMutation<
    Pick<INewMutation, "updateUser">,
    IMutationUpdateUserArgs
  >(UPDATE_USER_NEW, { errorPolicy: "all" });

  const onUpdateUser = async (updateUserInput: INewUpdateUserInput) => {
    if (IS_NEW_API) {
      const result = await updateUserNew({ variables: { updateUserInput } });
      if (result.errors?.length) throw new Error(result.errors[0].message);
      if (!result.data?.updateUser) return;
      return toUser(result.data.updateUser);
    } else {
      // legacy IUpdateUserInput does not include password
      const { password: _pw, ...legacyInput } = updateUserInput;
      const result = await updateUserLegacy({
        variables: { updateUserInput: legacyInput },
      });
      if (result.errors?.length) throw new Error(result.errors[0].message);
      if (!result.data?.updateUser) return;
      return toUser(result.data.updateUser);
    }
  };

  return {
    onUpdateUser,
    loading: IS_NEW_API ? newLoading : legacyLoading,
  };
};
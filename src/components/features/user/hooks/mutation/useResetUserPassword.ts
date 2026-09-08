import { gql, useMutation } from "@apollo/client";
import { IS_NEW_API } from "@/api/config";
import {
  IMutation as INewMutation,
  IMutationResetUserPasswordArgs,
} from "@/api/graphql/generated/types.new";
import {
  IMutation as ILegacyMutation,
  IMutationResetUserPasswordArgs as ILegacyResetUserPasswordArgs,
} from "@/api/graphql/generated/types";

const RESET_USER_PASSWORD = gql`
  mutation resetUserPassword($password: String!) {
    resetUserPassword(password: $password)
  }
`;

export const useResetUserPassword = () => {
  const [resetLegacy, { loading: legacyLoading }] = useMutation<
    Pick<ILegacyMutation, "resetUserPassword">,
    ILegacyResetUserPasswordArgs
  >(RESET_USER_PASSWORD, { errorPolicy: "all" });

  const [resetNew, { loading: newLoading }] = useMutation<
    Pick<INewMutation, "resetUserPassword">,
    IMutationResetUserPasswordArgs
  >(RESET_USER_PASSWORD, { errorPolicy: "all" });

  const onResetUserPassword = async (password: string) => {
    const fn = IS_NEW_API ? resetNew : resetLegacy;
    const result = await fn({ variables: { password } });
    if (result.errors?.length) throw new Error(result.errors[0].message);
    return result.data?.resetUserPassword ?? false;
  };

  return {
    onResetUserPassword,
    loading: IS_NEW_API ? newLoading : legacyLoading,
  };
};
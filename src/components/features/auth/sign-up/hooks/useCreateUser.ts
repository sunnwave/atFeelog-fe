import { IS_NEW_API } from "@/api/config";
import { useToast } from "@/components/commons/toast/ToastProvider";
import {
  IMutation,
  IMutationCreateUserArgs,
} from "@/api/graphql/generated/types";
import { useNavigation } from "@/shared/hooks/ui/useNavigation";
import { gql, useMutation } from "@apollo/client";

const idField = IS_NEW_API ? "id" : "_id";

const CREATE_USER = gql`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id: ${idField}
      email
      name
    }
  }
`;

type CreateUserForm = {
  email: string;
  name: string;
  password: string;
};

export const useCreateUser = () => {
  const [createUser, { loading }] = useMutation<
    Pick<IMutation, "createUser">,
    IMutationCreateUserArgs
  >(CREATE_USER);

  const { error, success } = useToast();

  const { onClickNavigation } = useNavigation();

  const onCreateUser = async (form: CreateUserForm) => {
    try {
      const res = await createUser({
        variables: {
          createUserInput: {
            email: form.email,
            name: form.name,
            password: form.password,
          },
        },
      });
      success(`${res.data?.createUser.name}님 회원가입이 완료되었습니다👐🏻✨`);
      onClickNavigation("/login")();
    } catch (err) {
      if (err instanceof Error) {
        error(err.message || "회원가입에 실패했습니다😢");
        console.error(err);
      }
    }
  };
  return { onCreateUser, loading };
};

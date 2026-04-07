import { useToast } from "@/components/commons/toast/ToastProvider";
import {
  IMutation,
  IMutationLoginUserArgs,
} from "@/shared/graphql/generated/types";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useFetchUserLoggedInLazy } from "./useFetchUserLoggedInLazy";
import { accessTokenState, loggedInUserState } from "@/shared/stores";

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
    }
  }
`;

type LoginUserForm = {
  email: string;
  password: string;
};

export default function useLoginUser() {
  const [loginUser, { loading, error: mutationError }] = useMutation<
    Pick<IMutation, "loginUser">,
    IMutationLoginUserArgs
  >(LOGIN_USER);

  const [, setAccessToken] = useRecoilState(accessTokenState);
  const setLoggedInUser = useSetRecoilState(loggedInUserState);

  const { error, success } = useToast();

  const router = useRouter();
  const redirectRaw = router.query.redirect;

  const redirect =
    typeof redirectRaw === "string"
      ? redirectRaw
      : Array.isArray(redirectRaw)
      ? redirectRaw[0]
      : undefined;

  const { run: fetchMe } = useFetchUserLoggedInLazy();

  const onLoginUser = async (form: LoginUserForm) => {
    if (loading) return;
    try {
      const res = await loginUser({
        variables: {
          email: form.email.trim(),
          password: form.password,
        },
        context: { credentials: "include" },
      });
      const accessToken = res.data?.loginUser.accessToken;

      if (!accessToken) {
        error("로그인에 실패했습니다😢");
        return;
      }
      setAccessToken(accessToken);
      await Promise.resolve(); // accessToken 상태가 업데이트된 이후에 fetchMe가 실행되도록 보장

      const me = await fetchMe();
      if (!me) {
        error("유저 정보를 불러오지 못했어요. 다시 로그인해주세요😢");
        return;
      }
      setLoggedInUser(me);
      success("로그인에 성공했습니다👐🏻✨");

      // TODO: 이전 페이지로 이동
      router.push(redirect || "/");
    } catch (err) {
      if (err instanceof Error) {
        error(err.message || "로그인에 실패했습니다😢");
        console.error(err);
      }
    }
  };

  return { onLoginUser, loading, mutationError };
}

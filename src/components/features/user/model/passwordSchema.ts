import * as yup from "yup";

export type PasswordFormValues = { password: string; passwordConfirm: string };

export const passwordSchema: yup.ObjectSchema<PasswordFormValues> = yup.object({
  password: yup
    .string()
    .required("비밀번호를 입력해주세요.")
    .min(8, "비밀번호는 8자 이상이어야 해요."),
  passwordConfirm: yup
    .string()
    .required("비밀번호 확인을 입력해주세요.")
    .oneOf([yup.ref("password")], "비밀번호가 일치하지 않아요."),
});
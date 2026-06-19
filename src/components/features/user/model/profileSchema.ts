import * as yup from "yup";

export type ProfileFormValues = { name: string };

export const profileSchema: yup.ObjectSchema<ProfileFormValues> = yup.object({
  name: yup
    .string()
    .trim()
    .required("이름을 입력해주세요.")
    .min(1, "이름은 1자 이상이어야 해요.")
    .max(12, "이름은 12자 이하여야 해요."),
});
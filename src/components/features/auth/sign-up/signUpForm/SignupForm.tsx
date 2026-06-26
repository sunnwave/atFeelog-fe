import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button/Button";
import {
  FieldError,
  FormLabel,
  SignUpValues,
  TextField,
} from "@/components/ui/form";
import PasswordField from "@/components/ui/form/PasswordField";
import { cn } from "@/shared/utils/cn";
import { schema } from "./schema";

type Props = {
  onSubmit?: (
    values: Omit<SignUpValues, "passwordConfirm">,
  ) => Promise<void> | void;
  className?: string;
};

export default function SignupForm({ onSubmit, className }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch,
    setValue,
  } = useForm<SignUpValues>({
    resolver: yupResolver(schema),
    mode: "onChange", // 입력하면서 isValid 갱신
    defaultValues: {
      email: "",
      name: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const submit = async (values: SignUpValues) => {
    await onSubmit?.({
      email: values.email.trim(),
      name: values.name.trim(),
      password: values.password,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className={cn("w-full max-w-105 space-y-5", className)}
    >
      {/* Email */}
      <div className="flex flex-col space-y-2">
        <FormLabel htmlFor="email" required={true}>
          이메일
        </FormLabel>
        <TextField
          name="email"
          type="email"
          autoComplete="email"
          placeholder="example@atfeelog.com"
          register={register}
          error={errors.email}
        />
        <FieldError error={errors.email} />
      </div>

      {/* name */}
      <div className="flex flex-col space-y-2">
        <FormLabel htmlFor="name" required={true}>
          이름
        </FormLabel>
        <TextField
          name="name"
          placeholder="1~12자"
          autoComplete="username"
          register={register}
          error={errors.name}
        />
        <FieldError error={errors.name} />
      </div>

      {/* Password */}
      <div className="flex flex-col space-y-2">
        <FormLabel htmlFor="password" required={true}>
          비밀번호
        </FormLabel>
        <PasswordField
          id="password"
          name="password"
          placeholder="8자 이상"
          autoComplete="new-password"
          register={register}
          watch={watch}
          setValue={setValue}
          error={errors.password}
        />
        <FieldError error={errors.password} />
      </div>

      {/* PasswordConfirm */}
      <div className="flex flex-col space-y-2">
        <FormLabel htmlFor="passwordConfirm" required={true}>
          비밀번호 확인
        </FormLabel>
        <PasswordField
          id="passwordConfirm"
          name="passwordConfirm"
          placeholder="비밀번호를 다시 입력해주세요"
          register={register}
          watch={watch}
          setValue={setValue}
          error={errors.passwordConfirm}
        />
        <FieldError error={errors.passwordConfirm} />
      </div>

      <Button
        type="submit"
        disabled={!isValid || isSubmitting}
        size="md"
        className="w-full font-semibold mt-3"
      >
        {isSubmitting ? "가입 중..." : "회원가입"}
      </Button>
    </form>
  );
}

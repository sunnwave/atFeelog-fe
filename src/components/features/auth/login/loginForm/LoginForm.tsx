import {
  FieldError,
  FormLabel,
  LoginValues,
  PasswordField,
  TextField,
} from "@/components/ui/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { schema } from "./schema";
import { Button } from "@/components/ui/button/Button";
import { cn } from "@/shared/utils/cn";

type LoginFormProps = {
  onSubmit?: (values: LoginValues) => Promise<void> | void;
  className?: string;
};

export default function LoginForm({ onSubmit, className }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch,
    setValue,
  } = useForm<LoginValues>({
    resolver: yupResolver(schema),
    mode: "onChange", // 입력하면서 isValid 갱신
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submit = async (values: LoginValues) => {
    await onSubmit?.({
      email: values.email.trim(),
      password: values.password,
    });
  };

  return (
    <form onSubmit={handleSubmit(submit)} className={cn("w-full max-w-105 space-y-5", className)}>
      <div className="flex flex-col space-y-2">
        <FormLabel htmlFor="email" required={false}>
          이메일
        </FormLabel>
        <TextField
          name="email"
          testId="login-email"
          type="email"
          autoComplete="email"
          placeholder="example@atfeelog.com"
          register={register}
          error={errors.email}
        />
        <FieldError error={errors.email} />
      </div>

      <div className="flex flex-col space-y-2">
        <FormLabel htmlFor="password" required={false}>
          비밀번호
        </FormLabel>
        <PasswordField
          id="password"
          testId="login-password"
          name="password"
          register={register}
          watch={watch}
          setValue={setValue}
          error={errors.password}
        />
        <FieldError error={errors.password} />
      </div>

      <Button
        type="submit"
        data-testid="login-submit"
        disabled={!isValid || isSubmitting}
        size="md"
        className="w-full mt-3"
      >
        {isSubmitting ? "로그인 중..." : "로그인"}
      </Button>
    </form>
  );
}

import {
  UseFormRegister,
  FieldErrors,
  UseFormWatch,
  UseFormSetValue,
} from "react-hook-form";
import { FieldError } from "@/components/ui/form";
import PasswordField from "@/components/ui/form/PasswordField";
import { PasswordFormValues } from "../../../model/passwordSchema";

interface PasswordEditFormProps {
  formId: string;
  register: UseFormRegister<PasswordFormValues>;
  errors: FieldErrors<PasswordFormValues>;
  watch: UseFormWatch<PasswordFormValues>;
  setValue: UseFormSetValue<PasswordFormValues>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

const fieldLabel =
  "block text-[13px] font-black tracking-[0.16em] uppercase text-muted-foreground mb-1.5";

export default function PasswordEditForm({
  formId,
  register,
  errors,
  watch,
  setValue,
  onSubmit,
}: PasswordEditFormProps) {
  return (
    <form id={formId} onSubmit={onSubmit}>
      <div className="px-5 py-5 space-y-4">
        <div>
          <label htmlFor="password" className={fieldLabel}>
            새 비밀번호
          </label>
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

        <div>
          <label htmlFor="passwordConfirm" className={fieldLabel}>
            비밀번호 확인
          </label>
          <PasswordField
            id="passwordConfirm"
            name="passwordConfirm"
            placeholder="비밀번호를 다시 입력해주세요"
            autoComplete="new-password"
            register={register}
            watch={watch}
            setValue={setValue}
            error={errors.passwordConfirm}
          />
          <FieldError error={errors.passwordConfirm} />
        </div>
      </div>
    </form>
  );
}

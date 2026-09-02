import { UseFormRegister, FieldErrors } from "react-hook-form";
import { TextField, FieldError } from "@/components/ui/form";
import { ProfileFormValues } from "../../model/profileSchema";
import { formatDate } from "@/shared/utils";
import { User } from "@/api/adapters/types/user";

interface ProfileEditFormProps {
  formId: string;
  user: User | null;
  register: UseFormRegister<ProfileFormValues>;
  errors: FieldErrors<ProfileFormValues>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

const fieldLabel =
  "block text-[13px] font-black tracking-[0.16em] uppercase text-muted-foreground mb-1.5";

export default function ProfileEditForm({
  formId,
  user,
  register,
  errors,
  onSubmit,
}: ProfileEditFormProps) {
  return (
    <form id={formId} onSubmit={onSubmit}>
      <div className="px-5 py-5 space-y-4">
        <div>
          <label className={fieldLabel}>이메일</label>
          <div className="w-full h-11 px-4 flex items-center border-[1.5px] border-foreground/30 bg-surface-soft text-sm text-muted-foreground">
            {user?.email}
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground/70">
            이메일은 변경할 수 없습니다
          </p>
        </div>

        <div>
          <label className={fieldLabel}>가입일</label>
          <div className="w-full h-11 px-4 flex items-center border-[1.5px] border-foreground/30 bg-surface-soft text-sm text-muted-foreground">
            {user?.createdAt ? formatDate(user.createdAt) : "-"}
          </div>
        </div>

        <div>
          <label htmlFor="name" className={fieldLabel}>
            이름
          </label>
          <TextField
            id="name"
            name="name"
            placeholder="1~12자"
            autoComplete="username"
            register={register}
            error={errors.name}
          />
          <FieldError error={errors.name} />
        </div>
      </div>
    </form>
  );
}

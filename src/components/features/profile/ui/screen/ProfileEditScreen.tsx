import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRecoilState } from "recoil";
import { loggedInUserState } from "@/shared/stores";
import { cn } from "@/shared/utils/cn";
import PageHeader from "@/components/commons/pageHeader/PageHeader";
import { TextField, FieldError } from "@/components/ui/form";
import PasswordField from "@/components/ui/form/PasswordField";
import { Button } from "@/components/ui/button/Button";
import { Camera } from "lucide-react";
import Avatar from "@/components/ui/avatar/Avatar";
import RecordEditorBottomBar from "@/components/features/record/editor/ui/RecordEditorBottomBar";
import { useToast } from "@/components/commons/toast/ToastProvider";
import { useUploadImages } from "@/shared/hooks/image/useUploadImages";
import { useResetUserPassword, useUpdateUser } from "../../hooks";

type ProfileTab = "profile" | "password";
type ProfileFormValues = { name: string };
type PasswordFormValues = { password: string; passwordConfirm: string };

const TABS: { id: ProfileTab; label: string }[] = [
  { id: "profile", label: "프로필" },
  { id: "password", label: "보안" },
];

const profileSchema: yup.ObjectSchema<ProfileFormValues> = yup.object({
  name: yup
    .string()
    .trim()
    .required("이름을 입력해주세요.")
    .min(1, "이름은 1자 이상이어야 해요.")
    .max(12, "이름은 12자 이하여야 해요."),
});

const passwordSchema: yup.ObjectSchema<PasswordFormValues> = yup.object({
  password: yup
    .string()
    .required("비밀번호를 입력해주세요.")
    .min(8, "비밀번호는 8자 이상이어야 해요."),
  passwordConfirm: yup
    .string()
    .required("비밀번호 확인을 입력해주세요.")
    .oneOf([yup.ref("password")], "비밀번호가 일치하지 않아요."),
});

const fieldLabel =
  "block text-[13px] font-black tracking-[0.16em] uppercase text-muted-foreground mb-1.5";

export default function ProfileEditScreen() {
  const [activeTab, setActiveTab] = useState<ProfileTab>("profile");
  const [loggedInUser, setLoggedInUser] = useRecoilState(loggedInUserState);
  const { success, error } = useToast();
  const { onUpdateUser, loading: updateLoading } = useUpdateUser();
  const { onResetUserPassword, loading: resetLoading } = useResetUserPassword();
  const { uploadImages, isUploading } = useUploadImages();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePictureChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";
    try {
      const [url] = await uploadImages([file]);
      const updated = await onUpdateUser({ picture: url });
      if (updated && loggedInUser) {
        setLoggedInUser({ ...loggedInUser, picture: updated.picture });
      }
      success("프로필 사진이 변경되었어요.");
    } catch {
      error("사진 업로드에 실패했어요. 다시 시도해주세요.");
    }
  };

  const profileForm = useForm<ProfileFormValues>({
    resolver: yupResolver(profileSchema),
    defaultValues: { name: loggedInUser?.name ?? "" },
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: yupResolver(passwordSchema),
    defaultValues: { password: "", passwordConfirm: "" },
    mode: "onChange",
  });

  const onProfileSubmit = profileForm.handleSubmit(async (values) => {
    try {
      const updated = await onUpdateUser({ name: values.name.trim() });
      if (updated && loggedInUser) {
        setLoggedInUser({ ...loggedInUser, name: updated.name });
      }
      profileForm.reset({ name: values.name.trim() });
      success("프로필이 저장되었어요.");
    } catch {
      error("저장에 실패했어요. 다시 시도해주세요.");
    }
  });

  const onPasswordSubmit = passwordForm.handleSubmit(async (values) => {
    try {
      await onResetUserPassword(values.password);
      passwordForm.reset();
      success("비밀번호가 변경되었어요.");
    } catch {
      error("비밀번호 변경에 실패했어요. 다시 시도해주세요.");
    }
  });

  const profileDirty = profileForm.formState.isDirty;
  const profileBusy = updateLoading || profileForm.formState.isSubmitting;
  const passwordBusy = resetLoading || passwordForm.formState.isSubmitting;

  const submitDisabled =
    activeTab === "profile"
      ? profileBusy || !profileDirty
      : passwordBusy || !passwordForm.formState.isValid;

  const submitLabel =
    activeTab === "profile"
      ? profileBusy
        ? "저장 중..."
        : "프로필 저장"
      : passwordBusy
        ? "변경 중..."
        : "비밀번호 변경";

  const handleCancel = () => {
    if (activeTab === "profile") profileForm.reset();
    else passwordForm.reset();
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader label="Profile Edit" fallbackHref="/user/me" />

      <div className="mx-auto pb-20 lg:max-w-2xl lg:px-6 lg:py-8">
        {/* 아바타 */}
        <div className="px-5 py-6 border-b border-foreground/15 flex flex-col items-center gap-3">
          <div className="relative">
            <Avatar user={loggedInUser} size="lg" type="filled" />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-foreground border-2 border-background flex items-center justify-center text-background hover:bg-foreground/90 transition-colors disabled:opacity-50"
              aria-label="프로필 사진 변경"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePictureChange}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            {isUploading ? "업로드 중..." : loggedInUser?.name}
          </p>
        </div>

        {/* 탭 바 */}
        <div className="flex border-b-[1.5px] border-foreground">
          {TABS.map((tab, i) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-1 py-3 text-[11px] font-black tracking-[0.16em] uppercase transition-colors",
                i === 0 && "border-r-[1.5px] border-foreground",
                activeTab === tab.id
                  ? "bg-foreground text-background"
                  : "bg-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 프로필 탭 */}
        {activeTab === "profile" && (
          <form id="profile-form" onSubmit={onProfileSubmit}>
            <div className="px-5 py-5 space-y-4">
              <div>
                <label className={fieldLabel}>이메일</label>
                <div className="w-full h-11 px-4 flex items-center border-[1.5px] border-foreground/30 bg-surface-soft text-sm text-muted-foreground">
                  {loggedInUser?.email}
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground/70">
                  이메일은 변경할 수 없습니다
                </p>
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
                  register={profileForm.register}
                  error={profileForm.formState.errors.name}
                />
                <FieldError error={profileForm.formState.errors.name} />
              </div>
            </div>
          </form>
        )}

        {/* 보안 탭 */}
        {activeTab === "password" && (
          <form id="password-form" onSubmit={onPasswordSubmit}>
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
                  register={passwordForm.register}
                  watch={passwordForm.watch}
                  setValue={passwordForm.setValue}
                  error={passwordForm.formState.errors.password}
                />
                <FieldError error={passwordForm.formState.errors.password} />
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
                  register={passwordForm.register}
                  watch={passwordForm.watch}
                  setValue={passwordForm.setValue}
                  error={passwordForm.formState.errors.passwordConfirm}
                />
                <FieldError
                  error={passwordForm.formState.errors.passwordConfirm}
                />
              </div>
            </div>
          </form>
        )}
      </div>

      {/* 하단 액션 바 */}
      <RecordEditorBottomBar>
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            tone="neutral"
            size="lg"
            className="flex-1 rounded-none border-[1.5px] border-foreground text-[11px] font-black tracking-[0.12em] uppercase"
            onClick={handleCancel}
          >
            취소
          </Button>
          <Button
            type="submit"
            form={activeTab === "profile" ? "profile-form" : "password-form"}
            variant="solid"
            tone="primary"
            size="lg"
            className="flex-2 rounded-none border-[1.5px] border-foreground text-[11px] font-black tracking-[0.16em] uppercase"
            disabled={submitDisabled}
          >
            {submitLabel}
          </Button>
        </div>
      </RecordEditorBottomBar>
    </div>
  );
}

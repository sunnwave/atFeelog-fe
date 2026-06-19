import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRecoilState } from "recoil";
import { loggedInUserState } from "@/shared/stores";
import PageHeader from "@/components/commons/layout/PageHeader";
import Tabs from "@/components/ui/tabs/Tabs";
import ProfileEditForm from "../component/ProfileEditForm";
import PasswordEditForm from "../component/PasswordEditForm";
import ProfileAvatarEditor from "../component/ProfileAvatarEditor/ProfileAvatarEditor";
import BottomActionBar from "@/components/commons/layout/BottomActionBar";
import UserEditActions from "../component/UserEditActions";
import { useToast } from "@/components/commons/toast/ToastProvider";
import { useUploadImages } from "@/shared/hooks/image/useUploadImages";
import { useResetUserPassword, useUpdateUser } from "../../hooks";
import {
  profileSchema,
  type ProfileFormValues,
} from "../../model/profileSchema";
import {
  passwordSchema,
  type PasswordFormValues,
} from "../../model/passwordSchema";

type ProfileTab = "profile" | "password";

const TABS: { id: ProfileTab; label: string }[] = [
  { id: "profile", label: "프로필" },
  { id: "password", label: "보안" },
];

export default function ProfileEditScreen() {
  const [activeTab, setActiveTab] = useState<ProfileTab>("profile");
  const [loggedInUser, setLoggedInUser] = useRecoilState(loggedInUserState);
  const { success, error } = useToast();
  const { onUpdateUser, loading: updateLoading } = useUpdateUser();
  const { onResetUserPassword, loading: resetLoading } = useResetUserPassword();
  const { uploadImages, isUploading } = useUploadImages();

  const handlePictureChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
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

      <div className="px-4 py-7 pb-28 lg:px-6 lg:py-8">
        <div className="mx-auto max-w-[680px] min-h-120 border-[1.5px] border-foreground bg-card">
          {/* 아바타 */}
          <ProfileAvatarEditor
            user={loggedInUser}
            isUploading={isUploading}
            onFileChange={handlePictureChange}
          />

          {/* 탭 바 */}
          <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />

          {/* 프로필 탭 */}
          {activeTab === "profile" && (
            <ProfileEditForm
              formId="profile-form"
              user={loggedInUser}
              register={profileForm.register}
              errors={profileForm.formState.errors}
              onSubmit={onProfileSubmit}
            />
          )}

          {/* 보안 탭 */}
          {activeTab === "password" && (
            <PasswordEditForm
              formId="password-form"
              register={passwordForm.register}
              errors={passwordForm.formState.errors}
              watch={passwordForm.watch}
              setValue={passwordForm.setValue}
              onSubmit={onPasswordSubmit}
            />
          )}
        </div>
      </div>

      <BottomActionBar>
        <UserEditActions
          formId={activeTab === "profile" ? "profile-form" : "password-form"}
          submitLabel={submitLabel}
          submitDisabled={submitDisabled}
          onCancel={handleCancel}
        />
      </BottomActionBar>
    </div>
  );
}

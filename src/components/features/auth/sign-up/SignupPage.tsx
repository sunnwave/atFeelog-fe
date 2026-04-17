import BackButton from "@/components/commons/backButton/BackButton";
import { useNavigation } from "@/shared/hooks/ui/useNavigation";
import SignupTop from "./SignupTop";
import SignupBottom from "./SignupBottom";
import { useCreateUser } from "./hooks/useCreateUser";
import SignupForm from "./signUpForm/SignupForm";

export default function SignupPage() {
  const { onClickNavigation } = useNavigation();

  const { onCreateUser } = useCreateUser();

  return (
    <div className="min-h-screen bg-background overflow-x-hidden px-2 py-4 lg:px-6 lg:pb-8">
      {/* TODO: 뒤로가기 경로 설정 */}
      <BackButton fallbackHref="/login" label="뒤로가기" />

      <main className="flex-1 flex flex-col items-center px-4 py-8 pb-20 gap-10">
        <SignupTop />
        <SignupForm onSubmit={onCreateUser} />
        <SignupBottom onClickNavigation={() => onClickNavigation("/login")()} />
      </main>
    </div>
  );
}

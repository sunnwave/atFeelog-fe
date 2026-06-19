import PageHeader from "@/components/commons/layout/PageHeader";
import LoginForm from "./loginForm/LoginForm";
import LoginBottom from "./LoginBottom";
import { useNavigation } from "@/shared/hooks/ui/useNavigation";
import useLoginUser from "@/shared/hooks/auth/useLoginUser";

export default function LoginScreen() {
  const { onClickNavigation } = useNavigation();

  const { onLoginUser } = useLoginUser();

  return (
    <div className="min-h-screen bg-background overflow-x-hidden px-2 py-4 lg:px-6 lg:pb-8">
      <PageHeader label="Login" fallbackHref="/login" />

      <main className="flex-1 flex flex-col items-center px-4 py-8 pb-20 gap-10">
        <div className="w-full max-w-sm text-center">
          <h2 className="text-xl font-semibold text-foreground mb-1">
            atFeelog에서 당신의 순간을 이어가요
          </h2>
          <p className="text-sm text-muted-foreground">
            공연의 감동을 기록하고 공유해보세요
          </p>
        </div>
        <LoginForm onSubmit={onLoginUser} />
        <LoginBottom
          onClickNavigation={() => onClickNavigation("/login/signup")()}
        />
      </main>
    </div>
  );
}

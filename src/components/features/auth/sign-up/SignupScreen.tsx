import LogoWordmark from "@/components/ui/logo/LogoWordmark";
import LabelBadge from "@/components/ui/badge/LabelBadge";
import AuthNavLink from "@/components/features/auth/AuthNavLink";
import { useCreateUser } from "./hooks/useCreateUser";
import SignupForm from "./signUpForm/SignupForm";

export default function SignupScreen() {
  const { onCreateUser } = useCreateUser();

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      <main className="flex-1 flex flex-col lg:grid lg:grid-cols-2 lg:items-stretch lg:p-0">
        {/* 모바일: 다크 상단 띠 */}
        <div className="bg-foreground px-6 pt-5 pb-6 lg:hidden">
          <LabelBadge variant="dark" className="mb-3 h-5 text-[9px]">
            JOIN US
          </LabelBadge>
          <h2 className="text-[22px] font-black leading-[1.15] tracking-[-0.04em] text-white">
            함께 기록해요<span className="text-point">.</span>
          </h2>
        </div>

        {/* 데스크탑: 다크 왼쪽 패널 */}
        <div className="hidden lg:flex lg:flex-col lg:justify-between lg:p-14 bg-foreground">
          <LogoWordmark size="md" className="text-white" clickable={false} />
          <div>
            <h2 className="text-[42px] font-black leading-[1.1] tracking-[-0.05em] text-white">
              함께
              <br />
              기록해요<span className="text-point">.</span>
            </h2>
            <p className="mt-4 text-sm leading-[1.8] text-white/55">
              매 공연의 감동을
              <br />
              나만의 아카이브로 남겨보세요
            </p>
          </div>
          <p className="text-[11px] text-white/30 tracking-[0.1em]">
            AFTER · FEEL · LOG
          </p>
        </div>

        {/* 오른쪽 / 모바일 폼 영역 */}
        <div className="flex-1 flex flex-col items-center px-4 pt-8 pb-6 gap-6 lg:items-start lg:justify-center lg:p-14 lg:border-l-[1.5px] lg:border-foreground">
          <div className="hidden lg:block w-full">
            <LabelBadge className="mb-4">JOIN US</LabelBadge>
          </div>

          <SignupForm
            onSubmit={onCreateUser}
            className="lg:max-w-none"
          />

          <AuthNavLink href="/login" hint="이미 계정이 있으신가요?">
            로그인
          </AuthNavLink>
        </div>
      </main>
    </div>
  );
}

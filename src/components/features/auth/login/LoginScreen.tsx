import PageHeader from "@/components/commons/layout/PageHeader";
import LogoWordmark from "@/components/ui/logo/LogoWordmark";
import LabelBadge from "@/components/ui/badge/LabelBadge";
import AuthNavLink from "@/components/features/auth/AuthNavLink";
import LoginForm from "./loginForm/LoginForm";
import useLoginUser from "@/shared/hooks/auth/useLoginUser";

export default function LoginScreen() {
  const { onLoginUser } = useLoginUser();

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      <main className="flex-1 flex flex-col lg:grid lg:grid-cols-2 lg:items-stretch lg:p-0">
        {/* 모바일: 다크 상단 띠 */}
        <div className="bg-foreground px-6 pt-5 pb-6 lg:hidden">
          <LabelBadge variant="dark" className="mb-3 h-5 text-[9px]">
            SIGN IN
          </LabelBadge>
          <h2 className="text-[22px] font-black leading-[1.15] tracking-[-0.04em] text-white">
            공연의 기억은
            <br />
            여기에 있어요
          </h2>
        </div>

        {/* 데스크탑: 다크 왼쪽 패널 */}
        <div className="hidden lg:flex lg:flex-col lg:justify-between lg:p-14 bg-foreground">
          <LogoWordmark size="md" className="text-white" clickable={false} />
          <div>
            <h2 className="text-[42px] font-black leading-[1.1] tracking-[-0.05em] text-white">
              공연의 기억이
              <br />
              여기에
              <br />
              있어요<span className="text-point">.</span>
            </h2>
            <p className="mt-4 text-sm leading-[1.8] text-white/55">
              기록한 공연의 감동을
              <br />
              다시 꺼내보세요
            </p>
          </div>
          <p className="text-[11px] text-white/30 tracking-[0.1em]">
            AFTER · FEEL · LOG
          </p>
        </div>

        {/* 오른쪽 / 모바일 폼 영역 */}
        <div className="flex-1 flex flex-col items-center px-4 pt-8 pb-6 gap-6 lg:items-start lg:justify-center lg:p-14 lg:border-l-[1.5px] lg:border-foreground">
          <div className="hidden lg:block w-full">
            <LabelBadge className="mb-4">SIGN IN</LabelBadge>
          </div>

          <LoginForm onSubmit={onLoginUser} className="lg:max-w-none" />

          <AuthNavLink href="/login/signup" hint="아직 회원이 아니신가요?">
            회원가입
          </AuthNavLink>
        </div>
      </main>
    </div>
  );
}

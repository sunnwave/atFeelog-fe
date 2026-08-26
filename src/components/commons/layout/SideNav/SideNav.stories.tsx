import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { RecoilRoot } from "recoil";
import type { MutableSnapshot } from "recoil";

import SideNav from "./SideNav";
import { loggedInUserState } from "@/shared/stores";
import type { User } from "@/api/adapters/types/user";

// ─── Mock ──────────────────────────────────────────────────────────────────────

const mockUser: User = {
  id: "user-1",
  name: "선",
  picture: "",
};

// ─── Helpers ───────────────────────────────────────────────────────────────────

const withRecoil =
  (initializeState?: (snap: MutableSnapshot) => void) =>
  function WithRecoil(Story: React.ComponentType) {
    return (
      <RecoilRoot initializeState={initializeState}>
        <Story />
      </RecoilRoot>
    );
  };

/**
 * Layout의 <aside>를 그대로 재현.
 * `group` + `hover:w-45` → SideNav 내부의 `group-hover:*` 유틸리티가
 * 스토리북 브라우저에서도 정상 동작합니다. 호버하면 확장됩니다.
 */
function SideNavShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="group w-16 hover:w-45 overflow-hidden transition-[width] duration-100"
      style={{ height: 640 }}
    >
      {children}
    </div>
  );
}

// ─── Meta ──────────────────────────────────────────────────────────────────────

const meta: Meta<typeof SideNav> = {
  title: "Commons/Layout/SideNav",
  component: SideNav,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof SideNav>;

// ─── Stories ───────────────────────────────────────────────────────────────────

/** 비로그인 상태. 호버하면 라벨 영역이 펼쳐집니다. */
export const LoggedOut: Story = {
  name: "LoggedOut — hover to expand",
  decorators: [withRecoil(), (Story) => <SideNavShell><Story /></SideNavShell>],
};

/** 로그인 상태. 호버하면 이름·Write·로그아웃 라벨이 나타납니다. */
export const LoggedIn: Story = {
  name: "LoggedIn — hover to expand",
  decorators: [
    withRecoil((snap) => snap.set(loggedInUserState, mockUser)),
    (Story) => <SideNavShell><Story /></SideNavShell>,
  ],
};

import type { ReactNode } from "react";

import BottomNav from "./BottomNav/BottomNav";
import Logo from "../../ui/logo/Logo";
import SideNav from "./SideNav/SideNav";

interface LayoutProps {
  children: ReactNode;
  noBottomNav?: boolean;
}

export default function Layout({
  children,
  noBottomNav = false,
}: LayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 z-50 hidden h-screen w-[288px] lg:block">
        <SideNav />
      </aside>

      {/* Mobile/Tablet Header */}
      <header className="flex w-full items-center justify-center border-b border-border bg-card/80 py-3 lg:hidden">
        <div className="block md:hidden">
          <Logo size="md" />
        </div>
        <div className="hidden md:block">
          <Logo size="lg" />
        </div>
      </header>

      {/* Main */}
      <div className="lg:pl-[288px]">
        <main className={`w-full lg:pb-0 ${noBottomNav ? "" : "pb-nav"}`}>
          {children}
        </main>
      </div>

      {/* Mobile/Tablet BottomNav */}
      {!noBottomNav && (
        <div className="lg:hidden">
          <BottomNav />
        </div>
      )}
    </div>
  );
}

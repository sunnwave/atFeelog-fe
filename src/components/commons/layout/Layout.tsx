import type { ReactNode } from "react";

import BottomNav from "./BottomNav/BottomNav";
import Logo from "../../ui/logo/Logo";
import SideNav from "./SideNav/SideNav";

interface LayoutProps {
  children: ReactNode;
  noPadding?: boolean;
}

export default function Layout({ children, noPadding = false }: LayoutProps) {
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
        <main className="w-full">
          <div
            className={
              noPadding
                ? "w-full"
                : "w-full pb-24 lg:pb-8"
            }
          >
            {children}
          </div>
        </main>
      </div>

      {/* Mobile/Tablet BottomNav */}
      <div className="lg:hidden">
        <BottomNav />
      </div>
    </div>
  );
}

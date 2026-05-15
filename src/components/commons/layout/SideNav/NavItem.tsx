import { useRouter } from "next/router";
import { SideNavItemType } from "@/shared/constants";
import { Button } from "@/components/ui/button/Button";

export default function NavItem({ nav }: { nav: SideNavItemType }) {
  const router = useRouter();
  const isActive = router.pathname === nav.href;

  return (
    <Button
      size="lg"
      variant="ghost"
      tone="primary"
      className={[
        "relative w-full justify-start rounded-none border-b border-border px-6",
        "normal-case tracking-normal",
        // "hover:bg-surface-soft hover:text-foreground",
        isActive
          ? [
              "bg-surface-soft font-semibold text-foreground",
              "before:absolute before:left-0 before:top-1/2",
              "before:h-7 before:w-1 before:-translate-y-1/2",
              "before:rounded-r-full before:bg-chart-4",
            ].join(" ")
          : "text-muted-foreground",
      ].join(" ")}
      onClick={() => router.push(nav.href)}
    >
      <nav.icon className="w-4.5 h-4.5 transition-colors" />
      <span>{nav.label}</span>
    </Button>
  );
}

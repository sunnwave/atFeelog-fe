import { useRouter } from "next/router";
import { SideNavItemType } from "@/shared/constants";
import { Button } from "@/components/ui/button/Button";

export default function NavItem({ nav }: { nav: SideNavItemType }) {
  const router = useRouter();
  const isActive = router.pathname === nav.href;

  return (
    <Button
      size="lg"
      variant={isActive ? "solid" : "ghost"}
      tone={isActive ? "soft" : "primary"}
      className="relative rounded-2xl justify-start"
      onClick={() => router.push(nav.href)}
    >
      <nav.icon className="w-4.5 h-4.5" />
      {nav.label}
    </Button>
  );
}

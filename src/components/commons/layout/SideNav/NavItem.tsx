import { useRouter } from "next/router";
import { NavItemType } from "@/shared/constants";
import { cn } from "@/shared/utils/cn";

export default function NavItem({
  nav,
  onClick,
  cta = false,
  className,
}: {
  nav: NavItemType;
  onClick?: () => void;
  cta?: boolean;
  className?: string;
}) {
  const router = useRouter();
  const isActive = !!nav.href && router.pathname === nav.href;

  const handleClick = () => {
    if (onClick) return onClick();
    if (nav.href) router.push(nav.href);
  };

  return (
    <button
      className={cn(
        "flex w-full items-center border-b border-border py-3 uppercase tracking-[0.12em] text-[12px] font-black cursor-pointer hover:bg-muted",
        isActive ? "text-foreground" : "text-muted-foreground",
        className,
      )}
      onClick={handleClick}
    >
      <span className="w-16 flex justify-center shrink-0">
        {cta ? (
          <span className="flex w-7.5 h-7.5 items-center justify-center bg-foreground text-background">
            <nav.icon className="w-4 h-4 shrink-0" />
          </span>
        ) : (
          <nav.icon
            className={cn(
              "w-4.5 h-4.5 shrink-0 transition-colors",
              isActive ? "text-point" : "text-muted-foreground",
            )}
          />
        )}
      </span>
      <span className="hidden group-hover:inline whitespace-nowrap">
        {nav.label}
      </span>
    </button>
  );
}

import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function BottomNavItem({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
}) {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Link
      href={href}
      className={`flex flex-col items-center justify-center gap-1 h-full
            transition-colors relative
            ${
              isActive
                ? "text-primary-pressed"
                : "text-muted-foreground hover:text-foreground"
            }
          `}
    >
      <Icon className="w-5 h-5" />
      {isActive && (
        <div className="absolute bottom-[7px] left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-primary" />
      )}
    </Link>
  );
}

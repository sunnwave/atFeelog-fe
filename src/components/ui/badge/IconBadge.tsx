import { cn } from "@/shared/utils";
import { LucideIcon } from "lucide-react";

type IconBadgeVariant = "default" | "destructive" | "success" | "primary";

const variantStyles: Record<IconBadgeVariant, string> = {
  default: "bg-primary/10 text-primary",
  destructive: "bg-destructive/10 text-destructive",
  success: "bg-success/10 text-success",
  primary: "bg-primary/10 text-primary",
};

export default function IconBadge({
  icon,
  variant = "default",
  className,
}: {
  icon: LucideIcon;
  variant?: IconBadgeVariant;
  className?: string;
}) {
  const Icon = icon;

  return (
    <div
      className={cn(
        `w-10 h-10 rounded-full flex items-center justify-center ${variantStyles[variant]}`,
        className
      )}
    >
      <Icon className="w-5 h-5" />
    </div>
  );
}

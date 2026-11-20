import PageHeader from "@/components/commons/layout/PageHeader";
import { AlertCircle, type LucideIcon } from "lucide-react";
import { useRouter } from "next/router";
import { Button } from "../../button/Button";

type PageFallbackProps = {
  label: string;
  fallbackHref: string;
  message: string;
  icon?: LucideIcon;
};

export default function PageFallback({
  label,
  fallbackHref,
  message,
  icon: Icon = AlertCircle,
}: PageFallbackProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      <PageHeader label={label} fallbackHref={fallbackHref} />
      <div className="flex flex-col items-center justify-center gap-3 py-24">
        <Icon size={32} className="text-muted-foreground" strokeWidth={1.5} />
        <p className="text-sm text-muted-foreground">{message}</p>

        <Button variant="link" tone="neutral" onClick={() => router.back()}>
          이전 화면으로 돌아가기
        </Button>
      </div>
    </div>
  );
}

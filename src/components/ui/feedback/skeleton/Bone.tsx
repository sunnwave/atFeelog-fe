import { cn } from "@/shared/utils/cn";

type BoneProps = {
  className?: string;
};

export default function Bone({ className }: BoneProps) {
  return (
    <div className={cn("bg-muted-foreground/15 animate-pulse", className)} />
  );
}

import { cn } from "@/shared/utils/cn";
import Bone from "./Bone";

type TextSkeletonProps = {
  lines?: number;
  className?: string;
};

export default function TextSkeleton({ lines = 3, className }: TextSkeletonProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Bone key={i} className="h-4 w-full" />
      ))}
    </div>
  );
}

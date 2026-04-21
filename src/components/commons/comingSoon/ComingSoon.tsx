import { Construction } from "lucide-react";
import { useRouter } from "next/router";

interface ComingSoonProps {
  title?: string;
  description?: string;
}

export default function ComingSoon({
  title = "준비 중입니다",
  description = "해당 페이지는 현재 개발 중입니다. 조금만 기다려 주세요.",
}: ComingSoonProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-6 text-center">
      <Construction className="w-16 h-16 text-yellow-400" />
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      <p className="text-gray-500 max-w-sm">{description}</p>
      <button
        onClick={() => router.back()}
        className="mt-2 px-5 py-2 rounded-full border border-gray-300 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
      >
        이전 페이지로 돌아가기
      </button>
    </div>
  );
}

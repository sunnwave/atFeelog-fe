import { Sparkles } from "lucide-react";

export default function RecordWriteTop() {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Sparkles className="inline w-6 h-6" />
        <h1 className="text-2xl font-bold text-foreground">에필로그 쓰기</h1>
      </div>
      <p className="text-sm text-muted-foreground">
        특별했던 공연의 순간을 기록해보세요
      </p>
    </div>
  );
}

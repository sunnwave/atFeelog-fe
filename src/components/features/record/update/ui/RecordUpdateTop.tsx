import { Sparkles } from "lucide-react";

export default function RecordUpdateTop() {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Sparkles className="inline w-6 h-6" />
        <h1 className="text-2xl font-bold text-foreground">에필로그 수정</h1>
      </div>
      <p className="text-sm text-muted-foreground">필로그를 수정할게요</p>
    </div>
  );
}

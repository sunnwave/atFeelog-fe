import { Button } from "@/components/ui/button/Button";
import { Save, ScrollText, Sparkles } from "lucide-react";

export default function RecordNewScreen() {
  return (
    <div className="min-h-screen bg-background px-6 py-4 lg:px-6 lg:py-8">
      <div className="max-w-lg mx-auto space-y-2 px-4 py-6 lg:space-y-6">
        {/* Headers */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles className="inline w-6 h-6" />
            <h1 className="text-2xl font-bold text-foreground">
              에필로그 쓰기
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            특별했던 공연의 순간을 기록해보세요
          </p>
        </div>

        {/* RecordNewForm */}
      </div>
      {/* WriteButton */}
      <div className="flex gap-3 border-t border-border sticky bottom-0 bg-background px-6 py-4 lg:px-6 lg:py-8">
        <Button variant="outline" size="lg" className="flex-1">
          <Save className="inline w-5 h-5" />
          임시 저장
        </Button>
        <Button size="lg" className="flex-1">
          <ScrollText className="inline w-5 h-5" />
          기록 저장
        </Button>
      </div>
    </div>
  );
}

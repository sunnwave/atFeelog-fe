import Link from "next/link";
import { Button } from "@/components/ui/button/Button";

export default function HomeHero() {
  return (
    <section className="border-t-[1.5px] border-b-[1.5px] md:border-[1.5px] border-foreground bg-card p-6 md:p-10 md:py-12">
      <span className="inline-flex h-7 items-center border border-foreground bg-accent px-3 text-[11px] font-black uppercase tracking-[0.14em] text-accent-foreground">
        AFTER · FEEL · LOG
      </span>

      <h2 className="mt-5 text-[28px] font-black leading-[1.1] tracking-[-0.05em] text-foreground md:text-[56px]">
        공연의 순간을
        <br />
        나만의 아카이브로 남겨요
      </h2>

      <p className="mt-4  text-sm leading-relaxed text-muted-foreground md:mt-6 md:text-base">
        관람한 공연의 감상을 사진과 장소, 날짜와 함께 차곡차곡 모아보세요.
      </p>

      <div className="mt-6 flex flex-wrap justify-end gap-3 md:mt-8">
        <Button size="md" asChild>
          <Link href="/feelog">기록 둘러보기</Link>
        </Button>
        <Button variant="outline" tone="accent" size="md" asChild>
          <Link href="/login">로그인하고 기록 남기기</Link>
        </Button>
      </div>
    </section>
  );
}

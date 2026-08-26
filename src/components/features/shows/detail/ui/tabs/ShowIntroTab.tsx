import Chip from "@/components/ui/chips/Chip";
import TicketPriceTable from "./TicketPriceTable";
import type { PerformanceDetail } from "@/shared/types/performance";
import SectionRule from "./SectionRule";

type ShowInfoTabProps = {
  detail: PerformanceDetail;
};

export default function ShowInfoTab({ detail }: ShowInfoTabProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* 출연진 */}
      {detail.cast && (
        <section>
          <SectionRule label="출연진" />
          <p className="text-[13.5px] leading-relaxed">{detail.cast}</p>
        </section>
      )}

      {/* 티켓 가격 */}
      {detail.ticketPrice && (
        <section>
          <SectionRule label="티켓 가격" />
          <TicketPriceTable ticketPrice={detail.ticketPrice} />
        </section>
      )}

      {/* TODO:장소 — #55 카카오맵 연동 후 대체 예정 */}
      <section>
        <SectionRule label="장소" />
        <p className="text-[13.5px] leading-relaxed">{detail.venueName}</p>
      </section>
    </div>
  );
}

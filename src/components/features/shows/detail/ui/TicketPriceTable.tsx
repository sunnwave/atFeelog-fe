import { ResponsiveGrid } from "@/components/commons/layout";

type TicketPriceRow = {
  seat: string;
  price: string;
};

function parse(ticketPrice: string): TicketPriceRow[] {
  // "원," 뒤를 구분자로 split (가격 내부 콤마와 구분)
  return ticketPrice
    .split(/(?<=원),\s*/)
    .map((item) => {
      const match = item.trim().match(/^(.+?)\s+(\d[\d,]+원)$/);
      if (!match) return null;
      return { seat: match[1].trim(), price: match[2] };
    })
    .filter((row): row is TicketPriceRow => row !== null);
}

type TicketPriceTableProps = {
  ticketPrice: string;
};

export default function TicketPriceTable({
  ticketPrice,
}: TicketPriceTableProps) {
  const rows = parse(ticketPrice);

  if (rows.length === 0) return null;

  return (
    <ResponsiveGrid cols={1} colsMd={2}>
      {rows.map((row) => (
        <div key={row.seat} className="flex w-full px-5 min-w-0 items-baseline">
          <span className="shrink-0 whitespace-nowrap text-[13.5px] text-foreground mr-2">
            {row.seat}
          </span>
          <span className="flex-1 -translate-y-0.75 border-b border-dotted border-muted-foreground opacity-45" />
          <span className="shrink-0 whitespace-nowrap text-[13.5px] font-bold tabular-nums text-foreground ml-2">
            {row.price}
          </span>
        </div>
      ))}
    </ResponsiveGrid>
  );
}

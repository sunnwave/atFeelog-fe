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

export default function TicketPriceTable({ ticketPrice }: TicketPriceTableProps) {
  const rows = parse(ticketPrice);
  if (rows.length === 0) return null;

  return (
    <div className="flex flex-col">
      {rows.map((row) => (
        <div
          key={row.seat}
          className="flex items-baseline justify-between gap-3 border-b border-border py-2.5"
        >
          <span className="text-[13.5px]">{row.seat}</span>
          <span className="shrink-0 text-[13.5px] font-bold">{row.price}</span>
        </div>
      ))}
    </div>
  );
}

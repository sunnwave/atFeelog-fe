type TicketLink = {
  name: string;
  url: string;
};

type ShowTicketLinksProps = {
  links: TicketLink[];
};

function isValidUrl(url: string): boolean {
  return url.trim() !== "" && url !== "-";
}

export default function ShowTicketLinks({ links }: ShowTicketLinksProps) {
  if (links.length === 0) return null;

  return (
    <div className=" shrink-0 sticky top-6 flex flex-col gap-2 p-3 @lg:pb-6 border-t-[1.5px] border-muted-foreground @lg:border-[1.5px] ">
      <h3 className=" text-[11px] font-black uppercase tracking-[0.16em] text-muted-foreground">
        예매 링크
      </h3>
      <div className="flex flex-col gap-1.5">
        {links.map((link) =>
          isValidUrl(link.url) ? (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2.25 border-[1.5px] border-foreground shadow-[3px_3px_0_0_var(--foreground)] text-[13px] font-bold text-foreground hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_0_var(--foreground)] transition-all duration-150"
            >
              <span>{link.name}</span>
              <span>↗</span>
            </a>
          ) : (
            <div
              key={link.name}
              className="flex items-center justify-between px-3 py-2.75 border-[1.5px] border-dashed border-foreground text-[13px] font-bold text-muted-foreground cursor-default"
            >
              <span>{link.name}</span>
              <span className="text-[11px] font-semibold">
                예매 링크 준비 중
              </span>
            </div>
          ),
        )}
      </div>
    </div>
  );
}

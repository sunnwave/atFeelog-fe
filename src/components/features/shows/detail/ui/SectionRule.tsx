export default function SectionRule({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-3">
      <span className="text-[11px] font-black uppercase tracking-[0.16em] text-foreground shrink-0">
        {label}
      </span>
      <div className="flex-1 border-t-[1.5px] border-foreground" />
    </div>
  );
}

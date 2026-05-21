export default function Badge({ children }: { children: string }) {
  return (
    <span className="inline-block px-2 py-0.5 rounded-xs bg-surface-soft text-[10px] font-bold text-muted-foreground tracking-[0.06em] truncate max-w-full">
      {children}
    </span>
  );
}

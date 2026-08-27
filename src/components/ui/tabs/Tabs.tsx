import { cn } from "@/shared/utils/cn";

interface Tab<T extends string> {
  id: T;
  label: string;
}

interface TabsProps<T extends string> {
  tabs: Tab<T>[];
  activeTab: T;
  onChange: (id: T) => void;
  className?: string;
}

export default function Tabs<T extends string>({
  tabs,
  activeTab,
  onChange,
  className,
}: TabsProps<T>) {
  return (
    <div className={cn("flex border-y-[1.5px] border-foreground", className)}>
      {tabs.map((tab, i) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={cn(
            "flex-1 py-3 text-[11px] font-black tracking-[0.16em] uppercase transition-colors",
            i < tabs.length - 1 && "border-r-[1.5px] border-foreground",
            activeTab === tab.id
              ? "bg-foreground text-background"
              : "bg-transparent text-muted-foreground hover:text-foreground",
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export const DAY_PICKER_CLASS_NAMES = {
  root: "select-none",
  months: "",
  month: "space-y-2",
  month_caption: "relative flex h-10 items-center justify-center",
  caption_label: "text-sm font-semibold text-foreground",
  nav: "absolute inset-x-0 flex justify-between",
  button_previous:
    "inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors",
  button_next:
    "inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors",
  month_grid: "w-full",
  weekdays: "",
  weekday:
    "text-center text-[11px] font-medium text-muted-foreground pb-2 w-9",
  week: "",
  day: "p-0 pt-1 text-center",
  day_button:
    "inline-flex h-9 w-9 items-center justify-center text-sm rounded-lg transition-colors hover:bg-accent focus:outline-none",
  selected:
    "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
  today: "font-bold",
  range_start: "rounded-r-none",
  range_middle: "!bg-primary/10 !text-foreground !rounded-none",
  range_end: "rounded-l-none",
  outside: "opacity-30 pointer-events-none",
  disabled: "opacity-25 pointer-events-none",
  hidden: "invisible",
} as const;
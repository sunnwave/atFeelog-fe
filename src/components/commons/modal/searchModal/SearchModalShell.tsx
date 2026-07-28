"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Search, X } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/shared/utils";
import { Button } from "@/components/ui/button/Button";

interface SearchModalShellProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  icon: ReactNode;
  placeholder: string;
  query: string;
  onQueryChange: (v: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  error: string | null;
  hasSearched: boolean;
  isEmpty: boolean;
  hasMore: boolean;
  sentinel: ReactNode;
  emptyHint?: string;
  noResultHint?: string;
  className?: string;
  children: ReactNode;
}

export default function SearchModalShell({
  open,
  onOpenChange,
  title,
  icon,
  placeholder,
  query,
  onQueryChange,
  onSubmit,
  loading,
  error,
  hasSearched,
  isEmpty,
  hasMore,
  sentinel,
  emptyHint = "검색어를 입력해 검색하세요.",
  noResultHint = "검색 결과가 없어요. 다른 키워드로 검색해보세요.",
  className,
  children,
}: SearchModalShellProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50" />

        <div className="fixed inset-0 z-[60] flex items-end sm:items-center sm:justify-center p-0 sm:p-4">
          <Dialog.Content
            aria-describedby={undefined}
            className={cn(
              "w-full bg-background shadow-2xl flex flex-col",
              "rounded-t-3xl max-h-[85vh]",
              "sm:max-w-lg sm:rounded-3xl sm:max-h-[80vh]",
              className
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <div className="flex items-center gap-2">
                {icon}
                <Dialog.Title className="text-lg font-bold">{title}</Dialog.Title>
              </div>
              <Dialog.Close asChild>
                <Button variant="ghost" type="button" size="icon" aria-label="닫기">
                  <X className="w-5 h-5" />
                </Button>
              </Dialog.Close>
            </div>

            {/* Search Bar */}
            <div className="px-6 py-4 border-b border-border">
              <form onSubmit={onSubmit} className="flex gap-2">
                <input
                  value={query}
                  onChange={(e) => onQueryChange(e.target.value)}
                  placeholder={placeholder}
                  className="flex-1 h-11 rounded-xl border border-border bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                />
                <Button type="submit" className="h-11">
                  <Search className="w-4 h-4" />
                  검색
                </Button>
              </form>

              {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
              {loading && <p className="mt-2 text-xs text-muted-foreground">검색 중…</p>}
            </div>

            {/* Results */}
            <div className="px-2 py-2 overflow-y-auto">
              {!hasSearched && !loading && (
                <p className="py-10 text-center text-sm text-muted-foreground">
                  {emptyHint}
                </p>
              )}

              {isEmpty && (
                <p className="py-10 text-center text-sm text-muted-foreground">
                  {noResultHint}
                </p>
              )}

              {hasSearched && !isEmpty && (
                <ul className="space-y-2 px-4 pb-4">
                  {children}
                  <li>
                    {hasMore && sentinel}
                    {loading && (
                      <p className="py-2 text-center text-xs text-muted-foreground">
                        불러오는 중...
                      </p>
                    )}
                    {!hasMore && !loading && (
                      <p className="py-2 text-center text-xs text-muted-foreground">
                        마지막 결과입니다.
                      </p>
                    )}
                  </li>
                </ul>
              )}
            </div>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
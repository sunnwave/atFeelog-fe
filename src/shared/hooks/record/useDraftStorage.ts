import { useCallback } from "react";

export function useDraftStorage<T extends Record<string, unknown>>(
  key: string
) {
  const saveDraft = useCallback(
    (values: T) => {
      localStorage.setItem(key, JSON.stringify(values));
    },
    [key]
  );

  const loadDraft = useCallback((): Partial<T> | null => {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }, [key]);

  const clearDraft = useCallback(() => localStorage.removeItem(key), [key]);

  return { saveDraft, loadDraft, clearDraft };
}

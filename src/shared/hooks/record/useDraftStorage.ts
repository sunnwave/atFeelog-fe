export function useDraftStorage<T extends Record<string, unknown>>(
  key: string
) {
  const saveDraft = (values: T) => {
    localStorage.setItem(key, JSON.stringify(values));
  };

  const loadDraft = (): Partial<T> | null => {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  };

  const clearDraft = () => localStorage.removeItem(key);

  return { saveDraft, loadDraft, clearDraft };
}

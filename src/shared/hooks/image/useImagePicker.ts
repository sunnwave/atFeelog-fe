export function useImagePicker(opts: {
  value: File[];
  onChange: (next: File[]) => void;
  maxImages: number;
}) {
  const value = opts.value ?? [];
  const { onChange, maxImages } = opts;

  const appendFiles = (picked: File[]) => {
    if (!picked || picked.length === 0) return;

    const remaining = Math.max(0, maxImages - value.length);
    const next = [...value, ...picked.slice(0, remaining)];
    onChange(next);
  };

  const removeAt = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return { appendFiles, removeAt };
}

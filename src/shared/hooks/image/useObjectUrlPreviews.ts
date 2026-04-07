import { useEffect, useMemo, useRef } from "react";

export function useObjectUrlPreviews(files: File[]) {
  const urls = useMemo(() => {
    return (files ?? []).map((f) => URL.createObjectURL(f));
  }, [files]);

  const prevRef = useRef<string[]>([]);

  useEffect(() => {
    prevRef.current.forEach((u) => URL.revokeObjectURL(u));
    prevRef.current = urls;

    return () => {
      prevRef.current.forEach((u) => URL.revokeObjectURL(u));
      prevRef.current = [];
    };
  }, [urls]);

  return urls;
}

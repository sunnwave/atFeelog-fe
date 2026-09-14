import { useRouter } from "next/router";
import { useCallback } from "react";

export function useQueryUpdate() {
  const router = useRouter();

  return useCallback(
    (patch: Record<string, string | undefined>) => {
      const next = { ...router.query };
      Object.entries(patch).forEach(([k, v]) => {
        if (v === undefined || v === "") {
          delete next[k];
        } else {
          next[k] = v;
        }
      });
      router.replace({ pathname: router.pathname, query: next }, undefined, {
        shallow: true,
      });
    },
    [router],
  );
}

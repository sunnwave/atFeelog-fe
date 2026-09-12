import { useRouter } from "next/router";
import { useCallback } from "react";
import { useSearch } from "@/components/commons/search/useSearch";
import { useQueryUpdate } from "@/shared/hooks/ui/useQueryUpdate";
import { ShowGenreShcate, ShowKidstate, ShowPrfstate, ShowSigngucode } from "@/shared/constants";

export function useShowsFeedFilters() {
  const router = useRouter();
  const updateQuery = useQueryUpdate();

  const genre = ((router.query.genre as ShowGenreShcate) ?? "") as ShowGenreShcate;
  const status = ((router.query.status as ShowPrfstate) ?? "01") as ShowPrfstate;
  const area = ((router.query.area as ShowSigngucode) ?? "") as ShowSigngucode;
  const kidstate = ((router.query.kidstate as ShowKidstate) ?? "") as ShowKidstate;

  const { search, setSearch, startDate, setStartDate, endDate, setEndDate, submit: submitSearch, reset: resetSearch } = useSearch({
    initValue: {
      search: (router.query.search as string) ?? "",
      startDate: (router.query.startDate as string) ?? "",
      endDate: (router.query.endDate as string) ?? "",
    },
    onCommit: ({ search, startDate, endDate }) =>
      updateQuery({
        search: search || undefined,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
      }),
  });

  const setGenre = useCallback(
    (value: ShowGenreShcate) => updateQuery({ genre: value || undefined }),
    [updateQuery],
  );

  const setStatus = useCallback(
    (value: ShowPrfstate) => updateQuery({ status: value || undefined }),
    [updateQuery],
  );

  const setArea = useCallback(
    (value: ShowSigngucode) => updateQuery({ area: value || undefined }),
    [updateQuery],
  );

  const setKidstate = useCallback(
    (value: ShowKidstate) => updateQuery({ kidstate: value || undefined }),
    [updateQuery],
  );

  const filter = {
    search: (router.query.search as string) || "",
    genre,
    status,
    area,
    kidstate,
    startDate: (router.query.startDate as string) || "",
    endDate: (router.query.endDate as string) || "",
  };

  return {
    genre,
    status,
    area,
    kidstate,
    search,
    startDate,
    endDate,
    filter,
    setGenre,
    setStatus,
    setArea,
    setKidstate,
    setSearch,
    setStartDate,
    setEndDate,
    submitSearch,
    resetSearch,
  };
}

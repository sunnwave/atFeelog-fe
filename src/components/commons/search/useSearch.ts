import { useCallback, useState } from "react";

type SearchArgs = {
  search: string;
  startDate?: string;
  endDate?: string;
};

type SearchProps = {
  initValue: SearchArgs;
  onCommit: (values: SearchArgs) => void;
};

export function useSearch({ initValue: init, onCommit }: SearchProps) {
  const [search, setSearch] = useState(init.search);
  const [startDate, setStartDate] = useState(init.startDate ?? "");
  const [endDate, setEndDate] = useState(init.endDate ?? "");

  const submit = useCallback(() => {
    onCommit({ search, startDate, endDate });
  }, [search, startDate, endDate, onCommit]);

  const reset = useCallback(() => {
    setSearch("");
    setStartDate("");
    setEndDate("");
    onCommit({ search: "", startDate: "", endDate: "" });
  }, [onCommit]);

  return {
    search,
    setSearch,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    submit,
    reset,
  };
}

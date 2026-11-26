import { UseFormReturn } from "react-hook-form";
import { useFetchRecord } from "../../hooks/useFetchRecord";
import { RecordEditFormValues } from "../../model";
import { useEffect, useState } from "react";
import { stripMetaFromContents } from "../../lib";
import { toDateInputValue } from "@/shared/utils";

export const useRecordUpdateInit = (
  boardId: string | undefined,
  form: UseFormReturn<RecordEditFormValues>,
  initializationKey: string | null,
) => {
  const { record, loading, error } = useFetchRecord(boardId);
  const [initializedKey, setInitializedKey] = useState<string | null>(null);
  const ready = initializationKey !== null && initializedKey === initializationKey;
  const { reset } = form;

  useEffect(() => {
    if (!initializationKey || ready || loading || error) return;
    if (!record || record.id !== boardId) return;

    const contents = stripMetaFromContents(record.contents);

    reset({
      title: record.title,
      showName: record.showName ?? "",
      artistName: record.artistName ?? "",
      showDate: toDateInputValue(record.showDate),
      placeName: record.boardAddress?.placeName ?? "",
      roadAddress: record.boardAddress?.roadAddress ?? "",
      jibunAddress: record.boardAddress?.jibunAddress ?? "",
      x: record.boardAddress?.x ?? undefined,
      y: record.boardAddress?.y ?? undefined,
      contents,
      imageFiles: [],
      images: (record.images ?? []).filter((v): v is string => !!v?.trim()),
    });

    setInitializedKey(initializationKey);
  }, [boardId, record, reset, initializationKey, ready, loading, error]);

  return { record, loading, error, ready };
};

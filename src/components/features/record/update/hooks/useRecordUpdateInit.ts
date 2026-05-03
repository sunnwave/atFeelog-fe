import { UseFormReturn } from "react-hook-form";
import { useFetchRecord } from "../../hooks/useFetchRecord";
import { RecordEditFormValues } from "../../model";
import { useEffect, useRef } from "react";
import { stripMetaFromContents } from "../../lib";
import { toDateInputValue } from "@/shared/utils";

export const useRecordUpdateInit = (
  boardId: string | undefined,
  form: UseFormReturn<RecordEditFormValues>,
  onRecordLoaded?: () => void,
) => {
  const { record, loading, error } = useFetchRecord(boardId);

  const initializedRef = useRef<string | null>(null);

  useEffect(() => {
    if (!record) return;
    if (!boardId) return;

    if (initializedRef.current === boardId) return;
    initializedRef.current = boardId;

    const contents = stripMetaFromContents(record.contents);

    form.reset({
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

    onRecordLoaded?.();
  }, [boardId, record, form, onRecordLoaded]);

  useEffect(() => {
    initializedRef.current = null;
  }, [boardId]);

  return { record, loading, error };
};

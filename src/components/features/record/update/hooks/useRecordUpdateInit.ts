import { UseFormReturn } from "react-hook-form";
import { useFetchRecord } from "../../hooks/useFetchRecord";
import { RecordEditFormValues } from "../../model";
import { useEffect, useRef } from "react";
import {
  parseBoardTitle,
  parseRecordMetaBlock,
  stripMetaFromContents,
} from "../../lib";

export const useRecordUpdateInit = (
  boardId: string | undefined,
  form: UseFormReturn<RecordEditFormValues>,
  onRecordLoaded?: () => void
) => {
  const { data, loading, error } = useFetchRecord(boardId);
  const record = data?.fetchBoard;

  const initializedRef = useRef<string | null>(null);

  useEffect(() => {
    if (!record) return;
    if (!boardId) return;

    if (initializedRef.current === boardId) return;
    initializedRef.current = boardId;

    const meta = parseRecordMetaBlock(record.contents);
    const contents = stripMetaFromContents(record.contents);
    const { showName, artistName } = parseBoardTitle(record.title);

    form.reset({
      showName: showName ?? "",
      artistName: artistName ?? "",
      showDate: meta?.showDate ?? "",
      placeName:
        record.boardAddress?.addressDetail?.trim() ||
        record.boardAddress?.address?.trim() ||
        "",
      roadAddress: record.boardAddress?.address ?? "",
      jibunAddress: record.boardAddress?.address ?? "",
      x: meta?.x ?? undefined,
      y: meta?.y ?? undefined,
      contents,
      imageFiles: [],
      images: (record.images ?? []).filter((v): v is string => !!v?.trim()),
    });

    onRecordLoaded?.();
  }, [boardId, record, form, onRecordLoaded]);

  useEffect(() => {
    initializedRef.current = null;
  }, [boardId]);

  return {
    record,
    loading,
    error,
  };
};

import { UseFormReturn } from "react-hook-form";
import { useFetchRecord } from "../../hooks/useFetchRecord";
import { RecordEditFormValues } from "../../model";
import { useEffect } from "react";
import {
  parseBoardTitle,
  parseRecordMetaBlock,
  stripMetaFromContents,
} from "../../lib";

export const useRecordUpdateInit = (
  boardId: string | undefined,
  form: UseFormReturn<RecordEditFormValues>
) => {
  const { data, loading, error } = useFetchRecord(boardId);

  const record = data?.fetchBoard;

  useEffect(() => {
    if (!record) return;

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
      x: meta?.x ?? "",
      y: meta?.y ?? "",
      contents,
      imageFiles: [],
      images: (record.images ?? []).filter((v): v is string => !!v?.trim()),
    });
  }, [record, form]);

  return {
    record,
    loading,
    error,
  };
};

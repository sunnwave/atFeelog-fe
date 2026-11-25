import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { toUpdateBoardInput } from "@/api/adapters/record-input.adapter";
import { useToast } from "@/components/commons/toast/ToastProvider";
import { useUploadImages } from "@/shared/hooks/image/useUploadImages";
import { loggedInUserState } from "@/shared/stores";
import type { RecordEditFormValues } from "../../model/types";
import { useUpdateRecord } from "../../update/hooks/useUpdateRecord";
import { useCreateRecord } from "../../write/hooks/useCreateRecord";

type RecordSubmitOptions =
  | { mode: "write" }
  | { mode: "update"; recordId: string | undefined };

export function useRecordSubmit(options: RecordSubmitOptions) {
  const me = useRecoilValue(loggedInUserState);
  const router = useRouter();
  const { success, error } = useToast();
  const { uploadImages, isUploading } = useUploadImages();
  const { onCreateRecord, loading: isCreating } = useCreateRecord();
  const { onUpdateRecord, loading: isUpdating } = useUpdateRecord();

  const isUpdate = options.mode === "update";
  const isBusy = isUploading || (isUpdate ? isUpdating : isCreating);

  const onSubmitValid = async (
    values: RecordEditFormValues,
    clearDraft: () => Promise<boolean>,
  ) => {
    const recordId = options.mode === "update" ? options.recordId : undefined;
    if (isBusy || (isUpdate && !recordId)) return;

    try {
      const uploadedUrls = await uploadImages(values.imageFiles);
      const recordValues = { ...values, images: uploadedUrls };
      const password = me?.id || "1234";

      const id = recordId
        ? await onUpdateRecord(
            toUpdateBoardInput({
              values: recordValues,
              password,
              boardId: recordId,
            }),
          )
        : await onCreateRecord({
            values: recordValues,
            writer: me?.name || "익명",
            password,
          });

      success(isUpdate ? "필로그를 수정했어요📖✨" : "필로그를 기록했어요📖✨");
      await clearDraft();
      await router.push(`/feelog/${id}`);
    } catch (e) {
      const fallback = isUpdate
        ? "필로그 수정에 실패했어요😢"
        : "필로그 기록에 실패했어요😢";
      error(e instanceof Error ? e.message : fallback);
    }
  };

  return { onSubmitValid, isBusy };
}

import { useUploadImages } from "@/shared/hooks/image/useUploadImages";
import { loggedInUserState } from "@/shared/stores";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { useUpdateRecord } from "./useUpdateRecord";
import { useToast } from "@/components/commons/toast/ToastProvider";
import { RecordEditFormValues } from "../../model";
import { mapRecordUpdateToUpdateBoardInput } from "../../editor";

export default function useRecordUpdateSubmit() {
  const me = useRecoilValue(loggedInUserState);
  const router = useRouter();

  const { uploadImages, isUploading } = useUploadImages();
  const { onUpdateRecord, loading } = useUpdateRecord();
  const { error, success } = useToast();

  const isBusy = isUploading || loading;

  const onSubmitValid = async (
    values: RecordEditFormValues,
    boardId: string
  ) => {
    const uploadedUrls = await uploadImages(values.imageFiles);

    const args = mapRecordUpdateToUpdateBoardInput({
      values: { ...values, images: uploadedUrls },
      password: me?._id || "1234",
      boardId,
    });

    if (isBusy) return;

    try {
      const id = await onUpdateRecord({ ...args });
      success("필로그를 수정했어요📖✨");
      await router.push(`/records/${id}`);
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "필로그 수정에 실패했어요😢";
      error(message);
    }
  };

  return { onSubmitValid, isBusy };
}

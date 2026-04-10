import { useUploadImages } from "@/shared/hooks/image/useUploadImages";
import { loggedInUserState } from "@/shared/stores";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { useToast } from "@/components/commons/toast/ToastProvider";
import { RecordEditFormValues } from "../../model";
import { useCreateRecord } from "./mutations/useCreateRecord";
import { mapRecordWriteToCreateBoardInput } from "../../editor";

export default function useRecordWriteSubmit() {
  const me = useRecoilValue(loggedInUserState);
  const router = useRouter();

  const { uploadImages, isUploading } = useUploadImages();
  const { onCreateRecord, loading } = useCreateRecord();
  const { error, success } = useToast();

  const isBusy = isUploading || loading;

  const onSubmitValid = async (values: RecordEditFormValues) => {
    const uploadedUrls = await uploadImages(values.imageFiles);

    const args = mapRecordWriteToCreateBoardInput({
      values: { ...values, images: uploadedUrls },
      writer: me?.name || "익명",
      password: me?._id || "1234",
    });

    if (isBusy) return;

    try {
      const id = await onCreateRecord(args);
      success("필로그를 기록했어요📖✨");
      await router.push(`/records/${id}`);
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "필로그 기록에 실패했어요😢";
      error(message);
    }
  };

  return { onSubmitValid, isBusy };
}

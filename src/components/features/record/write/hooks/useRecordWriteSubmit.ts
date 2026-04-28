import { useUploadImages } from "@/shared/hooks/image/useUploadImages";
import { loggedInUserState } from "@/shared/stores";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { useToast } from "@/components/commons/toast/ToastProvider";
import { RecordEditFormValues } from "../../model";
import { useCreateRecord } from "./mutations/useCreateRecord";
import {
  mapRecordWriteToCreateBoardInput,
  mapRecordWriteToCreateBoardInputNew,
} from "../../editor";
import { IS_NEW_API } from "@/lib/config";
import { ICreateBoardInput as ICreateBoardInputNew } from "@/shared/graphql/generated/types.new";
import { ICreateBoardInput } from "@/shared/graphql/generated/types";

export default function useRecordWriteSubmit() {
  const me = useRecoilValue(loggedInUserState);
  const router = useRouter();

  const { uploadImages, isUploading } = useUploadImages();
  const { onCreateRecord, loading } = useCreateRecord();
  const { error, success } = useToast();

  const isBusy = isUploading || loading;

  const onSubmitValid = async (values: RecordEditFormValues) => {
    const uploadedUrls = await uploadImages(values.imageFiles);

    const createBoardInput = IS_NEW_API
      ? mapRecordWriteToCreateBoardInputNew({ ...values, images: uploadedUrls })
      : mapRecordWriteToCreateBoardInput({
          values: { ...values, images: uploadedUrls },
          writer: me?.name || "익명",
          password: me?._id || "1234",
        });

    if (isBusy) return;

    try {
      const id = await onCreateRecord(
        createBoardInput as ICreateBoardInput | ICreateBoardInputNew
      );
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

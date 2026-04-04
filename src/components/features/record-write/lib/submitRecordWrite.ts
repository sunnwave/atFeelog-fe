import { ICreateBoardInput } from "@/shared/graphql/generated/types";
import { RecordWriteFormValues } from "../model/types";
import { mapRecordWriteToCreateBoardInput } from "./mapRecordWriteToCreateBoardInput";
import { LoggedInUser } from "@/shared/stores";

export async function submitRecordWrite(args: {
  values: RecordWriteFormValues;
  me: LoggedInUser | null;
  uploadImages: (files?: File[]) => Promise<string[]>;
  createRecord: (input: ICreateBoardInput) => Promise<string>; // ICreateBoardInput으로 바꾸면 더 좋음
}) {
  const { values, me, uploadImages, createRecord } = args;

  const uploadedUrls = await uploadImages(values.imageFiles);

  const input = mapRecordWriteToCreateBoardInput({
    values: { ...values, images: uploadedUrls },
    writer: me?.name || "익명",
    password: me?._id || "1234",
  });

  return await createRecord(input);
}

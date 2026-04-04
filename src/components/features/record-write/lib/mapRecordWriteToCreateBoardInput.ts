import { ICreateBoardInput } from "@/shared/graphql/generated/types";
import type { RecordWriteFormValues } from "../model/types";
import { attachMetaToContents } from "./attachMetaToContents";
import { toBoardTitle } from "./toBoardTitle";

export function mapRecordWriteToCreateBoardInput(args: {
  values: RecordWriteFormValues;
  writer: string;
  password: string;
}): ICreateBoardInput {
  const { values, writer, password } = args;

  const title = toBoardTitle(values.showName, values.artistName);
  const contents = attachMetaToContents(values);

  const address = values.roadAddress || values.jibunAddress || "";
  const addressDetail = values.placeName || "";

  const images = values.images.filter((url) => url.trim() !== "");

  return {
    writer,
    password,
    title,
    contents,
    youtubeUrl: undefined,
    images: images.length > 0 ? images : undefined,
    boardAddress:
      address || addressDetail
        ? {
            zipcode: "",
            address,
            addressDetail,
          }
        : undefined,
  };
}

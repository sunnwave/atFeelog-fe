import {
  ICreateBoardInput,
  IMutationUpdateBoardArgs,
  IUpdateBoardInput,
} from "@/shared/graphql/generated/types";
import { RecordWriteFormValues } from "../../model/types";
import { toBoardTitle } from "../../lib/recordTitle";
import { attachMetaToContents } from "../../lib/metaBlock";

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

export function mapRecordUpdateToUpdateBoardInput(args: {
  values: RecordWriteFormValues;
  password?: string;
  boardId: string;
}): IMutationUpdateBoardArgs {
  const { values } = args;

  const title = toBoardTitle(values.showName, values.artistName);
  const contents = attachMetaToContents(values);

  const address = values.roadAddress || values.jibunAddress || "";
  const addressDetail = values.placeName || "";

  const images = values.images.filter((url) => url.trim() !== "");

  const updateBoardInput: IUpdateBoardInput = {
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

  return {
    updateBoardInput,
    password: args.password,
    boardId: args.boardId,
  };
}

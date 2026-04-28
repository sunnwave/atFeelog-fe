import {
  ICreateBoardInput,
  IMutationUpdateBoardArgs,
  IUpdateBoardInput,
} from "@/shared/graphql/generated/types";
import { ICreateBoardInput as ICreateBoardInputNew } from "@/shared/graphql/generated/types.new";
import { toBoardTitle } from "../../lib/recordTitle";
import { attachMetaToContents } from "../../lib/metaBlock";
import { RecordEditFormValues } from "../../model";
import { localDateToRfc3339NoonUtc } from "@/shared/utils";

export function mapRecordWriteToCreateBoardInput(args: {
  values: RecordEditFormValues;
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

export function mapRecordWriteToCreateBoardInputNew(
  values: RecordEditFormValues,
): ICreateBoardInputNew {
  const { showName, artistName, showDate, contents, images } = values;
  return {
    artistName: artistName || "익명",
    showName,
    showDate: showDate ? localDateToRfc3339NoonUtc(showDate) : undefined,
    contents,
    images: images.filter((url) => url.trim() !== ""),
    boardAddressInput: {
      placeName: values.placeName,
      roadAddress: values.roadAddress,
      jibunAddress: values.jibunAddress,
      x: values.x,
      y: values.y,
    },
  };
}

export function mapRecordUpdateToUpdateBoardInput(args: {
  values: RecordEditFormValues;
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

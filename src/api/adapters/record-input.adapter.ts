import { IS_NEW_API } from "@/api/config";
import {
  ICreateBoardInput as ILegacyBoardInput,
  IMutationUpdateBoardArgs as ILegacyUpdateArgs,
  IUpdateBoardInput as ILegacyUpdateBoardInput,
} from "@/api/graphql/generated/types";
import {
  ICreateBoardInput as INewBoardInput,
  IMutationUpdateBoardArgs as INewUpdateArgs,
  IUpdateBoardInput as INewUpdateBoardInput,
} from "@/api/graphql/generated/types.new";
import { attachMetaToContents } from "@/components/features/record";
import { RecordEditFormValues } from "@/components/features/record/model";
import { localDateToRfc3339NoonUtc } from "@/shared/utils";

export function toCreateBoardInput(args: {
  values: RecordEditFormValues;
  writer?: string;
  password?: string;
}): ILegacyBoardInput | INewBoardInput {
  const { values, writer = "익명", password = "1234" } = args;

  if (IS_NEW_API) {
    return {
      artistName: values.artistName ?? "",
      showName: values.showName,
      showDate: values.showDate
        ? localDateToRfc3339NoonUtc(values.showDate)
        : undefined,
      contents: values.contents,
      images: values.images.filter((url) => url.trim() !== ""),
      boardAddressInput: {
        placeName: values.placeName,
        roadAddress: values.roadAddress,
        jibunAddress: values.jibunAddress,
        x: values.x,
        y: values.y,
      },
    } as INewBoardInput;
  }

  const contents = attachMetaToContents(values);
  const address = values.roadAddress || values.jibunAddress || "";
  const addressDetail = values.placeName || "";
  const images = values.images.filter((url) => url.trim() !== "");

  return {
    title: values.title,
    writer,
    password,
    contents,
    images: images.length > 0 ? images : undefined,
    boardAddress:
      address || addressDetail
        ? {
            zipcode: "",
            address,
            addressDetail,
          }
        : undefined,
  } as ILegacyBoardInput;
}

export function toUpdateBoardInput(args: {
  values: RecordEditFormValues;
  password?: string;
  boardId: string;
}): ILegacyUpdateArgs | INewUpdateArgs {
  const { values } = args;

  if (IS_NEW_API) {
    const updateBoardInput: INewUpdateBoardInput = {
      showName: values.showName,
      artistName: values.artistName ?? "",
      showDate: values.showDate
        ? localDateToRfc3339NoonUtc(values.showDate)
        : undefined,
      contents: values.contents,
      images: values.images.filter((url) => url.trim() !== ""),
      boardAddressInput: {
        placeName: values.placeName,
        roadAddress: values.roadAddress,
        jibunAddress: values.jibunAddress,
        x: values.x,
        y: values.y,
      },
    };

    return {
      boardId: args.boardId,
      updateBoardInput,
    } as INewUpdateArgs;
  }

  const contents = attachMetaToContents(values);
  const address = values.roadAddress || values.jibunAddress || "";
  const addressDetail = values.placeName || "";
  const images = values.images.filter((url) => url.trim() !== "");

  const updateBoardInput: ILegacyUpdateBoardInput = {
    title: values.title,
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
  } as ILegacyUpdateArgs;
}

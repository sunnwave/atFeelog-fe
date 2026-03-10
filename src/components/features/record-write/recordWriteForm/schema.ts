import * as yup from "yup";
import type { RecordWriteFormValues } from "./types";

export const recordWriteSchema: yup.ObjectSchema<RecordWriteFormValues> = yup
  .object({
    showName: yup
      .string()
      .trim()
      .required("공연명을 입력해주세요.")
      .max(60, "공연명은 60자 이하여야 해요."),
    artistName: yup
      .string()
      .trim()
      .required("아티스트명을 입력해주세요.")
      .max(60, "아티스트명은 60자 이하여야 해요."),
    showDate: yup
      .string()
      .required("공연 날짜를 선택해주세요.")
      .matches(/^\d{4}-\d{2}-\d{2}$/, "날짜 형식이 올바르지 않아요."),

    contents: yup
      .string()
      .trim()
      .required("후기를 입력해주세요.")
      .min(5, "후기는 5자 이상 입력해주세요."),

    placeName: yup.string().trim().max(80).default(""),
    roadAddress: yup.string().trim().max(120).default(""),
    jibunAddress: yup.string().trim().max(120).default(""),

    x: yup
      .string()
      .transform((v) => (v === "" || v == null ? undefined : String(v)))
      .optional(),
    y: yup
      .string()
      .transform((v) => (v === "" || v == null ? undefined : String(v)))
      .optional(),

    images: yup.array().of(yup.string().trim().required()).default([]),
  })
  .required();

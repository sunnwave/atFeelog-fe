import * as yup from "yup";
import type { RecordEditFormValues } from "./types";

export const recordWriteSchema: yup.ObjectSchema<RecordEditFormValues> = yup
  .object({
    title: yup
      .string()
      .trim()
      .required("제목을 입력해주세요.")
      .max(100, "제목은 100자 이하여야 해요."),

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
      .matches(/^\d{4}-\d{2}-\d{2}$/, "날짜 형식이 올바르지 않아요.")
      .test("not-future", "공연 날짜는 오늘 이후로 설정할 수 없어요.", (value) => {
        if (!value) return true;
        return value <= new Date().toISOString().slice(0, 10);
      }),

    contents: yup
      .string()
      .trim()
      .required("후기를 입력해주세요.")
      .min(5, "후기는 5자 이상 입력해주세요."),

    placeName: yup.string().trim().max(80).defined(),
    roadAddress: yup.string().trim().max(120).defined(),
    jibunAddress: yup.string().trim().max(120).defined(),

    x: yup
      .string()
      .transform((value) => (value === "" || value == null ? undefined : value))
      .optional(),

    y: yup
      .string()
      .transform((value) => (value === "" || value == null ? undefined : value))
      .optional(),

    images: yup.array().of(yup.string().trim().required()).defined(),

    imageFiles: yup.array().of(yup.mixed<File>().required()).defined(),
  })
  .required();

export type RecordEditFormValues = {
  // UI 입력
  showName: string; // 공연명(필수)
  artistName?: string; // 아티스트명(선택)
  showDate: string; // 공연 날짜(필수) "YYYY-MM-DD"

  contents: string; // 후기(필수)

  // 카카오 장소 검색 결과(선택/권장)
  placeName: string;
  roadAddress: string;
  jibunAddress: string;
  x?: string; // longitude
  y?: string; // latitude

  images: string[]; //서버로 보낼 이미지 URL 목록
  imageFiles: File[]; // 업로드할 이미지 파일 목록
};

export const RECORD_WRITE_DEFAULTS: RecordEditFormValues = {
  showName: "",
  artistName: "",
  showDate: "",

  contents: "",

  placeName: "",
  roadAddress: "",
  jibunAddress: "",
  x: undefined,
  y: undefined,

  images: [],
  imageFiles: [],
};

export type RecordMeta = {
  showDate: string;
  x?: string;
  y?: string;
};

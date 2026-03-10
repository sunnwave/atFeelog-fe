export type RecordWriteFormValues = {
  // UI 입력
  showName: string; // 공연명(필수)
  artistName?: string; // 아티스트명(선택)
  showDate: string; // 공연 날짜(필수) "YYYY-MM-DD"

  contents: string; // 후기(필수)

  // 카카오 장소 검색 결과(선택/권장)
  placeName: string; // place_name
  roadAddress: string; // road_address_name
  jibunAddress: string; // address_name
  x?: string; // longitude
  y?: string; // latitude

  // 업로드 후 URL/키 배열
  images: string[];
};

export type KakaoPlace = {
  id: string;
  place_name: string;
  address_name: string;
  road_address_name?: string;
  x: string; // longitude
  y: string; // latitude
};

export const RECORD_WRITE_DEFAULTS: RecordWriteFormValues = {
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
};

export type KakaoPlace = {
  id: string;
  place_name: string;
  address_name: string;
  road_address_name?: string;
  x: string; // longitude
  y: string; // latitude
};

type KakaoSearchMeta = {
  total_count: number;
  pageable_count: number;
  is_end: boolean;
};

export type KakaoSearchResponse = {
  documents: KakaoPlace[];
  meta: KakaoSearchMeta;
};

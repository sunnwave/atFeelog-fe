import {
  ShowGenreShcate,
  ShowKidstate,
  ShowPrfstate,
  ShowSigngucode,
} from "@/shared/constants";

export type ShowFilters = {
  q: string;
  genre: ShowGenreShcate;
  status: ShowPrfstate;
  area: ShowSigngucode;
  kidstate: ShowKidstate;
  stdate: string; // "YYYY-MM-DD"
  eddate: string; // "YYYY-MM-DD"
};

export const DEFAULT_FILTERS: ShowFilters = {
  q: "",
  genre: "",
  status: "01", // 기본: 공연예정
  area: "",
  kidstate: "",
  stdate: "",
  eddate: "",
};

import {
  ShowGenreShcate,
  ShowKidstate,
  ShowPrfstate,
  ShowSigngucode,
} from "@/shared/constants";

export type ShowFilters = {
  search?: string;
  genre?: ShowGenreShcate;
  status?: ShowPrfstate;
  area?: ShowSigngucode;
  kidstate?: ShowKidstate;
  startDate?: string; // "YYYY-MM-DD"
  endDate?: string; // "YYYY-MM-DD"
};

export const DEFAULT_FILTERS: ShowFilters = {
  search: "",
  genre: "",
  status: "01", // 기본: 공연예정
  area: "",
  kidstate: "",
  startDate: "",
  endDate: "",
};

export type KidMode = "all" | "kid";

import {
  ShowGenre,
  ShowStatus,
  ShowArea,
  ShowKidstate,
} from "@/shared/constants";

/** URL/UI 레이어에서 사용하는 필터 상태 */
export type ShowFilters = {
  search?: string;
  genre?: ShowGenre;
  status?: ShowStatus;
  area?: ShowArea;
  kidstate?: ShowKidstate;
  startDate?: string;
  endDate?: string;
};

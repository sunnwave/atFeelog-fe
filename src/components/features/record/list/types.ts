import { IBoardSortType } from "@/api/graphql/generated/types.new";

export type FeedMode = "all" | "following";

export type RecordFilterVars = {
  search?: string;
  startDate?: string;
  endDate?: string;
  sort?: IBoardSortType;
};

export const RECORDS_PER_PAGE = 10;

export type SortMode = "latest" | "popular";

export type FeedMode = "all" | "following";

export type RecordFilterVars = {
  search?: string;
  startDate?: string;
  endDate?: string;
  sort?: SortMode;
};

export const RECORDS_PER_PAGE = 10;

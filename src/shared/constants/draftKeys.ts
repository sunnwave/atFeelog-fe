export const DRAFT_KEY = {
  record: {
    write: (userId: string) => `record:draft:write:${userId}`,
    update: (userId: string, recordId: string) =>
      `record:draft:update:${userId}:${recordId}`,
  },
};

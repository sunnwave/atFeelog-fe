export const DRAFT_KEY = {
  record: {
    write: "record:draft:write",
    update: (id: string) => `record:draft:update:${id}`,
  },
};

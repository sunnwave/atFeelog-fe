import { FieldFunctionOptions } from "@apollo/client";

export function makeTypePolicy(isNewApi: boolean) {
  if (isNewApi) {
    return {
      keyFields: ["_id"],
      fields: {
        _id: {
          read(_: unknown, { readField }: FieldFunctionOptions) {
            return readField("id");
          },
        },
      },
    };
  }
  return { keyFields: ["_id"] };
}

export const TYPE_NAMES_WITH_ID = [
  "Board",
  "BoardAddress",
  "BoardComment",
  "FileManager",
  "User",
];

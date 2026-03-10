import { IQuery } from "@/shared/graphql/generated/types";
import { atomWithDevCache } from "./atomWithDevCache";

export type LoggedInUser = IQuery["fetchUserLoggedIn"] | null;

export const loggedInUserState = atomWithDevCache<LoggedInUser>({
  key: "loggedInUserState",
  default: null,
});

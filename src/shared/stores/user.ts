import { IQuery } from "@/shared/graphql/generated/types";
import { atom } from "recoil";

export type LoggedInUser = IQuery["fetchUserLoggedIn"] | null;

export const loggedInUserState = atom<LoggedInUser>({
  key: "loggedInUserState",
  default: null,
});

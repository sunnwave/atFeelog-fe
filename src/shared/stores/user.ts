import { User } from "@/api/adapters/types/user";
import { atom } from "recoil";

export const loggedInUserState = atom<User | null>({
  key: "loggedInUserState",
  default: null,
});

import { atomWithDevCache } from "./atomWithDevCache";

export const authInitializedState = atomWithDevCache<boolean>({
  key: "authInitializedState",
  default: false,
});

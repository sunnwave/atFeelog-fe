import { atomWithDevCache } from "./atomWithDevCache";

export const accessTokenState = atomWithDevCache<string | null>({
  key: "accessTokenState",
  default: null,
});

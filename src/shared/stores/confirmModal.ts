import { atomWithDevCache } from "./atomWithDevCache";
import { ConfirmPayload } from "@/components/commons/modal/confirmModal/ConfirmModalTypes";

export const confirmModalState = atomWithDevCache<ConfirmPayload>({
  key: "confirmModalState",
  default: { open: false, loading: false, variant: "default" },
});

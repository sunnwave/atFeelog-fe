import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useAuthInitialize } from "@/shared/hooks/auth/useAuthInitialize";
import {
  accessTokenState,
  authInitializedState,
  loggedInUserState,
} from "@/shared/stores";

export default function AuthInitialize() {
  useAuthInitialize();

  const initialized = useRecoilValue(authInitializedState);
  const accessToken = useRecoilValue(accessTokenState);
  const user = useRecoilValue(loggedInUserState);

  useEffect(() => {
    if (!initialized) return;
  }, [initialized, accessToken, user]);

  return null;
}

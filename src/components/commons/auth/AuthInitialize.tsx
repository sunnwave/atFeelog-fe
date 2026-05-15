import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useAuthInitialize } from "@/shared/hooks/auth/useAuthInitialize";
import {
  accessTokenState,
  authInitializedState,
} from "@/shared/stores";
import { useApolloClient } from "@apollo/client";

export default function AuthInitialize() {
  useAuthInitialize();

  const client = useApolloClient();
  const initialized = useRecoilValue(authInitializedState);
  const accessToken = useRecoilValue(accessTokenState);

  useEffect(() => {
    if (!initialized) return;
    client.reFetchObservableQueries();
  }, [initialized, accessToken, client]);

  return null;
}

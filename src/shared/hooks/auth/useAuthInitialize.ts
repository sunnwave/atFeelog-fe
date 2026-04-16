import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { getAccessToken } from "@/lib/getAccessToken";
import { useFetchUserLoggedInLazy } from "./useFetchUserLoggedInLazy";
import {
  accessTokenState,
  authInitializedState,
  loggedInUserState,
} from "@/shared/stores";

export function useAuthInitialize() {
  const initialized = useRecoilValue(authInitializedState);

  const setAccessToken = useSetRecoilState(accessTokenState);
  const setUser = useSetRecoilState(loggedInUserState);
  const setInitialized = useSetRecoilState(authInitializedState);

  const { run: fetchMe } = useFetchUserLoggedInLazy();

  useEffect(() => {
    if (initialized) return;

    let cancelled = false;

    (async () => {
      try {
        const token = await getAccessToken().catch(() => null);

        if (cancelled) return;

        setAccessToken(token ?? "");

        if (!token) {
          setUser(null);
          return;
        }

        try {
          const me = await fetchMe(token);

          if (cancelled) return;

          // ✅ me가 null이면 인증 실패로 간주
          if (!me?._id) {
            setAccessToken("");
            setUser(null);
            return;
          }

          setUser(me);
        } catch (e) {
          console.error("Failed to fetch logged in user", e);
          if (cancelled) return;

          setAccessToken("");
          setUser(null);
        }
      } catch (e) {
        console.log("Failed to initialize auth", e);

        if (cancelled) return;
        setAccessToken("");
        setUser(null);
      } finally {
        if (cancelled) return;
        setInitialized(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [initialized, fetchMe, setAccessToken, setUser, setInitialized]);
}

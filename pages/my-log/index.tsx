import { useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { loggedInUserState } from "@/shared/stores";

export default function MyLogRedirect() {
  const me = useRecoilValue(loggedInUserState);
  const router = useRouter();

  useEffect(() => {
    if (me?.id) {
      void router.replace(`/feelog/${me.id}`);
    } else {
      void router.replace("/login");
    }
  }, [me, router]);

  return null;
}
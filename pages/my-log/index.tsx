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
    } else if (process.env.NODE_ENV === "production") {
      void router.replace("/login");
    } else {
      void router.replace("/feelog/dev-user");
    }
  }, [me, router]);

  return null;
}
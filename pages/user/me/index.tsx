import { useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { authInitializedState, loggedInUserState } from "@/shared/stores";
import UserProfileScreen from "@/components/features/user/ui/screen/UserProfileScreen";
import { UserProfileSkeleton } from "@/components/features/user/ui/component/skeleton";

export default function MyProfilePage() {
  const initialized = useRecoilValue(authInitializedState);
  const me = useRecoilValue(loggedInUserState);
  const router = useRouter();

  useEffect(() => {
    if (!initialized) return;
    if (!me?.id) void router.replace("/login");
  }, [initialized, me, router]);

  if (!initialized || !me?.id) return <UserProfileSkeleton />;
  return <UserProfileScreen userId={me.id} />;
}
import { JSX, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { loggedInUserState } from "@/shared/stores";
import { IS_NEW_API } from "@/api/config";
import type { ProfileUser, UserProfilePageProps, FollowTab } from "../../types";
import ProfileHeader from "../component/profile/ProfileHeader";
import { ResponsiveLayout } from "@/components/commons/layout/ResponsiveLayout";
import FollowListPanel from "../component/follow/FollowListPanel";
import Tabs from "@/components/ui/tabs/Tabs";
import {
  UserRecordGrid,
  UserLikedRecordGrid,
  UserSavedShowGrid,
} from "../component/user-content-grid";

type Tab = "records" | "liked" | "saved";

const TABS_ALL = [
  { id: "records" as const, label: "필로그" },
  { id: "liked" as const, label: "좋아요" },
  { id: "saved" as const, label: "찜한 공연" },
];

export default function UserProfileScreen({
  userId,
}: UserProfilePageProps): JSX.Element {
  const router = useRouter();
  const loggedInUser = useRecoilValue(loggedInUserState);
  const isMe = !!loggedInUser?.id && loggedInUser.id === userId;

  const [activeTab, setActivTab] = useState<Tab>("records");
  const tabs = isMe ? TABS_ALL : TABS_ALL.slice(0, 2);

  const [openPanel, setOpenPanel] = useState<FollowTab | null>(null);

  const nameFromQuery =
    typeof router.query.name === "string"
      ? decodeURIComponent(router.query.name)
      : undefined;
  const pictureFromQuery =
    typeof router.query.picture === "string"
      ? decodeURIComponent(router.query.picture)
      : undefined;

  // TODO: fetchUserById를 사용하여 userId에 해당하는 유저 정보를 가져오도록 수정 필요
  const user: ProfileUser = {
    id: isMe ? (loggedInUser?.id ?? userId) : userId,
    name: isMe
      ? (loggedInUser?.name ?? nameFromQuery ?? userId)
      : (nameFromQuery ?? userId),
    picture: isMe ? loggedInUser?.picture : pictureFromQuery,
  };

  return (
    <ResponsiveLayout contentType="wide" className="py-4 space-y-6">
      <div className="lg:flex lg:items-stretch">
        <div className="flex-1 min-w-0">
          <ProfileHeader
            user={user}
            userId={userId}
            isMe={isMe}
            onStatClick={IS_NEW_API ? setOpenPanel : undefined}
          />
        </div>
        {IS_NEW_API && (
          <FollowListPanel
            userId={userId}
            openPanel={openPanel}
            onPanelChange={setOpenPanel}
            onClose={() => setOpenPanel(null)}
            loggedInUserId={loggedInUser?.id ?? undefined}
          />
        )}
      </div>
      <section>
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActivTab}
          className="w-full border-x-[1.5px]"
        />
        {activeTab === "records" && <UserRecordGrid userId={userId} />}
        {activeTab === "liked" && <UserLikedRecordGrid userId={userId} />}
        {/* {activeTab === "saved" && <UserSavedShowGrid />} */}
      </section>
    </ResponsiveLayout>
  );
}

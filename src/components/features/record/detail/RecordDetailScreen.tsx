import { JSX } from "react";
import { useRouter } from "next/router";
import PageHeader from "@/components/commons/layout/PageHeader";
import { useFetchRecord } from "../hooks/useFetchRecord";
import { useRecoilState } from "recoil";
import { loggedInUserState } from "@/shared/stores";
import RecordDetailDateHeader from "./recordDetailContent/RecordDetailDateHeader";
import RecordDetailBody from "./recordDetailContent/RecordDetailBody";
import RecordDetailShowInfo from "./recordDetailContent/RecordDetailShowInfo";
import ImageScrollStrip from "@/components/commons/imageScrollStrip/ImageScrollStrip";
import RecordProfile from "./recordDetailContent/RecordProfile";
import RecordActions from "./recordDetailContent/RecordActions";
import RecordComments from "../../record-comments/RecordComments";
import { useAddFollow, useIsConnected } from "../../user/hooks";

export default function RecordDetailScreen(): JSX.Element | null {
  const router = useRouter();

  const recordId =
    router.isReady && typeof router.query.recordId === "string"
      ? router.query.recordId
      : undefined;

  const [me] = useRecoilState(loggedInUserState);
  const isLoggedIn = !!me;
  const { record, loading, error } = useFetchRecord(recordId);
  const { onAddFollow } = useAddFollow();
  const { isConnected: isFollowing, refetch: refetchIsFollowing } =
    useIsConnected(record?.user?.id);

  const isWriter = !!(
    isLoggedIn &&
    record &&
    (me.id === record.user?.id || me.name === record.user?.name)
  );

  const handleFollow = async () => {
    if (!record?.user?.id) return;
    try {
      await onAddFollow(record.user.id);
      void refetchIsFollowing();
    } catch (e) {
      console.error("[follow] error:", e);
    }
  };

  if (!router.isReady) return null;
  if (!recordId) return null;
  if (loading) return <div>로딩중...</div>;
  if (error) {
    console.error(error);
    return <div>에러!</div>;
  }
  if (!record) return <div>데이터가 없어요</div>;

  const images = (record.images ?? []).filter((v): v is string => !!v);
  const hasImages = images.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <PageHeader label="Record" fallbackHref="/feelog" />
      <div className="mx-auto max-w-7xl lg:px-6 lg:py-8">
        <div className="space-y-2 w-full lg:grid lg:grid-cols-[2fr_1fr] lg:items-start lg:space-y-0 lg:gap-8">
          <article className="lg:space-y-4">
            <RecordDetailDateHeader record={record} isWriter={isWriter} />
            <RecordProfile
              record={record}
              isFollowing={isFollowing}
              onFollow={handleFollow}
              className="lg:hidden"
            />
            <RecordDetailShowInfo record={record} />
            {hasImages && (
              <ImageScrollStrip images={images} className="p-2 lg:p-0" />
            )}
            <RecordDetailBody record={record} />
          </article>
          <aside className="border-t-[1.5px] lg:border-[1.5px]">
            <RecordProfile
              record={record}
              isFollowing={isFollowing}
              onFollow={handleFollow}
              className="hidden lg:flex"
            />
            <RecordActions record={record} />
            <RecordComments />
          </aside>
        </div>
      </div>
    </div>
  );
}

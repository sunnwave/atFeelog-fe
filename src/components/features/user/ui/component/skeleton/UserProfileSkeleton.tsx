import { JSX } from "react";
import { ResponsiveLayout } from "@/components/commons/layout/ResponsiveLayout";
import ProfileHeaderSkeleton from "./ProfileHeaderSkeleton";
import ProfileRecordGridSkeleton from "./ProfileRecordGridSkeleton";

export default function UserProfileSkeleton(): JSX.Element {
  return (
    <ResponsiveLayout contentType="wide" className="py-4 space-y-6">
      <div className="lg:flex lg:items-stretch">
        <div className="flex-1 min-w-0">
          <ProfileHeaderSkeleton />
        </div>
      </div>
      <ProfileRecordGridSkeleton />
    </ResponsiveLayout>
  );
}

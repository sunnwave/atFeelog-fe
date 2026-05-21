import { RecordSummary } from "@/api/adapters/types/record-summary";
import { getImageUrl } from "@/shared/utils";
import Image from "next/image";
import { useRouter } from "next/router";
import { JSX } from "react";
import RecordFeedCardFooter from "./RecordFeedCardFooter";
import RecordFeedCardShowMeta from "./RecordFeedCardShowMeta";

export default function RecordFeedCard({
  record,
}: {
  record: RecordSummary;
}): JSX.Element {
  const router = useRouter();
  const imageUrl = record.images?.filter(Boolean)[0];
  const hasImage = !!imageUrl;

  const onClick = () => {
    void router.push(`/records/${record.id}`);
  };

  const artists =
    record.artistName
      ?.split(",")
      .map((name) => name.trim())
      .filter(Boolean) ?? [];

  return (
    <article
      onClick={onClick}
      className="bg-card border border-foreground rounded-xs overflow-hidden cursor-pointer group transition-transform duration-200 hover:-translate-y-0.5"
    >
      {hasImage && (
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <Image
            src={getImageUrl(imageUrl)}
            alt={record.showName || record.title}
            fill
            className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
          />
        </div>
      )}

      <div className="p-5">
        <h3
          className={`font-black text-foreground leading-[1.1] tracking-tight ${hasImage ? "text-[21px]" : "text-[24px]"}`}
        >
          {record.title}
        </h3>

        <RecordFeedCardShowMeta showName={record.showName} artists={artists} />

        <RecordFeedCardFooter
          user={record.user}
          createdAt={record.createdAt}
          isLiked={record.isLiked ?? false}
          likeCount={record.likeCount ?? 0}
          commentCount={record.commentCount ?? 0}
        />
      </div>
    </article>
  );
}

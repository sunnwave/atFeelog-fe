import { pickQuoteGradient } from "@/shared/utils";

export default function GradientBg({ boardId }: { boardId: string }) {
  const g = pickQuoteGradient(boardId);

  return (
    <>
      <div className={`absolute inset-0 ${g.bg}`}>
        <div
          className={`absolute -top-24 -right-24 w-72 h-72 ${g.blobTop} rounded-full blur-3xl`}
        />
        <div
          className={`absolute -bottom-24 -left-24 w-72 h-72 ${g.blobBottom} rounded-full blur-3xl`}
        />
      </div>
    </>
  );
}

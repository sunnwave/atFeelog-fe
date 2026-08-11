import { cn, getImageUrl } from "@/shared/utils";
import Image from "next/image";
import { JSX } from "react";

interface Props {
  images: string[];
  /**
   * 이미지 높이 (px). 기본값 180.
   * 너비는 각 이미지의 원본 비율을 유지해 자동 결정됨.
   * 가로 이미지 → 넓게, 세로 이미지 → 좁게 표시.
   */
  imageHeight?: number;
  /** 클릭 시 콜백 (인덱스 전달) */
  onImageClick?: (index: number) => void;
  className?: string;
}

export default function ImageScrollStrip({
  images,
  imageHeight = 300,
  onImageClick,
  className,
}: Props): JSX.Element | null {
  if (!images || images.length === 0) return null;

  return (
    <div className={cn("overflow-x-auto no-scrollbar", className)}>
      <div className="flex gap-1">
        {images.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onImageClick?.(i)}
            disabled={!onImageClick}
            className={cn(
              "shrink-0 overflow-hidden bg-muted block",
              onImageClick
                ? "cursor-pointer hover:opacity-90 transition-opacity"
                : "cursor-default",
            )}
            style={{ height: imageHeight }}
          >
            {/*
             * width={0} height={0} + style={{ width: "auto", height }} 조합:
             * Next.js Image가 비율 강제 없이 CSS 크기를 따르도록 함.
             * 결과적으로 높이는 고정, 너비는 원본 이미지 비율대로 결정됨.
             */}
            <Image
              src={getImageUrl(src)}
              alt={`이미지 ${i + 1}`}
              width={0}
              height={0}
              sizes="(max-width: 768px) 240px, 320px"
              style={{ width: "auto", height: imageHeight }}
              className="object-cover h-full"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

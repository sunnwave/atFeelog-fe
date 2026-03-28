import { X } from "lucide-react";
import Image from "next/image";

export default function ImagePreview({
  preview,
  index,
  handleRemove,
}: {
  preview: string;
  index: number;
  handleRemove: (index: number) => void;
}) {
  return (
    <div
      key={index}
      className="relative aspect-square rounded-2xl overflow-hidden bg-muted group"
    >
      <Image
        src={preview}
        alt={`Preview ${index + 1}`}
        fill
        className="w-full h-full object-cover"
      />
      <button
        type="button"
        onClick={() => handleRemove(index)}
        className="
                  absolute top-2 right-2 w-6 h-6 rounded-full
                  bg-black/60 text-white
                  flex items-center justify-center
                "
        aria-label="이미지 제거"
      >
        <X className="w-4 h-4" />
      </button>
      {index === 0 && (
        <div className="absolute bottom-2 left-2 px-2 py-1 rounded-lg bg-black/60 text-white text-xs font-medium">
          대표
        </div>
      )}
    </div>
  );
}

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dispatch, JSX, SetStateAction } from "react";

export default function NavigationArrow({
  images,
  setCurrentImageIndex,
}: {
  images: Array<string>;
  setCurrentImageIndex: Dispatch<SetStateAction<number>>;
}): JSX.Element {
  const nextImage = () => {
    if (images && images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (images && images.length > 0) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + images.length) % images.length
      );
    }
  };

  return (
    <>
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 hover:bg-white flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100"
            aria-label="이전 이미지"
          >
            <ChevronLeft className="w-6 h-6 text-primary" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 hover:bg-white flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100"
            aria-label="다음 이미지"
          >
            <ChevronRight className="w-6 h-6 text-primary" />
          </button>
        </>
      )}
    </>
  );
}

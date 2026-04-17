import { JSX } from "react";

export default function ImageCounter({
  images,
  currentImageIndex,
}: {
  images: Array<string>;
  currentImageIndex: number;
}): JSX.Element {
  return (
    <>
      {images.length > 1 && (
        <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/60 text-white text-xs font-medium">
          {currentImageIndex + 1}/{images.length}
        </div>
      )}
    </>
  );
}

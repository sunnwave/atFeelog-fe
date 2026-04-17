import { JSX } from "react";

export default function DotIndicator({
  images,
  currentImageIndex,
  setCurrentImageIndex,
}: {
  images: Array<string>;
  currentImageIndex: number;
  setCurrentImageIndex: (index: number) => void;
}): JSX.Element {
  return (
    <>
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentImageIndex
                  ? "bg-white w-6"
                  : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>
      )}
    </>
  );
}

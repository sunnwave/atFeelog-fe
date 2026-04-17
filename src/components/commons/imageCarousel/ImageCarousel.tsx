import Image from "next/image";
import { JSX, useState } from "react";
import ImageCounter from "./ImageCounter";
import DotIndicator from "./DotIndicator";
import NavigationArrow from "./NavigationArrow";
import { cn, getImageUrl } from "@/shared/utils";

export default function ImageCarousel({
  images,
  className,
}: {
  images: Array<string>;
  className?: string;
}): JSX.Element {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  //TODO: 모바일 태블릿 스와이프 기능 추가
  return (
    <div className={cn(className)}>
      <div className="relative aspect-[3/4] bg-muted rounded-2xl overflow-hidden group">
        {/* Main Image */}
        <Image
          src={getImageUrl(images[currentImageIndex])}
          alt={`${images[currentImageIndex]}`}
          fill
          className="w-full h-full object-cover"
        />
        {/* TODO: 모바일에서 스와이프 가능하도록 */}
        <NavigationArrow
          images={images}
          setCurrentImageIndex={setCurrentImageIndex}
        />

        <ImageCounter images={images} currentImageIndex={currentImageIndex} />
        <DotIndicator
          images={images}
          currentImageIndex={currentImageIndex}
          setCurrentImageIndex={setCurrentImageIndex}
        />
      </div>
    </div>
  );
}

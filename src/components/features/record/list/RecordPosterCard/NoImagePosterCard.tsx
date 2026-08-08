import { ReactNode } from "react";

export default function NoImagePosterCard({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      className="w-full h-full flex flex-col justify-between p-2 @card-xs:p-3 @card-sm:p-4 @card-md:p-5 @card-lg:p-6 bg-white group-hover:bg-foreground transition-all duration-300"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(33,33,33,0.13) 1.5px, transparent 1.5px)",
        backgroundSize: "16px 16px",
      }}
    >
      {children}
    </div>
  );
}

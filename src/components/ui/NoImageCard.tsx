import { ReactNode } from "react";

export default function NoImageCard({ children }: { children?: ReactNode }) {
  return (
    <div
      className="w-full h-full flex flex-col justify-between p-2 pb-4 @card-xs:p-3 @card-xs:pb-5 @card-sm:p-4 @card-sm:pb-6 @card-md:p-5 @card-md:pb-7 @card-lg:p-6 @card-lg:pb-8 bg-white group-hover:bg-foreground transition-all duration-300"
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

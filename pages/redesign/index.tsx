"use client";

import { useState } from "react";
import LogoPreviewPage from "./previews/LogoPreview";
import AtFeelogWebResponsivePreview from "./previews/Mood";
import ProfileEntryPreviewPage from "./previews/ProfileEntryPreview";

type PreviewTab = "profile" | "logo" | "mood";

const tabs: { id: PreviewTab; label: string }[] = [
  { id: "profile", label: "Profile Entry" },
  { id: "logo", label: "Logo" },
  { id: "mood", label: "Web Mood" },
];

export default function RedesignPage() {
  const [active, setActive] = useState<PreviewTab>("profile");

  return (
    <div>
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          display: "flex",
          gap: 0,
          borderBottom: "1.5px solid #212121",
          background: "#F6F5FA",
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActive(tab.id)}
            style={{
              padding: "12px 24px",
              fontSize: 12,
              fontWeight: 950,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              border: 0,
              borderRight: "1px solid #212121",
              background: active === tab.id ? "#212121" : "transparent",
              color: active === tab.id ? "#ffffff" : "#70736B",
              cursor: "pointer",
            }}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {active === "profile" && <ProfileEntryPreviewPage />}
      {active === "logo" && <LogoPreviewPage />}
      {active === "mood" && <AtFeelogWebResponsivePreview />}
    </div>
  );
}

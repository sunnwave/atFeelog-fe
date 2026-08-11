export type AvatarColor = {
  bg: string;
  text: "#000000" | "#ffffff";
};

export const AVATAR_COLORS: AvatarColor[] = [
  // ── 파스텔 (원래 팔레트 계승, black text) ───────────────────────────────────
  { bg: "#F8E7D0", text: "#000000" }, // warm cream
  { bg: "#FFF1B8", text: "#000000" }, // warm yellow
  { bg: "#E8EDD2", text: "#000000" }, // sage olive
  { bg: "#DCE8D5", text: "#000000" }, // mint green
  { bg: "#DDE8F2", text: "#000000" }, // powder blue
  { bg: "#D7ECE8", text: "#000000" }, // aqua mint
  { bg: "#E7E3F3", text: "#000000" }, // lavender
  { bg: "#F2DFEA", text: "#000000" }, // dusty pink

  // ── 더스티 미드톤 (black text) ───────────────────────────────────────────────
  { bg: "#D4C5A8", text: "#000000" }, // warm tan
  { bg: "#B8C8C0", text: "#000000" }, // sage gray
  { bg: "#B0C0CC", text: "#000000" }, // slate blue
  { bg: "#C0B0C8", text: "#000000" }, // periwinkle dust
  { bg: "#C8B0B8", text: "#000000" }, // dusty rose
  { bg: "#B8C8B0", text: "#000000" }, // olive mist
  { bg: "#C8C0B0", text: "#000000" }, // warm gray
  { bg: "#C0BCBA", text: "#000000" }, // greige

  // ── 딥 머티드 (white text) ──────────────────────────────────────────────────
  { bg: "#7A6848", text: "#ffffff" }, // warm brown
  { bg: "#5A6858", text: "#ffffff" }, // muted forest
  { bg: "#486878", text: "#ffffff" }, // muted slate
  { bg: "#6A5878", text: "#ffffff" }, // muted plum
  { bg: "#7A5858", text: "#ffffff" }, // dusty rose deep
  { bg: "#586858", text: "#ffffff" }, // sage deep
  { bg: "#585870", text: "#ffffff" }, // dusk blue
  { bg: "#686050", text: "#ffffff" }, // warm olive
] as const;

function hashToIndex(input: string, mod: number) {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h * 31 + input.charCodeAt(i)) >>> 0;
  }
  return h % mod;
}

export function pickAvatarColor(userKey?: string): AvatarColor {
  const key = userKey?.trim() || "guest";
  return AVATAR_COLORS[hashToIndex(key, AVATAR_COLORS.length)];
}

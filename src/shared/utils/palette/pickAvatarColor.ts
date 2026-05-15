export const AVATAR_COLORS = [
  // warm cream / peach
  { bg: "#F8E7D0", text: "#7C3F16", border: "#F1D0AA" },
  { bg: "#FDE2D4", text: "#8A321C", border: "#F6C5B3" },
  { bg: "#F8D8C8", text: "#7F2F1B", border: "#EFC0AE" },
  { bg: "#FBE6D8", text: "#7A3E22", border: "#EECAB9" },
  { bg: "#F4DED0", text: "#6F3B24", border: "#E3C2B2" },

  // yellow / beige
  { bg: "#FFF1B8", text: "#7A4B00", border: "#F3D985" },
  { bg: "#F7E8B5", text: "#6B4D13", border: "#E8D28C" },
  { bg: "#EFE4C8", text: "#665336", border: "#DACBAA" },
  { bg: "#F5EEDC", text: "#67563A", border: "#DED2B7" },
  { bg: "#EFEAE2", text: "#5F5142", border: "#DDD3C4" },

  // green / olive
  { bg: "#E8EDD2", text: "#4F5A22", border: "#D5DDB0" },
  { bg: "#DCE8D5", text: "#36583B", border: "#C6D8BE" },
  { bg: "#E1EAD8", text: "#435D35", border: "#C9D7BC" },
  { bg: "#D7E4CB", text: "#3F5A2E", border: "#BED1B1" },
  { bg: "#E6E8D1", text: "#575A2A", border: "#D1D4A9" },

  // blue / mint
  { bg: "#DDE8F2", text: "#2F4B66", border: "#C6D7E7" },
  { bg: "#D8E6EA", text: "#2F5962", border: "#BED6DD" },
  { bg: "#D7ECE8", text: "#2D5F57", border: "#BCE0D9" },
  { bg: "#E0EEF0", text: "#3A5960", border: "#C8DDE1" },
  { bg: "#DCE7F5", text: "#354E73", border: "#C3D3EA" },

  // lavender / pink
  { bg: "#E7E3F3", text: "#51437A", border: "#D3CCE8" },
  { bg: "#EDE1F0", text: "#684275", border: "#DCC5E4" },
  { bg: "#F2DFEA", text: "#743B5C", border: "#E6C5D7" },
  { bg: "#F3E2E7", text: "#71404E", border: "#DFC6CE" },
  { bg: "#E9E0F2", text: "#5C4874", border: "#D6C8E5" },

  // neutral / muted
  { bg: "#E9E6DF", text: "#4B443B", border: "#D8D1C5" },
  { bg: "#E5E1D8", text: "#50483D", border: "#D2CABD" },
  { bg: "#E3E1DA", text: "#4F4A42", border: "#D0CCC2" },
  { bg: "#E8E4DC", text: "#5B5146", border: "#D7D0C5" },
  { bg: "#E6E2DA", text: "#4C463E", border: "#D4CDC2" },
] as const;

function hashToIndex(input: string, mod: number) {
  let h = 0;

  for (let i = 0; i < input.length; i++) {
    h = (h * 31 + input.charCodeAt(i)) >>> 0;
  }

  return h % mod;
}

export function pickAvatarColor(userKey?: string) {
  const key = userKey?.trim() || "anonymous";
  return AVATAR_COLORS[hashToIndex(key, AVATAR_COLORS.length)];
}

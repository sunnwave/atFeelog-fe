const TITLE_SEPARATOR = " - ";

export function toBoardTitle(showName: string, artistName?: string) {
  const trimmedShowName = showName.trim();
  const trimmedArtistName = artistName?.trim();

  return trimmedArtistName
    ? `${trimmedShowName}${TITLE_SEPARATOR}${trimmedArtistName}`
    : trimmedShowName;
}

export function parseBoardTitle(title: string): {
  showName: string;
  artistName?: string;
} {
  const index = title.indexOf(TITLE_SEPARATOR);

  if (index === -1) {
    return {
      showName: title.trim(),
      artistName: undefined,
    };
  }

  const showName = title.slice(0, index).trim();
  const artistName = title.slice(index + TITLE_SEPARATOR.length).trim();

  return {
    showName,
    artistName: artistName || undefined,
  };
}

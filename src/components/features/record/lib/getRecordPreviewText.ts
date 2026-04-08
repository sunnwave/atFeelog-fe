import { stripHtml } from "@/shared/utils/stripHtml";
import { stripMetaFromContents } from "./metaBlock";

export function getRecordPreviewText(
  contents: string,
  maxLength = 120
): string {
  const withoutMeta = stripMetaFromContents(contents);
  const plainText = stripHtml(withoutMeta);

  if (plainText.length <= maxLength) return plainText;
  return `${plainText.slice(0, maxLength)}...`;
}

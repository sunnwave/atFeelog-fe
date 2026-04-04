import type { RecordMeta } from "../model/types";

const META_START = "<!--META";
const META_END = "-->";

export function buildRecordMetaBlock(meta: RecordMeta): string {
  const lines = [
    `${META_START}`,
    `showDate: ${meta.showDate}`,
    meta.x ? `x: ${meta.x}` : null,
    meta.y ? `y: ${meta.y}` : null,
    `${META_END}`,
  ].filter(Boolean);

  return lines.join("\n");
}

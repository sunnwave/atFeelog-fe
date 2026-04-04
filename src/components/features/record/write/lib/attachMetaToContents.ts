import type { RecordMeta, RecordWriteFormValues } from "../model/types";
import { buildRecordMetaBlock } from "./buildRecordMetaBlock";

const META_START = "<!--META";
const META_END = "-->";

export function attachMetaToContents(values: RecordWriteFormValues): string {
  const meta: RecordMeta = {
    showDate: values.showDate,
    x: values.x,
    y: values.y,
  };

  const block = buildRecordMetaBlock(meta);
  const body = values.contents.trim();

  return `${block}\n\n${body}`;
}

export function parseRecordMetaBlock(contents: string): RecordMeta | null {
  const start = contents.indexOf(META_START);
  const end = contents.indexOf(META_END);
  if (start === -1 || end === -1 || end < start) return null;

  const raw = contents.slice(start + META_START.length, end).trim();
  const lines = raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const meta: RecordMeta = { showDate: "" };

  for (const line of lines) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;

    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();

    if (key === "showDate") meta.showDate = value;
    if (key === "x") meta.x = value;
    if (key === "y") meta.y = value;
  }

  return meta.showDate ? meta : null;
}

export function stripMetaFromContents(contents: string): string {
  const start = contents.indexOf(META_START);
  const end = contents.indexOf(META_END);
  if (start === -1 || end === -1 || end < start) return contents;

  const after = contents.slice(end + META_END.length);
  return after.replace(/^\s*\n?/, "").trimStart();
}

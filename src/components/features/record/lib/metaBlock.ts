// src/components/features/record/editor/lib/metaBlock.ts
import type { RecordMeta, RecordWriteFormValues } from "../model/types";

const META_START = "<!--META";
const META_END = "-->";

/** meta 객체 -> META 블록 문자열 */
export function buildRecordMetaBlock(meta: RecordMeta): string {
  const lines: string[] = [];

  if (meta.showDate) lines.push(`showDate: ${meta.showDate}`);
  if (meta.x) lines.push(`x: ${meta.x}`);
  if (meta.y) lines.push(`y: ${meta.y}`);

  return `${META_START}\n${lines.join("\n")}\n${META_END}`;
}

/** contents 앞에 META 블록을 붙인다 (작성 시) */
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

/** 저장된 contents에서 META 블록을 파싱한다 (조회 시) */
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

/** contents에서 META 블록을 제거하고 본문만 반환 (조회/수정 화면 표시용) */
export function stripMetaFromContents(contents: string): string {
  const start = contents.indexOf(META_START);
  const end = contents.indexOf(META_END);
  if (start === -1 || end === -1 || end < start) return contents;

  const after = contents.slice(end + META_END.length);
  return after.replace(/^\s*\n?/, "").trimStart();
}

// src/components/features/record/editor/lib/metaBlock.ts
import type { RecordMeta, RecordEditFormValues } from "../model/types";

const META_START = "<!--META";
const META_END = "-->";

/** meta 객체 -> META 블록 문자열 */
export function buildRecordMetaBlock(meta: RecordMeta): string {
  const lines: string[] = [];

  // ✅ 저장 정책: 필요한 것만 저장 (원하는 값만 남겨)
  if (meta.showName) lines.push(`showName: ${meta.showName}`);
  if (meta.artistName) lines.push(`artistName: ${meta.artistName}`);
  if (meta.showDate) lines.push(`showDate: ${meta.showDate}`);
  if (meta.x) lines.push(`x: ${meta.x}`);
  if (meta.y) lines.push(`y: ${meta.y}`);

  // ✅ 메타가 비어있으면 블록 자체를 만들지 않음
  if (lines.length === 0) return "";

  return `${META_START}\n${lines.join("\n")}\n${META_END}`;
}

/** contents 앞에 META 블록을 붙인다 (작성 시) */
export function attachMetaToContents(values: RecordEditFormValues): string {
  const meta: RecordMeta = {
    showName: values.showName,
    artistName: values.artistName,
    showDate: values.showDate,
    x: values.x,
    y: values.y,
  };

  const block = buildRecordMetaBlock(meta);
  const body = (values.contents ?? "").trim();

  // ✅ 메타가 없으면 본문만 반환
  if (!block) return body;

  return `${block}\n\n${body}`;
}

/** 저장된 contents에서 META 블록을 파싱한다 (조회 시) */
export function parseRecordMetaBlock(contents: string): RecordMeta | null {
  const text = contents ?? "";

  const start = text.indexOf(META_START);
  const end = text.indexOf(META_END);
  if (start === -1 || end === -1 || end < start) return null;

  const raw = text.slice(start + META_START.length, end).trim();
  const lines = raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const meta: RecordMeta = { showDate: "", showName: "" }; // showDate는 기본값으로 빈 문자열 설정

  for (const line of lines) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;

    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    if (!value) continue;

    if (key === "showName") meta.showName = value;
    if (key === "artistName") meta.artistName = value;
    if (key === "showDate") meta.showDate = value;
    if (key === "x") meta.x = value;
    if (key === "y") meta.y = value;
  }

  // ✅ 하나라도 파싱되면 meta 반환 (showDate 없다고 null 처리하지 않음)
  const hasAny = Object.values(meta).some((v) => v !== undefined && v !== "");
  return hasAny ? meta : null;
}

/** contents에서 META 블록을 제거하고 본문만 반환 (조회/수정 화면 표시용) */
export function stripMetaFromContents(contents: string): string {
  const text = contents ?? "";

  const start = text.indexOf(META_START);
  const end = text.indexOf(META_END);
  if (start === -1 || end === -1 || end < start) return text;

  const after = text.slice(end + META_END.length);
  return after.replace(/^\s*\n?/, "").trimStart();
}

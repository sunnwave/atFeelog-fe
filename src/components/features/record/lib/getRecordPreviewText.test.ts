import { describe, it, expect } from "vitest";
import { getRecordPreviewText } from "./getRecordPreviewText";

const withMeta = (body: string) =>
  `<!--META\nshowDate: 2024-01-01\n-->\n\n${body}`;

describe("getRecordPreviewText", () => {
  it("120자 이하면 말줄임 없이 반환", () => {
    const contents = withMeta("<p>짧은 후기</p>");
    expect(getRecordPreviewText(contents)).toBe("짧은 후기");
  });

  it("120자 초과 시 120자에서 ... 로 자름", () => {
    const longText = "가".repeat(130);
    const contents = withMeta(`<p>${longText}</p>`);
    const result = getRecordPreviewText(contents);
    expect(result).toHaveLength(123); // 120 + '...'
    expect(result.endsWith("...")).toBe(true);
  });

  it("정확히 120자이면 말줄임 없이 반환", () => {
    const text = "나".repeat(120);
    const contents = withMeta(`<p>${text}</p>`);
    const result = getRecordPreviewText(contents);
    expect(result).toBe(text);
    expect(result.endsWith("...")).toBe(false);
  });

  it("maxLength를 직접 지정하면 해당 길이로 자름", () => {
    const text = "다".repeat(50);
    const contents = withMeta(`<p>${text}</p>`);
    const result = getRecordPreviewText(contents, 20);
    expect(result).toHaveLength(23); // 20 + '...'
    expect(result.endsWith("...")).toBe(true);
  });

  it("META 블록을 제거하고 HTML 태그도 벗긴 텍스트 기준으로 판단", () => {
    const contents = withMeta("<p><strong>공연 후기</strong></p>");
    expect(getRecordPreviewText(contents)).toBe("공연 후기");
  });

  it("META 블록이 없어도 HTML 태그 제거 후 반환", () => {
    const contents = "<p>일반 본문</p>";
    expect(getRecordPreviewText(contents)).toBe("일반 본문");
  });

  it("빈 문자열이면 빈 문자열 반환", () => {
    expect(getRecordPreviewText("")).toBe("");
  });

  it("태그만 있는 contents는 빈 문자열 반환", () => {
    const contents = withMeta("<p></p><br/>");
    expect(getRecordPreviewText(contents)).toBe("");
  });

  it("&nbsp; 가 공백으로 치환된 후 길이 계산에 포함됨", () => {
    const text = "a&nbsp;b";
    const contents = withMeta(text);
    const result = getRecordPreviewText(contents);
    expect(result).toBe("a b");
  });
});

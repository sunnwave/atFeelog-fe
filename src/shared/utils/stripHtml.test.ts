import { describe, it, expect } from "vitest";
import { stripHtml } from "./stripHtml";

describe("stripHtml", () => {
  it("빈 문자열이면 빈 문자열 반환", () => {
    expect(stripHtml("")).toBe("");
  });

  it("null/undefined-like falsy 값이면 빈 문자열 반환", () => {
    expect(stripHtml(null as unknown as string)).toBe("");
    expect(stripHtml(undefined as unknown as string)).toBe("");
  });

  it("태그 없는 일반 텍스트는 그대로 반환", () => {
    expect(stripHtml("hello world")).toBe("hello world");
  });

  it("단순 태그를 공백으로 치환", () => {
    expect(stripHtml("<p>hello</p>")).toBe("hello");
  });

  it("중첩 태그를 모두 제거", () => {
    expect(stripHtml("<div><span>text</span></div>")).toBe("text");
  });

  it("여러 태그 사이 텍스트를 하나의 공백으로 정규화", () => {
    expect(stripHtml("<p>foo</p><p>bar</p>")).toBe("foo bar");
  });

  it("&nbsp; 를 공백으로 치환", () => {
    expect(stripHtml("hello&nbsp;world")).toBe("hello world");
  });

  it("연속 공백/개행을 단일 공백으로 정규화", () => {
    expect(stripHtml("a   \n  b")).toBe("a b");
  });

  it("앞뒤 공백 trim", () => {
    expect(stripHtml("  <b>hi</b>  ")).toBe("hi");
  });

  it("속성이 있는 태그도 제거", () => {
    expect(stripHtml('<a href="https://example.com">link</a>')).toBe("link");
  });

  it("self-closing 태그 제거", () => {
    expect(stripHtml("line1<br/>line2")).toBe("line1 line2");
  });

  it("태그만 있고 텍스트 없으면 빈 문자열 반환", () => {
    expect(stripHtml("<br/><hr/>")).toBe("");
  });

  it("angle bracket 안에 newline이 있는 비정상 태그 처리 — 태그로 인식하지 않음", () => {
    const input = "<div\nclass='a'>text</div>";
    const result = stripHtml(input);
    expect(result).not.toContain("<");
  });
});

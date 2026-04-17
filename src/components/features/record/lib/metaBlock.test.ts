import { describe, it, expect } from "vitest";
import {
  buildRecordMetaBlock,
  attachMetaToContents,
  parseRecordMetaBlock,
  stripMetaFromContents,
} from "./metaBlock";
import type { RecordMeta, RecordEditFormValues } from "../model/types";

const BASE_VALUES: RecordEditFormValues = {
  showName: "레베카",
  showDate: "2024-01-01",
  contents: "<p>후기 내용</p>",
  placeName: "",
  roadAddress: "",
  jibunAddress: "",
  images: [],
  imageFiles: [],
};

describe("buildRecordMetaBlock", () => {
  it("showDate만 있을 때 해당 필드만 포함", () => {
    const meta: RecordMeta = { showDate: "2024-01-01" };
    const block = buildRecordMetaBlock(meta);
    expect(block).toContain("showDate: 2024-01-01");
    expect(block).not.toContain("x:");
    expect(block).not.toContain("y:");
  });

  it("x, y가 모두 있으면 모두 포함", () => {
    const meta: RecordMeta = { showDate: "2024-01-01", x: "127.1", y: "37.5" };
    const block = buildRecordMetaBlock(meta);
    expect(block).toContain("x: 127.1");
    expect(block).toContain("y: 37.5");
  });

  it("<!--META 와 --> 로 감싸져 있어야 함", () => {
    const meta: RecordMeta = { showDate: "2024-01-01" };
    const block = buildRecordMetaBlock(meta);
    expect(block.startsWith("<!--META")).toBe(true);
    expect(block.endsWith("-->")).toBe(true);
  });

  it("x만 있고 y가 없으면 x만 포함", () => {
    const meta: RecordMeta = { showDate: "2024-01-01", x: "127.1" };
    const block = buildRecordMetaBlock(meta);
    expect(block).toContain("x: 127.1");
    expect(block).not.toContain("y:");
  });
});

describe("attachMetaToContents", () => {
  it("META 블록이 contents 앞에 붙어야 함", () => {
    const result = attachMetaToContents(BASE_VALUES);
    expect(result.startsWith("<!--META")).toBe(true);
    expect(result).toContain("후기 내용");
  });

  it("META 블록과 본문 사이에 빈 줄이 하나 있어야 함", () => {
    const result = attachMetaToContents(BASE_VALUES);
    expect(result).toMatch(/-->\n\n/);
  });

  it("contents에 앞뒤 공백이 있어도 trim된 본문이 들어감", () => {
    const values = { ...BASE_VALUES, contents: "  본문  " };
    const result = attachMetaToContents(values);
    expect(result).toContain("\n\n본문");
    expect(result).not.toContain("\n\n  본문");
  });
});

describe("parseRecordMetaBlock", () => {
  it("정상 블록에서 showDate 파싱", () => {
    const contents = "<!--META\nshowDate: 2024-01-01\n-->\n\n본문";
    expect(parseRecordMetaBlock(contents)).toEqual({ showDate: "2024-01-01" });
  });

  it("x, y 포함된 블록 파싱", () => {
    const contents = "<!--META\nshowDate: 2024-01-01\nx: 127.1\ny: 37.5\n-->\n\n본문";
    expect(parseRecordMetaBlock(contents)).toEqual({
      showDate: "2024-01-01",
      x: "127.1",
      y: "37.5",
    });
  });

  it("META 블록이 없으면 null 반환", () => {
    expect(parseRecordMetaBlock("그냥 본문")).toBeNull();
  });

  it("META_START만 있고 META_END 없으면 null 반환", () => {
    expect(parseRecordMetaBlock("<!--META\nshowDate: 2024-01-01")).toBeNull();
  });

  it("showDate가 없는 블록이면 null 반환", () => {
    const contents = "<!--META\nx: 127.1\n-->\n\n본문";
    expect(parseRecordMetaBlock(contents)).toBeNull();
  });

  it("빈 블록(showDate 없음)이면 null 반환", () => {
    const contents = "<!--META\n\n-->\n\n본문";
    expect(parseRecordMetaBlock(contents)).toBeNull();
  });

  it("end가 start보다 앞에 있으면 null 반환", () => {
    const contents = "-->\n<!--META\nshowDate: 2024-01-01";
    expect(parseRecordMetaBlock(contents)).toBeNull();
  });

  it("값에 콜론이 포함돼도 첫 번째 콜론 기준으로 파싱", () => {
    const contents = "<!--META\nshowDate: 2024-01-01T10:30:00\n-->";
    const meta = parseRecordMetaBlock(contents);
    expect(meta?.showDate).toBe("2024-01-01T10:30:00");
  });
});

describe("stripMetaFromContents", () => {
  it("META 블록이 제거되고 본문만 반환", () => {
    const contents = "<!--META\nshowDate: 2024-01-01\n-->\n\n<p>본문</p>";
    expect(stripMetaFromContents(contents)).toBe("<p>본문</p>");
  });

  it("META 블록이 없으면 원본 그대로 반환", () => {
    expect(stripMetaFromContents("<p>본문</p>")).toBe("<p>본문</p>");
  });

  it("META 블록 뒤 앞쪽 개행/공백이 제거됨", () => {
    const contents = "<!--META\nshowDate: 2024-01-01\n-->\n\n\n   본문";
    const result = stripMetaFromContents(contents);
    expect(result).toBe("본문");
    expect(result.startsWith(" ")).toBe(false);
  });

  it("META 블록만 있고 본문이 없으면 빈 문자열 반환", () => {
    const contents = "<!--META\nshowDate: 2024-01-01\n-->";
    expect(stripMetaFromContents(contents)).toBe("");
  });

  it("end가 start보다 앞에 있으면 원본 반환", () => {
    const contents = "-->\n<!--META\n본문";
    expect(stripMetaFromContents(contents)).toBe(contents);
  });

  it("attachMetaToContents → stripMetaFromContents 왕복 일관성", () => {
    const result = attachMetaToContents(BASE_VALUES);
    const stripped = stripMetaFromContents(result);
    expect(stripped).toBe(BASE_VALUES.contents.trim());
  });
});

import { describe, it, expect } from "vitest";
import { toBoardTitle, parseBoardTitle } from "./recordTitle";

describe("toBoardTitle", () => {
  it("showName만 있을 때 showName 반환", () => {
    expect(toBoardTitle("뮤지컬 레베카")).toBe("뮤지컬 레베카");
  });

  it("artistName이 있으면 ' - ' 구분자로 결합", () => {
    expect(toBoardTitle("뮤지컬 레베카", "아이유")).toBe("뮤지컬 레베카 - 아이유");
  });

  it("artistName이 빈 문자열이면 showName만 반환", () => {
    expect(toBoardTitle("뮤지컬 레베카", "")).toBe("뮤지컬 레베카");
  });

  it("artistName이 공백만이면 showName만 반환", () => {
    expect(toBoardTitle("뮤지컬 레베카", "   ")).toBe("뮤지컬 레베카");
  });

  it("showName 앞뒤 공백을 trim", () => {
    expect(toBoardTitle("  레베카  ")).toBe("레베카");
  });

  it("artistName 앞뒤 공백을 trim", () => {
    expect(toBoardTitle("레베카", "  아이유  ")).toBe("레베카 - 아이유");
  });

  it("artistName이 undefined이면 showName만 반환", () => {
    expect(toBoardTitle("레베카", undefined)).toBe("레베카");
  });
});

describe("parseBoardTitle", () => {
  it("구분자 없으면 showName 반환, artistName undefined", () => {
    expect(parseBoardTitle("뮤지컬 레베카")).toEqual({
      showName: "뮤지컬 레베카",
      artistName: undefined,
    });
  });

  it("구분자 있으면 showName과 artistName을 분리", () => {
    expect(parseBoardTitle("뮤지컬 레베카 - 아이유")).toEqual({
      showName: "뮤지컬 레베카",
      artistName: "아이유",
    });
  });

  it("앞뒤 공백을 trim", () => {
    expect(parseBoardTitle("  레베카 - 아이유  ")).toEqual({
      showName: "레베카",
      artistName: "아이유",
    });
  });

  it("구분자 뒤가 빈 문자열이면 artistName undefined", () => {
    expect(parseBoardTitle("레베카 - ")).toEqual({
      showName: "레베카",
      artistName: undefined,
    });
  });

  it("구분자가 여러 개면 첫 번째 구분자 기준으로만 분리", () => {
    expect(parseBoardTitle("레베카 - 아이유 - 앵콜")).toEqual({
      showName: "레베카",
      artistName: "아이유 - 앵콜",
    });
  });

  it("toBoardTitle → parseBoardTitle 왕복 일관성", () => {
    const title = toBoardTitle("레베카", "아이유");
    expect(parseBoardTitle(title)).toEqual({
      showName: "레베카",
      artistName: "아이유",
    });
  });

  it("showName만으로 만든 title을 파싱하면 artistName undefined", () => {
    const title = toBoardTitle("레베카");
    expect(parseBoardTitle(title)).toEqual({
      showName: "레베카",
      artistName: undefined,
    });
  });
});

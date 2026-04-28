import { describe, it, expect } from "vitest";
import { transformSetCookies } from "./transformSetCookies";

describe("transformSetCookies", () => {
  it("Domain이 있으면 제거됨", () => {
    const result = transformSetCookies(
      ["refresh_token=abc; Domain=api.backend.com; HttpOnly"],
      "http:"
    );
    expect(result[0]).not.toMatch(/domain=/i);
  });

  it("SameSite=Strict → SameSite=Lax로 변경됨", () => {
    const result = transformSetCookies(
      ["refresh_token=abc; SameSite=Strict; HttpOnly"],
      "http:"
    );
    expect(result[0]).not.toMatch(/SameSite=Strict/i);
    expect(result[0]).toMatch(/SameSite=Lax/);
  });

  it("SameSite=None → SameSite=Lax로 변경됨", () => {
    const result = transformSetCookies(
      ["refresh_token=abc; SameSite=None; Secure"],
      "http:"
    );
    expect(result[0]).not.toMatch(/SameSite=None/i);
    expect(result[0]).toMatch(/SameSite=Lax/);
  });

  it("Path=/ 없으면 추가됨", () => {
    const result = transformSetCookies(
      ["refresh_token=abc; HttpOnly"],
      "http:"
    );
    expect(result[0]).toMatch(/Path=\//i);
  });

  it("Path=/ 이미 있으면 중복 추가되지 않음", () => {
    const result = transformSetCookies(
      ["refresh_token=abc; Path=/; HttpOnly"],
      "http:"
    );
    const matches = result[0].match(/Path=/gi) ?? [];
    expect(matches).toHaveLength(1);
  });

  it("https면 Secure가 추가됨", () => {
    const result = transformSetCookies(
      ["refresh_token=abc; HttpOnly"],
      "https:"
    );
    expect(result[0]).toMatch(/;\s*Secure/i);
  });

  it("http면 Secure가 추가되지 않음", () => {
    const result = transformSetCookies(
      ["refresh_token=abc; HttpOnly"],
      "http:"
    );
    expect(result[0]).not.toMatch(/;\s*Secure/i);
  });

  it("중복 세미콜론이 정리됨", () => {
    const result = transformSetCookies(["refresh_token=abc;; HttpOnly"], "http:");
    expect(result[0]).not.toMatch(/;;/);
  });

  it("여러 쿠키를 한 번에 처리함", () => {
    const result = transformSetCookies(
      [
        "access_token=tok1; Domain=api.example.com; SameSite=Strict",
        "refresh_token=tok2; Domain=api.example.com; SameSite=None",
      ],
      "https:"
    );

    expect(result).toHaveLength(2);
    expect(result[0]).not.toMatch(/domain=/i);
    expect(result[0]).toMatch(/SameSite=Lax/);
    expect(result[1]).not.toMatch(/domain=/i);
    expect(result[1]).toMatch(/SameSite=Lax/);
  });
});

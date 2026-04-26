import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useDraftStorage } from "./useDraftStorage";

const KEY = "test-draft";

type TestForm = { title: string; body: string };

function makeLocalStorageMock() {
  const store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      Object.keys(store).forEach((k) => delete store[k]);
    }),
  };
}

describe("useDraftStorage", () => {
  beforeEach(() => {
    vi.stubGlobal("localStorage", makeLocalStorageMock());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("saveDraft 호출 시 localStorage에 저장됨", () => {
    const { result } = renderHook(() => useDraftStorage<TestForm>(KEY));
    const draft = { title: "제목", body: "내용" };

    result.current.saveDraft(draft);

    expect(localStorage.setItem).toHaveBeenCalledWith(KEY, JSON.stringify(draft));
  });

  it("loadDraft 호출 시 저장된 값을 불러옴", () => {
    const draft = { title: "제목", body: "내용" };
    localStorage.setItem(KEY, JSON.stringify(draft));

    const { result } = renderHook(() => useDraftStorage<TestForm>(KEY));
    const loaded = result.current.loadDraft();

    expect(loaded).toEqual(draft);
  });

  it("clearDraft 호출 시 localStorage에서 삭제됨", () => {
    const { result } = renderHook(() => useDraftStorage<TestForm>(KEY));
    result.current.saveDraft({ title: "제목", body: "내용" });

    result.current.clearDraft();

    expect(localStorage.removeItem).toHaveBeenCalledWith(KEY);
  });

  it("저장된 값이 없으면 null 반환", () => {
    const { result } = renderHook(() => useDraftStorage<TestForm>(KEY));

    expect(result.current.loadDraft()).toBeNull();
  });
});

import { renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { RECORD_WRITE_DEFAULTS } from "@/components/features/record/model/types";
import { DRAFT_KEY } from "@/shared/constants/draftKeys";
import { draftStorage } from "@/shared/storage/draftStorage";
import { useRecordDraftStorage } from "./useRecordDraftStorage";

vi.mock("@/shared/storage/draftStorage", () => ({
  draftStorage: { save: vi.fn(), saveIfAbsent: vi.fn(), load: vi.fn(), remove: vi.fn() },
}));

const values = { ...RECORD_WRITE_DEFAULTS, title: "초안" };
let stored: Map<string, unknown>;

beforeEach(() => {
  vi.resetAllMocks();
  localStorage.clear();
  stored = new Map();
  // 저장소 자체의 동작은 별도 모듈 테스트에서 검증
  vi.mocked(draftStorage.save).mockImplementation(async (key, value) => { stored.set(key, value); });
  vi.mocked(draftStorage.load).mockImplementation(async (key) => stored.get(key));
  vi.mocked(draftStorage.remove).mockImplementation(async (key) => { stored.delete(key); });
  vi.mocked(draftStorage.saveIfAbsent).mockImplementation(async (key, value) => {
    if (stored.has(key)) return false;
    stored.set(key, value);
    return true;
  });
});

afterEach(() => { vi.restoreAllMocks(); });

describe("useRecordDraftStorage", () => {
  it("버전·저장 시각·사진 파일을 포함한 초안을 저장하고 복구한다", async () => {
    vi.spyOn(Date, "now").mockReturnValue(1000);
    const file = new File(["photo"], "photo.png", { type: "image/png" });
    const formValues = { ...values, imageFiles: [file] };
    const { result } = renderHook(() => useRecordDraftStorage(DRAFT_KEY.record.write("a")));

    expect(await result.current.saveDraft(formValues)).toBe(true);
    expect(await result.current.loadDraft()).toEqual({ version: 1, savedAt: 1000, values: formValues });
  });

  it("작성 초안을 사용자별로 분리하고 삭제도 현재 사용자에만 적용한다", async () => {
    const { result, rerender } = renderHook(({ user }) => useRecordDraftStorage(DRAFT_KEY.record.write(user)), { initialProps: { user: "a" } });
    await result.current.saveDraft(values);
    rerender({ user: "b" });
    expect(await result.current.loadDraft()).toBeNull();
    await result.current.saveDraft({ ...values, title: "B" });
    await result.current.clearDraft();
    expect(await result.current.loadDraft()).toBeNull();
    rerender({ user: "a" });
    expect((await result.current.loadDraft())?.values.title).toBe("초안");
  });

  it("수정 초안을 사용자·기록별로 분리한다", async () => {
    const { result, rerender } = renderHook(({ user, record }) => useRecordDraftStorage(DRAFT_KEY.record.update(user, record)), { initialProps: { user: "a", record: "1" } });
    await result.current.saveDraft(values);
    rerender({ user: "a", record: "2" });
    expect(await result.current.loadDraft()).toBeNull();
    rerender({ user: "b", record: "1" });
    expect(await result.current.loadDraft()).toBeNull();
    rerender({ user: "a", record: "1" });
    expect((await result.current.loadDraft())?.values).toEqual(values);
  });

  it("key가 준비되지 않으면 저장소에 접근하지 않고 준비된 후 접근한다", async () => {
    const { result, rerender } = renderHook(({ key }: { key: string | null }) => useRecordDraftStorage(key), { initialProps: { key: null as string | null } });
    expect(await result.current.saveDraft(values)).toBe(false);
    expect(await result.current.loadDraft()).toBeNull();
    await result.current.clearDraft();
    expect(draftStorage.save).not.toHaveBeenCalled();
    expect(draftStorage.load).not.toHaveBeenCalled();
    expect(draftStorage.remove).not.toHaveBeenCalled();
    rerender({ key: DRAFT_KEY.record.write("a") });
    expect(await result.current.saveDraft(values)).toBe(true);
  });

  it.each([
    undefined,
    { version: 2, savedAt: 1000, values },
    { version: 1, savedAt: NaN, values },
    { version: 1, savedAt: 1000, values: { ...values, title: 123 } },
    { version: 1, savedAt: 1000, values: { ...values, images: [123] } },
    { version: 1, savedAt: 1000, values: { ...values, imageFiles: [{}] } },
  ])("누락·손상·미지원 형식은 복구하지 않는다 (%#)", async (draft) => {
    const key = DRAFT_KEY.record.write("a");
    stored.set(key, draft);
    const { result } = renderHook(() => useRecordDraftStorage(key));
    expect(await result.current.loadDraft()).toBeNull();
    expect(draftStorage.remove).not.toHaveBeenCalled();
  });

  it("저장·조회·삭제 오류를 호출부에 전달한다", async () => {
    const error = new Error("저장소 오류");
    vi.mocked(draftStorage.save).mockRejectedValue(error);
    vi.mocked(draftStorage.load).mockRejectedValue(error);
    vi.mocked(draftStorage.remove).mockRejectedValue(error);
    const { result } = renderHook(() => useRecordDraftStorage(DRAFT_KEY.record.write("a")));
    await expect(result.current.saveDraft(values)).rejects.toBe(error);
    await expect(result.current.loadDraft()).rejects.toBe(error);
    await expect(result.current.clearDraft()).rejects.toBe(error);
  });

  it.each([DRAFT_KEY.record.write("a"), DRAFT_KEY.record.update("a", "1")])(
    "사용자별 이전 초안은 저장 완료 후 원본을 삭제한다 (%s)",
    async (key) => {
      const formValues = { ...values, images: ["old.jpg"] };
      const raw = JSON.stringify({ ...formValues, imageFiles: [{}] });
      localStorage.setItem(key, raw);
      const saveIfAbsent = vi.mocked(draftStorage.saveIfAbsent).getMockImplementation()!;
      vi.mocked(draftStorage.saveIfAbsent).mockImplementationOnce((key, value) => {
        expect(localStorage.getItem(key)).toBe(raw);
        return saveIfAbsent(key, value);
      });
      const { result } = renderHook(() => useRecordDraftStorage(key));

      const migrated = await result.current.loadDraft();
      expect(migrated?.values).toEqual(formValues);
      expect(stored.get(key)).toEqual(migrated);
      expect(localStorage.getItem(key)).toBeNull();
    },
  );

  it("다른 사용자와 작성자를 확인할 수 없는 공용 초안을 이전하지 않는다", async () => {
    const legacyKeys = [DRAFT_KEY.record.write("b"), "record:draft:write", "record:draft:update:1"];
    const raw = JSON.stringify(values);
    legacyKeys.forEach((key) => localStorage.setItem(key, raw));
    const { result } = renderHook(() => useRecordDraftStorage(DRAFT_KEY.record.write("a")));

    expect(await result.current.loadDraft()).toBeNull();
    expect(draftStorage.saveIfAbsent).not.toHaveBeenCalled();
    legacyKeys.forEach((key) => expect(localStorage.getItem(key)).toBe(raw));
  });

  it.each(["{", JSON.stringify({ ...values, title: 1 })])(
    "손상된 이전 초안은 건너뛰고 원본을 남긴다 (%#)",
    async (raw) => {
      const key = DRAFT_KEY.record.write("a");
      localStorage.setItem(key, raw);
      const { result } = renderHook(() => useRecordDraftStorage(key));

      expect(await result.current.loadDraft()).toBeNull();
      expect(draftStorage.saveIfAbsent).not.toHaveBeenCalled();
      expect(localStorage.getItem(key)).toBe(raw);
    },
  );

  it("IndexedDB 이전에 실패하면 localStorage 원본을 보존한다", async () => {
    const key = DRAFT_KEY.record.write("a");
    const raw = JSON.stringify(values);
    localStorage.setItem(key, raw);
    vi.mocked(draftStorage.saveIfAbsent).mockRejectedValueOnce(new Error("이전 실패"));
    const { result } = renderHook(() => useRecordDraftStorage(key));

    await expect(result.current.loadDraft()).rejects.toThrow("이전 실패");
    expect(localStorage.getItem(key)).toBe(raw);
  });

  it("IndexedDB 초안을 우선하며 삭제 후 구형 초안이 다시 나타나지 않는다", async () => {
    const key = DRAFT_KEY.record.write("a");
    const raw = JSON.stringify(values);
    const newer = { version: 1, savedAt: 1000, values: { ...values, title: "새 초안" } };
    localStorage.setItem(key, raw);
    stored.set(key, newer);
    const { result } = renderHook(() => useRecordDraftStorage(key));

    expect(await result.current.loadDraft()).toEqual(newer);
    expect(draftStorage.saveIfAbsent).not.toHaveBeenCalled();
    expect(localStorage.getItem(key)).toBe(raw);
    await result.current.clearDraft();
    expect(await result.current.loadDraft()).toBeNull();
  });
});

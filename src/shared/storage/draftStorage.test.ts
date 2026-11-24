// @vitest-environment node

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { IDBFactory, IDBObjectStore } from "fake-indexeddb";
import { draftStorage } from "./draftStorage";

beforeEach(() => {
  // 테스트별 독립 DB 사용 및 전역 환경 격리
  vi.stubGlobal("indexedDB", new IDBFactory());
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("draftStorage", () => {
  it("저장된 초안이 없으면 undefined를 반환한다", async () => {
    expect(await draftStorage.load("missing")).toBeUndefined();
  });

  it("텍스트와 사진 바이너리를 함께 저장하고 복구한다", async () => {
    // Blob 내용·타입 검증, 실제 File 복구는 브라우저 검증 필요
    const photo = new Blob([new Uint8Array([137, 80, 78, 71])], {
      type: "image/png",
    });
    const draft = {
      title: "공연 후기",
      contents: "좋았던 공연",
      photos: [photo],
    };

    await draftStorage.save("draft-a", draft);
    const restored = (await draftStorage.load("draft-a")) as typeof draft;

    expect(restored.title).toBe(draft.title);
    expect(restored.contents).toBe(draft.contents);
    expect(restored.photos).toHaveLength(1);
    expect(restored.photos[0].type).toBe(photo.type);
    expect(await restored.photos[0].arrayBuffer()).toEqual(
      await photo.arrayBuffer(),
    );
  });

  it("저장 후 원본 객체를 수정해도 저장된 데이터는 바뀌지 않는다", async () => {
    const draft = { title: "원래 제목", images: ["photo-a"] };
    await draftStorage.save("draft-a", draft);

    draft.title = "바뀐 제목";
    draft.images.push("photo-b");

    expect(await draftStorage.load("draft-a")).toEqual({
      title: "원래 제목",
      images: ["photo-a"],
    });
  });

  it("같은 key는 덮어쓰고 다른 key의 초안은 유지한다", async () => {
    await draftStorage.save("draft-a", { title: "A" });
    await draftStorage.save("draft-b", { title: "B" });

    await draftStorage.save("draft-a", { title: "수정된 A" });

    expect(await draftStorage.load("draft-a")).toEqual({ title: "수정된 A" });
    expect(await draftStorage.load("draft-b")).toEqual({ title: "B" });
  });

  it("해당 key만 삭제하고 없는 key를 삭제해도 실패하지 않는다", async () => {
    await draftStorage.save("draft-a", { title: "A" });
    await draftStorage.save("draft-b", { title: "B" });

    await draftStorage.remove("draft-a");
    await draftStorage.remove("missing");

    expect(await draftStorage.load("draft-a")).toBeUndefined();
    expect(await draftStorage.load("draft-b")).toEqual({ title: "B" });
  });

  it("저장 불가능한 값은 오류를 전달하고 기존 초안을 보존한다", async () => {
    await draftStorage.save("draft-a", { title: "기존 초안" });

    await expect(
      draftStorage.save("draft-a", { callback: () => {} }),
    ).rejects.toMatchObject({ name: "DataCloneError" });

    expect(await draftStorage.load("draft-a")).toEqual({ title: "기존 초안" });
  });

  it("요청 이후 트랜잭션이 중단되면 실패하고 기존 초안을 보존한다", async () => {
    await draftStorage.save("draft-a", { title: "기존 초안" });
    const originalPut = IDBObjectStore.prototype.put;
    vi.spyOn(IDBObjectStore.prototype, "put").mockImplementationOnce(function (
      this: IDBObjectStore,
      ...args
    ) {
      const request = originalPut.apply(this, args);
      // 요청 객체 반환 후 트랜잭션 완료 전 중단
      queueMicrotask(() => this.transaction.abort());
      return request;
    });

    await expect(
      draftStorage.save("draft-a", { title: "새 초안" }),
    ).rejects.toThrow();

    expect(await draftStorage.load("draft-a")).toEqual({ title: "기존 초안" });
  });

  it("IndexedDB를 사용할 수 없는 환경에서는 오류를 전달한다", async () => {
    vi.stubGlobal("indexedDB", undefined);

    await expect(draftStorage.load("draft-a")).rejects.toThrow(
      "이 환경에서는 초안 저장소를 사용할 수 없어요.",
    );
  });
});

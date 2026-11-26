import { act, renderHook } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useFetchRecord } from "../../hooks/useFetchRecord";
import { RECORD_WRITE_DEFAULTS, type RecordEditFormValues } from "../../model/types";
import { useRecordUpdateInit } from "./useRecordUpdateInit";

vi.mock("../../hooks/useFetchRecord", () => ({ useFetchRecord: vi.fn() }));

const fetchRecord = vi.mocked(useFetchRecord);

function record(id: string, title: string) {
  return {
    id,
    title,
    showName: title,
    contents: "공연 후기",
    showDate: "2026-11-24",
    likeCount: 0,
    createdAt: "",
    updatedAt: "",
  };
}

const initialProps = { recordId: "a", draftKey: "record:draft:update:user:a" };

function renderUpdate() {
  return renderHook(
    ({ recordId, draftKey }) => {
      const form = useForm<RecordEditFormValues>({ defaultValues: RECORD_WRITE_DEFAULTS });
      const { ready } = useRecordUpdateInit(recordId, form, draftKey);
      return { form, ready, title: form.getValues("title") };
    },
    { initialProps },
  );
}

beforeEach(() => {
  fetchRecord.mockReset();
});

describe("useRecordUpdateInit", () => {
  it("최초 서버 조회 완료 후에만 폼을 준비하고 이후 조회로 입력을 덮어쓰지 않는다", () => {
    fetchRecord.mockReturnValue({ record: record("a", "캐시 제목"), loading: true, error: undefined });
    const { result, rerender } = renderUpdate();
    expect(result.current.ready).toBe(false);
    expect(result.current.title).toBe(RECORD_WRITE_DEFAULTS.title);

    fetchRecord.mockReturnValue({ record: record("a", "서버 제목"), loading: false, error: undefined });
    rerender(initialProps);
    expect(result.current.ready).toBe(true);
    expect(result.current.title).toBe("서버 제목");

    act(() => result.current.form.setValue("title", "편집 중인 제목"));
    fetchRecord.mockReturnValue({ record: record("a", "다시 받은 제목"), loading: false, error: undefined });
    rerender(initialProps);
    expect(result.current.title).toBe("편집 중인 제목");
  });

  it("대상이 바뀌면 이전 기록으로 새 초안 확인을 시작하지 않는다", () => {
    fetchRecord.mockReturnValue({ record: record("a", "기록 A"), loading: false, error: undefined });
    const { result, rerender } = renderUpdate();
    const next = { recordId: "b", draftKey: "record:draft:update:user:b" };

    rerender(next);
    expect(result.current.ready).toBe(false);

    fetchRecord.mockReturnValue({ record: record("b", "기록 B"), loading: false, error: undefined });
    rerender(next);
    expect(result.current.ready).toBe(true);
    expect(result.current.title).toBe("기록 B");
  });
});

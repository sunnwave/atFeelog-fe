import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { RECORD_WRITE_DEFAULTS } from "../../model/types";
import { useRecordSubmit } from "./useRecordSubmit";

const mocks = vi.hoisted(() => ({
  uploadImages: vi.fn(),
  createRecord: vi.fn(),
  updateRecord: vi.fn(),
  push: vi.fn(),
  success: vi.fn(),
  error: vi.fn(),
}));

vi.mock("next/router", () => ({ useRouter: () => ({ push: mocks.push }) }));
vi.mock("recoil", () => ({ useRecoilValue: () => ({ id: "user" }) }));
vi.mock("@/shared/stores", () => ({ loggedInUserState: {} }));
vi.mock("@/shared/hooks/image/useUploadImages", () => ({
  useUploadImages: () => ({ uploadImages: mocks.uploadImages, isUploading: false }),
}));
vi.mock("@/components/commons/toast/ToastProvider", () => ({
  useToast: () => ({ success: mocks.success, error: mocks.error }),
}));
vi.mock("../../write/hooks/useCreateRecord", () => ({
  useCreateRecord: () => ({ onCreateRecord: mocks.createRecord, loading: false }),
}));
vi.mock("../../update/hooks/useUpdateRecord", () => ({
  useUpdateRecord: () => ({ onUpdateRecord: mocks.updateRecord, loading: false }),
}));
vi.mock("@/api/adapters/record-input.adapter", () => ({
  toUpdateBoardInput: ({ boardId }: { boardId: string }) => ({ boardId, updateBoardInput: {} }),
}));

function setup(options: Parameters<typeof useRecordSubmit>[0]) {
  const { result } = renderHook(() => useRecordSubmit(options));
  return {
    saveRecord: options.mode === "write" ? mocks.createRecord : mocks.updateRecord,
    submit: (clearDraft: () => Promise<boolean>) =>
      result.current.onSubmitValid(RECORD_WRITE_DEFAULTS, clearDraft),
  };
}

beforeEach(() => {
  vi.resetAllMocks();
  mocks.uploadImages.mockResolvedValue([]);
  mocks.createRecord.mockResolvedValue("record");
  mocks.updateRecord.mockResolvedValue("record");
});

describe.each([
  { label: "작성", options: { mode: "write" } },
  { label: "수정", options: { mode: "update", recordId: "existing-record" } },
] as const)("useRecordSubmit ($label)", ({ options }) => {
  it("서버 저장 성공 후 초안을 삭제하고, 삭제 완료 후 상세 화면으로 이동한다", async () => {
    const { submit, saveRecord } = setup(options);
    let finishSave!: (id: string) => void;
    let finishDelete!: (deleted: boolean) => void;
    saveRecord.mockReturnValue(new Promise<string>((resolve) => { finishSave = resolve; }));
    const deleting = new Promise<boolean>((resolve) => { finishDelete = resolve; });
    const clearDraft = vi.fn(() => deleting);
    const submitting = submit(clearDraft);

    await waitFor(() => expect(saveRecord).toHaveBeenCalledOnce());
    if (options.mode === "write") {
      expect(mocks.createRecord).toHaveBeenCalledWith(
        expect.objectContaining({ values: RECORD_WRITE_DEFAULTS }),
      );
      expect(mocks.updateRecord).not.toHaveBeenCalled();
    } else {
      expect(mocks.updateRecord).toHaveBeenCalledWith(
        expect.objectContaining({ boardId: options.recordId }),
      );
      expect(mocks.createRecord).not.toHaveBeenCalled();
    }
    expect(clearDraft).not.toHaveBeenCalled();
    finishSave("record");
    await waitFor(() => expect(clearDraft).toHaveBeenCalledOnce());
    expect(mocks.push).not.toHaveBeenCalled();
    finishDelete(true);
    await submitting;

    expect(mocks.push).toHaveBeenCalledWith("/feelog/record");
  });

  it("서버 저장에 실패하면 초안을 보존한다", async () => {
    const { submit, saveRecord } = setup(options);
    saveRecord.mockRejectedValue(new Error("서버 저장 실패"));
    const clearDraft = vi.fn().mockResolvedValue(true);

    await submit(clearDraft);

    expect(clearDraft).not.toHaveBeenCalled();
    expect(mocks.push).not.toHaveBeenCalled();
    expect(mocks.error).toHaveBeenCalledWith("서버 저장 실패");
  });

  it("초안 삭제에 실패해도 서버 저장 성공을 유지하고 화면을 이동한다", async () => {
    const { submit } = setup(options);
    await submit(vi.fn().mockResolvedValue(false));

    expect(mocks.success).toHaveBeenCalledOnce();
    expect(mocks.error).not.toHaveBeenCalled();
    expect(mocks.push).toHaveBeenCalledWith("/feelog/record");
  });
});

it("수정 대상 ID가 없으면 업로드나 저장을 시작하지 않는다", async () => {
  const { submit } = setup({ mode: "update", recordId: undefined });
  const clearDraft = vi.fn().mockResolvedValue(true);

  await submit(clearDraft);

  expect(mocks.uploadImages).not.toHaveBeenCalled();
  expect(mocks.createRecord).not.toHaveBeenCalled();
  expect(mocks.updateRecord).not.toHaveBeenCalled();
  expect(clearDraft).not.toHaveBeenCalled();
});

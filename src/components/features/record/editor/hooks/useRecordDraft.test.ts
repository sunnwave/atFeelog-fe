import { act, renderHook, waitFor } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { draftStorage } from "@/shared/storage/draftStorage";
import { useRecordDraft } from "./useRecordDraft";
import { RECORD_WRITE_DEFAULTS, type RecordEditFormValues } from "../../model/types";

const modal = vi.hoisted(() => ({ openConfirmPreset: vi.fn(), closeConfirm: vi.fn() }));
vi.mock("@/shared/hooks/ui/useConfirmPreset", () => ({ useConfirmPreset: () => modal }));
const toast = vi.hoisted(() => ({ success: vi.fn(), error: vi.fn() }));
vi.mock("@/components/commons/toast/ToastProvider", () => ({ useToast: () => toast }));
vi.mock("@/shared/storage/draftStorage", () => ({
  draftStorage: { save: vi.fn(), load: vi.fn(), remove: vi.fn() },
}));

function renderDraft(key: string | null = "record:draft:write:a", ready = true) {
  return renderHook(({ draftKey, ready }) => {
    const form = useForm<RecordEditFormValues>({ defaultValues: RECORD_WRITE_DEFAULTS });
    form.register("title", { required: "제목을 입력해주세요." });
    const draft = useRecordDraft({ form, draftKey, ready });
    // RHF 상태 구독 및 검증 상태 초기화 회귀 확인
    const { errors, touchedFields, isSubmitted, submitCount, isDirty } = form.formState;
    return { form, ...draft, errors, touchedFields, isSubmitted, submitCount, isDirty };
  }, { initialProps: { draftKey: key, ready } });
}

async function setup(key: string | null = "record:draft:write:a") {
  const hook = renderDraft(key);
  await waitFor(() => expect(hook.result.current.isCheckingDraft).toBe(false));
  return hook;
}

function deferred() {
  let resolve!: () => void;
  let reject!: (error: Error) => void;
  const promise = new Promise<void>((done, fail) => { resolve = done; reject = fail; });
  return { promise, resolve, reject };
}

beforeEach(() => {
  vi.resetAllMocks();
  vi.mocked(draftStorage.save).mockResolvedValue(undefined);
  vi.mocked(draftStorage.load).mockResolvedValue(undefined);
  vi.mocked(draftStorage.remove).mockResolvedValue(undefined);
});

describe("useRecordDraft", () => {
  it("변경·저장·재입력·저장값으로 되돌리기를 감지한다", async () => {
    const { result } = await setup();
    expect(result.current.hasUnsavedChanges).toBe(false);
    act(() => result.current.form.setValue("title", "초안", { shouldDirty: true }));
    expect(result.current.hasUnsavedChanges).toBe(true);
    await act(async () => { await result.current.onTempSave(); });
    expect(result.current.hasUnsavedChanges).toBe(false);
    expect(result.current.isDirty).toBe(true);
    expect(toast.success).toHaveBeenCalledOnce();
    act(() => result.current.form.setValue("title", "재수정"));
    expect(result.current.hasUnsavedChanges).toBe(true);
    act(() => result.current.form.setValue("title", "초안"));
    expect(result.current.hasUnsavedChanges).toBe(false);
  });

  it("임시저장 후 입력 오류·touched·제출 상태와 횟수를 유지한다", async () => {
    const { result } = await setup();
    act(() => result.current.form.setValue("title", "", { shouldTouch: true }));
    await act(async () => { await result.current.form.handleSubmit(vi.fn())(); });
    const before = {
      error: result.current.errors.title?.message,
      touched: result.current.touchedFields.title,
      submitted: result.current.isSubmitted,
      count: result.current.submitCount,
    };
    expect(before).toEqual({ error: "제목을 입력해주세요.", touched: true, submitted: true, count: 1 });
    await act(async () => { await result.current.onTempSave(); });
    expect({
      error: result.current.errors.title?.message,
      touched: result.current.touchedFields.title,
      submitted: result.current.isSubmitted,
      count: result.current.submitCount,
    }).toEqual(before);
  });

  it("복구한 값을 기준으로 설정하고 이후 원본 변경과 분리한다", async () => {
    const restored = { ...RECORD_WRITE_DEFAULTS, title: "복구한 초안", images: ["a.jpg"] };
    vi.mocked(draftStorage.load).mockResolvedValue({ version: 1, savedAt: 1000, values: restored });
    const { result } = renderDraft();
    await waitFor(() => expect(modal.openConfirmPreset).toHaveBeenCalledOnce());
    act(() => modal.openConfirmPreset.mock.calls[0][1].onConfirm());
    expect(result.current.hasUnsavedChanges).toBe(false);
    restored.images.push("b.jpg");
    act(() => result.current.form.setValue("title", "새 제목"));
    expect(result.current.hasUnsavedChanges).toBe(true);
    act(() => result.current.form.setValue("title", "복구한 초안"));
    expect(result.current.hasUnsavedChanges).toBe(false);
  });

  it("사진 추가·삭제·순서 변경 및 같은 메타데이터의 새 파일을 감지한다", async () => {
    const { result } = await setup();
    const a = new File(["a"], "photo.png", { lastModified: 1 });
    const b = new File(["b"], "other.png", { lastModified: 1 });
    act(() => result.current.form.setValue("imageFiles", [a, b]));
    expect(result.current.hasUnsavedChanges).toBe(true);
    await act(async () => { await result.current.onTempSave(); });
    expect(result.current.hasUnsavedChanges).toBe(false);
    act(() => result.current.form.setValue("imageFiles", [b, a]));
    expect(result.current.hasUnsavedChanges).toBe(true);
    act(() => result.current.form.setValue("imageFiles", [a]));
    expect(result.current.hasUnsavedChanges).toBe(true);
    act(() => result.current.form.setValue("imageFiles", [a, b]));
    expect(result.current.hasUnsavedChanges).toBe(false);
    const replacement = new File(["z"], "photo.png", { lastModified: 1 });
    act(() => result.current.form.setValue("imageFiles", [replacement, b]));
    expect(result.current.hasUnsavedChanges).toBe(true);
  });

  it("저장 중 중복 요청을 막고 추가 입력은 미저장 상태로 유지한다", async () => {
    const pending = deferred();
    vi.mocked(draftStorage.save).mockReturnValue(pending.promise);
    const { result } = await setup();
    act(() => result.current.form.setValue("title", "저장할 값"));
    let saving!: Promise<void>;
    act(() => { saving = result.current.onTempSave(); });
    expect(result.current.isSavingDraft).toBe(true);
    await act(async () => { await result.current.onTempSave(); });
    expect(draftStorage.save).toHaveBeenCalledOnce();
    act(() => result.current.form.setValue("title", "저장 중 추가 입력"));
    await act(async () => { pending.resolve(); await saving; });
    expect(result.current.form.getValues("title")).toBe("저장 중 추가 입력");
    expect(result.current.hasUnsavedChanges).toBe(true);
    expect(result.current.isSavingDraft).toBe(false);
    act(() => result.current.form.setValue("title", "저장할 값"));
    expect(result.current.hasUnsavedChanges).toBe(false);
  });

  it("저장 실패 시 입력·기준값을 유지하고 오류만 안내한다", async () => {
    const { result } = await setup();
    act(() => result.current.form.setValue("title", "저장된 초안"));
    await act(async () => { await result.current.onTempSave(); });
    toast.success.mockClear();
    vi.mocked(draftStorage.save).mockRejectedValue(new Error("quota"));
    act(() => result.current.form.setValue("title", "새 입력"));
    await act(async () => { await result.current.onTempSave(); });
    expect(result.current.form.getValues("title")).toBe("새 입력");
    expect(result.current.hasUnsavedChanges).toBe(true);
    expect(result.current.isSavingDraft).toBe(false);
    expect(toast.error).toHaveBeenCalledOnce();
    expect(toast.success).not.toHaveBeenCalled();
    act(() => result.current.form.setValue("title", "저장된 초안"));
    expect(result.current.hasUnsavedChanges).toBe(false);
  });

  it("key가 없으면 저장과 알림을 실행하지 않는다", async () => {
    const { result } = await setup(null);
    act(() => result.current.form.setValue("title", "입력"));
    await act(async () => { await result.current.onTempSave(); });
    expect(result.current.hasUnsavedChanges).toBe(false);
    expect(draftStorage.save).not.toHaveBeenCalled();
    expect(toast.success).not.toHaveBeenCalled();
    expect(toast.error).not.toHaveBeenCalled();
  });

  it("A→B→A 대상 전환 후 이전 저장 완료가 새 기준을 덮어쓰지 않는다", async () => {
    const pending = deferred();
    vi.mocked(draftStorage.save).mockReturnValue(pending.promise);
    const { result, rerender } = await setup("a");
    act(() => result.current.form.setValue("title", "이전 저장"));
    let saving!: Promise<void>;
    act(() => { saving = result.current.onTempSave(); });
    rerender({ draftKey: "b", ready: true });
    const restored = { ...RECORD_WRITE_DEFAULTS, title: "새 기준" };
    vi.mocked(draftStorage.load).mockResolvedValue({ version: 1, savedAt: 1000, values: restored });
    rerender({ draftKey: "a", ready: true });
    await waitFor(() => expect(modal.openConfirmPreset).toHaveBeenCalledOnce());
    act(() => modal.openConfirmPreset.mock.calls[0][1].onConfirm());
    toast.success.mockClear();
    await act(async () => { pending.resolve(); await saving; });
    expect(result.current.hasUnsavedChanges).toBe(false);
    expect(result.current.form.getValues("title")).toBe("새 기준");
    expect(toast.success).not.toHaveBeenCalled();
  });

  it.each(["success", "failure"])("화면 이탈 후 저장 결과 알림을 표시하지 않는다 (%s)", async (outcome) => {
    const pending = deferred();
    vi.mocked(draftStorage.save).mockReturnValue(pending.promise);
    const { result, unmount } = await setup();
    let saving!: Promise<void>;
    act(() => { saving = result.current.onTempSave(); });
    unmount();
    if (outcome === "success") pending.resolve();
    else pending.reject(new Error("quota"));
    await saving;
    expect(toast.success).not.toHaveBeenCalled();
    expect(toast.error).not.toHaveBeenCalled();
  });

  it("폼 초기화 준비 후 조회하고 서버 값을 최초 기준으로 사용한다", async () => {
    const { result, rerender } = renderDraft("update:a:1", false);
    expect(draftStorage.load).not.toHaveBeenCalled();
    act(() => result.current.form.reset({ ...RECORD_WRITE_DEFAULTS, title: "서버 제목" }));
    rerender({ draftKey: "update:a:1", ready: true });
    await waitFor(() => expect(result.current.isCheckingDraft).toBe(false));
    expect(result.current.hasUnsavedChanges).toBe(false);
    act(() => result.current.form.setValue("title", "변경 제목"));
    expect(result.current.hasUnsavedChanges).toBe(true);
  });

  it("초안 확인 중 저장 차단, 복구 시 사진·폼 값과 기준값 반영", async () => {
    const photo = new File(["photo"], "photo.png", { type: "image/png" });
    const values = { ...RECORD_WRITE_DEFAULTS, title: "복구 제목", imageFiles: [photo] };
    vi.mocked(draftStorage.load).mockResolvedValue({ version: 1, savedAt: 1000, values });
    const { result } = renderDraft();
    await waitFor(() => expect(modal.openConfirmPreset).toHaveBeenCalledOnce());
    expect(result.current.isCheckingDraft).toBe(true);
    await act(async () => { await result.current.onTempSave(); });
    expect(draftStorage.save).not.toHaveBeenCalled();
    act(() => modal.openConfirmPreset.mock.calls[0][1].onConfirm());
    expect(result.current.form.getValues()).toEqual(values);
    expect(result.current.hasUnsavedChanges).toBe(false);
    expect(result.current.isCheckingDraft).toBe(false);
    expect(toast.success).toHaveBeenCalledWith("임시 저장된 내용을 불러왔어요.");
  });

  it("새로 작성 직후 모달이 닫혀도 삭제가 끝날 때까지 임시저장을 막는다", async () => {
    vi.mocked(draftStorage.load).mockResolvedValue({ version: 1, savedAt: 1000, values: RECORD_WRITE_DEFAULTS });
    const pending = deferred();
    vi.mocked(draftStorage.remove).mockReturnValue(pending.promise);
    const { result } = renderDraft();
    await waitFor(() => expect(modal.openConfirmPreset).toHaveBeenCalledOnce());
    const handlers = modal.openConfirmPreset.mock.calls[0][1];
    act(() => {
      handlers.onCancel();
      handlers.onClose();
    });
    expect(result.current.isCheckingDraft).toBe(true);
    await act(async () => { await result.current.onTempSave(); });
    expect(draftStorage.save).not.toHaveBeenCalled();
    await waitFor(() => expect(draftStorage.remove).toHaveBeenCalledWith("record:draft:write:a"));
    await act(async () => { pending.resolve(); await pending.promise; });
    await waitFor(() => expect(result.current.isCheckingDraft).toBe(false));
    expect(result.current.form.getValues()).toEqual(RECORD_WRITE_DEFAULTS);
    act(() => result.current.form.setValue("title", "새 초안"));
    await act(async () => { await result.current.onTempSave(); });
    expect(draftStorage.save).toHaveBeenCalledOnce();
  });

  it("모달만 닫으면 기존 초안을 삭제하거나 복원하지 않고 확인을 마친다", async () => {
    const values = { ...RECORD_WRITE_DEFAULTS, title: "기존 초안" };
    vi.mocked(draftStorage.load).mockResolvedValue({ version: 1, savedAt: 1000, values });
    const { result } = renderDraft();
    await waitFor(() => expect(modal.openConfirmPreset).toHaveBeenCalledOnce());
    act(() => modal.openConfirmPreset.mock.calls[0][1].onClose());
    expect(draftStorage.remove).not.toHaveBeenCalled();
    expect(result.current.form.getValues("title")).toBe(RECORD_WRITE_DEFAULTS.title);
    expect(result.current.isCheckingDraft).toBe(false);
  });

  it("조회 실패를 안내하고 새 입력의 임시저장은 허용한다", async () => {
    vi.mocked(draftStorage.load).mockRejectedValue(new Error("조회 실패"));
    const { result } = await setup();
    expect(toast.error).toHaveBeenCalledWith("임시저장된 내용을 불러오지 못했어요.");
    act(() => result.current.form.setValue("title", "새 입력"));
    await act(async () => { await result.current.onTempSave(); });
    expect(draftStorage.save).toHaveBeenCalledOnce();
  });

  it("초안 폐기 실패를 안내하고 폼 입력은 유지한다", async () => {
    vi.mocked(draftStorage.load).mockResolvedValue({ version: 1, savedAt: 1000, values: RECORD_WRITE_DEFAULTS });
    vi.mocked(draftStorage.remove).mockRejectedValue(new Error("삭제 실패"));
    const { result } = renderDraft();
    await waitFor(() => expect(modal.openConfirmPreset).toHaveBeenCalledOnce());
    act(() => result.current.form.setValue("title", "현재 입력"));
    act(() => modal.openConfirmPreset.mock.calls[0][1].onCancel());
    await waitFor(() => expect(result.current.isCheckingDraft).toBe(false));
    expect(toast.error).toHaveBeenCalledWith("임시저장 초안을 삭제하지 못했어요.");
    expect(result.current.form.getValues("title")).toBe("현재 입력");
  });

  it("대상 변경 후 이전 조회 결과는 무시하고 새 조회가 끝날 때까지 저장을 막는다", async () => {
    let finishPreviousLoad!: (value: unknown) => void;
    const nextLoad = deferred();
    vi.mocked(draftStorage.load)
      .mockImplementationOnce(() => new Promise((resolve) => { finishPreviousLoad = resolve; }))
      .mockReturnValueOnce(nextLoad.promise);
    const { result, rerender } = renderDraft("a");
    rerender({ draftKey: "b", ready: true });
    await act(async () => {
      finishPreviousLoad({ version: 1, savedAt: 1000, values: RECORD_WRITE_DEFAULTS });
    });
    expect(modal.openConfirmPreset).not.toHaveBeenCalled();
    expect(result.current.isCheckingDraft).toBe(true);
    act(() => result.current.form.setValue("title", "새 초안"));
    await act(async () => { await result.current.onTempSave(); });
    expect(draftStorage.save).not.toHaveBeenCalled();

    await act(async () => { nextLoad.resolve(); });
    expect(result.current.isCheckingDraft).toBe(false);
    await act(async () => { await result.current.onTempSave(); });
    expect(draftStorage.save).toHaveBeenCalledWith("b", expect.anything());
  });

  it("모달이 열린 채 이탈하면 닫고 이전 복구 콜백을 무효화한다", async () => {
    vi.mocked(draftStorage.load).mockResolvedValue({ version: 1, savedAt: 1000, values: { ...RECORD_WRITE_DEFAULTS, title: "이전 초안" } });
    const { result, unmount } = renderDraft();
    await waitFor(() => expect(modal.openConfirmPreset).toHaveBeenCalledOnce());
    const form = result.current.form;
    const handlers = modal.openConfirmPreset.mock.calls[0][1];
    unmount();
    expect(modal.closeConfirm).toHaveBeenCalledOnce();
    handlers.onConfirm();
    expect(form.getValues("title")).toBe("");
    expect(toast.success).not.toHaveBeenCalled();
  });

  it("저장 완료 후 삭제하여 뒤늦은 저장으로 초안이 다시 생기지 않는다", async () => {
    const pending = deferred();
    vi.mocked(draftStorage.save).mockReturnValue(pending.promise);
    const { result } = await setup();
    let saving!: Promise<void>;
    let deleting!: Promise<boolean>;
    act(() => { saving = result.current.onTempSave(); });
    act(() => { deleting = result.current.clearDraft(); });
    expect(draftStorage.remove).not.toHaveBeenCalled();
    await act(async () => { pending.resolve(); await saving; await deleting; });
    expect(draftStorage.remove).toHaveBeenCalledOnce();
  });
});

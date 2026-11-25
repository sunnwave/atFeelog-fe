import { useCallback, useEffect, useRef, useState } from "react";
import { useWatch, type UseFormReturn } from "react-hook-form";
import { useConfirmPreset } from "@/shared/hooks/ui/useConfirmPreset";
import { useToast } from "@/components/commons/toast/ToastProvider";
import { useRecordDraftStorage } from "@/shared/hooks/record/useRecordDraftStorage";
import {
  RECORD_WRITE_DEFAULTS,
  type RecordEditFormValues,
} from "../../model/types";

function snapshot(values: RecordEditFormValues): RecordEditFormValues {
  return {
    ...values,
    images: [...values.images],
    imageFiles: [...values.imageFiles],
  };
}

function sameValues(a: RecordEditFormValues, b: RecordEditFormValues): boolean {
  return (
    Object.keys(RECORD_WRITE_DEFAULTS) as (keyof RecordEditFormValues)[]
  ).every((key) => {
    if (key === "images") {
      return (
        a.images.length === b.images.length &&
        a.images.every((url, index) => url === b.images[index])
      );
    }
    if (key === "imageFiles") {
      // 파일 참조와 배열 순서로 추가·삭제·교체 감지
      return (
        a.imageFiles.length === b.imageFiles.length &&
        a.imageFiles.every((file, index) => file === b.imageFiles[index])
      );
    }
    return a[key] === b[key];
  });
}

type Options = {
  form: UseFormReturn<RecordEditFormValues>;
  draftKey: string | null;
  ready: boolean;
};

export function useRecordDraft({ form, draftKey, ready }: Options) {
  const {
    saveDraft,
    loadDraft,
    clearDraft: removeDraft,
  } = useRecordDraftStorage(draftKey);
  const { success, error } = useToast();
  const { openConfirmPreset, closeConfirm } = useConfirmPreset();
  // 폼 값 변경 시 재계산, 비교에는 RHF의 전체 현재 값 사용
  useWatch({ control: form.control });
  const [baseline, updateBaseline] = useState(() => ({
    key: draftKey,
    values: snapshot(form.getValues()),
  }));
  const [isSavingDraft, setSavingDraft] = useState(false);
  const pendingSave = useRef<Promise<boolean> | null>(null);
  const [checkedKey, setCheckedKey] = useState<string | null>(null);
  const context = useRef({
    key: draftKey,
    active: false,
  });
  const isCheckingDraft = !!draftKey && (!ready || checkedKey !== draftKey);

  const clearDraft = useCallback(async (): Promise<boolean> => {
    const started = context.current;
    if (!draftKey || !started.active || started.key !== draftKey) return false;
    try {
      // 저장 완료 후 삭제하여 뒤늦은 저장으로 초안이 다시 생기는 상황 방지
      await pendingSave.current?.catch(() => {});
      await removeDraft();
      return true;
    } catch {
      if (started.active) error("임시저장 초안을 삭제하지 못했어요.");
      return false;
    }
  }, [draftKey, removeDraft, error]);

  useEffect(() => {
    const current = {
      key: draftKey,
      active: true,
    };
    context.current = current;
    let modalOpen = false;
    setCheckedKey(null);
    updateBaseline({ key: draftKey, values: snapshot(form.getValues()) });

    const finishChecking = () => {
      if (!current.active) return;
      setCheckedKey(draftKey);
    };

    const checkDraft = async () => {
      try {
        const draft = await loadDraft();
        if (!current.active) return;
        if (!draft) {
          finishChecking();
          return;
        }
        modalOpen = true;
        openConfirmPreset("loadDraft", {
          onConfirm: () => {
            if (!current.active) return;
            modalOpen = false;
            form.reset(draft.values);
            updateBaseline({ key: draftKey, values: snapshot(draft.values) });
            finishChecking();
            success("임시 저장된 내용을 불러왔어요.");
          },
          onCancel: () => {
            if (!current.active) return;
            modalOpen = false;
            void clearDraft().finally(finishChecking);
          },
          onClose: () => {
            // 새로 작성 후 이어지는 닫기 이벤트는 무시하고 삭제 완료까지 대기
            if (!modalOpen) return;
            modalOpen = false;
            finishChecking();
          },
        });
      } catch {
        if (!current.active) return;
        error("임시저장된 내용을 불러오지 못했어요.");
        finishChecking();
      }
    };

    if (ready && draftKey) void checkDraft();
    return () => {
      current.active = false;
      if (modalOpen) closeConfirm();
    };
  }, [
    draftKey,
    ready,
    form,
    loadDraft,
    clearDraft,
    openConfirmPreset,
    closeConfirm,
    success,
    error,
  ]);

  const onTempSave = useCallback(async (): Promise<void> => {
    const started = context.current;
    if (
      !draftKey ||
      !started.active ||
      isCheckingDraft ||
      started.key !== draftKey ||
      pendingSave.current
    )
      return;
    const values = snapshot(form.getValues());
    const isCurrent = () =>
      started.active &&
      context.current === started;

    setSavingDraft(true);
    try {
      const request = saveDraft(values);
      pendingSave.current = request;
      if ((await request) && isCurrent()) {
        // 저장 시작 시점의 값만 기준으로 반영, 폼 검증 상태 유지
        updateBaseline({ key: draftKey, values });
        success("사진과 작성 내용이 임시저장됐어요.");
      }
    } catch {
      if (isCurrent()) error("임시저장에 실패했어요. 다시 시도해주세요.");
    } finally {
      pendingSave.current = null;
      if (context.current.active) setSavingDraft(false);
    }
  }, [draftKey, isCheckingDraft, form, saveDraft, success, error]);

  return {
    onTempSave,
    isSavingDraft,
    isCheckingDraft,
    clearDraft,
    hasUnsavedChanges:
      !!draftKey &&
      baseline.key === draftKey &&
      !sameValues(form.getValues(), baseline.values),
  };
}

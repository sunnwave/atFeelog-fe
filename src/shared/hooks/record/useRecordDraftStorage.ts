import { useCallback } from "react";
import type {
  RecordDraft,
  RecordEditFormValues,
} from "@/components/features/record/model/types";
import { draftStorage } from "@/shared/storage/draftStorage";

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isRecordDraft(value: unknown): value is RecordDraft {
  if (!isObject(value) || value.version !== 1) return false;
  if (typeof value.savedAt !== "number" || !Number.isFinite(value.savedAt) || value.savedAt < 0) return false;
  const values = value.values;
  if (!isObject(values)) return false;

  // 미완성 초안도 허용하되 필드 타입과 파일 객체는 검증
  const requiredStrings = [
    "title", "showName", "showDate", "contents",
    "placeName", "roadAddress", "jibunAddress",
  ];
  const optionalStrings = [
    "artistName", "mt20id", "genre", "posterUrl", "x", "y",
  ];
  return requiredStrings.every((key) => typeof values[key] === "string")
    && optionalStrings.every((key) => values[key] === undefined || typeof values[key] === "string")
    && Array.isArray(values.images)
    && values.images.every((image) => typeof image === "string")
    && Array.isArray(values.imageFiles)
    && values.imageFiles.every((file) => typeof File !== "undefined" && file instanceof File);
}

function readLegacyDraft(key: string): string | null {
  // 사용자 ID가 없는 공용 키는 조회와 삭제 대상에서 제외
  if (!/^record:draft:(?:write:[^:]+|update:[^:]+:[^:]+)$/.test(key)) return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function parseLegacyDraft(raw: string): RecordDraft | null {
  try {
    const values: unknown = JSON.parse(raw);
    if (!isObject(values)) return null;
    // JSON으로 남은 사진 파일 값은 제외하고 이미지 URL은 유지
    const draft = { version: 1, savedAt: Date.now(), values: { ...values, imageFiles: [] } };
    return isRecordDraft(draft) ? draft : null;
  } catch {
    return null;
  }
}

export function useRecordDraftStorage(key: string | null) {
  const saveDraft = useCallback(async (values: RecordEditFormValues): Promise<boolean> => {
    if (!key) return false;
    const draft: RecordDraft = {
      version: 1,
      savedAt: Date.now(),
      values: { ...values, images: [...values.images], imageFiles: [...values.imageFiles] },
    };
    await draftStorage.save(key, draft);
    return true;
  }, [key]);

  const loadDraft = useCallback(async (): Promise<RecordDraft | null> => {
    if (!key) return null;
    const draft = await draftStorage.load(key);
    // IndexedDB에 항목이 있으면 손상되었거나 미지원 형식이어도 덮어쓰기 방지
    if (draft !== undefined) return isRecordDraft(draft) ? draft : null;

    const raw = readLegacyDraft(key);
    if (raw === null) return null;
    const migrated = parseLegacyDraft(raw);
    if (!migrated) return null;

    if (!(await draftStorage.saveIfAbsent(key, migrated))) {
      const existing = await draftStorage.load(key);
      return isRecordDraft(existing) ? existing : null;
    }

    try {
      if (readLegacyDraft(key) === raw) localStorage.removeItem(key);
    } catch {
      // 원본 삭제에 실패해도 IndexedDB로 이전된 초안은 복원
    }
    return migrated;
  }, [key]);

  const clearDraft = useCallback(async (): Promise<void> => {
    if (!key) return;
    // IndexedDB 초안 삭제 후 구형 초안이 다시 이전되는 상황 방지
    if (readLegacyDraft(key) !== null) localStorage.removeItem(key);
    await draftStorage.remove(key);
  }, [key]);

  return { saveDraft, loadDraft, clearDraft };
}

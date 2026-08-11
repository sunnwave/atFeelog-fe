import { useForm } from "react-hook-form";
import {
  RECORD_WRITE_DEFAULTS,
  RecordEditFormValues,
  recordWriteSchema,
} from "../../model";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useState } from "react";
import { KakaoPlace } from "@/shared/types/kakao";
import type { Performance, PerformanceDetail } from "@/shared/types/performance";
import { resolveShowDate } from "@/shared/utils/kopis";

export function useRecordEditorForm(
  onSubmitValid: (v: RecordEditFormValues) => Promise<void> | void
) {
  const form = useForm<RecordEditFormValues>({
    resolver: yupResolver(recordWriteSchema),
    mode: "onChange",
    defaultValues: RECORD_WRITE_DEFAULTS,
  });

  const [isPlaceSearchOpen, setIsPlaceSearchOpen] = useState(false);

  const { setValue, reset } = form;

  const onPickPlace = (p: KakaoPlace) => {
    setValue("placeName", p.place_name, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("roadAddress", p.road_address_name ?? "", {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("jibunAddress", p.address_name ?? "", {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("x", p.x ?? undefined, { shouldDirty: true });
    setValue("y", p.y ?? undefined, { shouldDirty: true });
  };

  const onPickPerformance = async (p: Performance) => {
    // 1) 즉시 채울 수 있는 필드
    setValue("showName", p.title, { shouldValidate: true, shouldDirty: true });
    setValue("mt20id", p.mt20id, { shouldDirty: true });
    setValue("genre", p.genre, { shouldDirty: true });
    setValue("posterUrl", p.posterUrl, { shouldDirty: true });
    setValue("placeName", p.venueName, { shouldValidate: true, shouldDirty: true });
    setValue("showDate", resolveShowDate(p), { shouldValidate: true, shouldDirty: true });

    // 2) 공연장 이름으로 카카오 장소 검색 → 좌표·주소 자동 채움
    try {
      const kakaoRes = await fetch(
        `/api/kakao/places?q=${encodeURIComponent(p.venueName)}&size=1`
      );
      if (kakaoRes.ok) {
        const kakaoData = await kakaoRes.json();
        const first = kakaoData?.documents?.[0];
        if (first) {
          setValue("roadAddress", first.road_address_name ?? "", { shouldDirty: true });
          setValue("jibunAddress", first.address_name ?? "", { shouldDirty: true });
          setValue("x", first.x ?? undefined, { shouldDirty: true });
          setValue("y", first.y ?? undefined, { shouldDirty: true });
        }
      }
    } catch {
      // 좌표 fetch 실패해도 나머지 필드는 이미 채워진 상태 — 무시
    }

    // 3) 아티스트명 — 상세 API에서 cast 가져와서 채움
    try {
      const res = await fetch(`/api/kopis/performances/${encodeURIComponent(p.mt20id)}`);
      if (res.ok) {
        const detail = (await res.json()) as PerformanceDetail;
        if (detail.cast) {
          setValue("artistName", detail.cast, { shouldValidate: true, shouldDirty: true });
        }
      }
    } catch {
      // 상세 fetch 실패해도 나머지 필드는 이미 채워진 상태 — 무시
    }
  };

  const onImagesChange = useCallback(
    (next: File[]) => setValue("imageFiles", next, { shouldValidate: true }),
    [setValue]
  );

  return {
    form,
    resetForm: reset,
    isPlaceSearchOpen,
    setIsPlaceSearchOpen,
    onPickPlace,
    onPickPerformance,
    onImagesChange,
    onSubmit: form.handleSubmit(onSubmitValid),
  };
}

import { useForm } from "react-hook-form";
import {
  RECORD_WRITE_DEFAULTS,
  RecordEditFormValues,
  recordWriteSchema,
} from "../../model";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useState } from "react";
import { KakaoPlace } from "@/shared/types/kakao";

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
    onImagesChange,
    onSubmit: form.handleSubmit(onSubmitValid),
  };
}

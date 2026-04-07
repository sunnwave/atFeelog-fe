import { useForm } from "react-hook-form";
import {
  RECORD_WRITE_DEFAULTS,
  RecordWriteFormValues,
  recordWriteSchema,
} from "../../model";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useState } from "react";
import { KakaoPlace } from "@/shared/types/kakao";

export function useRecordEditorForm(
  onSubmitValid: (v: RecordWriteFormValues) => Promise<void> | void
) {
  const form = useForm<RecordWriteFormValues>({
    resolver: yupResolver(recordWriteSchema),
    mode: "onChange",
    defaultValues: RECORD_WRITE_DEFAULTS,
  });

  const [isPlaceSearchOpen, setIsPlaceSearchOpen] = useState(false);

  const { setValue } = form;

  const onPickPlace = (p: KakaoPlace) => {
    setValue("placeName", p.place_name, { shouldValidate: true });
    setValue("roadAddress", p.road_address_name ?? "", {
      shouldValidate: true,
    });
    setValue("jibunAddress", p.address_name ?? "", {
      shouldValidate: true,
    });
    setValue("x", p.x ?? undefined);
    setValue("y", p.y ?? undefined);
  };

  const onImagesChange = useCallback(
    (next: File[]) => setValue("imageFiles", next, { shouldValidate: true }),
    [setValue]
  );

  return {
    form,
    isPlaceSearchOpen,
    setIsPlaceSearchOpen,
    onPickPlace,
    onImagesChange,
    onSubmit: form.handleSubmit(onSubmitValid),
  };
}

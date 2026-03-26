// src/components/features/records/write/RecordWriteForm.tsx
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { type RecordWriteFormValues, RECORD_WRITE_DEFAULTS } from "./types";
import { recordWriteSchema } from "./schema";
import { FormLabel, TextField } from "@/components/ui/form";
import { Button } from "@/components/ui/button/Button";
import { MapPin } from "lucide-react";
import { useState } from "react";
import PlaceSearchModal from "@/components/commons/modal/placeSearchModal/PlaceSearchModal";
import { KakaoPlace } from "@/shared/hooks/kakao/useKakaoPlaceSearch";

export default function RecordWriteForm({
  formId = "record-write-form",
  onSubmitValid,
}: {
  formId?: string;
  onSubmitValid: (values: RecordWriteFormValues) => Promise<void> | void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setValue,
  } = useForm<RecordWriteFormValues>({
    resolver: yupResolver(recordWriteSchema),
    mode: "onChange",
    defaultValues: RECORD_WRITE_DEFAULTS,
  });

  const [isPlaceSearchOpen, setIsPlaceSearchOpen] = useState(false);

  // 카카오 장소 선택 시 폼 채우기
  const onPickPlace = (p: KakaoPlace) => {
    setValue("placeName", p.place_name, { shouldValidate: true });
    setValue("roadAddress", p.road_address_name ?? "", {
      shouldValidate: true,
    });
    setValue("jibunAddress", p.address_name ?? "", { shouldValidate: true });
    setValue("x", p.x ?? undefined, { shouldValidate: false });
    setValue("y", p.y ?? undefined, { shouldValidate: false });
  };

  return (
    <form
      id={formId}
      onSubmit={handleSubmit(onSubmitValid)}
      className="space-y-4"
    >
      {/* ✅ 하단 fixed 버튼바에 가리지 않도록 여백 확보 */}
      <div className="flex flex-col space-y-6 pb-28 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* 공연명 */}
          <div className="flex flex-col space-y-2">
            <FormLabel htmlFor="showName" required={false}>
              공연명
            </FormLabel>
            <TextField
              name="showName"
              placeholder="예) 서울재즈페스티벌 2026"
              register={register}
              error={errors.showName}
              className={errors.showName ? "animate-shake" : ""}
            />
          </div>

          {/* 아티스트 명 */}
          <div className="flex flex-col space-y-2">
            <FormLabel htmlFor="artistName" required={false}>
              아티스트
            </FormLabel>
            <TextField
              name="artistName"
              placeholder="예) 김범수, 아이유, 잔나비"
              register={register}
              error={errors.artistName}
              className={errors.artistName ? "animate-shake" : ""}
            />
          </div>
        </div>

        {/* 공연 날짜 */}
        <div className="flex flex-col space-y-2">
          <FormLabel htmlFor="showDate" required={false}>
            공연 날짜
          </FormLabel>
          <TextField
            name="showDate"
            register={register}
            error={errors.showDate}
            className={errors.showDate ? "animate-shake" : ""}
          />
        </div>

        {/* TODO: 다음 로컬 API 이용해서 장소 검색 후 입력되도록 */}
        {/* 공연 장소 */}
        <div className="flex flex-col space-y-2">
          <FormLabel htmlFor="placeName" required={false}>
            공연 장소
          </FormLabel>
          <div className="flex min-w-0 gap-2">
            <div className="flex-1 min-">
              <TextField
                name="placeName"
                register={register}
                error={errors.placeName}
                className={errors.placeName ? "animate-shake" : ""}
              />
            </div>
            <Button
              variant="indigo"
              className="h-11 rounded-xl shrink-0"
              aria-label="장소 검색 버튼"
              onClick={() => setIsPlaceSearchOpen(true)}
            >
              <MapPin className="size-5" />
              검색
            </Button>
          </div>

          <PlaceSearchModal
            open={isPlaceSearchOpen}
            onOpenChange={setIsPlaceSearchOpen}
            onConfirm={(p) => onPickPlace(p)}
            // onPickPlace={onPickPlace}
          />
        </div>

        {/* TODO: 사진 업로드 컴포넌트 구현 */}
        {/* 사진 업로드 */}
        <div className="flex flex-col space-y-2">
          <FormLabel htmlFor="images" required={false}>
            사진 추가
          </FormLabel>
          {/* <div className="flex flex-1 gap-2"> */}
          <TextField
            name="images"
            register={register}
            className={errors.images ? "animate-shake" : ""}
          />
          {/* </div> */}
        </div>

        {/* TODO: tiptap 구현 */}
        {/* 후기 */}
        <div className="flex flex-col space-y-2">
          <FormLabel htmlFor="contents" required={false}>
            후기/감상
          </FormLabel>
          <TextField
            name="contents"
            register={register}
            error={errors.contents}
            className={errors.contents ? "animate-shake" : ""}
          />
        </div>

        {/* Writing Tips */}
        <div className="bg-accent/50 rounded-2xl p-4 space-y-2">
          <p className="text-sm font-medium text-accent-foreground">
            💡 작성 팁
          </p>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• 공연을 보며 느꼈던 감정을 솔직하게 표현해보세요</li>
            <li>• 가장 인상 깊었던 장면이나 순간을 구체적으로 적어보세요</li>
            <li>• 누군가와 함께 본 공연이라면 그 추억도 담아보세요</li>
            <li>
              • 공연 장소에 대한 후기와 좌석 시야에 대한 이야기를 남겨도 좋아요
            </li>
          </ul>
        </div>
      </div>
    </form>
  );
}

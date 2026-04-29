// RecordEditorForm.tsx
import { Controller, UseFormReturn } from "react-hook-form";
import { FormLabel, TextField } from "@/components/ui/form";
import { Button } from "@/components/ui/button/Button";
import { MapPin } from "lucide-react";
import { useState } from "react";
import PlaceSearchModal from "@/components/commons/modal/placeSearchModal/PlaceSearchModal";
import { ImageUploader } from "@/components/commons/imageUploader/ImageUploader";
import { TiptapEditor } from "@/components/ui/editor/TiptapEditor";
import { KakaoPlace } from "@/shared/types/kakao";
import { RecordEditFormValues } from "../../../model";

interface RecordEditorFormProps {
  formId?: string;
  form: UseFormReturn<RecordEditFormValues>;
  onPickPlace: (p: KakaoPlace) => void;
  onImagesChange: (next: File[]) => void;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

export default function RecordEditorForm({
  formId = "record-write-form",
  form,
  onPickPlace,
  onImagesChange,
  onSubmit,
}: RecordEditorFormProps) {
  const {
    control,
    register,
    watch,
    formState: { errors },
  } = form;

  const [isPlaceSearchOpen, setIsPlaceSearchOpen] = useState(false);
  const imageFiles = watch("imageFiles") ?? [];

  return (
    <form id={formId} onSubmit={onSubmit} className="space-y-4">
      <div className="flex flex-col space-y-6 pb-28">
        {/* 제목 */}
        <div className="flex flex-col space-y-2">
          <FormLabel htmlFor="title" required>
            제목
          </FormLabel>
          <TextField
            name="title"
            placeholder="예) 잔나비 콘서트 후기"
            register={register}
            error={errors.title}
            className={errors.title ? "animate-shake" : ""}
          />
        </div>

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
            type="date"
            name="showDate"
            register={register}
            error={errors.showDate}
            className={errors.showDate ? "animate-shake" : ""}
          />
        </div>

        {/* 공연 장소 */}
        <div className="flex flex-col space-y-2">
          <FormLabel htmlFor="placeName" required={false}>
            공연 장소
          </FormLabel>
          <div className="flex min-w-0 gap-2">
            <div className="flex-1">
              <TextField
                name="placeName"
                register={register}
                error={errors.placeName}
                className={errors.placeName ? "animate-shake" : ""}
              />
            </div>
            <Button
              type="button"
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
            onConfirm={onPickPlace}
          />
        </div>

        {/* 사진 업로드 */}
        <div className="flex flex-col space-y-2">
          <FormLabel htmlFor="images" required={false}>
            사진 추가
          </FormLabel>
          <ImageUploader value={imageFiles} onImagesChange={onImagesChange} />
        </div>

        {/* 후기 */}
        <div className="flex flex-col space-y-2">
          <FormLabel htmlFor="contents" required={false}>
            후기/감상
          </FormLabel>
          <Controller
            name="contents"
            control={control}
            render={({ field }) => (
              <TiptapEditor
                content={field.value ?? ""}
                onChange={field.onChange}
                maxLength={1000}
                error={errors.contents?.message}
              />
            )}
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

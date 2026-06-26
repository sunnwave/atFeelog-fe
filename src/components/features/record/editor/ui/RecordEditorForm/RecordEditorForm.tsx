import { Controller, UseFormReturn } from "react-hook-form";
import { TextField } from "@/components/ui/form";
import DatePickerInput from "@/components/commons/datePicker/DatePickerInput";
import { Button } from "@/components/ui/button/Button";
import { MapPin } from "lucide-react";
import { useState } from "react";
import PlaceSearchModal from "@/components/commons/modal/placeSearchModal/PlaceSearchModal";
import { ImageUploader } from "@/components/commons/imageUploader/ImageUploader";
import { TiptapEditor } from "@/components/ui/editor/TiptapEditor";
import { KakaoPlace } from "@/shared/types/kakao";
import { RecordEditFormValues } from "../../../model";
import { cn } from "@/shared/utils/cn";

interface RecordEditorFormProps {
  formId?: string;
  form: UseFormReturn<RecordEditFormValues>;
  onPickPlace: (p: KakaoPlace) => void;
  onImagesChange: (next: File[]) => void;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

const fieldLabel =
  "block text-[13px] font-black tracking-[0.16em] uppercase text-muted-foreground mb-1.5";

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
  const [showTips, setShowTips] = useState(false);
  const imageFiles = watch("imageFiles") ?? [];

  return (
    <form id={formId} onSubmit={onSubmit}>
      <div className="pb-28 px-20">
        {/* 제목 */}
        <div className="px-5 pt-5 pb-5 border-b border-foreground/15">
          <label htmlFor="title" className={cn(fieldLabel, "text-destructive")}>
            * 제목
          </label>
          <input
            id="title"
            {...register("title")}
            placeholder="그날을 기억하는 제목을 붙여보세요"
            className={cn(
              "w-full bg-transparent border-0 border-b-2 border-foreground px-0 pb-2.5 text-xl font-black tracking-tight placeholder:text-muted-foreground/50 focus:outline-none focus:ring-0",
              errors.title && "border-destructive animate-shake",
            )}
          />
        </div>

        {/* 공연 정보 */}
        <div className="px-5 py-5 border-b border-foreground/15">
          <div className="grid grid-cols-2 gap-x-5 gap-y-4">
            <div className="flex flex-col">
              <label htmlFor="showName" className={fieldLabel}>
                공연명
              </label>
              <TextField
                name="showName"
                placeholder="공연 이름"
                register={register}
                error={errors.showName}
                className={cn(errors.showName && "animate-shake")}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="artistName" className={fieldLabel}>
                아티스트
              </label>
              <TextField
                name="artistName"
                placeholder="아티스트 이름"
                register={register}
                error={errors.artistName}
                className={cn(errors.artistName && "animate-shake")}
              />
            </div>

            <div className="flex flex-col">
              <label className={fieldLabel}>공연 날짜</label>
              <Controller
                name="showDate"
                control={control}
                render={({ field }) => (
                  <DatePickerInput
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    error={errors.showDate}
                    className={cn(errors.showDate && "animate-shake")}
                  />
                )}
              />
            </div>

            <div className="flex flex-col">
              <label className={fieldLabel}>공연 장소</label>
              <div className="flex gap-2">
                <div className="flex-1 min-w-0">
                  <TextField
                    placeholder="공연 장소 검색"
                    name="placeName"
                    register={register}
                    error={errors.placeName}
                    className={cn(errors.placeName && "animate-shake")}
                  />
                </div>
                <Button
                  type="button"
                  variant="solid"
                  className="h-11 rounded-none shrink-0"
                  aria-label="장소 검색 버튼"
                  onClick={() => setIsPlaceSearchOpen(true)}
                >
                  <MapPin className="size-4" />
                  검색
                </Button>
              </div>
              <PlaceSearchModal
                open={isPlaceSearchOpen}
                onOpenChange={setIsPlaceSearchOpen}
                onConfirm={onPickPlace}
              />
            </div>
          </div>
        </div>

        {/* 사진 추가 */}
        <div className="px-5 py-5 border-b border-foreground/15">
          <label className={fieldLabel}>사진 추가</label>
          <ImageUploader value={imageFiles} onImagesChange={onImagesChange} />
        </div>

        {/* 후기 / 감상 */}
        <div className="px-5 py-5 border-b border-foreground/15">
          <label className={fieldLabel}>후기 / 감상</label>
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

        {/* 작성 팁 */}
        <div className="px-5 py-4">
          <button
            type="button"
            onClick={() => setShowTips((v) => !v)}
            className="flex items-center gap-1.5 text-[11px] font-black tracking-[0.14em] uppercase text-muted-foreground bg-transparent border-none cursor-pointer p-0"
          >
            💡 작성 팁
            <span
              className="inline-block transition-transform duration-200"
              style={{ transform: showTips ? "rotate(180deg)" : "none" }}
            >
              ▾
            </span>
          </button>

          {showTips && (
            <div className="mt-3 border border-foreground/15 bg-surface-soft p-4 space-y-1.5">
              <ul className="space-y-1.5">
                {[
                  "공연을 보며 느꼈던 감정을 솔직하게 표현해보세요",
                  "가장 인상 깊었던 장면이나 순간을 구체적으로 적어보세요",
                  "누군가와 함께 본 공연이라면 그 추억도 담아보세요",
                  "공연 장소에 대한 후기와 좌석 시야에 대한 이야기를 남겨도 좋아요",
                ].map((tip) => (
                  <li
                    key={tip}
                    className="flex gap-2 text-xs text-muted-foreground"
                  >
                    <span className="text-foreground/20">—</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}

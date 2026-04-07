import { useRef } from "react";
import { Upload } from "lucide-react";
import ImagePreview from "./ImagePreview";
import { useObjectUrlPreviews } from "@/shared/hooks/image/useObjectUrlPreviews";
import { useImagePicker } from "@/shared/hooks/image/useImagePicker";

type Props = {
  value: File[];
  onImagesChange: (files: File[]) => void;
  maxImages?: number;
  label?: string;
};

export function ImageUploader({
  value = [],
  onImagesChange,
  maxImages = 5,
  label = "사진 추가",
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const previews = useObjectUrlPreviews(value);

  const { appendFiles, removeAt } = useImagePicker({
    value,
    onChange: onImagesChange,
    maxImages,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files || []);
    appendFiles(picked);

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="w-full space-y-3">
      {value.length < maxImages && (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="
            w-full h-32 rounded-2xl border-2 border-dashed border-border
            bg-muted/30 hover:bg-muted/50
            flex flex-col items-center justify-center gap-2
            transition-colors cursor-pointer
          "
        >
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Upload className="w-5 h-5 text-primary" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">{label}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {value.length} / {maxImages}
            </p>
          </div>
        </button>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />

      {previews.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {previews.map((preview, index) => (
            <ImagePreview
              key={preview}
              preview={preview}
              index={index}
              handleRemove={removeAt}
            />
          ))}
        </div>
      )}
    </div>
  );
}

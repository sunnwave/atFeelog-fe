import { useState, useRef, useEffect } from "react";
import { X, Check } from "lucide-react";
import { Button } from "@/components/ui/button/Button";

interface CommentEditFormProps {
  initialContent: string;
  onSave: (content: string) => void;
  onCancel: () => void;
  autoFocus?: boolean;
}

export function CommentUpdate({
  initialContent,
  onSave,
  onCancel,
  autoFocus = true,
}: CommentEditFormProps) {
  const [content, setContent] = useState(initialContent);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() && content.trim() !== initialContent) {
      onSave(content.trim());
    } else {
      onCancel();
    }
  };

  const handleCancel = () => {
    setContent(initialContent);
    onCancel();
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200
      )}px`;
    }
  }, [content]);

  // Auto focus on mount
  useEffect(() => {
    if (autoFocus && textareaRef.current) {
      textareaRef.current.focus();
      // Move cursor to end
      const length = textareaRef.current.value.length;
      textareaRef.current.setSelectionRange(length, length);
    }
  }, [autoFocus]);

  const hasChanges = content.trim() !== initialContent && content.trim() !== "";

  return (
    <form onSubmit={handleSubmit} className="space-y-2" data-testid="comment-edit-form">
      {/* Textarea */}
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="댓글을 입력하세요..."
          rows={2}
          className={`
            w-full px-3 py-2.5 rounded-xl resize-none
            border transition-all text-sm
            focus:outline-none
            placeholder:text-muted-foreground
            ${
              isFocused
                ? "bg-background border-primary"
                : "bg-background border-border"
            }
          `}
          style={{ minHeight: "60px", maxHeight: "200px" }}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="rounded-full font-medium"
          onClick={handleCancel}
        >
          <X className="w-4 h-4" />
          <span>취소</span>
        </Button>

        <Button
          variant={hasChanges ? "default" : "ghost"}
          size="sm"
          type="submit"
          disabled={!hasChanges}
          className={`rounded-full font-medium `}
        >
          <Check className="w-4 h-4" />
          <span>저장</span>
        </Button>
      </div>
    </form>
  );
}

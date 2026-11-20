import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { IconButton } from "@/components/ui/button/IconButton";
import { Button } from "@/components/ui/button/Button";

interface CommentInputProps {
  onSubmit: (comment: string) => void;
  placeholder?: string;
  isLoggedIn: boolean;
}

const MAX_HEIGHT = 120;

export default function CommentInput({
  onSubmit,
  placeholder = "댓글을 입력하세요...",
  isLoggedIn,
}: CommentInputProps) {
  const [comment, setComment] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resolvedPlaceholder = isLoggedIn
    ? placeholder
    : "로그인 후 댓글을 작성해주세요";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      onSubmit(comment.trim());
      setComment("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleClear = () => {
    setComment("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.focus();
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        MAX_HEIGHT,
      )}px`;
    }
  }, [comment]);

  return (
    <div className="w-full pt-4 border-t border-border flex flex-1 flex-row items-start gap-2">
      <div
        className={`flex flex-1 items-stretch border-b transition-colors ${
          isFocused || comment ? "border-primary" : "border-border"
        }`}
      >
        {/* 텍스트에어리어 + Clear 버튼 */}
        <form
          id="comment-form"
          onSubmit={handleSubmit}
          className="relative flex-1 min-w-0 items-start"
        >
          <textarea
            ref={textareaRef}
            value={comment}
            onChange={(e) => isLoggedIn && setComment(e.target.value)}
            onFocus={() => isLoggedIn && setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={resolvedPlaceholder}
            rows={1}
            readOnly={!isLoggedIn}
            disabled={!isLoggedIn}
            className="block w-full p-1 pr-5 rounded-none resize-none focus:outline-none text-xs leading-5 placeholder:text-muted-foreground min-h-7 max-h-30"
          />
          {comment && (
            <IconButton
              aria-label="댓글 초기화"
              onClick={handleClear}
              size="xs"
              className="absolute right-0 top-1"
            >
              <X />
            </IconButton>
          )}
        </form>

        {/* Submit 버튼: form 속성으로 form 외부에서 submit 연결 */}
      </div>
      <Button
        form="comment-form"
        type="submit"
        disabled={!isLoggedIn || !comment.trim()}
        size="sm"
        variant="solid"
        tone="accent"
        aria-label="댓글 전송"
      >
        등록
      </Button>
    </div>
  );
}

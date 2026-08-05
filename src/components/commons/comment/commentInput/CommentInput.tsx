import { Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
    <div className="pt-4 border-t border-border">
      <div
        className={`flex items-stretch border transition-colors ${
          isFocused || comment ? "border-primary" : "border-border"
        }`}
      >
        {/* 텍스트에어리어 + Clear 버튼 */}
        <form
          id="comment-form"
          onSubmit={handleSubmit}
          className="relative flex-1 min-w-0"
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
            className="block w-full px-3 py-2 pr-10 rounded-none resize-none bg-white focus:outline-none text-sm placeholder:text-muted-foreground min-h-9 max-h-30"
          />
          {comment && (
            <Button
              type="button"
              size="icon"
              variant="ghost"
              tone="neutral"
              onClick={handleClear}
              className="absolute right-1 top-1 w-7 h-7"
            >
              <X className="w-3.5 h-3.5" />
            </Button>
          )}
        </form>

        {/* Submit 버튼: form 속성으로 form 외부에서 submit 연결 */}
        <Button
          form="comment-form"
          type="submit"
          size="icon"
          disabled={!isLoggedIn || !comment.trim()}
          variant={isLoggedIn && comment.trim() ? "solid" : "ghost"}
          tone={isLoggedIn && comment.trim() ? "primary" : "neutral"}
          className="self-stretch w-9 h-auto rounded-none border-l border-border shrink-0 px-0"
          aria-label="Submit comment"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

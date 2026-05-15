import { Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button/Button";

interface CommentInputProps {
  onSubmit: (comment: string) => void;
  placeholder?: string;
  isLoggedIn: boolean;
}

export default function CommentInput({
  onSubmit,
  placeholder = "댓글을 입력하세요...",
  isLoggedIn,
}: CommentInputProps) {
  const [comment, setComment] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  placeholder = isLoggedIn ? placeholder : "로그인 후 댓글을 작성해주세요";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) return;

    if (comment.trim()) {
      onSubmit(comment.trim());
      setComment("");
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleClear = () => {
    if (!isLoggedIn) return;

    setComment("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.focus();
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (!isLoggedIn) return;

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        120
      )}px`;
    }
  }, [comment, isLoggedIn]);

  return (
    <div className="pt-4 border-t border-border">
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <textarea
          ref={textareaRef}
          value={comment}
          onChange={(e) => isLoggedIn && setComment(e.target.value)}
          onFocus={() => isLoggedIn && setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          rows={1}
          readOnly={!isLoggedIn}
          disabled={!isLoggedIn}
          className={`
          w-full px-4 py-3 pr-24 rounded-xl resize-none
          border transition-all
          focus:outline-none
          placeholder:text-muted-foreground
          ${
            isFocused || comment
              ? "bg-background border-primary"
              : "bg-muted/50 border-border"
          }
        `}
          style={{ minHeight: "48px", maxHeight: "120px" }}
        />

        {/* Clear Button */}
        {comment && (
          <Button
            size="icon"
            variant="ghost"
            onClick={handleClear}
            className="absolute right-14 top-1/2 -translate-y-1/2 w-7 h-7"
          >
            <X className="w-4 h-4" />
          </Button>
        )}

        {/* Submit Button */}

        <Button
          type="submit"
          size="icon"
          disabled={!isLoggedIn || !comment.trim()}
          variant={isLoggedIn && comment.trim() ? "solid" : "ghost"}
          className={`
          absolute right-3 top-1/2 -translate-y-1/2
          transition-all rounded-full
        `}
          aria-label="Submit comment"
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
}

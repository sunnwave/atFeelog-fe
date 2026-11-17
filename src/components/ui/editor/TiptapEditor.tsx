import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Minus,
  Undo,
  Redo,
  Icon,
} from "lucide-react";
import { useEffect } from "react";
import { IconButton } from "../button/IconButton";

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  maxLength?: number;
  error?: string;
}

export function TiptapEditor({
  content,
  onChange,
  placeholder = "공연을 보며 느꼈던 감정, 인상 깊었던 순간, 특별한 경험 등을 자유롭게 작성해주세요.",
  readOnly = false,
  maxLength = 1000,
  error,
}: TiptapEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    editable: !readOnly,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      CharacterCount.configure({
        limit: maxLength,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: [
          "prose prose-sm max-w-none focus:outline-none min-h-[300px] px-4 py-3",
          "[&_ul]:list-disc [&_ul]:pl-6",
          "[&_ol]:list-decimal [&_ol]:pl-6",
          "[&_blockquote]:border-l-4 [&_blockquote]:border-border [&_blockquote]:pl-4 [&_blockquote]:text-muted-foreground",
        ].join(" "),
      },
    },
  });

  useEffect(() => {
    if (!editor) return;

    const current = editor.getHTML();
    if (current !== content) {
      editor.commands.setContent(content, { emitUpdate: false }); // false: 히스토리에 안 남김
    }
  }, [editor, content]);

  if (!editor) {
    return null;
  }

  const charCount = editor.storage.characterCount.characters();
  const charLimit = maxLength;

  return (
    <div className="space-y-2">
      {/* Editor Container */}
      <div
        className={`
          rounded-2xl border bg-card overflow-hidden transition-all
          ${error ? "border-red-500 animate-shake" : "border-border"}
        `}
      >
        {/* Toolbar */}
        <div className="flex items-center gap-1 px-3 py-2 border-b border-border bg-muted/30">
          {/* Text Formatting */}
          <IconButton
            aria-label="굵게"
            onClick={() => editor.chain().focus().toggleBold().run()}
            variant={editor.isActive("bold") ? "solid" : "ghost"}
            tone="primary"
            shape="pill"
            title="굵게 (Ctrl+B)"
          >
            <Bold />
          </IconButton>

          <IconButton
            aria-label="기울임"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            variant={editor.isActive("italic") ? "solid" : "ghost"}
            tone="primary"
            shape="pill"
            title="기울임 (Ctrl+I)"
          >
            <Italic />
          </IconButton>

          <div className="w-px h-6 bg-border mx-1" />

          {/* Lists */}
          <IconButton
            aria-label="글머리"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            variant={editor.isActive("bulletList") ? "solid" : "ghost"}
            tone="primary"
            shape="pill"
            title="글머리 기호"
          >
            <List />
          </IconButton>

          <IconButton
            aria-label="번호 매기기"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            variant={editor.isActive("orderedList") ? "solid" : "ghost"}
            tone="primary"
            shape="pill"
            title="번호 매기기"
          >
            <ListOrdered />
          </IconButton>

          <div className="w-px h-6 bg-border mx-1" />

          {/* Blockquote & Divider */}
          <IconButton
            aria-label="인용구"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            variant={editor.isActive("blockquote") ? "solid" : "ghost"}
            tone="primary"
            shape="pill"
            title="인용구"
          >
            <Quote />
          </IconButton>

          <div className="w-px h-6 bg-border mx-1" />

          {/* Undo & Redo */}
          <IconButton
            aria-label="실행 취소"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            variant="ghost"
            tone="primary"
            shape="pill"
            title="실행 취소 (Ctrl+Z)"
          >
            <Undo />
          </IconButton>

          <IconButton
            aria-label="다시 실행"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            variant="ghost"
            tone="primary"
            shape="pill"
            title="다시 실행 (Ctrl+Y)"
          >
            <Redo />
          </IconButton>
        </div>

        {/* Editor Content */}
        <EditorContent editor={editor} />

        {/* Character Count */}
        <div className="px-4 py-2 border-t border-border bg-muted/20">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">
              {charCount === 0 ? "작성된 내용이 없습니다" : "작성 중..."}
            </span>
            <span
              className={`
              font-medium
              ${
                charCount > charLimit * 0.9
                  ? "text-red-500"
                  : "text-muted-foreground"
              }
            `}
            >
              {charCount} / {charLimit}
            </span>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-sm text-red-500 flex items-center gap-1.5">
          {error}
        </p>
      )}
    </div>
  );
}

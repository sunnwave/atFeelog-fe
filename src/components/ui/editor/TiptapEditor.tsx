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
} from "lucide-react";
import { useEffect } from "react";

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
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`
              p-2 rounded-lg transition-colors
              ${
                editor.isActive("bold")
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted text-muted-foreground hover:text-foreground"
              }
            `}
            title="굵게 (Ctrl+B)"
          >
            <Bold className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`
              p-2 rounded-lg transition-colors
              ${
                editor.isActive("italic")
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted text-muted-foreground hover:text-foreground"
              }
            `}
            title="기울임 (Ctrl+I)"
          >
            <Italic className="w-4 h-4" />
          </button>

          <div className="w-px h-6 bg-border mx-1" />

          {/* Lists */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`
              p-2 rounded-lg transition-colors
              ${
                editor.isActive("bulletList")
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted text-muted-foreground hover:text-foreground"
              }
            `}
            title="글머리 기호"
          >
            <List className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`
              p-2 rounded-lg transition-colors
              ${
                editor.isActive("orderedList")
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted text-muted-foreground hover:text-foreground"
              }
            `}
            title="번호 매기기"
          >
            <ListOrdered className="w-4 h-4" />
          </button>

          <div className="w-px h-6 bg-border mx-1" />

          {/* Blockquote & Divider */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`
              p-2 rounded-lg transition-colors
              ${
                editor.isActive("blockquote")
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted text-muted-foreground hover:text-foreground"
              }
            `}
            title="인용구"
          >
            <Quote className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            title="구분선"
          >
            <Minus className="w-4 h-4" />
          </button>

          <div className="w-px h-6 bg-border mx-1" />

          {/* Undo & Redo */}
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            title="실행 취소 (Ctrl+Z)"
          >
            <Undo className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            title="다시 실행 (Ctrl+Y)"
          >
            <Redo className="w-4 h-4" />
          </button>
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

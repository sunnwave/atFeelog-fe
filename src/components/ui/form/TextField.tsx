import * as React from "react";
import type { FieldValues } from "react-hook-form";
import { cn } from "@/shared/utils";
import { TextFieldProps } from "./types";

export function TextField<TFieldValues extends FieldValues>({
  id,
  testId,
  name,
  type = "text",
  rightSlot,
  register,
  className,
  error,
  ...props
}: TextFieldProps<TFieldValues>) {
  const inputId = id ?? String(name); // id가 명시적으로 주어지지 않으면 name을 id로 사용

  return (
    <div className="relative">
      <input
        data-testid={testId}
        id={inputId}
        type={type}
        {...register(name)}
        {...props}
        className={cn(
          `
          w-full h-11 px-4 rounded-xl border bg-card
          transition-all duration-200
          placeholder:text-muted-foreground/50
          focus:outline-none focus:ring-2 focus:ring-primary/50
          ${
            error
              ? "border-red-500 focus:ring-red-500/50"
              : "border-border hover:border-primary/50"
          }
        `,
          className,
        )}
      />

      {rightSlot ? (
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {rightSlot}
        </div>
      ) : null}
    </div>
  );
}

export default TextField;

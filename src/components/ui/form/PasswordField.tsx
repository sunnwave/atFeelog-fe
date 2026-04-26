import * as React from "react";
import type { FieldValues, PathValue } from "react-hook-form";
import { Eye, EyeOff, X } from "lucide-react";
import { Button } from "@/components/ui/button/Button";
import { PasswordFieldProps } from "./types";
import TextField from "./TextField";

export function PasswordField<TFieldValues extends FieldValues>({
  id,
  testId,
  name,
  placeholder = "8자 이상",
  autoComplete = "new-password",
  register,
  watch,
  setValue,
  error,
  ...props
}: PasswordFieldProps<TFieldValues>) {
  const [show, setShow] = React.useState(false);
  const value = watch(name); // watch는 FieldValues라 값 타입이 넓음
  const canClear = !!value;

  return (
    <TextField<TFieldValues>
      {...props}
      testId={testId}
      id={id}
      type={show ? "text" : "password"}
      name={name}
      register={register}
      error={error}
      autoComplete={autoComplete}
      placeholder={placeholder}
      rightSlot={
        <>
          {canClear ? (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="비밀번호 지우기"
              className="hover:bg-input-background"
              onClick={() =>
                setValue(name, "" as PathValue<TFieldValues, typeof name>)
              }
            >
              <X className="w-5 h-5" />
            </Button>
          ) : null}

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setShow((p) => !p)}
            className="hover:bg-input-background"
            aria-label={show ? "비밀번호 숨기기" : "비밀번호 보기"}
          >
            {show ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </Button>
        </>
      }
    />
  );
}

export default PasswordField;

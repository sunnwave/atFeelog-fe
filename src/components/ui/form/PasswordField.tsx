import * as React from "react";
import type { FieldValues, PathValue } from "react-hook-form";
import { Eye, EyeOff, X } from "lucide-react";
import { PasswordFieldProps } from "./types";
import TextField from "./TextField";
import { IconButton } from "../button/IconButton";

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
            <IconButton
              aria-label="비밀번호 지우기"
              size="xs"
              onClick={() =>
                setValue(name, "" as PathValue<TFieldValues, typeof name>)
              }
              className="hover:bg-input-background"
            >
              <X />
            </IconButton>
          ) : null}

          <IconButton
            size="xs"
            aria-label={show ? "비밀번호 숨기기" : "비밀번호 보기"}
            onClick={() => setShow((p) => !p)}
          >
            {show ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </IconButton>
        </>
      }
    />
  );
}

export default PasswordField;

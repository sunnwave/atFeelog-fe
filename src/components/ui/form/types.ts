import { InputHTMLAttributes } from "react";
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

export type SignUpValues = {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
};

export type LoginValues = {
  email: string;
  password: string;
};

export type TextFieldProps<TFieldValues extends FieldValues> = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "name" | "value" | "defaultValue" | "onChange"
> & {
  id?: string;
  testId?: string;
  name: Path<TFieldValues>;
  rightSlot?: React.ReactNode;
  register: UseFormRegister<TFieldValues>;
  error?: FieldError;
};

export type PasswordFieldProps<TFieldValues extends FieldValues> = Omit<
  TextFieldProps<TFieldValues>,
  "rightSlot" | "type"
> & {
  watch: UseFormWatch<TFieldValues>;
  setValue: UseFormSetValue<TFieldValues>;
  autoComplete?: string; // (원하면 TextFieldProps에 원래도 있으니 사실 없어도 됨)
};

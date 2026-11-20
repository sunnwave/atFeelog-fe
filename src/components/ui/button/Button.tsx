import * as React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/shared/utils/cn";

const buttonVariants = cva(
  [
    "inline-flex w-fit shrink-0 items-center justify-center gap-2 whitespace-nowrap",
    "cursor-pointer select-none border font-semibold transition-all duration-150 ease-out",
    "outline-none focus-visible:ring-2 focus-visible:ring-ring/20 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    "data-[loading=true]:pointer-events-none",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    "aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20",
  ],
  {
    variants: {
      variant: {
        solid: "",
        outline: "border-[1.5px] bg-transparent",
        ghost: "border-transparent bg-transparent",
        link: [
          "h-auto border-none bg-transparent p-0",
          "underline-offset-4 underline",
        ],
      },
      tone: {
        primary: "",
        accent: "",
        neutral: "",
        destructive: "focus-visible:ring-destructive/20",
      },
      size: {
        sm: "h-[28px] px-[12px] text-[12px] leading-[16px] [&_svg]:size-[14px]",
        md: "h-[36px] px-[16px] text-[14px] leading-[20px] [&_svg]:size-[16px]",
        lg: "h-[44px] px-[20px] text-[16px] leading-[24px] [&_svg]:size-[20px]",
      },
      shape: {
        square: "rounded-none",
        pill: "rounded-full",
      },
    },
    compoundVariants: [
      {
        variant: "solid",
        tone: "primary",
        class:
          "border-primary bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-pressed",
      },
      {
        variant: "solid",
        tone: "accent",
        class:
          "border-primary bg-accent text-foreground hover:bg-button-solid-accent-hover-background active:bg-button-accent-active-background",
      },
      {
        variant: "solid",
        tone: "neutral",
        class:
          "border-transparent bg-button-neutral-background-default text-foreground hover:bg-button-neutral-background-hover-default active:border-button-neutral-border-strong active:bg-button-neutral-background-default",
      },
      {
        variant: "solid",
        tone: "destructive",
        class:
          "border-destructive bg-destructive text-destructive-foreground hover:bg-button-destructive-background-hover-strong active:bg-button-destructive-background-active-strong",
      },
      {
        variant: "outline",
        tone: "primary",
        class:
          "border-primary text-primary hover:bg-muted  active:bg-primary-pressed active:text-primary-foreground",
      },
      {
        variant: "outline",
        tone: "accent",
        class:
          "border-primary text-foreground hover:bg-accent active:bg-button-accent-active-background",
      },
      {
        variant: "outline",
        tone: "neutral",
        class:
          "border-muted-foreground text-muted-foreground hover:bg-button-neutral-background-hover-subtle hover:text-foreground active:bg-button-neutral-background-default",
      },
      {
        variant: "outline",
        tone: "destructive",
        class:
          "border-destructive text-destructive hover:bg-button-destructive-background-soft active:bg-button-destructive-background-active",
      },
      {
        variant: "ghost",
        tone: "primary",
        class: "text-foreground hover:bg-muted active:bg-surface-soft",
      },
      {
        variant: "ghost",
        tone: "accent",
        class:
          "text-foreground hover:bg-accent active:bg-button-accent-active-background",
      },
      {
        variant: "ghost",
        tone: "neutral",
        class:
          "text-muted-foreground hover:bg-button-neutral-background-soft hover:text-foreground active:bg-button-neutral-background-default",
      },
      {
        variant: "ghost",
        tone: "destructive",
        class:
          "text-destructive hover:bg-button-destructive-background-soft active:bg-button-destructive-background-active",
      },
      {
        variant: "link",
        tone: "primary",
        class: "text-foreground hover:text-point",
      },
      {
        variant: "link",
        tone: "accent",
        class: "text-foreground hover:text-button-link-accent-hover-foreground",
      },
      {
        variant: "link",
        tone: "neutral",
        class: "text-muted-foreground hover:text-foreground",
      },
      {
        variant: "link",
        tone: "destructive",
        class:
          "text-destructive hover:text-button-destructive-background-hover-strong",
      },
      {
        variant: "outline",
        class: "!border-[1.5px]",
      },
      {
        variant: "link",
        class:
          "h-auto border-none bg-transparent p-0 underline-offset-4 hover:underline",
      },
    ],
    defaultVariants: {
      variant: "solid",
      tone: "primary",
      size: "md",
      shape: "square",
    },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    leadingIcon?: React.ReactNode;
    trailingIcon?: React.ReactNode;
    loading?: boolean;
    loadingLabel?: string;
  };

function Button({
  children,
  className,
  variant,
  tone,
  size,
  shape,
  asChild = false,
  leadingIcon,
  trailingIcon,
  loading = false,
  loadingLabel = "처리 중",
  disabled,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  const isDisabled = disabled || loading;

  return (
    <Comp
      data-slot="button"
      data-loading={loading || undefined}
      aria-busy={loading || undefined}
      aria-disabled={asChild && isDisabled ? true : undefined}
      disabled={asChild ? undefined : isDisabled}
      className={cn(buttonVariants({ variant, tone, size, shape }), className)}
      {...props}
    >
      {loading ? (
        <LoaderCircle aria-hidden="true" className="animate-spin" />
      ) : (
        leadingIcon
      )}
      <Slottable>{loading ? loadingLabel : children}</Slottable>
      {!loading && trailingIcon}
    </Comp>
  );
}

export { Button, buttonVariants, type ButtonProps };

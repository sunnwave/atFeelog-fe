import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils/cn";

const iconButtonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center border border-transparent",
    "cursor-pointer select-none transition-all duration-150 ease-out",
    "outline-none focus-visible:ring-2 focus-visible:ring-ring/20 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        ghost: "bg-transparent",
        outline: "border bg-background",
        solid: "",
      },
      tone: {
        primary: "",
        neutral: "",
        accent: "",
      },
      size: {
        xs: "size-5 [&_svg]:size-4",
        sm: "size-6 [&_svg]:size-5",
        md: "size-7 [&_svg]:size-6",
        lg: "size-8 [&_svg]:size-7",
      },
      shape: {
        square: "rounded-none",
        pill: "rounded-full",
      },
    },
    compoundVariants: [
      {
        variant: "ghost",
        tone: "primary",
        class:
          "text-foreground hover:bg-button-neutral-background-soft active:bg-surface-soft",
      },
      {
        variant: "ghost",
        tone: "neutral",
        class:
          "text-muted-foreground  hover:text-foreground active:bg-button-neutral-background-default",
      },
      {
        variant: "ghost",
        tone: "accent",
        class:
          "text-foreground hover:bg-accent active:bg-button-accent-active-background",
      },
      {
        variant: "outline",
        tone: "primary",
        class:
          "border-primary text-primary hover:bg-primary hover:text-primary-foreground active:bg-primary-pressed active:text-primary-foreground",
      },
      {
        variant: "outline",
        tone: "neutral",
        class:
          "border-button-neutral-border-strong text-muted-foreground hover:bg-button-neutral-background-hover-subtle hover:text-foreground active:bg-button-neutral-background-default",
      },
      {
        variant: "outline",
        tone: "accent",
        class:
          "border-primary text-foreground hover:bg-accent active:bg-button-accent-active-background",
      },
      {
        variant: "solid",
        tone: "primary",
        class:
          "border-primary bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-pressed",
      },
      {
        variant: "solid",
        tone: "neutral",
        class:
          "bg-button-neutral-background-default text-foreground hover:bg-button-neutral-background-hover-default active:bg-button-neutral-background-default",
      },
      {
        variant: "solid",
        tone: "accent",
        class:
          "border-primary bg-accent text-foreground hover:bg-accent active:bg-button-accent-active-background",
      },
    ],
    defaultVariants: {
      variant: "ghost",
      tone: "neutral",
      size: "sm",
      shape: "square",
    },
  },
);

type IconButtonProps = Omit<React.ComponentProps<"button">, "children"> &
  VariantProps<typeof iconButtonVariants> & {
    "aria-label": string;
    children: React.ReactNode;
  };

function IconButton({
  children,
  className,
  size,
  shape,
  tone,
  variant,
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      data-slot="icon-button"
      className={cn(
        iconButtonVariants({ variant, tone, size, shape }),
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export { IconButton, iconButtonVariants, type IconButtonProps };

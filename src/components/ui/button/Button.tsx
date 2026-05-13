import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils/cn";

/**
 * variant — 모양(shape): solid | outline | ghost | link
 * tone    — 색상(color): primary | accent | point | destructive | soft
 *
 * soft  — 사이드바 nav active / 가벼운 CTA용. 흰 카드 배경 + 테두리로 bg-background 위에서 자연스럽게 떠오름.
 *
 * 새 색상 추가 → tone에 값 하나 + compoundVariants에 4줄
 * 새 모양 추가 → variant에 값 하나 + compoundVariants에 4줄
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer rounded-lg text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        solid: "",
        outline: "",
        ghost: "",
        link: "underline-offset-4 hover:underline",
      },
      tone: {
        primary: "",
        accent: "",
        point: "",
        destructive: "focus-visible:ring-destructive/20",
        soft: "",
      },
      size: {
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        md: "h-10 rounded-md px-6 has-[>svg]:px-4",
        lg: "h-12 rounded-md px-8 has-[>svg]:px-6 text-base",
        icon: "size-9 rounded-md",
      },
    },
    compoundVariants: [
      // ── solid ────────────────────────────────────────────────────────
      {
        variant: "solid",
        tone: "primary",
        class:
          "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-pressed",
      },
      {
        variant: "solid",
        tone: "accent",
        class: "bg-accent text-accent-foreground hover:bg-feelog-vanilla-base",
      },
      {
        variant: "solid",
        tone: "point",
        class: "bg-point text-white hover:bg-feelog-coral-base",
      },
      {
        variant: "solid",
        tone: "destructive",
        class: "bg-destructive text-white hover:bg-destructive/90",
      },

      // ── outline ──────────────────────────────────────────────────────
      {
        variant: "outline",
        tone: "primary",
        class: "border border-border text-foreground hover:bg-card/20",
      },
      {
        variant: "outline",
        tone: "accent",
        class:
          "border border-accent-foreground/60 text-accent-foreground hover:bg-accent/20",
      },
      {
        variant: "outline",
        tone: "point",
        class: "border border-point/60 text-point hover:bg-point-bg",
      },
      {
        variant: "outline",
        tone: "destructive",
        class:
          "border border-destructive text-destructive hover:bg-destructive/10",
      },

      // ── ghost ────────────────────────────────────────────────────────
      {
        variant: "ghost",
        tone: "primary",
        class: "text-foreground hover:bg-card/50",
      },
      {
        variant: "ghost",
        tone: "accent",
        class: "text-accent-foreground hover:bg-accent/50",
      },
      {
        variant: "ghost",
        tone: "point",
        class: "text-point hover:bg-point-bg",
      },
      {
        variant: "ghost",
        tone: "destructive",
        class: "text-destructive hover:bg-destructive/10",
      },

      // ── link ─────────────────────────────────────────────────────────
      {
        variant: "link",
        tone: "primary",
        class: "text-feelog-alice-point",
      },
      {
        variant: "link",
        tone: "accent",
        class: "text-accent-foreground",
      },
      {
        variant: "link",
        tone: "point",
        class: "text-point",
      },
      {
        variant: "link",
        tone: "destructive",
        class: "text-destructive",
      },

      // ── soft — 사이드바 nav active / 가벼운 CTA ──────────────────────
      {
        variant: "solid",
        tone: "soft",
        class: "bg-card border border-border text-foreground hover:bg-surface-soft active:bg-muted/80 shadow-sm",
      },
      {
        variant: "outline",
        tone: "soft",
        class: "border border-border text-muted-foreground hover:bg-card hover:text-foreground",
      },
      {
        variant: "ghost",
        tone: "soft",
        class: "text-muted-foreground hover:bg-card hover:text-foreground",
      },
      {
        variant: "link",
        tone: "soft",
        class: "text-muted-foreground hover:text-foreground",
      },
    ],
    defaultVariants: {
      variant: "solid",
      tone: "primary",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  tone,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, tone, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };

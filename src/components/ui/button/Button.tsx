import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils/cn";

/**
 * variant — 버튼 형태
 *
 * solid   : 채워진 기본 버튼
 * outline : 테두리 버튼
 * ghost   : 배경 없는 가벼운 버튼
 * link    : 텍스트 링크형 버튼
 *
 * soft    : 은은한 카드형 버튼. 사이드바 nav, 보조 CTA
 * ticket  : 티켓/아카이브 무드 버튼. My Page, Archive CTA
 * poster  : 강한 포스터형 CTA. Hero, Write 버튼
 *
 * tone — 버튼 색상 역할
 *
 * primary     : 가장 중요한 CTA, Eerie Black
 * accent      : Vanilla, 밝은 보조 CTA
 * alice       : Alice Blue, 정보성 필터/버튼
 * honeydew    : Honeydew, 보조 필터/아카이브 계열
 * point       : Coral Point, 좋아요/강조 액션
 * destructive : 삭제/위험 액션
 */
const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "cursor-pointer select-none shrink-0",
    "border font-medium transition-all duration-150 ease-out",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
    "outline-none",
    "focus-visible:ring-[3px] focus-visible:ring-ring/20 focus-visible:ring-offset-2",
    "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
  ].join(" "),
  {
    variants: {
      variant: {
        solid: "",
        outline: "bg-transparent",
        ghost: "border-transparent bg-transparent",
        link: [
          "h-auto border-transparent bg-transparent p-0",
          "underline-offset-4 hover:underline",
        ].join(" "),

        soft: "shadow-sm",
        ticket: [
          "relative overflow-hidden",
          "after:absolute after:right-8 after:top-0 after:h-full",
          "after:border-l after:border-dashed after:border-current/25",
        ].join(" "),
        poster: [
          "font-black uppercase tracking-[0.14em]",
          "shadow-[3px_3px_0_0_var(--foreground)]",
          "hover:translate-x-[1px] hover:translate-y-[1px]",
          "hover:shadow-[2px_2px_0_0_var(--foreground)]",
          "active:translate-x-[3px] active:translate-y-[3px] active:shadow-none",
        ].join(" "),
      },
      tone: {
        primary: "",
        accent: "",
        alice: "",
        honeydew: "",
        point: "",
        destructive: "focus-visible:ring-destructive/20",
      },
      size: {
        sm: "h-8 rounded-md px-3 text-xs has-[>svg]:px-2.5",
        default: "h-9 rounded-lg px-4 py-2 text-sm has-[>svg]:px-3",
        md: "h-10 rounded-lg px-5 text-sm has-[>svg]:px-4",
        lg: "h-12 rounded-xl px-7 text-base has-[>svg]:px-6",
        icon: "size-9 rounded-lg p-0",
      },
    },
    compoundVariants: [
      // ── solid ────────────────────────────────────────────────────────
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
          "border-primary bg-accent text-foreground hover:bg-feelog-vanilla-base active:bg-feelog-vanilla-soft",
      },
      {
        variant: "solid",
        tone: "alice",
        class:
          "border-info-border bg-info-surface text-info-foreground hover:bg-feelog-alice-light active:bg-feelog-alice-base/70",
      },
      {
        variant: "solid",
        tone: "honeydew",
        class:
          "border-aux-border bg-aux-surface text-aux-foreground hover:bg-feelog-honeydew-light active:bg-feelog-honeydew-base/70",
      },
      {
        variant: "solid",
        tone: "point",
        class:
          "border-point bg-point text-white hover:bg-feelog-coral-base active:bg-feelog-coral-point",
      },
      {
        variant: "solid",
        tone: "destructive",
        class:
          "border-destructive bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/80",
      },

      // ── outline ──────────────────────────────────────────────────────
      {
        variant: "outline",
        tone: "primary",
        class:
          "border-primary text-primary hover:bg-primary hover:text-primary-foreground active:bg-primary-pressed active:text-primary-foreground",
      },
      {
        variant: "outline",
        tone: "accent",
        class:
          "border-primary text-foreground hover:bg-accent active:bg-feelog-vanilla-soft",
      },
      {
        variant: "outline",
        tone: "alice",
        class:
          "border-info-border text-info-foreground hover:bg-info-surface active:bg-feelog-alice-light",
      },
      {
        variant: "outline",
        tone: "honeydew",
        class:
          "border-aux-border text-aux-foreground hover:bg-aux-surface active:bg-feelog-honeydew-light",
      },
      {
        variant: "outline",
        tone: "point",
        class:
          "border-point text-point hover:bg-point hover:text-white active:bg-feelog-coral-base active:text-white",
      },
      {
        variant: "outline",
        tone: "destructive",
        class:
          "border-destructive text-destructive hover:bg-destructive/10 active:bg-destructive/15",
      },

      // ── ghost ────────────────────────────────────────────────────────
      {
        variant: "ghost",
        tone: "primary",
        class: "text-foreground hover:bg-muted active:bg-surface-soft",
      },
      {
        variant: "ghost",
        tone: "accent",
        class: "text-foreground hover:bg-accent active:bg-feelog-vanilla-soft",
      },
      {
        variant: "ghost",
        tone: "alice",
        class:
          "text-info-foreground hover:bg-info-surface active:bg-feelog-alice-light",
      },
      {
        variant: "ghost",
        tone: "honeydew",
        class:
          "text-aux-foreground hover:bg-aux-surface active:bg-feelog-honeydew-light",
      },
      {
        variant: "ghost",
        tone: "point",
        class: "text-point hover:bg-point-bg active:bg-feelog-coral-light/40",
      },
      {
        variant: "ghost",
        tone: "destructive",
        class:
          "text-destructive hover:bg-destructive/10 active:bg-destructive/15",
      },

      // ── link ─────────────────────────────────────────────────────────
      {
        variant: "link",
        tone: "primary",
        class: "text-foreground hover:text-point",
      },
      {
        variant: "link",
        tone: "accent",
        class: "text-foreground hover:text-feelog-vanilla-point",
      },
      {
        variant: "link",
        tone: "alice",
        class: "text-info-foreground hover:text-feelog-alice-deep",
      },
      {
        variant: "link",
        tone: "honeydew",
        class: "text-aux-foreground hover:text-feelog-honeydew-point",
      },
      {
        variant: "link",
        tone: "point",
        class: "text-point hover:text-feelog-coral-base",
      },
      {
        variant: "link",
        tone: "destructive",
        class: "text-destructive hover:text-destructive/80",
      },

      // ── soft custom ──────────────────────────────────────────────────
      {
        variant: "soft",
        tone: "primary",
        class:
          "border-border bg-card text-foreground shadow-sm hover:border-primary hover:bg-surface-soft active:bg-muted",
      },
      {
        variant: "soft",
        tone: "accent",
        class:
          "border-feelog-vanilla-soft bg-feelog-vanilla-tint text-foreground hover:bg-accent active:bg-feelog-vanilla-soft",
      },
      {
        variant: "soft",
        tone: "alice",
        class:
          "border-info-border bg-feelog-alice-tint text-info-foreground hover:bg-info-surface active:bg-feelog-alice-light",
      },
      {
        variant: "soft",
        tone: "honeydew",
        class:
          "border-aux-border bg-feelog-honeydew-tint text-aux-foreground hover:bg-aux-surface active:bg-feelog-honeydew-light",
      },
      {
        variant: "soft",
        tone: "point",
        class:
          "border-feelog-coral-light bg-point-bg text-point hover:bg-feelog-coral-light/35 active:bg-feelog-coral-light/50",
      },
      {
        variant: "soft",
        tone: "destructive",
        class:
          "border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive/15 active:bg-destructive/20",
      },

      // ── ticket custom ────────────────────────────────────────────────
      {
        variant: "ticket",
        tone: "primary",
        class:
          "border-primary bg-card text-foreground hover:bg-primary hover:text-primary-foreground active:bg-primary-pressed",
      },
      {
        variant: "ticket",
        tone: "accent",
        class:
          "border-primary bg-accent text-foreground hover:bg-feelog-vanilla-base active:bg-feelog-vanilla-soft",
      },
      {
        variant: "ticket",
        tone: "alice",
        class:
          "border-info-border bg-info-surface text-info-foreground hover:border-primary hover:bg-feelog-alice-light",
      },
      {
        variant: "ticket",
        tone: "honeydew",
        class:
          "border-aux-border bg-aux-surface text-aux-foreground hover:border-primary hover:bg-feelog-honeydew-light",
      },
      {
        variant: "ticket",
        tone: "point",
        class:
          "border-point bg-point-bg text-point hover:bg-point hover:text-white active:bg-feelog-coral-base",
      },
      {
        variant: "ticket",
        tone: "destructive",
        class:
          "border-destructive bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground",
      },

      // ── poster custom ────────────────────────────────────────────────
      {
        variant: "poster",
        tone: "primary",
        class:
          "border-primary bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-pressed",
      },
      {
        variant: "poster",
        tone: "accent",
        class:
          "border-primary bg-accent text-foreground hover:bg-feelog-vanilla-base active:bg-feelog-vanilla-soft",
      },
      {
        variant: "poster",
        tone: "alice",
        class:
          "border-primary bg-info-surface text-info-foreground hover:bg-feelog-alice-light",
      },
      {
        variant: "poster",
        tone: "honeydew",
        class:
          "border-primary bg-aux-surface text-aux-foreground hover:bg-feelog-honeydew-light",
      },
      {
        variant: "poster",
        tone: "point",
        class:
          "border-primary bg-point text-white hover:bg-feelog-coral-base active:bg-feelog-coral-point",
      },
      {
        variant: "poster",
        tone: "destructive",
        class:
          "border-primary bg-destructive text-destructive-foreground hover:bg-destructive/90",
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

import { cva } from "class-variance-authority"

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-white hover:bg-accent/90",
        secondary:
          "border border-line bg-raised text-ink hover:border-line-strong hover:bg-hover",
        ghost:
          "text-ink-soft hover:bg-raised hover:text-ink",
      },
      size: {
        sm: "h-8 px-3 text-[13px]",
        md: "h-10 px-4",
        lg: "h-11 px-5 text-[15px]",
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "md",
    },
  },
)

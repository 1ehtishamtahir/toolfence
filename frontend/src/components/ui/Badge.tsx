import { cva, type VariantProps } from "class-variance-authority"
import type { HTMLAttributes } from "react"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 font-mono text-[11px] leading-4 tracking-wide uppercase",
  {
    variants: {
      tone: {
        neutral:
          "border-line bg-raised text-ink-soft",
        accent:
          "border-accent/30 bg-accent/10 text-accent",
        allow:
          "border-allow/30 bg-allow/10 text-allow",
        deny: "border-deny/30 bg-deny/10 text-deny",
        warn: "border-warn/30 bg-warn/10 text-warn",
      },
    },
    defaultVariants: {
      tone: "neutral",
    },
  },
)

type BadgeProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>

export function Badge({
  className,
  tone,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        badgeVariants({ tone }),
        className,
      )}
      {...props}
    />
  )
}

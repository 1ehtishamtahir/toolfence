import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="max-w-3xl">
        {eyebrow && (
          <p className="tf-label text-accent">
            {eyebrow}
          </p>
        )}

        <h2 className="mt-2.5 text-xl font-semibold tracking-tight text-ink sm:text-2xl">
          {title}
        </h2>

        {description && (
          <p className="mt-2 max-w-2xl text-[13px] leading-6 text-ink-muted">
            {description}
          </p>
        )}
      </div>

      {action && (
        <div className="shrink-0">{action}</div>
      )}
    </div>
  )
}

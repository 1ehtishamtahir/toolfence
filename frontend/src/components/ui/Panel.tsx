import type { HTMLAttributes, ReactNode } from "react"

import { cn } from "@/lib/utils"

type PanelProps = HTMLAttributes<HTMLElement> & {
  title?: ReactNode
  description?: ReactNode
  action?: ReactNode
  bodyClassName?: string
}

export function Panel({
  title,
  description,
  action,
  bodyClassName,
  className,
  children,
  ...props
}: PanelProps) {
  const hasHeader =
    title !== undefined ||
    description !== undefined ||
    action !== undefined

  return (
    <section
      className={cn("tf-panel", className)}
      {...props}
    >
      {hasHeader && (
        <header
          className="
            flex items-start justify-between
            gap-4 border-b border-line
            px-5 py-4
          "
        >
          <div className="min-w-0">
            {title !== undefined && (
              <h3 className="text-sm font-medium text-ink">
                {title}
              </h3>
            )}

            {description !== undefined && (
              <p className="mt-1 text-[13px] leading-5 text-ink-muted">
                {description}
              </p>
            )}
          </div>

          {action !== undefined && (
            <div className="shrink-0">{action}</div>
          )}
        </header>
      )}

      <div
        className={cn("p-5", bodyClassName)}
      >
        {children}
      </div>
    </section>
  )
}

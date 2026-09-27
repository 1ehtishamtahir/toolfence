import { Link } from "react-router-dom"

import { cn } from "@/lib/utils"

type LogoProps = {
  compact?: boolean
  className?: string
  to?: string
}

export function Logo({
  compact = false,
  className,
  to = "/",
}: LogoProps) {
  return (
    <Link
      to={to}
      className={cn(
        "group inline-flex items-center gap-2.5",
        className,
      )}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="4"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-ink-soft"
        />

        <path
          d="M8 7v10M12 7v10M16 7v10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="text-accent"
        />

        <path
          d="M6.5 11h11"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="text-accent"
        />
      </svg>

      <span className="flex items-baseline gap-2">
        <span className="text-[15px] font-semibold tracking-tight text-ink">
          ToolFence
        </span>

        {!compact && (
          <span className="tf-label hidden sm:inline">
            Task-scoped security
          </span>
        )}
      </span>
    </Link>
  )
}

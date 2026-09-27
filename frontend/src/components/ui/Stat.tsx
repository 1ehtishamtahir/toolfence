import type { ReactNode } from "react"

import type { Tone } from "@/lib/policy"
import { cn } from "@/lib/utils"

const toneClass: Record<Tone, string> = {
  neutral: "text-ink",
  accent: "text-accent",
  allow: "text-allow",
  deny: "text-deny",
  warn: "text-warn",
}

type StatProps = {
  label: ReactNode
  value: ReactNode
  detail?: ReactNode
  tone?: Tone
}

export function Stat({
  label,
  value,
  detail,
  tone = "neutral",
}: StatProps) {
  return (
    <div className="tf-panel p-4 sm:p-5">
      <p className="tf-label">{label}</p>

      <p
        className={cn(
          "mt-3 text-2xl font-semibold tracking-tight",
          toneClass[tone],
        )}
      >
        {value}
      </p>

      {detail !== undefined && (
        <p className="mt-1 text-xs leading-5 text-ink-muted">
          {detail}
        </p>
      )}
    </div>
  )
}

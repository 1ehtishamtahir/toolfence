import { Menu } from "lucide-react"

import { Badge } from "@/components/ui/Badge"
import { statusTone } from "@/lib/policy"
import type { PolicyLifecycleStatus } from "@/types/api"

type DashboardHeaderProps = {
  taskId: string
  policyStatus: PolicyLifecycleStatus
  onOpenMenu: () => void
}

export function DashboardHeader({
  taskId,
  policyStatus,
  onOpenMenu,
}: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-line bg-page px-4 sm:px-6">
      <button
        type="button"
        onClick={onOpenMenu}
        aria-label="Open navigation"
        className="
          -ml-1 flex h-9 w-9 items-center
          justify-center rounded-lg text-ink-soft
          transition-colors hover:bg-raised hover:text-ink
          lg:hidden
        "
      >
        <Menu className="h-4 w-4" />
      </button>

      <div className="flex min-w-0 items-center gap-3">
        <span className="tf-label hidden sm:inline">
          Task
        </span>

        <span className="truncate font-mono text-[13px] text-ink">
          {taskId}
        </span>

        <span
          aria-hidden="true"
          className="hidden h-3.5 w-px bg-line sm:block"
        />

        <Badge tone={statusTone(policyStatus)}>
          {policyStatus}
        </Badge>
      </div>

      <div className="ml-auto hidden items-center gap-2 sm:flex">
        <span className="tf-label">
          Observability · read-only
        </span>
      </div>
    </header>
  )
}

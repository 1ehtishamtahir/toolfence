import { Badge } from "@/components/ui/Badge"
import { Panel } from "@/components/ui/Panel"
import { statusTone } from "@/lib/policy"
import type { PolicyLifecycleStatus } from "@/types/api"

type PolicyCardProps = {
  taskId: string
  policyId: string
  status: PolicyLifecycleStatus
  grantedCount: number
}

export function PolicyCard({
  taskId,
  policyId,
  status,
  grantedCount,
}: PolicyCardProps) {
  return (
    <Panel
      title="Active policy"
      description="The policy ToolFence activated for this task."
      action={<Badge tone={statusTone(status)}>{status}</Badge>}
    >
      <dl className="space-y-3.5">
        <div className="flex items-baseline justify-between gap-4">
          <dt className="tf-label">Bound task</dt>

          <dd className="truncate font-mono text-[13px] text-ink">
            {taskId}
          </dd>
        </div>

        <div className="flex items-baseline justify-between gap-4 border-t border-line pt-3.5">
          <dt className="tf-label">Policy ID</dt>

          <dd className="truncate font-mono text-[12px] text-ink-soft">
            {policyId}
          </dd>
        </div>

        <div className="flex items-baseline justify-between gap-4 border-t border-line pt-3.5">
          <dt className="tf-label">Granted authority</dt>

          <dd className="text-[13px] font-medium text-ink">
            {grantedCount} capabilities
          </dd>
        </div>
      </dl>

      <div className="mt-5 rounded-lg border border-line bg-raised/40 p-4">
        <p className="tf-label">Enforcement rule</p>

        <p className="mt-2 text-[13px] leading-5 text-ink-soft">
          Deny by default. Any tool, resource, or argument
          outside the active contract is denied before
          execution.
        </p>
      </div>
    </Panel>
  )
}

import { useOutletContext } from "react-router-dom"

import { AuditTable } from "@/components/dashboard/AuditTable"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { Stat } from "@/components/ui/Stat"
import {
  countDecisions,
  policyEvents,
  taskEvents as filterTaskEvents,
  toExecutionState,
} from "@/lib/policy"
import type { DashboardContextValue } from "@/pages/dashboard/DashboardLayout"

export function AuditPage() {
  const { task, policy, audit } =
    useOutletContext<DashboardContextValue>()

  if (!task || !policy || !audit) {
    return null
  }

  const allTaskEvents = filterTaskEvents(
    audit.events,
    task.taskId,
  )

  const currentPolicy = policyEvents(
    audit.events,
    task.taskId,
    policy.policyId,
  )

  const rows = [...allTaskEvents].reverse().map((event) => ({
    eventId: event.eventId,
    tool: event.tool,
    resource: event.resource,
    decision: event.decision,
    reasonCode: event.reasonCode,
    executionStatus: toExecutionState(
      event.executionStatus,
    ),
    policyId: event.policyId ?? "—",
    timestamp: event.timestamp,
  }))

  const allowedCount = countDecisions(
    allTaskEvents,
    "ALLOW",
  )

  const deniedCount = countDecisions(
    allTaskEvents,
    "DENY",
  )

  return (
    <>
      <SectionHeading
        eyebrow="Authorization evidence"
        title="Audit log"
        description="Append-only authorization evidence for ToolFence-protected requests. ALLOW and DENY decisions remain separate from backend execution status."
      />

      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat
          label="Task events"
          value={String(allTaskEvents.length)}
          detail={`All evidence for ${task.taskId}`}
        />

        <Stat
          label="Current policy"
          value={String(currentPolicy.length)}
          detail="Events matching active policy ID"
        />

        <Stat
          label="Allowed"
          value={String(allowedCount)}
          detail="Requests authorized"
        />

        <Stat
          label="Denied"
          value={String(deniedCount)}
          detail="Blocked before execution"
        />
      </div>

      <div className="mt-8">
        <AuditTable events={rows} />
      </div>

      <p className="mt-5 text-[12px] leading-5 text-ink-muted">
        Audit history may include earlier policy instances and
        deny-by-default events for the same task. The active
        policy is identified independently by its current
        policy ID.
      </p>
    </>
  )
}

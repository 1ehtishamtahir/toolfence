import { useOutletContext } from "react-router-dom"

import { ActivityTimeline } from "@/components/dashboard/ActivityTimeline"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { Panel } from "@/components/ui/Panel"
import { Stat } from "@/components/ui/Stat"
import {
  countDecisions,
  countExecutions,
  describeResult,
  policyEvents,
  toExecutionState,
} from "@/lib/policy"
import type { DashboardContextValue } from "@/pages/dashboard/DashboardLayout"

export function ActivityPage() {
  const { task, policy, audit } =
    useOutletContext<DashboardContextValue>()

  if (!task || !policy || !audit) {
    return null
  }

  const events = policyEvents(
    audit.events,
    task.taskId,
    policy.policyId,
  )

  const recent = [...events]
    .reverse()
    .slice(0, 12)
    .reverse()

  const timelineEvents = recent.map((event) => ({
    id: event.eventId,
    tool: event.tool,
    resource: event.resource,
    decision: event.decision,
    executionStatus: toExecutionState(
      event.executionStatus,
    ),
    result: describeResult(
      event.tool,
      event.decision,
      event.executionStatus,
      event.reasonCode,
    ),
  }))

  const allowedCount = countDecisions(events, "ALLOW")

  const deniedCount = countDecisions(events, "DENY")

  const successfulCount = countExecutions(events)

  return (
    <>
      <SectionHeading
        eyebrow="Runtime activity"
        title="Protected tool activity"
        description="Every protected request is checked against the active task capability contract before ToolFence permits backend execution."
      />

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <Stat
          label="Requests"
          value={String(events.length)}
          detail="Recorded for current policy"
        />

        <Stat
          label="Allowed"
          value={String(allowedCount)}
          detail={`${successfulCount} executed successfully`}
        />

        <Stat
          label="Denied"
          value={String(deniedCount)}
          detail="Not forwarded to the backend"
        />
      </div>

      <div className="mt-8">
        {timelineEvents.length > 0 ? (
          <ActivityTimeline events={timelineEvents} />
        ) : (
          <Panel title="Protected tool timeline">
            <div className="py-6 text-center">
              <p className="text-sm font-medium text-ink">
                No protected tool activity yet
              </p>

              <p className="mt-1.5 text-[13px] leading-5 text-ink-muted">
                Runtime events appear here after Bob invokes
                ToolFence-protected tools.
              </p>
            </div>
          </Panel>
        )}
      </div>
    </>
  )
}

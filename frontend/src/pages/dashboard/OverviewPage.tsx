import { useOutletContext } from "react-router-dom"

import { SecurityFlow } from "@/components/dashboard/SecurityFlow"
import { TaskOverview } from "@/components/dashboard/TaskOverview"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { Stat } from "@/components/ui/Stat"
import {
  countDecisions,
  countExecutions,
  latestOf,
  policyEvents,
} from "@/lib/policy"
import type { DashboardContextValue } from "@/pages/dashboard/DashboardLayout"

export function OverviewPage() {
  const { task, policy, capabilities, audit } =
    useOutletContext<DashboardContextValue>()

  if (!task || !policy || !capabilities || !audit) {
    return null
  }

  const events = policyEvents(
    audit.events,
    task.taskId,
    policy.policyId,
  )

  const successfulExecutions = countExecutions(events)

  const deniedRequests = countDecisions(events, "DENY")

  const latest = latestOf(events)

  return (
    <>
      <TaskOverview
        taskId={task.taskId}
        task={task.task}
        policyId={policy.policyId}
        grantedCount={capabilities.granted}
        totalCapabilities={capabilities.total}
        privilegeReduction={
          capabilities.privilegeReductionPercent
        }
        result="Live ToolFence runtime"
        resultDetail={`${successfulExecutions} successful executions · ${deniedRequests} denied requests`}
      />

      <div className="mt-8">
        <SectionHeading
          eyebrow="Runtime state"
          title="Latest protected request"
          description="The most recent protected tool request recorded for the active ToolFence policy."
        />

        <div className="mt-5">
          <SecurityFlow
            decision={latest?.decision ?? "ALLOW"}
            tool={
              latest?.tool ??
              policy.grants[0]?.tool ??
              "ticket.get"
            }
            resource={
              latest?.resource ??
              policy.grants[0]?.resource ??
              "—"
            }
          />
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat
          label="Policy state"
          value={policy.status}
          detail="Current lifecycle state"
        />

        <Stat
          label="Granted"
          value={`${capabilities.granted}/${capabilities.total}`}
          detail="Protected capabilities"
        />

        <Stat
          label="Privilege reduction"
          value={`${capabilities.privilegeReductionPercent}%`}
          detail="Capabilities excluded"
        />

        <Stat
          label="Audit evidence"
          value={String(events.length)}
          detail="Events for this policy"
        />
      </div>
    </>
  )
}

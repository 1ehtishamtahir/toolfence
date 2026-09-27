import { useOutletContext } from "react-router-dom"

import { CapabilityMatrix } from "@/components/dashboard/CapabilityMatrix"
import { PolicyCard } from "@/components/dashboard/PolicyCard"
import { SecurityFlow } from "@/components/dashboard/SecurityFlow"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { Stat } from "@/components/ui/Stat"
import { latestOf, policyEvents } from "@/lib/policy"
import type { DashboardContextValue } from "@/pages/dashboard/DashboardLayout"

export function PolicyPage() {
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

  const latest = latestOf(events)

  return (
    <>
      <SectionHeading
        eyebrow="Policy enforcement"
        title="Current capability boundary"
        description="The policy ToolFence activated for the current task. It does not expose or substitute the trusted developer approval ceiling."
      />

      <div className="mt-5 grid gap-5 xl:grid-cols-[0.72fr_1.28fr] xl:items-start">
        <PolicyCard
          taskId={task.taskId}
          policyId={policy.policyId}
          status={policy.status}
          grantedCount={policy.grantedCount}
        />

        <CapabilityMatrix
          capabilities={capabilities.capabilities.map(
            (capability) => ({
              tool: capability.tool,
              granted: capability.granted,
              resource: capability.resource ?? undefined,
            }),
          )}
        />
      </div>

      <div className="mt-8">
        <SectionHeading
          eyebrow="Request path"
          title="Deterministic execution flow"
          description="Bob proposes a protected action. ToolFence independently checks the active policy before backend execution is allowed."
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

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Stat
          label="Granted capabilities"
          value={`${capabilities.granted}/${capabilities.total}`}
          detail="Available through the active policy"
        />

        <Stat
          label="Excluded capabilities"
          value={String(capabilities.excluded)}
          detail="Unavailable to this task"
        />

        <Stat
          label="Privilege reduction"
          value={`${capabilities.privilegeReductionPercent}%`}
          detail="Reduction from full inventory"
        />
      </div>
    </>
  )
}

import { Badge } from "@/components/ui/Badge"
import { Panel } from "@/components/ui/Panel"
import {
  decisionTone,
  executionTone,
  formatTimestamp,
} from "@/lib/policy"
import type { PolicyDecision } from "@/types/api"

export type AuditTableRow = {
  eventId: number
  tool: string
  resource: string
  decision: PolicyDecision
  reasonCode: string
  executionStatus: "EXECUTED" | "NOT_EXECUTED" | "FAILED"
  policyId: string
  timestamp: string | null
}

type AuditTableProps = {
  events: AuditTableRow[]
}

export function AuditTable({ events }: AuditTableProps) {
  if (events.length === 0) {
    return (
      <Panel title="Audit log" bodyClassName="p-0">
        <p className="px-5 py-10 text-center text-[13px] text-ink-muted">
          No authorization evidence recorded for this task
          yet.
        </p>
      </Panel>
    )
  }

  return (
    <Panel
      title="Audit log"
      description="Append-only authorization evidence, newest first."
      bodyClassName="p-0"
      action={<Badge>{events.length} records</Badge>}
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1040px] border-collapse text-left">
          <thead>
            <tr className="border-b border-line">
              <th className="tf-label px-5 py-3 font-normal">
                #
              </th>

              <th className="tf-label px-5 py-3 font-normal">
                Tool
              </th>

              <th className="tf-label px-5 py-3 font-normal">
                Resource
              </th>

              <th className="tf-label px-5 py-3 font-normal">
                Decision
              </th>

              <th className="tf-label px-5 py-3 font-normal">
                Reason
              </th>

              <th className="tf-label px-5 py-3 font-normal">
                Execution
              </th>

              <th className="tf-label px-5 py-3 font-normal">
                Time
              </th>

              <th className="tf-label px-5 py-3 font-normal">
                Policy
              </th>
            </tr>
          </thead>

          <tbody>
            {events.map((event) => (
              <tr
                key={event.eventId}
                className="border-b border-line last:border-0"
              >
                <td className="px-5 py-3 font-mono text-[12px] text-ink-muted">
                  {event.eventId}
                </td>

                <td className="px-5 py-3 font-mono text-[13px] text-ink">
                  {event.tool}
                </td>

                <td className="px-5 py-3 font-mono text-[12px] text-ink-soft">
                  {event.resource}
                </td>

                <td className="px-5 py-3">
                  <Badge tone={decisionTone(event.decision)}>
                    {event.decision}
                  </Badge>
                </td>

                <td className="px-5 py-3 font-mono text-[12px] text-ink-soft">
                  {event.reasonCode}
                </td>

                <td className="px-5 py-3">
                  <Badge
                    tone={executionTone(event.executionStatus)}
                  >
                    {event.executionStatus === "EXECUTED"
                      ? "executed"
                      : event.executionStatus === "FAILED"
                        ? "failed"
                        : "not executed"}
                  </Badge>
                </td>

                <td className="px-5 py-3 font-mono text-[12px] text-ink-muted">
                  {formatTimestamp(event.timestamp)}
                </td>

                <td className="max-w-[140px] truncate px-5 py-3 font-mono text-[12px] text-ink-muted">
                  {event.policyId}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="border-t border-line px-5 py-3.5 text-[12px] text-ink-muted">
        Authorization and execution are separate facts: an
        ALLOW decision does not imply backend success, and a
        DENY is never forwarded.
      </p>
    </Panel>
  )
}

import { Badge } from "@/components/ui/Badge"
import { Panel } from "@/components/ui/Panel"
import {
  cn,
} from "@/lib/utils"
import type { PolicyDecision } from "@/lib/policy"
import { executionTone, decisionTone } from "@/lib/policy"

export type TimelineEvent = {
  id: number
  tool: string
  resource: string
  decision: PolicyDecision
  executionStatus: "EXECUTED" | "NOT_EXECUTED" | "FAILED"
  result: string
}

const stripeTone: Record<PolicyDecision, string> = {
  ALLOW: "bg-allow",
  DENY: "bg-deny",
}

type ActivityTimelineProps = {
  events: TimelineEvent[]
}

export function ActivityTimeline({
  events,
}: ActivityTimelineProps) {
  return (
    <Panel
      title="Protected tool timeline"
      description="Most recent requests for the active policy, oldest first."
      bodyClassName="p-0"
      action={
        <Badge>{events.length} events</Badge>
      }
    >
      <ul>
        {events.map((event) => (
          <li
            key={event.id}
            className="relative flex items-start gap-4 border-b border-line px-5 py-4 last:border-0"
          >
            <span
              aria-hidden="true"
              className={cn(
                "absolute inset-y-0 left-0 w-0.5",
                stripeTone[event.decision],
              )}
            />

            <span className="mt-0.5 w-12 shrink-0 font-mono text-[11px] text-ink-muted">
              #{event.id}
            </span>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="font-mono text-[13px] text-ink">
                  {event.tool}
                </span>

                <span className="truncate font-mono text-[12px] text-ink-muted">
                  {event.resource}
                </span>
              </div>

              <p className="mt-1 text-[13px] leading-5 text-ink-soft">
                {event.result}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <Badge tone={decisionTone(event.decision)}>
                {event.decision}
              </Badge>

              <Badge
                tone={executionTone(event.executionStatus)}
                className="hidden sm:inline-flex"
              >
                {event.executionStatus === "EXECUTED"
                  ? "executed"
                  : event.executionStatus === "FAILED"
                    ? "failed"
                    : "not executed"}
              </Badge>
            </div>
          </li>
        ))}
      </ul>
    </Panel>
  )
}

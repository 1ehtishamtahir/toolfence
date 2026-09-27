import { Badge } from "@/components/ui/Badge"
import { cn } from "@/lib/utils"
import type { PolicyDecision } from "@/types/api"

type SecurityFlowProps = {
  decision: PolicyDecision
  tool: string
  resource: string
}

export function SecurityFlow({
  decision,
  tool,
  resource,
}: SecurityFlowProps) {
  const allowed = decision === "ALLOW"

  const nodes = [
    {
      step: "01",
      label: "Request",
      value: tool,
      tone: "text-ink",
    },
    {
      step: "02",
      label: "Policy check",
      value: "Active contract",
      tone: "text-ink-soft",
    },
    {
      step: "03",
      label: "Decision",
      value: decision,
      tone: allowed ? "text-allow" : "text-deny",
    },
    {
      step: "04",
      label: "Backend",
      value: allowed ? "Executed" : "Not forwarded",
      tone: allowed ? "text-ink" : "text-ink-muted",
    },
    {
      step: "05",
      label: "Audit",
      value: "Recorded",
      tone: "text-ink-soft",
    },
  ] as const

  return (
    <div className="tf-panel p-5">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {nodes.map((node) => (
          <div
            key={node.step}
            className={cn(
              "rounded-lg border bg-raised/40 p-3.5",
              node.label === "Decision"
                ? allowed
                  ? "border-allow/40"
                  : "border-deny/40"
                : "border-line",
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="tf-label">{node.label}</span>

              <span className="font-mono text-[11px] text-ink-muted">
                {node.step}
              </span>
            </div>

            <p
              className={cn(
                "mt-2.5 truncate text-[13px] font-medium",
                node.tone,
              )}
            >
              {node.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-4">
        <span className="font-mono text-[12px] text-ink">
          {tool}
        </span>

        <span className="font-mono text-[12px] text-ink-muted">
          {resource}
        </span>

        <Badge
          tone={allowed ? "allow" : "deny"}
          className="ml-auto"
        >
          {allowed ? "allowed" : "denied"}
        </Badge>
      </div>
    </div>
  )
}

import { SectionHeading } from "@/components/shared/SectionHeading"
import { Badge } from "@/components/ui/Badge"
import { Panel } from "@/components/ui/Panel"

const WORKFLOW = [
  { tool: "ticket.get", resource: "BUG-17" },
  { tool: "repo.read", resource: "project/src/" },
  { tool: "repo.write", resource: "project/src/cart.py" },
  { tool: "ci.run", resource: "feature/BUG-17" },
  { tool: "ci.status", resource: "feature/BUG-17" },
  {
    tool: "pull_request.create",
    resource: "feature/BUG-17",
  },
] as const

const DECISION_ROWS = [
  { label: "Decision", deny: true },
  { label: "Reason code", deny: false },
  { label: "Execution", deny: false },
  { label: "Result", deny: false },
] as const

export function SecurityDemo() {
  return (
    <section id="security" className="border-t border-line">
      <div className="tf-container py-16 sm:py-24">
        <SectionHeading
          eyebrow="Enforcement"
          title="Denied before execution"
          description="An allow decision and backend success are separate facts. A deny never reaches the backend at all."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <Panel
            title="Legitimate workflow"
            description="Requests inside the active contract."
            action={<Badge tone="allow">6 allowed</Badge>}
          >
            <ul>
              {WORKFLOW.map((step) => (
                <li
                  key={step.tool}
                  className="flex items-center justify-between gap-4 border-b border-line py-2.5 last:border-0"
                >
                  <span className="truncate font-mono text-[13px] text-ink">
                    {step.tool}
                  </span>

                  <span className="hidden truncate font-mono text-[12px] text-ink-muted sm:block">
                    {step.resource}
                  </span>

                  <Badge tone="allow">allow</Badge>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel
            className="border-deny/40"
            title="Forbidden attempt"
            description="A request outside the contract."
            action={<Badge tone="deny">denied</Badge>}
          >
            <p className="tf-label">Request</p>

            <div className="mt-2 font-mono text-[13px] leading-6 text-ink">
              <p>tool: secret.read</p>

              <p className="text-ink-muted">
                resource: production-key
              </p>
            </div>

            <dl className="mt-4 border-t border-line pt-1">
              {DECISION_ROWS.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between border-b border-line py-2.5 last:border-0"
                >
                  <dt className="text-[13px] text-ink-muted">
                    {row.label}
                  </dt>

                  <dd>
                    {row.label === "Decision" ? (
                      <Badge tone="deny">DENY</Badge>
                    ) : (
                      <span className="font-mono text-[12px] text-ink-soft">
                        {row.label === "Reason code"
                          ? "TOOL_NOT_GRANTED"
                          : row.label === "Execution"
                            ? "NOT_EXECUTED"
                            : "null"}
                      </span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-3 text-[13px] leading-5 text-ink-muted">
              ToolFence returned before the protected
              dispatcher — the secret backend was never
              executed.
            </p>
          </Panel>
        </div>
      </div>
    </section>
  )
}

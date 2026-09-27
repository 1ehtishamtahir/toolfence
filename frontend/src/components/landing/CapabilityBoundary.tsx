import { ArrowRight, Check, Minus } from "lucide-react"

import { SectionHeading } from "@/components/shared/SectionHeading"
import { Badge } from "@/components/ui/Badge"
import { Panel } from "@/components/ui/Panel"

const INVENTORY = [
  { tool: "ticket.get", granted: true },
  { tool: "ticket.comment", granted: false },
  { tool: "ticket.delete", granted: false },
  { tool: "repo.read", granted: true },
  { tool: "repo.write", granted: true },
  { tool: "pull_request.create", granted: true },
  { tool: "ci.run", granted: true },
  { tool: "ci.status", granted: true },
  { tool: "release.status", granted: false },
  { tool: "release.deploy", granted: false },
  { tool: "secret.read", granted: false },
] as const

const GRANTS = [
  { tool: "ticket.get", resource: "BUG-17" },
  { tool: "repo.read", resource: "project/*" },
  { tool: "repo.write", resource: "project/src/*" },
  { tool: "ci.run", resource: "feature/BUG-17" },
  { tool: "ci.status", resource: "feature/BUG-17" },
  { tool: "pull_request.create", resource: "feature/BUG-17" },
] as const

const EXCLUDED = [
  "ticket.comment",
  "ticket.delete",
  "release.status",
  "release.deploy",
  "secret.read",
] as const

export function CapabilityBoundary() {
  return (
    <section
      id="capability-boundary"
      className="border-t border-line"
    >
      <div className="tf-container py-16 sm:py-24">
        <SectionHeading
          eyebrow="Capability boundary"
          title="11 capabilities exist. This task gets 6."
          description="Full inventory on the left. The active task contract on the right."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_auto_1fr] lg:items-start">
          <Panel title="Protected inventory">
            <ul>
              {INVENTORY.map((capability) => (
                <li
                  key={capability.tool}
                  className="flex items-center justify-between border-b border-line py-2 last:border-0"
                >
                  <span
                    className={
                      capability.granted
                        ? "font-mono text-[13px] text-ink"
                        : "font-mono text-[13px] text-ink-muted"
                    }
                  >
                    {capability.tool}
                  </span>

                  {capability.granted ? (
                    <Check className="h-4 w-4 text-allow" />
                  ) : (
                    <Minus className="h-4 w-4 text-ink-muted" />
                  )}
                </li>
              ))}
            </ul>
          </Panel>

          <div className="hidden flex-col items-center gap-2 pt-16 text-ink-muted lg:flex">
            <ArrowRight className="h-4 w-4" />

            <span className="tf-label">compile</span>
          </div>

          <Panel
            title="Active task contract"
            action={<Badge tone="accent">6 granted</Badge>}
          >
            <ul>
              {GRANTS.map((grant) => (
                <li
                  key={grant.tool}
                  className="flex items-center justify-between gap-4 border-b border-line py-2 last:border-0"
                >
                  <span className="truncate font-mono text-[13px] text-ink">
                    {grant.tool}
                  </span>

                  <span className="truncate font-mono text-[12px] text-ink-muted">
                    {grant.resource}
                  </span>
                </li>
              ))}
            </ul>

            <p className="tf-label mt-3 border-t border-line pt-3">
              45.45% privilege reduction
            </p>
          </Panel>
        </div>

        <div className="mt-6">
          <p className="tf-label mb-3">Not granted</p>

          <div className="flex flex-wrap gap-2">
            {EXCLUDED.map((tool) => (
              <span
                key={tool}
                className="rounded-md border border-line px-2.5 py-1 font-mono text-[12px] text-ink-muted"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

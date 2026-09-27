import { SectionHeading } from "@/components/shared/SectionHeading"
import { Panel } from "@/components/ui/Panel"

const BOB_ITEMS = [
  "Reads canonical task context",
  "Proposes minimum authority",
  "Reasons about tool needs",
  "Never becomes the authorization authority",
] as const

const CONTROL_PLANE = [
  "Task identity",
  "Approval ceiling",
  "Proposal validation",
  "Policy compiler",
] as const

const DATA_PLANE = [
  "Argument validation",
  "Deterministic evaluation",
  "Protected dispatch",
  "Append-only audit",
] as const

const SERVICE_ITEMS = [
  "Tickets",
  "Repository",
  "CI",
  "Pull requests",
  "Releases",
  "Secrets",
] as const

const PIPELINE = [
  "task context",
  "proposal",
  "validation",
  "policy",
  "evaluation",
  "dispatch",
  "audit",
] as const

type ListProps = {
  items: readonly string[]
}

function HairlineList({ items }: ListProps) {
  return (
    <ul className="mt-4">
      {items.map((item) => (
        <li
          key={item}
          className="border-b border-line py-2 text-[13px] leading-5 text-ink-soft last:border-0"
        >
          {item}
        </li>
      ))}
    </ul>
  )
}

export function ArchitectureSection() {
  return (
    <section id="architecture" className="border-t border-line">
      <div className="tf-container py-16 sm:py-24">
        <SectionHeading
          eyebrow="Architecture"
          title="Three planes, one boundary"
          description="Reasoning, enforcement, and execution are intentionally separate."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <Panel
            title="IBM Bob"
            action={<span className="tf-label">reasoning</span>}
          >
            <HairlineList items={BOB_ITEMS} />
          </Panel>

          <Panel
            title="ToolFence"
            action={<span className="tf-label">enforcement</span>}
          >
            <p className="tf-label mt-4">Control plane</p>

            <HairlineList items={CONTROL_PLANE} />

            <p className="tf-label mt-5 border-t border-line pt-4">
              Data plane
            </p>

            <HairlineList items={DATA_PLANE} />
          </Panel>

          <Panel
            title="Protected MCP tools"
            action={<span className="tf-label">execution</span>}
          >
            <HairlineList items={SERVICE_ITEMS} />

            <p className="mt-4 border-t border-line pt-3 text-[13px] text-ink-muted">
              Reached only through the gateway.
            </p>
          </Panel>
        </div>

        <div className="tf-panel mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 px-5 py-4">
          {PIPELINE.map((step, index) => (
            <span key={step} className="flex items-center gap-3">
              <span className="font-mono text-[12px] text-ink-soft">
                {step}
              </span>

              {index < PIPELINE.length - 1 && (
                <span className="text-ink-muted">→</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

import { SectionHeading } from "@/components/shared/SectionHeading"
import { Panel } from "@/components/ui/Panel"
import { Stat } from "@/components/ui/Stat"

const CATEGORIES = [
  { label: "Legitimate actions", value: "7 / 7" },
  { label: "Resource boundary", value: "5 / 5" },
  { label: "Forbidden actions", value: "4 / 4" },
] as const

export function BenchmarkSection() {
  return (
    <section id="benchmark" className="border-t border-line">
      <div className="tf-container py-16 sm:py-24">
        <SectionHeading
          eyebrow="Benchmark"
          title="16 of 16 replay cases matched"
          description="Deterministic replay of the golden authorization scenarios — ground-truth match, blocking, boundaries, and false denials."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Stat
            label="Cases matched"
            value="16 / 16"
            detail="Ground-truth match 100%"
            tone="accent"
          />

          <Stat
            label="Forbidden blocking"
            value="100%"
            detail="Forbidden actions blocked"
            tone="allow"
          />

          <Stat
            label="Boundary accuracy"
            value="100%"
            detail="Resource-scope cases correct"
          />

          <Stat
            label="False denials"
            value="0%"
            detail="Legitimate actions wrongly denied"
            tone="allow"
          />
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <Panel
            title="Case composition"
            description="16 scenarios grouped by category."
          >
            <ul className="space-y-4">
              {CATEGORIES.map((category) => (
                <li
                  key={category.label}
                  className="flex items-center gap-4"
                >
                  <span className="w-40 shrink-0 text-[13px] text-ink-soft">
                    {category.label}
                  </span>

                  <span
                    aria-hidden="true"
                    className="h-1.5 flex-1 rounded-full bg-raised"
                  >
                    <span className="block h-full w-full rounded-full bg-accent" />
                  </span>

                  <span className="w-10 shrink-0 text-right font-mono text-[12px] text-ink-muted">
                    {category.value}
                  </span>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel
            title="Latency"
            description="Authorization policy evaluation."
          >
            <p className="text-2xl font-semibold tracking-tight text-ink">
              Sub-millisecond
            </p>

            <p className="mt-1 text-[13px] text-ink-muted">
              Mean authorization policy evaluation.
            </p>

            <p className="mt-4 border-t border-line pt-3 text-[13px] leading-5 text-ink-muted">
              Authorization evaluation only — not IBM Bob, MCP,
              network, or backend execution latency.
            </p>
          </Panel>
        </div>
      </div>
    </section>
  )
}

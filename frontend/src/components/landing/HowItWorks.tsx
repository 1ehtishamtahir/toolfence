import { SectionHeading } from "@/components/shared/SectionHeading"

const STEPS = [
  {
    number: "01",
    title: "Canonical task context",
    body: "The agent receives the task identity — never the developer approval ceiling.",
    phase: "control plane",
  },
  {
    number: "02",
    title: "Capability proposal",
    body: "The agent reasons about the minimum tools and resources the task actually requires.",
    phase: "agent reasoning",
  },
  {
    number: "03",
    title: "Trusted validation",
    body: "ToolFence checks the proposal against a separately trusted ceiling the model cannot see.",
    phase: "trust boundary",
  },
  {
    number: "04",
    title: "Policy activation",
    body: "A task-scoped capability contract is compiled and activated for this task only.",
    phase: "control plane",
  },
  {
    number: "05",
    title: "Deterministic enforcement",
    body: "Every protected call is evaluated against the contract. Out-of-scope requests are denied before execution and recorded.",
    phase: "data plane",
  },
] as const

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-line">
      <div className="tf-container py-16 sm:py-24">
        <SectionHeading
          eyebrow="How it works"
          title="From task to enforced boundary"
          description="Five steps separate agent reasoning from protected execution."
        />

        <div className="mt-8">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="flex gap-5 border-b border-line py-6 last:border-0"
            >
              <span className="w-7 shrink-0 font-mono text-[13px] text-accent">
                {step.number}
              </span>

              <div className="min-w-0 flex-1">
                <h3 className="text-[15px] font-medium text-ink">
                  {step.title}
                </h3>

                <p className="mt-1.5 max-w-3xl text-[13px] leading-6 text-ink-muted">
                  {step.body}
                </p>
              </div>

              <span className="tf-label hidden shrink-0 pt-1 sm:block">
                {step.phase}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

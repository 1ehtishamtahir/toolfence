import { Check, X } from "lucide-react"

import { SectionHeading } from "@/components/shared/SectionHeading"

const PROBLEMS = [
  {
    title: "Broad standing access",
    body: "Agents commonly receive every integration — repositories, tickets, CI, deploys, secrets — for the whole session, regardless of the task.",
  },
  {
    title: "Permission drift",
    body: "A task quietly grows new tool requests mid-flight, and there is no deterministic gate that forces the request back to scope.",
  },
  {
    title: "No deterministic boundary",
    body: "If authorization is just model judgment, denials are suggestions. The model can reason its way into being its own authority.",
  },
] as const

const WITHOUT = [
  "Full repository, ticket, and CI access",
  "Secrets reachable from the same session",
  "Approval and execution collapsed together",
  "Decisions that cannot be audited",
] as const

const WITH = [
  "Minimum authority, scoped to one task",
  "Trusted approval ceiling separate from the model",
  "Deterministic ALLOW / DENY before execution",
  "Append-only evidence for every decision",
] as const

export function ProblemSection() {
  return (
    <section id="problem" className="border-t border-line">
      <div className="tf-container py-16 sm:py-24">
        <SectionHeading
          eyebrow="The problem"
          title="Standing access is wider than the task"
          description="Agent tool access is usually a session-wide default. The task itself never defines the boundary."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {PROBLEMS.map((problem) => (
            <div key={problem.title} className="tf-panel p-5">
              <h3 className="text-[15px] font-medium text-ink">
                {problem.title}
              </h3>

              <p className="mt-2 text-[13px] leading-6 text-ink-muted">
                {problem.body}
              </p>
            </div>
          ))}
        </div>

        <div className="tf-panel mt-6 grid sm:grid-cols-2">
          <div className="border-b border-line p-5 sm:border-b-0 sm:border-r">
            <p className="tf-label">Typical agent</p>

            <ul className="mt-4 space-y-3">
              {WITHOUT.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-[13px] leading-5 text-ink-muted"
                >
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-deny" />

                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5">
            <p className="tf-label text-accent">ToolFence</p>

            <ul className="mt-4 space-y-3">
              {WITH.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-[13px] leading-5 text-ink-soft"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-allow" />

                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

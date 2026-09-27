import { useOutletContext } from "react-router-dom"

import { BenchmarkCards } from "@/components/dashboard/BenchmarkCards"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { Stat } from "@/components/ui/Stat"
import type { DashboardContextValue } from "@/pages/dashboard/DashboardLayout"

export function BenchmarkPage() {
  const { benchmark } =
    useOutletContext<DashboardContextValue>()

  if (!benchmark) {
    return null
  }

  return (
    <>
      <SectionHeading
        eyebrow="Security evaluation"
        title="Replay benchmark"
        description="Measured authorization behavior for the ToolFence golden task: blocking accuracy, false denials, privilege reduction, and policy-evaluation latency."
      />

      <div className="mt-5">
        <BenchmarkCards
          matchedCases={benchmark.matchedCases}
          totalCases={benchmark.totalCases}
          forbiddenBlockRate={
            benchmark.forbiddenActionBlockingPercent
          }
          falseDenialRate={benchmark.falseDenialPercent}
          privilegeReduction={
            benchmark.privilegeReductionPercent
          }
          meanEvaluationMs={
            benchmark.meanPolicyEvaluationMs
          }
          maxEvaluationMs={
            benchmark.maxPolicyEvaluationMs
          }
        />
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Stat
          label="Ground-truth match"
          value={`${benchmark.groundTruthMatchPercent}%`}
          detail={`${benchmark.matchedCases}/${benchmark.totalCases} cases matched expected behavior`}
        />

        <Stat
          label="Forbidden blocking"
          value={`${benchmark.forbiddenActionBlockingPercent}%`}
          detail="Forbidden protected actions blocked"
        />

        <Stat
          label="Boundary accuracy"
          value={`${benchmark.boundaryAccuracyPercent}%`}
          detail="Resource-scope cases evaluated correctly"
        />

        <Stat
          label="False denial rate"
          value={`${benchmark.falseDenialPercent}%`}
          detail="Legitimate actions incorrectly denied"
        />

        <Stat
          label="Mean evaluation"
          value={`${benchmark.meanPolicyEvaluationMs.toFixed(4)} ms`}
          detail="Authorization policy-evaluation time"
        />

        <Stat
          label="Maximum evaluation"
          value={`${benchmark.maxPolicyEvaluationMs.toFixed(4)} ms`}
          detail="Slowest policy evaluation"
        />
      </div>

      {benchmark.groups && benchmark.groups.length > 0 && (
        <div className="mt-8">
          <SectionHeading
            eyebrow="Case categories"
            title="Benchmark groups"
            description="Correct benchmark results by test category."
          />

          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {benchmark.groups.map((group) => (
              <Stat
                key={group.label}
                label={group.label}
                value={`${group.correct}/${group.total}`}
                detail="Cases evaluated correctly"
              />
            ))}
          </div>
        </div>
      )}

      <p className="mt-8 text-[12px] leading-5 text-ink-muted">
        Latency values represent ToolFence authorization
        policy-evaluation time only — not end-to-end IBM Bob,
        MCP, network, or backend execution latency.
      </p>
    </>
  )
}

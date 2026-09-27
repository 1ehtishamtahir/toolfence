import { Panel } from "@/components/ui/Panel"
import { Stat } from "@/components/ui/Stat"

type BenchmarkCardsProps = {
  matchedCases: number
  totalCases: number
  forbiddenBlockRate: number
  falseDenialRate: number
  privilegeReduction: number
  meanEvaluationMs: number
  maxEvaluationMs: number
}

export function BenchmarkCards({
  matchedCases,
  totalCases,
  forbiddenBlockRate,
  falseDenialRate,
  privilegeReduction,
  meanEvaluationMs,
  maxEvaluationMs,
}: BenchmarkCardsProps) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat
          label="Cases matched"
          value={`${matchedCases} / ${totalCases}`}
          detail="Ground-truth match"
          tone="accent"
        />

        <Stat
          label="Forbidden blocking"
          value={`${forbiddenBlockRate}%`}
          detail="Forbidden actions blocked"
          tone="allow"
        />

        <Stat
          label="False denials"
          value={`${falseDenialRate}%`}
          detail="Legitimate actions wrongly denied"
          tone="allow"
        />

        <Stat
          label="Privilege reduction"
          value={`${privilegeReduction}%`}
          detail="Capabilities excluded"
        />
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Panel
          title="Mean policy evaluation"
          description="Authorization evaluation time per protected request."
        >
          <p className="text-2xl font-semibold tracking-tight text-ink">
            {meanEvaluationMs.toFixed(4)} ms
          </p>
        </Panel>

        <Panel
          title="Maximum policy evaluation"
          description="Slowest authorization evaluation in the replay run."
        >
          <p className="text-2xl font-semibold tracking-tight text-ink">
            {maxEvaluationMs.toFixed(4)} ms
          </p>
        </Panel>
      </div>
    </>
  )
}

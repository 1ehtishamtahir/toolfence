import { Badge } from "@/components/ui/Badge"

type TaskOverviewProps = {
  taskId: string
  task: string
  policyId: string
  grantedCount: number
  totalCapabilities: number
  privilegeReduction: number
  result: string
  resultDetail: string
}

export function TaskOverview({
  taskId,
  task,
  policyId,
  grantedCount,
  totalCapabilities,
  privilegeReduction,
  result,
  resultDetail,
}: TaskOverviewProps) {
  return (
    <div className="grid gap-5 xl:grid-cols-[1.4fr_1fr]">
      <section className="tf-panel p-5 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <p className="tf-label">Active task</p>

          <Badge tone="accent">protected</Badge>
        </div>

        <h1 className="mt-4 text-xl font-medium leading-8 tracking-tight text-ink sm:text-2xl">
          {task}
        </h1>

        <dl className="mt-5 grid gap-3 border-t border-line pt-4 sm:grid-cols-2">
          <div>
            <dt className="tf-label">Task ID</dt>

            <dd className="mt-1.5 font-mono text-[13px] text-ink">
              {taskId}
            </dd>
          </div>

          <div>
            <dt className="tf-label">Policy ID</dt>

            <dd className="mt-1.5 truncate font-mono text-[13px] text-ink-soft">
              {policyId}
            </dd>
          </div>
        </dl>
      </section>

      <section className="tf-panel p-5 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <p className="tf-label">Current result</p>

          <Badge tone="allow">live</Badge>
        </div>

        <p className="mt-4 text-2xl font-semibold tracking-tight text-ink">
          {grantedCount}
          <span className="text-ink-muted">
            /{totalCapabilities}
          </span>
        </p>

        <p className="mt-1 text-[13px] text-ink-muted">
          capabilities granted · {privilegeReduction}%
          privilege reduction
        </p>

        <div className="mt-5 border-t border-line pt-4">
          <p className="text-sm font-medium text-ink">
            {result}
          </p>

          <p className="mt-1 text-[13px] leading-5 text-ink-muted">
            {resultDetail}
          </p>
        </div>
      </section>
    </div>
  )
}

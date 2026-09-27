import { Badge } from "@/components/ui/Badge"
import { Panel } from "@/components/ui/Panel"

type Capability = {
  tool: string
  granted: boolean
  resource?: string
}

type CapabilityMatrixProps = {
  capabilities: Capability[]
}

export function CapabilityMatrix({
  capabilities,
}: CapabilityMatrixProps) {
  const granted = capabilities.filter(
    (capability) => capability.granted,
  ).length

  const excluded = capabilities.length - granted

  return (
    <Panel
      title="Capability matrix"
      description="Every protected capability and its state under the active policy."
      bodyClassName="p-0"
      action={
        <div className="flex items-center gap-2">
          <Badge tone="allow">{granted} granted</Badge>

          <Badge>{excluded} excluded</Badge>
        </div>
      }
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left">
          <thead>
            <tr className="border-b border-line">
              <th className="tf-label px-5 py-3 font-normal">
                Tool
              </th>

              <th className="tf-label px-5 py-3 font-normal">
                Resource scope
              </th>

              <th className="tf-label px-5 py-3 text-right font-normal">
                State
              </th>
            </tr>
          </thead>

          <tbody>
            {capabilities.map((capability) => (
              <tr
                key={capability.tool}
                className="border-b border-line last:border-0"
              >
                <td
                  className={
                    capability.granted
                      ? "px-5 py-3 font-mono text-[13px] text-ink"
                      : "px-5 py-3 font-mono text-[13px] text-ink-muted"
                  }
                >
                  {capability.tool}
                </td>

                <td className="px-5 py-3 font-mono text-[12px] text-ink-soft">
                  {capability.resource ?? "—"}
                </td>

                <td className="px-5 py-3 text-right">
                  {capability.granted ? (
                    <Badge tone="allow">granted</Badge>
                  ) : (
                    <Badge>excluded</Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="border-t border-line px-5 py-3.5 text-[12px] text-ink-muted">
        Excluded capabilities are denied for this task —
        ToolFence does not forward them to the backend.
      </p>
    </Panel>
  )
}

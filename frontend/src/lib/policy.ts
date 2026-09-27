import type {
  AuditEventResponse,
  PolicyDecision,
  PolicyLifecycleStatus,
} from "@/types/api"

export type { PolicyDecision, PolicyLifecycleStatus }

export type Tone = "neutral" | "accent" | "allow" | "deny" | "warn"

export type ExecutionState =
  | "EXECUTED"
  | "NOT_EXECUTED"
  | "FAILED"

export function toExecutionState(
  status: string,
): ExecutionState {
  if (status === "SUCCEEDED") {
    return "EXECUTED"
  }

  if (status === "FAILED") {
    return "FAILED"
  }

  return "NOT_EXECUTED"
}

export function decisionTone(
  decision: PolicyDecision,
): Tone {
  return decision === "ALLOW" ? "allow" : "deny"
}

export function statusTone(
  status: PolicyLifecycleStatus,
): Tone {
  switch (status) {
    case "ACTIVE":
      return "accent"
    case "COMPLETED":
      return "allow"
    case "REVOKED":
      return "deny"
    case "EXPIRED":
      return "warn"
  }
}

export function executionTone(
  state: ExecutionState,
): Tone {
  if (state === "EXECUTED") {
    return "allow"
  }

  if (state === "FAILED") {
    return "warn"
  }

  return "neutral"
}

export function describeResult(
  tool: string,
  decision: PolicyDecision,
  executionStatus: string,
  reasonCode: string,
): string {
  if (decision === "DENY") {
    return `Blocked by ToolFence · ${reasonCode}`
  }

  if (executionStatus === "FAILED") {
    return `${tool} was authorized, but backend execution failed.`
  }

  if (executionStatus === "SUCCEEDED") {
    return `${tool} authorized and executed successfully.`
  }

  return `${tool} authorization recorded.`
}

export function policyEvents(
  events: AuditEventResponse[],
  taskId: string,
  policyId: string,
): AuditEventResponse[] {
  return events.filter(
    (event) =>
      event.taskId === taskId &&
      event.policyId === policyId,
  )
}

export function taskEvents(
  events: AuditEventResponse[],
  taskId: string,
): AuditEventResponse[] {
  return events.filter(
    (event) => event.taskId === taskId,
  )
}

export function countDecisions(
  events: AuditEventResponse[],
  decision: PolicyDecision,
): number {
  return events.filter(
    (event) => event.decision === decision,
  ).length
}

export function countExecutions(
  events: AuditEventResponse[],
): number {
  return events.filter(
    (event) =>
      event.decision === "ALLOW" &&
      event.executionStatus === "SUCCEEDED",
  ).length
}

export function latestOf(
  events: AuditEventResponse[],
): AuditEventResponse | undefined {
  return events[events.length - 1]
}

export function formatTimestamp(
  value: string | null,
): string {
  if (!value) {
    return "—"
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return date.toLocaleString(undefined, {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })
}

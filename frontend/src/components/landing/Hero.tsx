import { buttonVariants } from "@/components/ui/button-variants"
import { Badge } from "@/components/ui/Badge"
import { ButtonLink } from "@/components/ui/Button"
import { Panel } from "@/components/ui/Panel"
import { cn } from "@/lib/utils"

const REPOSITORY_URL =
  "https://github.com/builtbyrehan/toolfence"

const STATS = [
  { value: "11", label: "protected capabilities" },
  { value: "6", label: "granted for the golden task" },
  { value: "45.45%", label: "privilege reduction" },
] as const

const LOG_ROWS = [
  {
    request: "ticket.get · BUG-17",
    allowed: true,
  },
  {
    request: "repo.write · project/src/*",
    allowed: true,
  },
  {
    request: "ci.run · feature/BUG-17",
    allowed: true,
  },
  {
    request: "secret.read · production-key",
    allowed: false,
  },
] as const

export function Hero() {
  return (
    <section className="tf-container grid items-start gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-28">
      <div>
        <p className="tf-label text-accent">
          Task-scoped security for AI coding agents
        </p>

        <h1 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl">
          Bob reasons.
          <br />
          <span className="text-ink-muted">
            ToolFence enforces.
          </span>
        </h1>

        <p className="mt-5 max-w-xl text-[15px] leading-7 text-ink-soft">
          ToolFence turns one task into a temporary
          capability boundary. The agent proposes the minimum
          authority it needs, a trusted ceiling validates it,
          and every protected call is checked deterministically
          before anything executes.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <ButtonLink to="/dashboard" size="lg" variant="primary">
            Open security console
          </ButtonLink>

          <a
            href="#how-it-works"
            className={cn(
              buttonVariants({ variant: "secondary", size: "lg" }),
            )}
          >
            How it works
          </a>

          <a
            href={REPOSITORY_URL}
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({ variant: "ghost", size: "lg" }),
            )}
          >
            Repository
          </a>
        </div>

        <dl className="mt-12 grid grid-cols-3 divide-x divide-line border-t border-line pt-6">
          {STATS.map((stat) => (
            <div key={stat.label} className="px-5 first:pl-0">
              <dt className="sr-only">{stat.label}</dt>

              <dd>
                <span className="block text-2xl font-semibold tracking-tight text-ink">
                  {stat.value}
                </span>

                <span className="mt-1.5 block text-[12px] leading-4 text-ink-muted">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <Panel
        title="Live decision"
        action={<Badge tone="accent">policy active</Badge>}
      >
        <ul>
          {LOG_ROWS.map((row) => (
            <li
              key={row.request}
              className="flex items-center justify-between gap-4 border-b border-line py-2.5 last:border-0"
            >
              <span className="truncate font-mono text-[12px] text-ink-soft">
                {row.request}
              </span>

              <Badge tone={row.allowed ? "allow" : "deny"}>
                {row.allowed ? "allow" : "deny"}
              </Badge>
            </li>
          ))}
        </ul>

        <p className="mt-3 font-mono text-[12px] leading-5 text-deny">
          reason_code: TOOL_NOT_GRANTED
          <br />
          execution_status: NOT_EXECUTED
        </p>

        <p className="mt-3 border-t border-line pt-3 text-[13px] leading-5 text-ink-muted">
          The secret backend was never invoked — ToolFence
          denied the request before execution.
        </p>
      </Panel>
    </section>
  )
}

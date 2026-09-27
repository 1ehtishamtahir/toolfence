import { Link } from "react-router-dom"

import { Logo } from "@/components/shared/Logo"

const REPOSITORY_URL =
  "https://github.com/builtbyrehan/toolfence"

const PRODUCT_LINKS = [
  { to: "/dashboard", label: "Overview" },
  { to: "/dashboard/policy", label: "Policy" },
  { to: "/dashboard/activity", label: "Activity" },
  { to: "/dashboard/audit", label: "Audit" },
  { to: "/dashboard/benchmark", label: "Benchmark" },
] as const

const PROJECT_LINKS = [
  { href: REPOSITORY_URL, label: "Repository" },
  { to: "/", label: "Home" },
  { to: "/dashboard", label: "Security console" },
] as const

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="tf-container py-12">
        <div className="grid gap-8 sm:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Logo compact />

            <p className="mt-3 max-w-xs text-[13px] leading-6 text-ink-muted">
              Task-scoped security for AI coding agents.
              Deny-by-default enforcement with append-only
              audit evidence.
            </p>
          </div>

          <div>
            <p className="tf-label">Product</p>

            <ul className="mt-3">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="block py-1 text-[13px] text-ink-soft transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="tf-label">Project</p>

            <ul className="mt-3">
              {PROJECT_LINKS.map((link) =>
                "href" in link ? (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="block py-1 text-[13px] text-ink-soft transition-colors hover:text-ink"
                    >
                      {link.label}
                    </a>
                  </li>
                ) : (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="block py-1 text-[13px] text-ink-soft transition-colors hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-5 text-[12px] text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            Task-scoped security · Deterministic enforcement ·
            Auditability
          </p>

          <p>
            Built for the IBM Bob 2.0 Hackathon · lablab.ai
          </p>
        </div>
      </div>
    </footer>
  )
}

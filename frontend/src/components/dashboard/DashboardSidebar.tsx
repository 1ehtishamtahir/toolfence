import {
  Activity,
  FileText,
  Gauge,
  LayoutDashboard,
  ShieldCheck,
} from "lucide-react"
import { NavLink } from "react-router-dom"

import { Logo } from "@/components/shared/Logo"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  {
    to: "/dashboard",
    label: "Overview",
    icon: LayoutDashboard,
    end: true,
  },
  {
    to: "/dashboard/policy",
    label: "Policy",
    icon: ShieldCheck,
    end: false,
  },
  {
    to: "/dashboard/activity",
    label: "Activity",
    icon: Activity,
    end: false,
  },
  {
    to: "/dashboard/audit",
    label: "Audit",
    icon: FileText,
    end: false,
  },
  {
    to: "/dashboard/benchmark",
    label: "Benchmark",
    icon: Gauge,
    end: false,
  },
] as const

type DashboardSidebarProps = {
  onNavigate?: () => void
  className?: string
}

export function DashboardSidebar({
  onNavigate,
  className,
}: DashboardSidebarProps) {
  return (
    <div
      className={cn(
        "flex h-full w-64 flex-col border-r border-line bg-panel",
        className,
      )}
    >
      <div className="flex h-14 items-center border-b border-line px-5">
        <Logo compact />
      </div>

      <nav className="flex-1 space-y-0.5 p-3">
        <p className="tf-label px-2 pb-2 pt-1">
          Security console
        </p>

        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                "relative flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] transition-colors",
                isActive
                  ? "bg-raised text-ink"
                  : "text-ink-soft hover:bg-raised/60 hover:text-ink",
              )
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-1.5 left-0 w-0.5 rounded-full bg-accent"
                  />
                )}

                <item.icon className="h-4 w-4 shrink-0" />

                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-line p-4">
        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-allow"
          />

          <span className="tf-label">Gateway online</span>
        </div>

        <p className="mt-2 text-[12px] leading-5 text-ink-muted">
          Read-only observability bridge. Authorization
          stays in the MCP process.
        </p>
      </div>
    </div>
  )
}

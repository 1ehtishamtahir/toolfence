import { useState } from "react"
import { Outlet } from "react-router-dom"

import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar"
import { Button } from "@/components/ui/Button"
import { useDashboardData } from "@/hooks/useDashboardData"

export type DashboardContextValue =
  ReturnType<typeof useDashboardData>

export function DashboardLayout() {
  const dashboard = useDashboardData()

  const {
    task,
    policy,
    isLoading,
    isError,
    error,
    isFetching,
    refetchAll,
  } = dashboard

  const [menuOpen, setMenuOpen] = useState(false)

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-page px-6">
        <div className="tf-panel w-full max-w-sm p-8 text-center">
          <div
            aria-hidden="true"
            className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-line border-t-accent"
          />

          <p className="mt-4 text-sm font-medium text-ink">
            Loading ToolFence runtime…
          </p>

          <p className="mt-1.5 text-[13px] text-ink-muted">
            Reading policy, capability, audit, and benchmark
            data.
          </p>
        </div>
      </main>
    )
  }

  if (isError || !task || !policy) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to load ToolFence dashboard data."

    return (
      <main className="flex min-h-screen items-center justify-center bg-page px-6">
        <div className="tf-panel w-full max-w-lg border-deny/40 p-7">
          <p className="tf-label text-deny">
            Dashboard data unavailable
          </p>

          <p className="mt-3 text-sm leading-6 text-ink-soft">
            {message}
          </p>

          <Button
            variant="secondary"
            className="mt-5"
            disabled={isFetching}
            onClick={() => {
              void refetchAll()
            }}
          >
            {isFetching ? "Retrying…" : "Retry"}
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen bg-page">
      <aside className="hidden lg:block">
        <div className="fixed inset-y-0 left-0 z-20">
          <DashboardSidebar />
        </div>
      </aside>

      {menuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 bg-black/60"
          />

          <div className="absolute inset-y-0 left-0">
            <DashboardSidebar
              onNavigate={() => setMenuOpen(false)}
            />
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col lg:ml-64">
        <DashboardHeader
          taskId={task.taskId}
          policyStatus={policy.status}
          onOpenMenu={() => setMenuOpen(true)}
        />

        <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 xl:px-8">
          <Outlet context={dashboard} />

          <div className="mt-10 flex flex-col gap-3 border-t border-line pt-5 pb-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-[12px] leading-5 text-ink-muted">
              Live dashboard data is read from the ToolFence
              FastAPI observability bridge. Authorization
              continues to use the trusted in-memory policy
              store.
            </p>

            <Button
              variant="secondary"
              size="sm"
              disabled={isFetching}
              onClick={() => {
                void refetchAll()
              }}
            >
              {isFetching ? "Refreshing…" : "Refresh data"}
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

import {
  lazy,
  Suspense,
  type ReactNode,
} from "react"
import { createBrowserRouter } from "react-router-dom"

const LandingPage = lazy(async () => {
  const module = await import("@/pages/landing/LandingPage")

  return {
    default: module.LandingPage,
  }
})

const DashboardLayout = lazy(async () => {
  const module = await import("@/pages/dashboard/DashboardLayout")

  return {
    default: module.DashboardLayout,
  }
})

const OverviewPage = lazy(async () => {
  const module = await import("@/pages/dashboard/OverviewPage")

  return {
    default: module.OverviewPage,
  }
})

const PolicyPage = lazy(async () => {
  const module = await import("@/pages/dashboard/PolicyPage")

  return {
    default: module.PolicyPage,
  }
})

const ActivityPage = lazy(async () => {
  const module = await import("@/pages/dashboard/ActivityPage")

  return {
    default: module.ActivityPage,
  }
})

const AuditPage = lazy(async () => {
  const module = await import("@/pages/dashboard/AuditPage")

  return {
    default: module.AuditPage,
  }
})

const BenchmarkPage = lazy(async () => {
  const module = await import("@/pages/dashboard/BenchmarkPage")

  return {
    default: module.BenchmarkPage,
  }
})

const NotFoundPage = lazy(async () => {
  const module = await import("@/pages/Errors")

  return {
    default: module.NotFoundPage,
  }
})

const RouteErrorPage = lazy(async () => {
  const module = await import("@/pages/Errors")

  return {
    default: module.RouteErrorPage,
  }
})

function RouteFallback() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-page">
      <div className="text-center">
        <div
          aria-hidden="true"
          className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-line border-t-accent"
        />

        <p className="tf-label mt-4">
          Loading ToolFence
        </p>
      </div>
    </main>
  )
}

function LazyRoute({
  children,
}: {
  children: ReactNode
}) {
  return (
    <Suspense fallback={<RouteFallback />}>
      {children}
    </Suspense>
  )
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <LazyRoute>
        <LandingPage />
      </LazyRoute>
    ),
    errorElement: (
      <LazyRoute>
        <RouteErrorPage />
      </LazyRoute>
    ),
  },

  {
    path: "/dashboard",
    element: (
      <LazyRoute>
        <DashboardLayout />
      </LazyRoute>
    ),
    errorElement: (
      <LazyRoute>
        <RouteErrorPage />
      </LazyRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <LazyRoute>
            <OverviewPage />
          </LazyRoute>
        ),
      },
      {
        path: "policy",
        element: (
          <LazyRoute>
            <PolicyPage />
          </LazyRoute>
        ),
      },
      {
        path: "activity",
        element: (
          <LazyRoute>
            <ActivityPage />
          </LazyRoute>
        ),
      },
      {
        path: "audit",
        element: (
          <LazyRoute>
            <AuditPage />
          </LazyRoute>
        ),
      },
      {
        path: "benchmark",
        element: (
          <LazyRoute>
            <BenchmarkPage />
          </LazyRoute>
        ),
      },
    ],
  },

  {
    path: "*",
    element: (
      <LazyRoute>
        <NotFoundPage />
      </LazyRoute>
    ),
    errorElement: (
      <LazyRoute>
        <RouteErrorPage />
      </LazyRoute>
    ),
  },
])

import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom"

import { ButtonLink } from "@/components/ui/Button"

export function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-page px-6">
      <div className="text-center">
        <p className="tf-label text-accent">404</p>

        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-ink">
          Page not found
        </h1>

        <p className="mt-2 text-[13px] text-ink-muted">
          This route does not exist.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <ButtonLink to="/" variant="primary">
            Home
          </ButtonLink>

          <ButtonLink to="/dashboard">
            Security console
          </ButtonLink>
        </div>
      </div>
    </main>
  )
}

export function RouteErrorPage() {
  const error = useRouteError()

  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : "An unexpected error occurred."

  return (
    <main className="flex min-h-screen items-center justify-center bg-page px-6">
      <div className="tf-panel w-full max-w-lg border-deny/40 p-7">
        <p className="tf-label text-deny">Route error</p>

        <h1 className="mt-3 text-lg font-semibold text-ink">
          Something went wrong
        </h1>

        <p className="mt-2 font-mono text-[13px] leading-6 text-ink-soft">
          {message}
        </p>

        <div className="mt-5 flex gap-3">
          <ButtonLink to="/" variant="primary" size="sm">
            Home
          </ButtonLink>

          <Link
            to="/dashboard"
            className="text-[13px] text-accent underline-offset-4 hover:underline"
          >
            Security console
          </Link>
        </div>
      </div>
    </main>
  )
}

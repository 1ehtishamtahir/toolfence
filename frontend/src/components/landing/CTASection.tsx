import { buttonVariants } from "@/components/ui/button-variants"
import { ButtonLink } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

const REPOSITORY_URL =
  "https://github.com/builtbyrehan/toolfence"

export function CTASection() {
  return (
    <section id="cta" className="border-t border-line">
      <div className="tf-container py-16 sm:py-24">
        <div className="tf-panel px-6 py-14 text-center sm:px-12 sm:py-16">
          <p className="tf-label text-accent">Get started</p>

          <h2 className="mx-auto mt-4 max-w-2xl text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Give each task exactly the authority it needs.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-[14px] leading-6 text-ink-muted">
            Open the security console to inspect the active
            task contract, live decisions, and the audit
            trail behind them.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink to="/dashboard" size="lg" variant="primary">
              Open security console
            </ButtonLink>

            <a
              href={REPOSITORY_URL}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: "secondary", size: "lg" }),
              )}
            >
              View repository
            </a>
          </div>

          <p className="mt-6 font-mono text-[12px] text-ink-muted">
            Bob reasons. ToolFence enforces.
          </p>
        </div>
      </div>
    </section>
  )
}

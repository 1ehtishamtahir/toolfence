import { ExternalLink } from "lucide-react"

import { Logo } from "@/components/shared/Logo"
import { ButtonLink } from "@/components/ui/Button"
import { buttonVariants } from "@/components/ui/button-variants"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { href: "#problem", label: "Problem" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#security", label: "Security" },
  { href: "#benchmark", label: "Benchmark" },
] as const

const REPOSITORY_URL =
  "https://github.com/builtbyrehan/toolfence"

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-page">
      <div className="tf-container flex h-14 items-center gap-6">
        <Logo />

        <nav className="hidden items-center gap-5 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] text-ink-soft transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2.5">
          <a
            href={REPOSITORY_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="View repository on GitHub"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
            )}
          >
            <ExternalLink className="h-4 w-4" />

            <span className="hidden sm:inline">
              Repository
            </span>
          </a>

          <ButtonLink to="/dashboard" size="sm">
            Open dashboard
          </ButtonLink>
        </div>
      </div>
    </header>
  )
}

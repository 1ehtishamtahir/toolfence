import type { ButtonHTMLAttributes, ReactNode } from "react"
import { Link } from "react-router-dom"

import { buttonVariants } from "@/components/ui/button-variants"
import type { VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>

export function Button({
  className,
  variant,
  size,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        buttonVariants({ variant, size }),
        className,
      )}
      {...props}
    />
  )
}

type ButtonLinkProps = {
  to: string
  variant?: VariantProps<typeof buttonVariants>["variant"]
  size?: VariantProps<typeof buttonVariants>["size"]
  className?: string
  children: ReactNode
}

export function ButtonLink({
  to,
  variant,
  size,
  className,
  children,
}: ButtonLinkProps) {
  return (
    <Link
      to={to}
      className={cn(
        buttonVariants({ variant, size }),
        className,
      )}
    >
      {children}
    </Link>
  )
}

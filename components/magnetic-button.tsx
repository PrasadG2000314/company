"use client"

import { useRef, type ReactNode, type MouseEvent } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

interface MagneticButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: "circle" | "primary" | "ghost"
  className?: string
}

export function MagneticButton({ children, onClick, variant = "primary", className }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const inner = useRef<HTMLSpanElement>(null)

  const handleMove = (e: MouseEvent<HTMLButtonElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`
    if (inner.current) inner.current.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`
  }

  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)"
    if (inner.current) inner.current.style.transform = "translate(0,0)"
  }

  if (variant === "circle") {
    return (
      <motion.button
        ref={ref}
        onClick={onClick}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        whileTap={{ scale: 0.94 }}
        className={cn(
          "group relative flex h-40 w-40 items-center justify-center rounded-full glass transition-[box-shadow,transform] duration-300 will-change-transform hover:shadow-[0_0_60px_-5px_oklch(0.7_0.16_245_/_0.6)]",
          className,
        )}
      >
        {/* pulse ring on hover */}
        <span className="absolute inset-0 rounded-full ring-1 ring-primary/30 transition-transform duration-500 group-hover:scale-125 group-hover:opacity-0" />
        <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle,oklch(0.7_0.16_245_/_0.25),transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span ref={inner} className="px-4 text-center font-mono text-[11px] font-medium uppercase leading-tight tracking-[0.2em] text-foreground">
          {children}
        </span>
      </motion.button>
    )
  }

  const base =
    variant === "primary"
      ? "glass text-foreground hover:shadow-[0_0_40px_-8px_oklch(0.7_0.16_245_/_0.55)]"
      : "border border-primary/25 bg-transparent text-foreground hover:bg-primary/5"

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      whileTap={{ scale: 0.96 }}
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-3.5 text-sm font-medium tracking-wide transition-[box-shadow,transform,background] duration-300 will-change-transform",
        base,
        className,
      )}
    >
      <span ref={inner} className="relative z-10">
        {children}
      </span>
    </motion.button>
  )
}

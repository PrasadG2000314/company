"use client"

import { useState, useEffect } from "react"
import { motion } from "motion/react"

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-4"
    >
      <nav
        className={`flex w-full max-w-5xl items-center justify-between rounded-full px-5 py-3 transition-all duration-500 md:px-7 ${
          scrolled ? "glass" : "bg-transparent"
        }`}
      >
        <a href="#home" className="flex items-center gap-2 font-mono text-base font-bold tracking-[0.65em] text-foreground">
          {/* <div className="relative h-6 w-6 overflow-hidden rounded bg-white p-0.5 shadow-sm border border-border/10 flex items-center justify-center">
            <img src="/logo.jpg" alt="VELLOX Logo" className="h-full w-full object-contain" />
          </div> */}
          VELLOX
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="relative text-sm font-semibold text-foreground transition-colors hover:text-primary dark:text-foreground/90 dark:hover:text-primary drop-shadow-sm"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-shadow hover:shadow-[0_0_30px_-6px_oklch(0.62_0.16_250_/_0.7)]"
          >
            Start
          </a>
        </div>
      </nav>
    </motion.header>
  )
}


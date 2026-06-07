"use client"

import { motion } from "motion/react"
import { SparklesCore } from "@/components/ui/sparkles"
import { useTheme } from "next-themes"

const COLS = [
  { title: "Company", links: ["About", "Careers", "Press", "Contact"] },
  { title: "Services", links: ["AI Solutions", "Cloud", "Software", "Security"] },
  { title: "Resources", links: ["Blog", "Case Studies", "Docs", "Support"] },
]

const SOCIAL = ["LinkedIn", "X", "GitHub", "Dribbble"]

export function Footer() {
  const { resolvedTheme } = useTheme()

  return (
    <footer className="relative overflow-hidden bg-background py-16">
      {/* Sparkles background */}
      <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
        <SparklesCore
          id="footer-particles"
          background="transparent"
          minSize={0.6}
          maxSize={1.8}
          particleDensity={55}
          className="w-full h-full"
          particleColor={resolvedTheme === "dark" ? "#aee0ff" : "#5b9bff"}
          speed={0.8}
        />
      </div>


      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="rounded-3xl glass p-10">
          <div className="grid gap-10 md:grid-cols-[1.5fr_repeat(3,1fr)]">
            <div>
              <div className="flex items-center gap-2">
                <div className="relative h-7 w-7 overflow-hidden rounded bg-white p-0.5 shadow-sm border border-border/10 flex items-center justify-center">
                  <img src="/logo.jpg" alt="VELLOX Logo" className="h-full w-full object-contain" />
                </div>
                <span className="font-mono text-xl font-bold tracking-[0.35em] text-foreground">VELLOX</span>
              </div>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
                Engineering intelligent digital experiences for forward-thinking enterprises.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {SOCIAL.map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="rounded-full border border-primary/20 px-4 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
            {COLS.map((c) => (
              <div key={c.title}>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">{c.title}</p>
                <ul className="mt-4 space-y-3">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
            <span>© {new Date().getFullYear()} VELLOX. All rights reserved.</span>
            <span className="font-mono uppercase tracking-[0.2em]">Crafted for the future</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

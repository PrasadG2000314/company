"use client"

import { MagneticButton } from "./magnetic-button"

export function Hero() {
  return (
    <section id="home" className="relative z-0 flex min-h-screen flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 -z-20 h-full w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg.png')" }}
      />

      {/* Subtle tech grid background */}
      <div 
        className="absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--color-border) 1px, transparent 1px),
            linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Center ambient spotlight for text legibility */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.75)_25%,transparent_75%)]" />

      {/* Ambient gradient glows */}
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-[50vh] w-[50vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.7_0.16_245_/_0.12),transparent_70%)] blur-3xl" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 h-[50vh] w-[50vh] translate-x-1/2 translate-y-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.75_0.13_135_/_0.10),transparent_70%)] blur-3xl" />

      {/* Bottom gradient fade to page background */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <h1 className="max-w-4xl text-balance font-sans text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl">
          Engineering Intelligent Digital Experiences
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
          We build AI-powered software, cloud infrastructure, enterprise platforms, mobile applications, and digital
          ecosystems.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton variant="primary" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
            Start Your Project
          </MagneticButton>
          <MagneticButton variant="ghost" onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}>
            Explore Services
          </MagneticButton>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
        Scroll to explore
      </div>
    </section>
  )
}

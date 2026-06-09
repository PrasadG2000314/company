"use client"

import Image from "next/image"

const DATA = [
  {
    name: "Elena Marchetti",
    company: "Nimbus Financial",
    photo: "/clients/client-1.png",
    quote:
      "VELLOX rebuilt our entire data platform in record time. The result feels less like software and more like a living system that anticipates what we need.",
  },
  {
    name: "David Chen",
    company: "Orbit Logistics",
    photo: "/clients/client-2.png",
    quote:
      "Their AI engineering team is world-class. We shipped intelligent automation that cut our operating costs by 40% within a single quarter.",
  },
  {
    name: "Sara Lindqvist",
    company: "Aurora Health",
    photo: "/clients/client-3.png",
    quote:
      "From cloud infrastructure to the mobile experience, every detail was crafted with obsessive care. Truly an Awwwards-level partner.",
  },
  {
    name: "Marcus Hale",
    company: "Vector Industries",
    photo: "/clients/client-4.png",
    quote:
      "The cinematic quality of what they delivered redefined how our customers perceive our brand. VELLOX operates on another level entirely.",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="relative overflow-hidden py-24 bg-background border-t border-border/20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-primary">
            Voices
          </p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
            Trusted by visionary teams
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
            Read what our partners say about working with VELLOX.
          </p>
        </div>

        {/* 2x2 grid of Apple liquid matte glass cards */}
        <div className="grid gap-8 sm:grid-cols-2 max-w-5xl mx-auto">
          {DATA.map((d) => (
            <div
              key={d.name}
              className="group apple-liquid-glass rounded-[2rem] p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-white/60 relative overflow-hidden"
            >
              {/* Subtle quote icon overlay in top-right */}
              <div className="absolute right-6 top-6 text-primary/10 select-none pointer-events-none text-7xl font-serif leading-none">
                “
              </div>

              <p className="text-base leading-relaxed text-foreground/80 font-normal z-10">
                {`"${d.quote}"`}
              </p>

              <div className="mt-8 flex items-center gap-4 z-10 border-t border-border/10 pt-5">
                <div className="relative h-12 w-12 overflow-hidden rounded-full border border-border/25 shadow-sm">
                  <Image
                    src={d.photo || "/placeholder.svg"}
                    alt={d.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground text-sm leading-snug">{d.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{d.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

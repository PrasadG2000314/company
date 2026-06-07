"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
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

// pre-set floating positions for ambient layout
const POS = [
  { top: "12%", left: "8%", size: 132, delay: 0 },
  { top: "30%", left: "62%", size: 168, delay: 0.6 },
  { top: "58%", left: "20%", size: 150, delay: 1.1 },
  { top: "62%", left: "70%", size: 124, delay: 0.3 },
]

export function Testimonials() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <section id="testimonials" className="relative min-h-screen overflow-hidden py-24">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-primary">Voices</p>
        <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
          Trusted by visionary teams
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
          Tap a floating bubble to expand the full story.
        </p>
      </div>

      {/* floating bubbles field */}
      <div className="relative mx-auto mt-12 h-[68vh] max-w-5xl px-6">
        {DATA.map((d, i) => {
          const p = POS[i]
          return (
            <motion.button
              key={d.name}
              onClick={() => setActive(i)}
              className="absolute"
              style={{ top: p.top, left: p.left }}
              animate={{ y: [0, -18, 0] }}
              transition={{ duration: 6 + i, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: p.delay }}
              whileHover={{ scale: 1.08 }}
            >
              <div
                className="group relative flex items-center justify-center overflow-hidden rounded-full glass"
                style={{ width: p.size, height: p.size }}
              >
                <Image
                  src={d.photo || "/placeholder.svg"}
                  alt={`${d.name}, ${d.company}`}
                  width={p.size}
                  height={p.size}
                  className="h-full w-full rounded-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-primary/20" />
                <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_25%,oklch(1_0_0_/_0.5),transparent_55%)]" />
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* expanded crystal sphere */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-w-lg flex-col items-center rounded-[2.5rem] glass p-10 text-center"
            >
              <div className="relative h-24 w-24 overflow-hidden rounded-full ring-2 ring-primary/30">
                <Image
                  src={DATA[active].photo || "/placeholder.svg"}
                  alt={DATA[active].name}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="mt-6 text-balance text-lg leading-relaxed text-foreground md:text-xl">
                {`"${DATA[active].quote}"`}
              </p>
              <p className="mt-6 font-semibold text-foreground">{DATA[active].name}</p>
              <p className="text-sm text-muted-foreground">{DATA[active].company}</p>
              <button
                onClick={() => setActive(null)}
                className="mt-6 rounded-full border border-primary/25 px-5 py-2 text-xs uppercase tracking-widest text-foreground transition-colors hover:bg-primary/5"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

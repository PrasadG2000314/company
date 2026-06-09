"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { type ServiceType } from "./three/service-objects"

const SERVICES: {
  type: ServiceType
  title: string
  tag: string
  desc: string
}[] = [
  { type: "neural", title: "AI Solutions", tag: "Neural Core", desc: "Custom machine learning, LLM systems, and intelligent automation engineered for production scale." },
  { type: "cloud", title: "Cloud Solutions", tag: "Crystal Cloud", desc: "Resilient cloud infrastructure, serverless platforms, and streaming data pipelines on any provider." },
  { type: "cubes", title: "Software Development", tag: "Self-Assembling Modules", desc: "Composable, self-assembling software architecture built for velocity and long-term maintainability." },
  { type: "shield", title: "Cyber Security", tag: "Energy Shield", desc: "Zero-trust security, threat modeling, and continuous protection pulses across your entire surface." },
  { type: "mobile", title: "Mobile Applications", tag: "Holographic UI", desc: "Native and cross-platform mobile experiences with projected, fluid interface layers." },
  { type: "data", title: "Data Analytics", tag: "Data Sphere", desc: "Real-time analytics, flowing data streams, and decision intelligence visualized beautifully." },
]

export function Services() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  // translate the track horizontally; adjusted for smaller card width
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-58%"])

  return (
    <section id="services" ref={ref} className="relative h-[420vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mb-8 px-6 md:px-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="font-mono text-xs uppercase tracking-[0.4em] text-primary"
          >
            What we engineer
          </motion.p>
          <h2 className="mt-3 max-w-xl text-balance text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
            Services built as living systems
          </h2>
        </div>

        <motion.div style={{ x }} className="flex gap-6 px-6 will-change-transform md:gap-8 md:px-12">
          {SERVICES.map((s) => (
            <article
              key={s.title}
              className="group relative flex h-[48vh] w-[64vw] shrink-0 flex-col overflow-hidden rounded-3xl glass sm:w-[48vw] md:w-[35vw] lg:w-[25vw] justify-between"
            >
              {/* Image header - Full bleed to the top/sides of the card */}
              <div className="relative w-full h-[54%] overflow-hidden border-b border-border/10">
                <img 
                  src={`/images/services/${s.type === 'neural' ? 'ai' : s.type === 'cubes' ? 'software' : s.type === 'shield' ? 'security' : s.type === 'data' ? 'analytics' : s.type}.png`}
                  alt={s.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Text footer - Padded inside the card */}
              <div className="flex flex-col p-5 sm:p-6 mt-auto">
                <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-primary">{s.tag}</p>
                <h3 className="mt-1.5 text-xl font-semibold text-foreground md:text-2xl">{s.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

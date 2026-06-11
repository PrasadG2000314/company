"use client"

import Image from "next/image"
import { Link2, AtSign, Mail } from "lucide-react"

const TEAM = [
  {
    name: "Elena Marchetti",
    role: "Co-Founder & CEO",
    photo: "/team/member-1.png",
    bio: "Leads vision and strategy, ensuring every project aligns with VELLOX's standard of obsessive craft and long-term impact.",
  },
  {
    name: "David Chen",
    role: "Co-Founder & CTO",
    photo: "/team/member-2.png",
    bio: "Architects the engineering backbone of VELLOX, turning ambitious AI and infrastructure ideas into production-grade systems.",
  },
  {
    name: "Sara Lindqvist",
    role: "Co-Founder & Head of Design",
    photo: "/team/member-3.png",
    bio: "Drives the design language across every product, obsessing over the smallest details to deliver Awwwards-level experiences.",
  },
  {
    name: "Marcus Hale",
    role: "Co-Founder & Head of Operations",
    photo: "/team/member-4.png",
    bio: "Keeps every engagement running like clockwork, connecting client vision with VELLOX's delivery teams across the globe.",
  },
]

export function Team() {
  return (
    <section id="team" className="relative overflow-hidden py-24 bg-background border-t border-border/20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-primary">
            The Team
          </p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
            Meet the founders
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
            Four owners, one obsession — building software that feels alive.
          </p>
        </div>

        {/* 2x2 grid of Apple liquid matte glass cards */}
        <div className="grid gap-8 sm:grid-cols-2 max-w-5xl mx-auto">
          {TEAM.map((m) => (
            <div
              key={m.name}
              className="group apple-liquid-glass rounded-[2rem] p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-white/60 relative overflow-hidden"
            >
              <div className="flex items-center gap-4 z-10">
                <div className="relative h-16 w-16 overflow-hidden rounded-full border border-border/25 shadow-sm shrink-0">
                  <Image
                    src={m.photo || "/placeholder.svg"}
                    alt={m.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground text-base leading-snug">{m.name}</p>
                  <p className="text-xs text-primary mt-0.5 uppercase tracking-wider">{m.role}</p>
                </div>
              </div>

              <p className="mt-6 text-sm leading-relaxed text-foreground/80 font-normal z-10 border-t border-border/10 pt-5">
                {m.bio}
              </p>

              <div className="mt-6 flex items-center gap-3 z-10">
                <a href="#" aria-label={`${m.name} on LinkedIn`} className="text-muted-foreground hover:text-primary transition-colors">
                  <Link2 className="h-4 w-4" />
                </a>
                <a href="#" aria-label={`${m.name} on Twitter`} className="text-muted-foreground hover:text-primary transition-colors">
                  <AtSign className="h-4 w-4" />
                </a>
                <a href="#" aria-label={`Email ${m.name}`} className="text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
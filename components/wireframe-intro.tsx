"use client"

import { useState, useRef, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { motion, AnimatePresence } from "motion/react"
import { IntroOrb } from "./three/intro-orb"
import { WaterSurface, ParticleField } from "./three/water-surface"
import { useExperience } from "@/lib/experience-context"
import { MagneticButton } from "./magnetic-button"

const NAV = ["Home", "Services", "Technology", "Testimonials", "Contact"]

export function WireframeIntro() {
  const { phase, openExperience, setReal } = useExperience()
  const [descending, setDescending] = useState(false)
  const [impacted, setImpacted] = useState(false)
  const [heartbeat, setHeartbeat] = useState(false)
  const removed = phase === "real"

  const handleOpen = () => {
    if (descending) return
    setDescending(true)
    openExperience()
  }

  const handleImpact = () => {
    setImpacted(true)
    // heartbeat line sweeps, then reveal real site
    setTimeout(() => setHeartbeat(true), 250)
    setTimeout(() => setReal(), 1600)
  }

  if (removed) return null

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden bg-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "transitioning" && heartbeat ? 0 : 1 }}
      transition={{ duration: 0.9, delay: heartbeat ? 0.6 : 0 }}
      style={{ pointerEvents: phase === "transitioning" ? "none" : "auto" }}
    >
      {/* blueprint grid backdrop */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.62 0.16 250 / 0.5) 1px, transparent 1px), linear-gradient(90deg, oklch(0.62 0.16 250 / 0.5) 1px, transparent 1px)",
          backgroundSize: "54px 54px",
        }}
      />

      {/* wireframe nav */}
      <motion.nav
        className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-6 py-6 md:px-12"
        animate={{ opacity: descending ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <span className="font-mono text-lg font-bold tracking-[0.4em] wireframe-text">VELLOX</span>
        <ul className="hidden gap-8 md:flex">
          {NAV.map((n) => (
            <li
              key={n}
              className="font-mono text-xs uppercase tracking-[0.25em] text-primary/40"
            >
              {n}
            </li>
          ))}
        </ul>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary/40">
          wireframe / v01
        </span>
      </motion.nav>

      {/* corner blueprint labels */}
      <div className="pointer-events-none absolute inset-0 z-10 font-mono text-[10px] uppercase tracking-[0.3em] text-primary/30">
        <span className="absolute left-6 top-1/2 md:left-12">sys.boot</span>
        <span className="absolute right-6 top-1/2 md:right-12">render.idle</span>
      </div>

      {/* 3D orb */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0.6, 6], fov: 45 }} gl={{ alpha: true, antialias: true }}>
          <ambientLight intensity={0.7} />
          <pointLight position={[4, 5, 5]} intensity={2} color="#7cc7ff" />
          <ParticleField count={300} radius={6} />
          <IntroOrb descending={descending} onImpact={handleImpact} />
          {impacted && <WaterSurface position={[0, -2.1, 0]} />}
        </Canvas>
      </div>

      {/* center caption + button */}
      <AnimatePresence>
        {!descending && (
          <motion.div
            className="absolute inset-x-0 bottom-[14%] z-20 flex flex-col items-center gap-7"
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center">
              <p className="font-mono text-xs uppercase tracking-[0.5em] text-primary/50">
                Enterprise Intelligence System
              </p>
            </div>
            <MagneticButton onClick={handleOpen} variant="circle">
              OPEN EXPERIENCE
            </MagneticButton>
          </motion.div>
        )}
      </AnimatePresence>

      {/* heartbeat reveal line */}
      <HeartbeatLine active={heartbeat} />

      {/* impact light burst */}
      <AnimatePresence>
        {impacted && (
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: "radial-gradient(circle, oklch(0.85 0.13 215 / 0.7), transparent 65%)" }}
            initial={{ width: 0, height: 0, opacity: 0.9 }}
            animate={{ width: 1400, height: 1400, opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function HeartbeatLine({ active }: { active: boolean }) {
  const pathRef = useRef<SVGPathElement>(null)
  const [len, setLen] = useState(0)

  useEffect(() => {
    if (pathRef.current) setLen(pathRef.current.getTotalLength())
  }, [])

  if (!active) return null

  return (
    <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
      <svg className="h-40 w-full" viewBox="0 0 1200 160" preserveAspectRatio="none">
        <motion.path
          ref={pathRef}
          d="M0,80 L300,80 L340,80 L360,30 L390,140 L420,20 L450,110 L480,80 L560,80 L600,80 L640,55 L670,105 L700,80 L1200,80"
          fill="none"
          stroke="#7cc7ff"
          strokeWidth={2.5}
          strokeLinecap="round"
          style={{ filter: "drop-shadow(0 0 8px #7cc7ff)" }}
          initial={{ strokeDasharray: len, strokeDashoffset: len, opacity: 1 }}
          animate={{ strokeDashoffset: -len, opacity: [1, 1, 0] }}
          transition={{ duration: 1.3, ease: "easeInOut" }}
        />
      </svg>
    </div>
  )
}

"use client"

import { Canvas } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import { motion } from "motion/react"
import { Suspense } from "react"
import { MorphingSphere } from "./three/morphing-sphere"
import { WaterSurface, ParticleField } from "./three/water-surface"
import { MagneticButton } from "./magnetic-button"
import { InView } from "./in-view"
import ShaderBackground from "./ui/shader-background"

function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0.4, 6], fov: 45 }} gl={{ alpha: true, antialias: true }} dpr={[1, 2]}>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 6, 6]} intensity={2.4} color="#aee0ff" />
      <pointLight position={[-5, -2, 2]} intensity={1.2} color="#5b9bff" />
      <Suspense fallback={null}>
        <Environment preset="city" />
      </Suspense>
      <ParticleField count={350} radius={6.5} />
      <MorphingSphere scale={1.55} interactive amp={0.24} position={[0, 0.5, 0]} />
      <WaterSurface position={[0, -2, 0]} />
    </Canvas>
  )
}

export function Hero() {
  return (
    <section id="home" className="relative z-0 flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <ShaderBackground className="absolute inset-0 -z-10 h-full w-full" />
      {/* ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.7_0.16_245_/_0.18),transparent_70%)]" />


      <InView className="absolute inset-0" rootMargin="300px">
        <HeroScene />
      </InView>

      <div className="relative z-10 mt-[38vh] flex flex-col items-center px-6 text-center md:mt-[42vh]">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-4xl text-balance font-sans text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl"
        >
          Engineering Intelligent Digital Experiences
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45 }}
          className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          We build AI-powered software, cloud infrastructure, enterprise platforms, mobile applications, and digital
          ecosystems.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.65 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton variant="primary" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
            Start Your Project
          </MagneticButton>
          <MagneticButton variant="ghost" onClick={() => document.getElementById("technology")?.scrollIntoView({ behavior: "smooth" })}>
            Explore Technology
          </MagneticButton>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground"
      >
        Scroll to explore
      </motion.div>
    </section>
  )
}

"use client"

import * as THREE from "three"
import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { motion, useScroll, useTransform, type MotionValue } from "motion/react"
import { useState, type FormEvent } from "react"
import { InView } from "./in-view"

function Core({ power }: { power: MotionValue<number> }) {
  const mesh = useRef<THREE.Mesh>(null)
  const mat = useRef<THREE.MeshStandardMaterial>(null)
  const rings = [useRef<THREE.Mesh>(null), useRef<THREE.Mesh>(null)]

  useFrame((s, d) => {
    const p = power.get()
    if (mesh.current) {
      mesh.current.rotation.y += d * (0.2 + p * 0.8)
      const sc = 0.7 + p * 0.5 + Math.sin(s.clock.elapsedTime * 3) * 0.03 * p
      mesh.current.scale.setScalar(sc)
    }
    if (mat.current) mat.current.emissiveIntensity = 0.3 + p * 2.2
    rings.forEach((r, i) => {
      if (r.current) {
        r.current.rotation.z += d * (0.4 + p) * (i ? -1 : 1)
        ;(r.current.material as THREE.MeshBasicMaterial).opacity = 0.1 + p * 0.6
      }
    })
  })

  return (
    <group>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1, 4]} />
        <meshStandardMaterial ref={mat} color="#5b9bff" emissive="#7cc7ff" emissiveIntensity={0.3} wireframe />
      </mesh>
      {rings.map((r, i) => (
        <mesh key={i} ref={r} rotation={[Math.PI / 2 + i * 0.6, 0, 0]}>
          <torusGeometry args={[1.8 + i * 0.5, 0.02, 16, 100]} />
          <meshBasicMaterial color="#7cc7ff" transparent opacity={0.2} />
        </mesh>
      ))}
    </group>
  )
}

export function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] })
  const power = useTransform(scrollYProgress, [0, 1], [0, 1])
  const [sent, setSent] = useState(false)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <section id="contact" ref={ref} className="relative min-h-screen overflow-hidden bg-[oklch(0.15_0.02_250)] py-24 text-white">
      <InView className="absolute inset-0" rootMargin="200px">
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ alpha: true }} dpr={[1, 2]}>
          <ambientLight intensity={0.4} />
          <pointLight position={[4, 4, 5]} intensity={2.5} color="#aee0ff" />
          <Core power={power} />
        </Canvas>
      </InView>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.18_0.02_250_/_0.55),oklch(0.18_0.02_250_/_0.85))]" />

      <div className="relative z-10 mx-auto max-w-xl px-6">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-cyan">Initiate</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-5xl">
            Power up your next project
          </h2>
        </div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-10 rounded-3xl border border-white/10 bg-[oklch(0.16_0.02_250_/_0.82)] p-7 shadow-[0_8px_60px_-10px_oklch(0.62_0.16_250_/_0.5)] backdrop-blur-2xl"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name" name="name" type="text" />
            <Field label="Email" name="email" type="email" />
            <Field label="Phone" name="phone" type="tel" />
            <Field label="Company" name="company" type="text" />
          </div>
          <div className="mt-5">
            <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">
              Project Details
            </label>
            <textarea
              name="details"
              rows={4}
              className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-white/30 focus:border-cyan focus:shadow-[0_0_25px_-5px_oklch(0.78_0.17_135_/_0.6)]"
              placeholder="Tell us about your vision..."
            />
          </div>
          <motion.button
            type="submit"
            whileTap={{ scale: 0.97 }}
            className="relative mt-6 w-full overflow-hidden rounded-full bg-cyan py-3.5 font-medium text-slate-950 transition-shadow hover:shadow-[0_0_40px_-6px_oklch(0.78_0.17_135_/_0.8)]"
          >
            {sent ? "Signal Sent — We'll be in touch" : "Send Pulse"}
            {sent && (
              <motion.span
                className="absolute inset-0 rounded-full bg-background/30"
                initial={{ scale: 0, opacity: 0.8 }}
                animate={{ scale: 4, opacity: 0 }}
                transition={{ duration: 1 }}
              />
            )}
          </motion.button>
        </motion.form>
      </div>
    </section>
  )
}

function Field({ label, name, type }: { label: string; name: string; type: string }) {
  return (
    <div>
      <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">{label}</label>
      <input
        name={name}
        type={type}
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-white/30 focus:border-cyan focus:shadow-[0_0_25px_-5px_oklch(0.78_0.17_135_/_0.6)]"
      />
    </div>
  )
}

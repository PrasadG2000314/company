"use client"

import * as THREE from "three"
import { useRef, useMemo, Suspense } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Text, Environment } from "@react-three/drei"
import { motion } from "motion/react"
import { InView } from "./in-view"

const TECHS = ["React", "Next.js", "Node.js", "TypeScript", "Python", "AI", "AWS", "Docker", "Kubernetes"]

function Reactor() {
  const ref = useRef<any>(null)
  useFrame((s) => {
    if (ref.current) {
      ref.current.uniforms && (ref.current.uniforms.uTime.value = s.clock.elapsedTime)
    }
  })
  return (
    <mesh>
      <icosahedronGeometry args={[1.1, 6]} />
      <meshPhysicalMaterial
        color="#5b9bff"
        emissive="#7cc7ff"
        emissiveIntensity={0.6}
        transmission={0.6}
        thickness={1.5}
        roughness={0.1}
        metalness={0.1}
        transparent
        opacity={0.92}
      />
    </mesh>
  )
}

function OrbitNodes() {
  const group = useRef<THREE.Group>(null)
  const vel = useRef(0.3)
  const { pointer } = useThree()
  const nodes = useMemo(
    () =>
      TECHS.map((t, i) => {
        const phi = Math.acos(-1 + (2 * (i + 0.5)) / TECHS.length)
        const theta = Math.sqrt(TECHS.length * Math.PI) * phi
        return { t, pos: new THREE.Vector3().setFromSphericalCoords(2.4, phi, theta) }
      }),
    [],
  )

  useFrame((s, d) => {
    if (group.current) {
      const target = 0.3 + Math.abs(pointer.x) * 1.6
      vel.current += (target - vel.current) * 0.05
      group.current.rotation.y += d * vel.current
      group.current.rotation.x = pointer.y * 0.3
    }
  })

  return (
    <group ref={group}>
      {nodes.map(({ t, pos }, i) => (
        <group key={t} position={pos}>
          <mesh>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial color="#aee0ff" emissive="#5b9bff" emissiveIntensity={1.4} />
          </mesh>
          <Text position={[0, 0.28, 0]} fontSize={0.18} color="#dbeafe" anchorX="center" anchorY="middle">
            {t}
          </Text>
          <line>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[new Float32Array([0, 0, 0, -pos.x, -pos.y, -pos.z]), 3]} />
            </bufferGeometry>
            <lineBasicMaterial color="#7cc7ff" transparent opacity={0.25} />
          </line>
        </group>
      ))}
    </group>
  )
}

export function Technology() {
  return (
    <section id="technology" className="relative min-h-screen overflow-hidden bg-[oklch(0.15_0.02_250)] py-24 text-white">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.62_0.16_250_/_0.25),transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-xs uppercase tracking-[0.4em] text-cyan"
        >
          Our stack
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-5xl"
        >
          Technology Core Reactor
        </motion.h2>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-sm leading-relaxed text-white/60 md:text-base">
          Move your cursor to influence the orbital velocity of our core technologies.
        </p>
      </div>

      <div className="relative z-0 h-[60vh] w-full md:h-[70vh]">
        <InView className="h-full w-full" rootMargin="200px">
          <Canvas camera={{ position: [0, 0, 6.5], fov: 45 }} gl={{ alpha: true, antialias: true }} dpr={[1, 2]}>
            <ambientLight intensity={0.5} />
            <pointLight position={[5, 5, 5]} intensity={2.5} color="#aee0ff" />
            <pointLight position={[-5, -3, 2]} intensity={1.4} color="#5b9bff" />
            <Suspense fallback={null}>
              <Environment preset="night" />
              <Reactor />
              <OrbitNodes />
            </Suspense>
          </Canvas>
        </InView>
      </div>
    </section>
  )
}

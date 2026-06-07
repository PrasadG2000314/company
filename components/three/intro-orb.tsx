"use client"

import * as THREE from "three"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { MorphingSphere } from "./morphing-sphere"

/**
 * Intro orb: floats + breathes in wireframe phase, then descends and
 * impacts the floor when `descending` is true. Calls onImpact once.
 */
export function IntroOrb({
  descending,
  onImpact,
}: {
  descending: boolean
  onImpact: () => void
}) {
  const group = useRef<THREE.Group>(null)
  const ring = useRef<THREE.Mesh>(null)
  const ringMat = useRef<THREE.MeshBasicMaterial>(null)
  const impacted = useRef(false)
  const t = useRef(0)
  const floorY = -2.1

  useFrame((state, delta) => {
    if (!group.current) return
    const time = state.clock.elapsedTime

    if (!descending) {
      // float + breathe
      group.current.position.y = 0.4 + Math.sin(time * 1.1) * 0.18
      const s = 1 + Math.sin(time * 2) * 0.025
      group.current.scale.setScalar(s)
    } else {
      // descend toward floor
      t.current = Math.min(1, t.current + delta * 0.55)
      const e = t.current * t.current * (3 - 2 * t.current) // smoothstep
      const startY = group.current.position.y
      const y = THREE.MathUtils.lerp(startY, floorY, 0.06 + e * 0.04)
      group.current.position.y = y

      if (!impacted.current && y <= floorY + 0.08) {
        impacted.current = true
        onImpact()
      }
    }

    // shockwave ring after impact
    if (impacted.current && ring.current && ringMat.current) {
      const s = ring.current.scale.x + delta * 9
      ring.current.scale.setScalar(s)
      ringMat.current.opacity = Math.max(0, 1 - s / 8)
    }
  })

  return (
    <group>
      <group ref={group} position={[0, 0.4, 0]}>
        <MorphingSphere scale={1.1} interactive={!descending} amp={descending ? 0.1 : 0.16} />
      </group>
      {/* shockwave ring on floor */}
      <mesh ref={ring} rotation={[-Math.PI / 2, 0, 0]} position={[0, floorY, 0]} scale={0.001}>
        <ringGeometry args={[0.9, 1, 64]} />
        <meshBasicMaterial ref={ringMat} color="#7cc7ff" transparent opacity={0} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

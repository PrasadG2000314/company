"use client"

import * as THREE from "three"
import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"

export type ServiceType = "neural" | "cloud" | "cubes" | "shield" | "mobile" | "data"

function NeuralCore() {
  const g = useRef<THREE.Group>(null)
  const nodes = useMemo(() => {
    const pts: THREE.Vector3[] = []
    for (let i = 0; i < 14; i++) {
      const phi = Math.acos(-1 + (2 * i) / 14)
      const theta = Math.sqrt(14 * Math.PI) * phi
      pts.push(new THREE.Vector3().setFromSphericalCoords(1, phi, theta))
    }
    return pts
  }, [])
  useFrame((s, d) => {
    if (g.current) {
      g.current.rotation.y += d * 0.4
      g.current.rotation.x += d * 0.15
    }
  })
  return (
    <group ref={g}>
      {nodes.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color="#5b9bff" emissive="#5b9bff" emissiveIntensity={1.5} />
        </mesh>
      ))}
      {nodes.map((p, i) =>
        nodes.slice(i + 1).map((q, j) =>
          p.distanceTo(q) < 1.1 ? (
            <line key={`${i}-${j}`}>
              <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[new Float32Array([...p.toArray(), ...q.toArray()]), 3]} />
              </bufferGeometry>
              <lineBasicMaterial color="#7cc7ff" transparent opacity={0.4} />
            </line>
          ) : null,
        ),
      )}
    </group>
  )
}

function CrystalCloud() {
  const g = useRef<THREE.Group>(null)
  useFrame((s, d) => {
    if (g.current) g.current.rotation.y += d * 0.3
  })
  return (
    <group ref={g}>
      <mesh>
        <octahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial color="#cfe4ff" transmission={0.9} thickness={1} roughness={0.1} metalness={0} transparent opacity={0.85} />
      </mesh>
      <Streams />
    </group>
  )
}

function Streams() {
  const ref = useRef<THREE.Points>(null)
  const pos = useMemo(() => {
    const a = new Float32Array(120 * 3)
    for (let i = 0; i < 120; i++) {
      const r = 1.4 + Math.random() * 0.8
      const t = Math.random() * Math.PI * 2
      a[i * 3] = Math.cos(t) * r
      a[i * 3 + 1] = (Math.random() - 0.5) * 2.5
      a[i * 3 + 2] = Math.sin(t) * r
    }
    return a
  }, [])
  useFrame((s, d) => {
    if (ref.current) ref.current.rotation.y -= d * 0.5
  })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pos, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#7cc7ff" transparent opacity={0.8} blending={THREE.AdditiveBlending} />
    </points>
  )
}

function MorphingCubes() {
  const g = useRef<THREE.Group>(null)
  const cubes = useMemo(() => Array.from({ length: 8 }, (_, i) => i), [])
  useFrame((s, d) => {
    if (g.current) {
      g.current.rotation.y += d * 0.35
      g.current.children.forEach((c, i) => {
        const t = s.clock.elapsedTime
        const f = 0.6 + Math.sin(t + i) * 0.45
        c.position.set(
          Math.cos((i / 8) * Math.PI * 2) * f,
          Math.sin(t * 0.8 + i) * 0.4,
          Math.sin((i / 8) * Math.PI * 2) * f,
        )
        c.rotation.x = t + i
        c.rotation.y = t * 0.5 + i
      })
    }
  })
  return (
    <group ref={g}>
      {cubes.map((i) => (
        <mesh key={i}>
          <boxGeometry args={[0.34, 0.34, 0.34]} />
          <meshStandardMaterial color="#aecbff" emissive="#5b9bff" emissiveIntensity={0.4} metalness={0.3} roughness={0.2} />
        </mesh>
      ))}
    </group>
  )
}

function EnergyShield() {
  const ringRefs = [useRef<THREE.Mesh>(null), useRef<THREE.Mesh>(null), useRef<THREE.Mesh>(null)]
  useFrame((s) => {
    ringRefs.forEach((r, i) => {
      if (r.current) {
        const t = (s.clock.elapsedTime * 0.6 + i * 0.6) % 1.8
        r.current.scale.setScalar(0.6 + t)
        ;(r.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.6 - t / 1.8)
      }
    })
  })
  return (
    <group>
      <mesh>
        <icosahedronGeometry args={[0.9, 1]} />
        <meshPhysicalMaterial color="#7cc7ff" transmission={0.85} thickness={0.5} roughness={0.15} transparent opacity={0.5} wireframe />
      </mesh>
      {ringRefs.map((r, i) => (
        <mesh key={i} ref={r} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1, 1.04, 64]} />
          <meshBasicMaterial color="#5b9bff" transparent side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  )
}

function MobileHologram() {
  const g = useRef<THREE.Group>(null)
  useFrame((s) => {
    if (g.current) {
      g.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.5) * 0.5
      g.current.position.y = Math.sin(s.clock.elapsedTime) * 0.1
    }
  })
  return (
    <group ref={g}>
      <mesh>
        <boxGeometry args={[0.7, 1.4, 0.06]} />
        <meshPhysicalMaterial color="#dceaff" transmission={0.6} thickness={0.4} roughness={0.1} transparent opacity={0.8} />
      </mesh>
      {[0.45, 0.15, -0.15, -0.45].map((y, i) => (
        <mesh key={i} position={[0, y, 0.06]}>
          <planeGeometry args={[0.5, 0.18]} />
          <meshBasicMaterial color="#5b9bff" transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  )
}

function DataSphere() {
  const ref = useRef<THREE.Points>(null)
  const pos = useMemo(() => {
    const a = new Float32Array(800 * 3)
    for (let i = 0; i < 800; i++) {
      const phi = Math.acos(2 * Math.random() - 1)
      const theta = Math.random() * Math.PI * 2
      a[i * 3] = Math.sin(phi) * Math.cos(theta)
      a[i * 3 + 1] = Math.sin(phi) * Math.sin(theta)
      a[i * 3 + 2] = Math.cos(phi)
    }
    return a
  }, [])
  useFrame((s, d) => {
    if (ref.current) {
      ref.current.rotation.y += d * 0.25
      const sc = 1 + Math.sin(s.clock.elapsedTime) * 0.06
      ref.current.scale.setScalar(sc)
    }
  })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pos, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#5b9bff" transparent opacity={0.9} blending={THREE.AdditiveBlending} />
    </points>
  )
}

const MAP: Record<ServiceType, () => React.JSX.Element> = {
  neural: NeuralCore,
  cloud: CrystalCloud,
  cubes: MorphingCubes,
  shield: EnergyShield,
  mobile: MobileHologram,
  data: DataSphere,
}

export function ServiceObject({ type }: { type: ServiceType }) {
  const Obj = MAP[type]
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 45 }} gl={{ alpha: true, antialias: true }} dpr={[1, 2]}>
      <ambientLight intensity={0.7} />
      <pointLight position={[3, 4, 5]} intensity={2} color="#aee0ff" />
      <pointLight position={[-3, -2, 2]} intensity={1} color="#5b9bff" />
      <Obj />
    </Canvas>
  )
}

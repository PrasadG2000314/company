"use client"

import * as THREE from "three"
import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { shaderMaterial } from "@react-three/drei"
import { extend, type ThreeElement } from "@react-three/fiber"

const WaterMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorDeep: new THREE.Color("#aacdff"),
    uColorShallow: new THREE.Color("#eaf4ff"),
    uOpacity: 0.6,
  },
  `
  uniform float uTime;
  varying vec2 vUv;
  varying float vWave;
  void main() {
    vUv = uv;
    vec3 p = position;
    float w = sin(p.x * 3.0 + uTime) * 0.06
            + cos(p.y * 4.0 + uTime * 1.3) * 0.05
            + sin((p.x + p.y) * 2.0 - uTime * 0.8) * 0.04;
    p.z += w;
    vWave = w;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
  `,
  `
  uniform vec3 uColorDeep;
  uniform vec3 uColorShallow;
  uniform float uOpacity;
  varying vec2 vUv;
  varying float vWave;
  void main() {
    float d = distance(vUv, vec2(0.5));
    vec3 col = mix(uColorShallow, uColorDeep, smoothstep(0.0, 0.7, d));
    col += vWave * 1.4;
    float fade = smoothstep(0.62, 0.2, d);
    gl_FragColor = vec4(col, fade * uOpacity);
  }
  `,
)
extend({ WaterMaterial })
declare module "@react-three/fiber" {
  interface ThreeElements {
    waterMaterial: ThreeElement<typeof WaterMaterial>
  }
}

export function WaterSurface({ position = [0, -2.2, 0] as [number, number, number] }) {
  const ref = useRef<any>(null)
  useFrame((s) => {
    if (ref.current) ref.current.uTime = s.clock.elapsedTime
  })
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={position}>
      <circleGeometry args={[6, 96]} />
      <waterMaterial ref={ref} transparent depthWrite={false} />
    </mesh>
  )
}

export function ParticleField({ count = 400, radius = 7 }: { count?: number; radius?: number }) {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = radius * Math.cbrt(Math.random())
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [count, radius])

  useFrame((s, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.02
      ref.current.rotation.x += delta * 0.005
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#7cc7ff"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

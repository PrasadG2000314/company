"use client"

import * as THREE from "three"
import { useRef, useMemo } from "react"
import { useFrame, useThree, extend, type ThreeElement } from "@react-three/fiber"
import { shaderMaterial } from "@react-three/drei"

/**
 * Fluid Morphing Glass Material
 * - procedural simplex noise vertex displacement (fluid morph)
 * - velocity / cursor deformation
 * - fresnel glass rim + soft blue glow
 */
const FluidGlassMaterial = shaderMaterial(
  {
    uTime: 0,
    uPointer: new THREE.Vector3(0, 0, 0),
    uPointerStrength: 0,
    uColorA: new THREE.Color("#cfe4ff"),
    uColorB: new THREE.Color("#5b9bff"),
    uGlow: new THREE.Color("#7cc7ff"),
    uAmp: 0.22,
    uOpacity: 1,
  },
  /* glsl vertex */ `
  uniform float uTime;
  uniform vec3 uPointer;
  uniform float uPointerStrength;
  uniform float uAmp;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying float vDisp;

  // --- simplex noise (Ashima) ---
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x,289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 1.0/7.0;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vNormal = normalize(normalMatrix * normal);
    float t = uTime * 0.45;
    // layered fluid noise
    float n = snoise(position * 1.4 + vec3(t)) * 0.6;
    n += snoise(position * 2.8 - vec3(t * 0.7)) * 0.3;
    n += snoise(position * 5.5 + vec3(t * 1.3)) * 0.12;

    // cursor / pointer displacement (attraction + repulsion)
    float d = distance(position, uPointer);
    float pull = smoothstep(1.4, 0.0, d) * uPointerStrength;
    float disp = n * uAmp + pull * 0.35;

    vDisp = disp;
    vec3 newPos = position + normal * disp;
    vec4 mvPosition = modelViewMatrix * vec4(newPos, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
  `,
  /* glsl fragment */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uGlow;
  uniform float uOpacity;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying float vDisp;

  void main() {
    vec3 N = normalize(vNormal);
    vec3 V = normalize(vViewPosition);
    float fresnel = pow(1.0 - max(dot(N, V), 0.0), 2.4);

    vec3 base = mix(uColorA, uColorB, smoothstep(-0.2, 0.4, vDisp));
    vec3 color = mix(base, uGlow, fresnel);
    color += uGlow * fresnel * 0.6;

    float alpha = clamp(0.32 + fresnel * 0.75, 0.0, 1.0) * uOpacity;
    gl_FragColor = vec4(color, alpha);
  }
  `,
)

extend({ FluidGlassMaterial })

declare module "@react-three/fiber" {
  interface ThreeElements {
    fluidGlassMaterial: ThreeElement<typeof FluidGlassMaterial>
  }
}

export function MorphingSphere({
  scale = 1,
  interactive = true,
  amp = 0.22,
  position = [0, 0, 0],
}: {
  scale?: number
  interactive?: boolean
  amp?: number
  position?: [number, number, number]
}) {
  const matRef = useRef<any>(null)
  const meshRef = useRef<THREE.Mesh>(null)
  const { pointer, viewport } = useThree()
  const target = useMemo(() => new THREE.Vector3(), [])
  const strength = useRef(0)

  useFrame((state, delta) => {
    if (matRef.current) {
      matRef.current.uTime = state.clock.elapsedTime
      if (interactive) {
        // map pointer to local sphere space (approx)
        target.set((pointer.x * viewport.width) / 2 / scale, (pointer.y * viewport.height) / 2 / scale, 1)
        matRef.current.uPointer.lerp(target, 0.1)
        const desired = state.pointer.length() > 0.001 ? 1 : 0
        strength.current += (desired - strength.current) * 0.05
        matRef.current.uPointerStrength = strength.current
      }
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.08
    }
  })

  return (
    <mesh ref={meshRef} scale={scale} position={position}>
      <icosahedronGeometry args={[1, 64]} />
      <fluidGlassMaterial ref={matRef} transparent depthWrite={false} uAmp={amp} />
    </mesh>
  )
}

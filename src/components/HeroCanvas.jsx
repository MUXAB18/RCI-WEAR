import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Stars } from '@react-three/drei'
import * as THREE from 'three'

/* ── Optimized Gold Dust Particles ── */
function GoldParticles({ count = 300 }) {
  const mesh = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const { positions, speeds, phases } = useMemo(() => {
    const pos = []
    const spd = []
    const ph = []
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const r = 1.5 + Math.random() * 3
      pos.push(
        Math.cos(theta) * r + (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 4,
        Math.sin(theta) * r + (Math.random() - 0.5) * 3
      )
      spd.push(0.001 + Math.random() * 0.002)
      ph.push(Math.random() * Math.PI * 2)
    }
    return { positions: new Float32Array(pos), speeds: spd, phases: ph }
  }, [count])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    for (let i = 0; i < count; i++) {
      const ix = i * 3
      dummy.position.set(
        positions[ix]     + Math.sin(t * speeds[i] + phases[i]) * 0.2,
        positions[ix + 1] + Math.cos(t * speeds[i] * 0.7 + phases[i]) * 0.3,
        positions[ix + 2] + Math.sin(t * speeds[i] * 0.5 + phases[i]) * 0.1
      )
      const scale = 0.01 + Math.sin(t * 0.8 + phases[i]) * 0.005
      dummy.scale.setScalar(scale)
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    }
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[1, 3, 3]} />
      <meshStandardMaterial
        color="#c9a84c"
        emissive="#8b6914"
        emissiveIntensity={0.4}
        roughness={0.3}
        metalness={0.8}
      />
    </instancedMesh>
  )
}

/* ── Simplified Luxury Orb ── */
function LuxuryOrb() {
  const meshRef = useRef()
  const glowRef = useRef()

  useFrame(({ clock, mouse }) => {
    const t = clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.05 + mouse.y * 0.1
      meshRef.current.rotation.y = t * 0.08 + mouse.x * 0.1
    }
    if (glowRef.current) {
      glowRef.current.rotation.x = -t * 0.03
      glowRef.current.rotation.y = -t * 0.05
    }
  })

  return (
    <group>
      <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.3}>
        <mesh ref={meshRef} position={[0, 0, 0]}>
          <sphereGeometry args={[0.9, 32, 32]} />
          <MeshDistortMaterial
            color="#1a1a2e"
            emissive="#c9a84c"
            emissiveIntensity={0.08}
            metalness={1}
            roughness={0.1}
            distort={0.15}
            speed={1}
          />
        </mesh>
      </Float>

      <mesh ref={glowRef} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[1.4, 0.018, 8, 60]} />
        <meshStandardMaterial
          color="#c9a84c"
          emissive="#c9a84c"
          emissiveIntensity={0.8}
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>
    </group>
  )
}

/* ── Camera Rig ── */
function CameraRig() {
  const { camera, mouse } = useThree()
  const target = useRef({ x: 0, y: 0 })

  useFrame(({ clock }) => {
    target.current.x += (mouse.x * 0.8 - target.current.x) * 0.04
    target.current.y += (mouse.y * 0.3 - target.current.y) * 0.04
    camera.position.x = target.current.x
    camera.position.y = target.current.y + Math.sin(clock.getElapsedTime() * 0.3) * 0.15
    camera.lookAt(0, 0, 0)
  })
  return null
}

/* ── Light Rays ── */
function LightRays() {
  const groupRef = useRef()

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.03
    }
  })

  const rays = useMemo(() => {
    return Array.from({ length: 4 }, (_, i) => ({
      angle: (i / 4) * Math.PI * 2,
      length: 2 + Math.random() * 1.5,
      opacity: 0.02 + Math.random() * 0.03
    }))
  }, [])

  return (
    <group ref={groupRef}>
      {rays.map((ray, i) => (
        <mesh
          key={i}
          position={[
            Math.cos(ray.angle) * 1.5,
            0,
            Math.sin(ray.angle) * 1.5
          ]}
          rotation={[0, -ray.angle, 0]}
        >
          <cylinderGeometry args={[0.01, 0.2, ray.length, 6, 1, true]} />
          <meshBasicMaterial
            color="#c9a84c"
            transparent
            opacity={ray.opacity}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  )
}

/**
 * HeroCanvas — Three.js WebGL scene.
 *
 * PERFORMANCE: This component is ONLY rendered on desktop (non-touch, pointer:fine).
 * On mobile devices, Three.js (~600KB) is never loaded, saving significant
 * JS parse time and dramatically improving mobile Lighthouse scores.
 *
 * The parent Hero.jsx is responsible for the isMobile check.
 */
export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      dpr={[1, 1.2]}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true
      }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <ambientLight intensity={0.12} />
      <pointLight position={[5, 5, 5]} intensity={0.6} color="#c9a84c" />
      <pointLight position={[-5, -3, -5]} intensity={0.3} color="#4a3000" />
      <directionalLight position={[0, 8, 4]} intensity={0.2} color="#fff8e7" />
      <spotLight
        position={[0, 6, 0]}
        angle={0.3}
        penumbra={0.6}
        intensity={0.8}
        color="#c9a84c"
        castShadow={false}
      />

      <Stars radius={40} depth={20} count={400} factor={1.5} saturation={0} fade speed={0.6} />
      <GoldParticles count={300} />
      <LuxuryOrb />
      <LightRays />
      <CameraRig />
    </Canvas>
  )
}

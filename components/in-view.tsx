"use client"

import { useRef, useState, useEffect, type ReactNode } from "react"

/**
 * Mounts children only while the container is near the viewport.
 * Used to gate WebGL canvases so we never exceed the browser's
 * concurrent WebGL context limit.
 */
export function InView({
  children,
  className,
  rootMargin = "200px",
  fallback = null,
}: {
  children: ReactNode
  className?: string
  rootMargin?: string
  fallback?: ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [rootMargin])

  return (
    <div ref={ref} className={className}>
      {visible ? children : fallback}
    </div>
  )
}

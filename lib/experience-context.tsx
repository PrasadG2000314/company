"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

type Phase = "wireframe" | "transitioning" | "real"

interface ExperienceState {
  phase: Phase
  openExperience: () => void
  setReal: () => void
}

const ExperienceCtx = createContext<ExperienceState | null>(null)

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<Phase>("wireframe")

  const openExperience = useCallback(() => {
    setPhase((p) => (p === "wireframe" ? "transitioning" : p))
  }, [])

  const setReal = useCallback(() => setPhase("real"), [])

  return <ExperienceCtx.Provider value={{ phase, openExperience, setReal }}>{children}</ExperienceCtx.Provider>
}

export function useExperience() {
  const ctx = useContext(ExperienceCtx)
  if (!ctx) throw new Error("useExperience must be used within ExperienceProvider")
  return ctx
}

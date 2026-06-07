"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { setConsoleFunction } from "three"

if (typeof window !== "undefined") {
  setConsoleFunction((type, message, ...params) => {
    if (type === "warn" && message && message.includes("THREE.Clock: This module has been deprecated")) {
      return
    }
    if (type === "log") {
      console.log(message, ...params)
    } else if (type === "warn") {
      console.warn(message, ...params)
    } else if (type === "error") {
      console.error(message, ...params)
    }
  })
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

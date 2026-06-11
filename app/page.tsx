"use client"

import { SmoothScroll } from "@/components/smooth-scroll"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { Team } from "@/components/team"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <SmoothScroll>
      <Navbar />
      <Hero />
      <Services />
      <Team />
      <Contact />
      <Footer />
    </SmoothScroll>
  )
}

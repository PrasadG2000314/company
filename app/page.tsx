"use client"

import { motion } from "motion/react"
import { ExperienceProvider, useExperience } from "@/lib/experience-context"
import { SmoothScroll } from "@/components/smooth-scroll"
import { WireframeIntro } from "@/components/wireframe-intro"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { Technology } from "@/components/technology"
import { Testimonials } from "@/components/testimonials"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

function RealExperience() {
  const { phase } = useExperience()
  const visible = phase === "real"

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 1 }}
      className="relative"
      aria-hidden={!visible}
    >
      <Navbar />
      <Hero />
      <Services />
      <Technology />
      <Testimonials />
      <Contact />
      <Footer />
    </motion.main>
  )
}

export default function Page() {
  return (
    <ExperienceProvider>
      <SmoothScroll>
        <WireframeIntro />
        <RealExperience />
      </SmoothScroll>
    </ExperienceProvider>
  )
}

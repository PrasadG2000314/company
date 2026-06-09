"use client"

import { useRef } from "react"
import { motion } from "motion/react"
import { useState, type FormEvent } from "react"


export function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const [sent, setSent] = useState(false)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <section id="contact" ref={ref} className="relative min-h-screen overflow-hidden bg-white py-24 text-slate-900 transition-colors duration-500">

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.0),rgba(255,255,255,0.5))]" />

      <div className="relative z-10 mx-auto max-w-xl px-6">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-primary font-bold">Initiate</p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight md:text-5xl">
            Power up your next project
          </h2>
        </div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-10 rounded-[2rem] p-7 relative overflow-hidden bg-blue-500/10 backdrop-blur-xl border border-blue-500/30 shadow-[0_8px_32px_0_rgba(59,130,246,0.2)]"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name" name="name" type="text" />
            <Field label="Email" name="email" type="email" />
            <Field label="Phone" name="phone" type="tel" />
            <Field label="Company" name="company" type="text" />
          </div>
          <div className="mt-5">
            <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] text-slate-700 font-bold">
              Project Details
            </label>
            <textarea
              name="details"
              rows={4}
              className="w-full resize-none rounded-xl border border-blue-500/20 bg-blue-500/5 px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-500 focus:border-blue-500 focus:bg-blue-500/10 focus:shadow-[0_0_20px_-4px_rgba(59,130,246,0.3)]"
              placeholder="Tell us about your vision..."
            />
          </div>
          <motion.button
            type="submit"
            whileTap={{ scale: 0.97 }}
            className="relative mt-6 w-full overflow-hidden rounded-full bg-blue-600 py-3.5 font-bold text-white transition-shadow hover:shadow-[0_0_40px_-6px_rgba(37,99,235,0.5)] hover:bg-blue-700"
          >
            {sent ? "Signal Sent — We'll be in touch" : "Send Pulse"}
            {sent && (
              <motion.span
                className="absolute inset-0 rounded-full bg-background/30"
                initial={{ scale: 0, opacity: 0.8 }}
                animate={{ scale: 4, opacity: 0 }}
                transition={{ duration: 1 }}
              />
            )}
          </motion.button>
        </motion.form>
      </div>
    </section>
  )
}

function Field({ label, name, type }: { label: string; name: string; type: string }) {
  return (
    <div>
      <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] text-slate-700 font-bold">{label}</label>
      <input
        name={name}
        type={type}
        className="w-full rounded-xl border border-blue-500/20 bg-blue-500/5 px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-500 focus:border-blue-500 focus:bg-blue-500/10 focus:shadow-[0_0_20px_-4px_rgba(59,130,246,0.3)]"
      />
    </div>
  )
}

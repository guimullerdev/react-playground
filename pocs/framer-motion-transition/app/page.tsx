'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay },
})

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className="min-h-screen px-6 pt-24 pb-16 max-w-5xl mx-auto"
    >
      <motion.p {...rise(0.05)} className="text-xs uppercase tracking-widest text-neutral-400 mb-6">
        Design &amp; Technology Studio
      </motion.p>

      <motion.h1
        {...rise(0.12)}
        className="text-6xl md:text-8xl font-serif font-semibold leading-[1.05] tracking-tight text-neutral-900 mb-8 max-w-3xl"
      >
        We craft interfaces people remember.
      </motion.h1>

      <motion.p {...rise(0.2)} className="text-lg text-neutral-500 max-w-xl leading-relaxed mb-12 font-light">
        A small studio obsessed with motion, typography, and the moments between interactions. We partner with founders and product teams to ship remarkable digital experiences.
      </motion.p>

      <motion.div {...rise(0.28)} className="flex items-center gap-4">
        <Link
          href="/work"
          className="px-6 py-3 bg-neutral-900 text-white text-sm font-medium rounded-full hover:bg-neutral-700 transition-colors"
        >
          View our work
        </Link>
        <Link
          href="/contact"
          className="px-6 py-3 border border-neutral-200 text-neutral-700 text-sm font-medium rounded-full hover:border-neutral-400 transition-colors"
        >
          Start a project
        </Link>
      </motion.div>

      <motion.div
        {...rise(0.38)}
        className="mt-24 pt-10 border-t border-neutral-100 grid grid-cols-2 md:grid-cols-4 gap-8"
      >
        {[
          { value: '8+', label: 'Years of craft' },
          { value: '60+', label: 'Projects shipped' },
          { value: '3', label: 'Design awards' },
          { value: '100%', label: 'Client satisfaction' },
        ].map(({ value, label }) => (
          <div key={label}>
            <p className="text-3xl font-serif font-semibold text-neutral-900 mb-1">{value}</p>
            <p className="text-sm text-neutral-400">{label}</p>
          </div>
        ))}
      </motion.div>
    </motion.main>
  )
}
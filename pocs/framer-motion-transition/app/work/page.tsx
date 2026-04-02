'use client'
import { motion } from 'framer-motion'

const projects = [
    {
        title: 'Folia',
        category: 'Product Design · Web App',
        year: '2024',
        desc: 'A personal finance tracker for people who hate personal finance trackers. Designed around clarity and calm.',
        accent: 'bg-emerald-50',
    },
    {
        title: 'Arca',
        category: 'Branding · Design System',
        year: '2024',
        desc: 'Complete rebrand and component library for a Series B fintech. 240+ components, shipped in 10 weeks.',
        accent: 'bg-amber-50',
    },
    {
        title: 'Drift OS',
        category: 'Motion · Interaction Design',
        year: '2023',
        desc: 'Navigation and transition system for a SaaS dashboard used by 80k+ monthly users.',
        accent: 'bg-sky-50',
    },
    {
        title: 'Mercúrio',
        category: 'Mobile App · iOS',
        year: '2023',
        desc: 'A habit tracking app built around streaks and social accountability. 4.8 stars, 12k downloads.',
        accent: 'bg-rose-50',
    },
    {
        title: 'Blank',
        category: 'Design Tool · Beta',
        year: '2023',
        desc: 'A minimal writing environment that gets out of your way. Built for writers who think visually.',
        accent: 'bg-violet-50',
    },
    {
        title: 'Lumen',
        category: 'Data Visualization',
        year: '2022',
        desc: 'Real-time energy monitoring dashboard for smart buildings. Complex data, made human.',
        accent: 'bg-orange-50',
    },
]

export default function Work() {
    return (
        <motion.main
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="min-h-screen px-6 pt-24 pb-16 max-w-5xl mx-auto"
        >
            <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }}
                className="text-xs uppercase tracking-widest text-neutral-400 mb-6"
            >
                Selected work
            </motion.p>

            <motion.h1
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}
                className="text-5xl md:text-6xl font-serif font-semibold leading-tight tracking-tight text-neutral-900 mb-16 max-w-xl"
            >
                Things we're proud of.
            </motion.h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {projects.map(({ title, category, year, desc, accent }, i) => (
                    <motion.div
                        key={title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 + i * 0.06, duration: 0.45 }}
                        className={`${accent} rounded-2xl p-6 cursor-pointer group hover:-translate-y-1 transition-transform duration-200`}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <p className="text-xs text-neutral-400 uppercase tracking-widest">{year}</p>
                            <span className="text-neutral-300 group-hover:text-neutral-600 transition-colors text-lg">↗</span>
                        </div>
                        <h2 className="text-xl font-serif font-semibold text-neutral-900 mb-1">{title}</h2>
                        <p className="text-xs text-neutral-400 mb-3">{category}</p>
                        <p className="text-sm text-neutral-600 leading-relaxed">{desc}</p>
                    </motion.div>
                ))}
            </div>
        </motion.main>
    )
}
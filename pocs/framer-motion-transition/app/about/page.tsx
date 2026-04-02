'use client'
import { motion } from 'framer-motion'

const values = [
    {
        title: 'Craft over speed',
        body: 'We take the time to get details right. Every shadow, every easing curve, every microcopy choice.',
    },
    {
        title: 'Honest design',
        body: 'No dark patterns, no engagement traps. We design products that respect the people using them.',
    },
    {
        title: 'Motion with purpose',
        body: 'Animation should guide attention, not distract it. We use motion to communicate, not decorate.',
    },
    {
        title: 'Ship and learn',
        body: 'A good product in production beats a perfect product in Figma. We iterate relentlessly.',
    },
]

const team = [
    { name: 'Ana Ferreira', role: 'Design Lead', initials: 'AF' },
    { name: 'Lucas Mota', role: 'Engineering Lead', initials: 'LM' },
    { name: 'Bia Campos', role: 'Motion Designer', initials: 'BC' },
]

export default function About() {
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
                About the studio
            </motion.p>

            <motion.h1
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}
                className="text-5xl md:text-6xl font-serif font-semibold leading-tight tracking-tight text-neutral-900 mb-8 max-w-2xl"
            >
                Small team. Big attention to detail.
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.5 }}
                className="text-lg text-neutral-500 max-w-xl leading-relaxed mb-16 font-light"
            >
                Founded in 2016, Studio is a three-person design and engineering practice. We work embedded with product teams or take on full projects from concept to launch.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }}
                className="mb-20"
            >
                <p className="text-xs uppercase tracking-widest text-neutral-400 mb-6">The team</p>
                <div className="flex flex-col gap-4 max-w-md">
                    {team.map(({ name, role, initials }) => (
                        <div key={name} className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-xs font-medium text-neutral-600 flex-shrink-0">
                                {initials}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-neutral-900">{name}</p>
                                <p className="text-sm text-neutral-400">{role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }}
            >
                <p className="text-xs uppercase tracking-widest text-neutral-400 mb-6">What we believe</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {values.map(({ title, body }) => (
                        <div key={title} className="p-5 border border-neutral-100 rounded-2xl hover:border-neutral-200 transition-colors">
                            <p className="text-sm font-medium text-neutral-900 mb-2">{title}</p>
                            <p className="text-sm text-neutral-500 leading-relaxed">{body}</p>
                        </div>
                    ))}
                </div>
            </motion.div>
        </motion.main>
    )
}
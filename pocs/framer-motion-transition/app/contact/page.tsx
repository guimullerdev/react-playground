'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'

const services = ['Product Design', 'Design System', 'Motion & Animation', 'Frontend Development', 'Brand Identity', 'Other']

export default function Contact() {
    const [selected, setSelected] = useState<string[]>([])
    const [sent, setSent] = useState(false)

    function toggle(s: string) {
        setSelected(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setSent(true)
    }

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
                Get in touch
            </motion.p>

            <motion.h1
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}
                className="text-5xl md:text-6xl font-serif font-semibold leading-tight tracking-tight text-neutral-900 mb-4 max-w-xl"
            >
                Let's build something together.
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
                className="text-lg text-neutral-500 max-w-md leading-relaxed mb-12 font-light"
            >
                We take on 2–3 new projects per quarter. Tell us what you're working on.
            </motion.p>

            {sent ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md p-8 border border-neutral-100 rounded-2xl text-center"
                >
                    <p className="text-3xl mb-3">✦</p>
                    <p className="text-lg font-serif font-semibold text-neutral-900 mb-2">Message sent.</p>
                    <p className="text-sm text-neutral-400">We'll be in touch within 2 business days.</p>
                </motion.div>
            ) : (
                <motion.form
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }}
                    onSubmit={handleSubmit}
                    className="max-w-lg flex flex-col gap-5"
                >
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs text-neutral-400 uppercase tracking-wider">First name</label>
                            <input required type="text" placeholder="Ana" className="border border-neutral-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-neutral-400 transition-colors" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs text-neutral-400 uppercase tracking-wider">Last name</label>
                            <input required type="text" placeholder="Ferreira" className="border border-neutral-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-neutral-400 transition-colors" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-neutral-400 uppercase tracking-wider">Email</label>
                        <input required type="email" placeholder="ana@startup.com" className="border border-neutral-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-neutral-400 transition-colors" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs text-neutral-400 uppercase tracking-wider">What do you need?</label>
                        <div className="flex flex-wrap gap-2">
                            {services.map(s => (
                                <button
                                    type="button"
                                    key={s}
                                    onClick={() => toggle(s)}
                                    className={`text-xs px-4 py-2 rounded-full border transition-all ${selected.includes(s)
                                            ? 'bg-neutral-900 text-white border-neutral-900'
                                            : 'border-neutral-200 text-neutral-600 hover:border-neutral-400'
                                        }`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-neutral-400 uppercase tracking-wider">Tell us about the project</label>
                        <textarea
                            required
                            rows={4}
                            placeholder="What are you building? What's the timeline? Any constraints we should know about?"
                            className="border border-neutral-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-neutral-400 transition-colors resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="self-start px-6 py-3 bg-neutral-900 text-white text-sm font-medium rounded-full hover:bg-neutral-700 transition-colors"
                    >
                        Send message
                    </button>
                </motion.form>
            )}
        </motion.main>
    )
}
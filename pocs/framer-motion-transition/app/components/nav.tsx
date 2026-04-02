'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/work', label: 'Work' },
    { href: '/contact', label: 'Contact' },
]

export default function Nav() {
    const pathname = usePathname()

    return (
        <header className="fixed top-0 inset-x-0 z-50">
            {/* Backdrop blur bar */}
            <div className="absolute inset-0 bg-white/80 backdrop-blur-md border-b border-neutral-100" />

            <nav className="relative max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">

                {/* Logo */}
                <Link
                    href="/"
                    className="font-serif text-lg font-semibold text-neutral-900 tracking-tight hover:opacity-70 transition-opacity"
                >
                    Studio
                </Link>

                {/* Links — pill group */}
                <div className="hidden md:flex items-center gap-1 bg-neutral-100/80 rounded-full px-1.5 py-1.5">
                    {links.map(({ href, label }) => {
                        const isActive = pathname === href
                        return (
                            <Link
                                key={href}
                                href={href}
                                className="relative px-4 py-1.5 text-sm rounded-full transition-colors duration-150 outline-none"
                                style={{
                                    color: isActive ? '#171717' : '#737373',
                                    fontWeight: isActive ? 500 : 400,
                                }}
                            >
                                {isActive && (
                                    <motion.span
                                        layoutId="nav-pill"
                                        className="absolute inset-0 bg-white rounded-full shadow-sm"
                                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                                    />
                                )}
                                <span className="relative z-10">{label}</span>
                            </Link>
                        )
                    })}
                </div>

                {/* CTA */}
                <Link
                    href="/contact"
                    className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-full hover:bg-neutral-700 active:scale-95 transition-all duration-150"
                >
                    Let's talk
                    <span className="text-neutral-400 text-xs">↗</span>
                </Link>

                {/* Mobile: compact links */}
                <div className="flex md:hidden items-center gap-3">
                    {links.map(({ href, label }) => {
                        const isActive = pathname === href
                        return (
                            <Link
                                key={href}
                                href={href}
                                className="text-sm transition-colors"
                                style={{
                                    color: isActive ? '#171717' : '#a3a3a3',
                                    fontWeight: isActive ? 500 : 400,
                                }}
                            >
                                {label}
                            </Link>
                        )
                    })}
                </div>

            </nav>
        </header>
    )
}
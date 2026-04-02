'use client'

import { AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

import "./globals.css";

import Nav from './components/nav';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname()

  return (
    <html>
      <body>
        <Nav />
        <AnimatePresence mode="wait">
          <div key={pathname}>{children}</div>
        </AnimatePresence>
      </body>
    </html>
  )
}



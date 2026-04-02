# Page Transition POC — Next.js + Framer Motion

A proof-of-concept exploring animated page transitions in Next.js 14 using the App Router and Framer Motion.

---

## Goal

Validate how Framer Motion's `AnimatePresence` integrates with Next.js App Router to deliver smooth, production-quality page transitions with minimal boilerplate.

---

## Stack

| Layer | Tool | Version |
|---|---|---|
| Framework | Next.js (App Router) | 14+ |
| Language | TypeScript | 5+ |
| Animation | Framer Motion | 11+ |
| Styling | Tailwind CSS | 3+ |
| Font | Playfair Display + DM Sans | via Google Fonts |

Install dependencies:
```bash
npm install framer-motion
```

---

## Project Structure

```
app/
├── layout.tsx           ← AnimatePresence lives here
├── page.tsx             ← Home
├── about/
│   └── page.tsx         ← About
├── work/
│   └── page.tsx         ← Work
└── contact/
    └── page.tsx         ← Contact

components/
└── nav.tsx              ← Navigation with sliding pill indicator
```

---

## Key Concepts Explored

### 1. `AnimatePresence` + `usePathname` as key

The entire transition system rests on two lines in `layout.tsx`:

```tsx
<AnimatePresence mode="wait">
  <div key={pathname}>{children}</div>
</AnimatePresence>
```

`mode="wait"` ensures the exit animation finishes before the next page mounts. The `key={pathname}` tells Framer Motion when a new page has been rendered.

### 2. Shared `motion.main` pattern on every page

Each page wraps its content with the same motion config:

```tsx
<motion.main
  initial={{ opacity: 0, y: 24 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.35, ease: 'easeInOut' }}
>
```

Swapping `y` for `x` gives a slide, `scale: 0.95` gives a zoom — same pattern, different feel.

### 3. Staggered children with `delay`

Content inside each page staggers in using incremental `delay` values:

```tsx
const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay },
})

<motion.h1 {...rise(0.12)}>...</motion.h1>
<motion.p  {...rise(0.20)}>...</motion.p>
```

### 4. `layoutId` for the Nav pill

The active indicator in the nav slides between links automatically:

```tsx
{isActive && (
  <motion.span
    layoutId="nav-pill"
    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
  />
)}
```

No manual position tracking — Framer Motion handles it via shared layout animations.

---

## Skills Used

### Framer Motion

| API | Used for |
|---|---|
| `AnimatePresence` | Mount/unmount page animations |
| `motion.main / motion.div` | Animated page and element wrappers |
| `initial / animate / exit` | Enter and exit states per page |
| `layoutId` | Sliding pill indicator in the nav |
| `transition` | Easing, duration, spring physics |

### Next.js App Router

| Feature | Used for |
|---|---|
| `layout.tsx` | Persistent nav + `AnimatePresence` wrapper |
| `usePathname()` | Detecting route changes as animation trigger |
| `'use client'` directive | Required for hooks and motion components |
| `Link` component | Client-side navigation without full reload |

### Tailwind CSS

Used for all layout, spacing, typography, and responsive utilities. No custom CSS files — all styling via utility classes and `className` props.

### TypeScript

Typed component props and state (`useState<string[]>`). Keeps the codebase safe as it scales.

---

## ⚠️ Framer Motion Requires Client Components

Framer Motion relies on browser APIs (DOM, requestAnimationFrame) that do not exist on the server. This means **any component that uses `motion.*` must be a Client Component**.

### How to declare a Client Component

Add `'use client'` as the very first line of the file — before any imports:

```tsx
'use client'                   // ← must be first
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      ...
    </motion.main>
  )
}
```

### What breaks without it

If you forget `'use client'`, Next.js will try to render the `motion` component on the server and throw:

```
Error: useState can only be used in a Client Component.
Add the "use client" directive at the top of the file.
```

### Rules of thumb for this POC

| File | Needs `'use client'`? | Reason |
|---|---|---|
| `app/layout.tsx` | ✅ Yes | Uses `AnimatePresence` and `usePathname` |
| `app/page.tsx` | ✅ Yes | Uses `motion.main` |
| `app/about/page.tsx` | ✅ Yes | Uses `motion.div` |
| `app/work/page.tsx` | ✅ Yes | Uses `motion.div` per card |
| `app/contact/page.tsx` | ✅ Yes | Uses `motion` + `useState` |
| `components/nav.tsx` | ✅ Yes | Uses `motion.span` + `usePathname` |

### Keeping Server Components where possible

If a page has heavy data fetching, split it into two files — keep the data logic in a Server Component and isolate the animation in a small Client Component wrapper:

```tsx
// app/work/page.tsx — Server Component, fetches data
import WorkGrid from '@/components/work-grid'

export default async function WorkPage() {
  const projects = await fetchProjects()  // runs on server
  return <WorkGrid projects={projects} />
}

// components/work-grid.tsx — Client Component, handles animation
'use client'
import { motion } from 'framer-motion'

export default function WorkGrid({ projects }) {
  return projects.map((p, i) => (
    <motion.div key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.06 }}>
      ...
    </motion.div>
  ))
}
```

This pattern keeps the performance benefits of Server Components while still allowing Framer Motion animations on the client.

---

## What This POC Proves

- `AnimatePresence` integrates cleanly with the Next.js App Router in under 10 lines
- Exit animations work correctly with `mode="wait"` — no flash of unstyled content
- Staggered children work independently of the page transition
- `layoutId` shared animations (nav pill) are zero-config and production-ready
- The pattern scales to any number of pages with no extra setup per route

---

## Next Steps

- [ ] Add direction-aware slide transitions (forward vs back) using route index comparison
- [ ] Explore `useReducedMotion()` for accessibility
- [ ] Test with `next/image` and dynamic routes (`/work/[slug]`)
- [ ] Add shared element transitions between the Work grid and a project detail page
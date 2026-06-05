import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { AuthProvider, useAuth } from './auth/AuthContext'
import { router } from './router'
import ReactRouterApp from './react-router/Router'
import './index.css'

function TanStackApp() {
  const auth = useAuth()
  return <RouterProvider router={router} context={{ auth }} />
}

function Root() {
  const [useTanStack, setUseTanStack] = useState(true)

  return (
    <>
      <div style={{
        position: 'fixed', top: 12, right: 16, zIndex: 9999,
        display: 'flex', alignItems: 'center', gap: 8,
        background: '#1e1e2e', padding: '6px 12px', borderRadius: 8,
        fontSize: 13, color: '#cdd6f4', boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
      }}>
        <span style={{ opacity: useTanStack ? 0.4 : 1 }}>react-router</span>
        <button
          onClick={() => setUseTanStack(v => !v)}
          style={{
            width: 44, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer',
            background: useTanStack ? '#89b4fa' : '#585b70',
            position: 'relative', transition: 'background 0.2s',
          }}
        >
          <span style={{
            position: 'absolute', top: 3, left: useTanStack ? 22 : 3,
            width: 18, height: 18, borderRadius: '50%', background: '#fff',
            transition: 'left 0.2s',
          }} />
        </button>
        <span style={{ opacity: useTanStack ? 1 : 0.4 }}>tanstack</span>
      </div>

      {useTanStack
        ? <AuthProvider><TanStackApp /></AuthProvider>
        : <ReactRouterApp />
      }
    </>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)

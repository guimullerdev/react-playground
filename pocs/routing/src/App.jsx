import { useState } from 'react'
import ReactRouterApp from './react-router/Router'
import TanStackRouterApp from './tanstack-router/Router'
import './App.css'

const STORAGE_KEY = 'active-router'

export default function App() {
  const [active, setActive] = useState(
    () => localStorage.getItem(STORAGE_KEY) || 'react-router'
  )

  function switchTo(router) {
    localStorage.setItem(STORAGE_KEY, router)
    window.history.pushState({}, '', '/')
    setActive(router)
  }

  return (
    <>
      <div className="router-selector">
        <span className="router-label">Router:</span>
        <button
          className={active === 'react-router' ? 'active' : ''}
          onClick={() => switchTo('react-router')}
        >
          React Router DOM
        </button>
        <button
          className={active === 'tanstack' ? 'active' : ''}
          onClick={() => switchTo('tanstack')}
        >
          TanStack Router
        </button>
      </div>
      {active === 'react-router' ? <ReactRouterApp /> : <TanStackRouterApp />}
    </>
  )
}

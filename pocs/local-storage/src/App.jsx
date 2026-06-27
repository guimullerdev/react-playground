import { useState, useEffect, useRef, useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'
import './App.css'

// ─── 1. Persist Counter ───────────────────────────────────────────────────────
function PersistCounter() {
  const [count, setCount, resetCount] = useLocalStorage('poc:counter', 0)
  return (
    <div className="card">
      <div className="card-label">localStorage · number</div>
      <h2>Persist Counter</h2>
      <p>Value survives page refresh — stored as a JSON number.</p>
      <div className="row">
        <button onClick={() => setCount((c) => c - 1)}>−</button>
        <span className="big-value">{count}</span>
        <button onClick={() => setCount((c) => c + 1)}>+</button>
      </div>
      <button className="btn-ghost" onClick={resetCount}>
        Remove key
      </button>
    </div>
  )
}

// ─── 2. Object / User Prefs ───────────────────────────────────────────────────
const DEFAULT_PREFS = { name: '', theme: 'system', lang: 'en' }

function UserPrefs() {
  const [prefs, setPrefs, clearPrefs] = useLocalStorage('poc:prefs', DEFAULT_PREFS)
  return (
    <div className="card">
      <div className="card-label">localStorage · object</div>
      <h2>User Preferences</h2>
      <p>
        Complex objects serialised with <code>JSON.stringify</code>.
      </p>
      <label className="field">
        Name
        <input
          value={prefs.name}
          onChange={(e) => setPrefs((p) => ({ ...p, name: e.target.value }))}
          placeholder="Your name…"
        />
      </label>
      <div className="row wrap">
        <span className="field-label">Theme</span>
        {['light', 'dark', 'system'].map((t) => (
          <button
            key={t}
            className={prefs.theme === t ? 'btn-active' : 'btn-ghost'}
            onClick={() => setPrefs((p) => ({ ...p, theme: t }))}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="row wrap">
        <span className="field-label">Lang</span>
        {['en', 'pt', 'es'].map((l) => (
          <button
            key={l}
            className={prefs.lang === l ? 'btn-active' : 'btn-ghost'}
            onClick={() => setPrefs((p) => ({ ...p, lang: l }))}
          >
            {l}
          </button>
        ))}
      </div>
      <pre className="code-block">{JSON.stringify(prefs, null, 2)}</pre>
      <button className="btn-ghost" onClick={clearPrefs}>
        Clear prefs
      </button>
    </div>
  )
}

// ─── 3. Auto-Save Draft ───────────────────────────────────────────────────────
function DraftSaver() {
  const [draft, setDraft, clearDraft] = useLocalStorage('poc:draft', '')
  const [text, setText] = useState(draft)
  const [status, setStatus] = useState('')
  const timer = useRef(null)

  const handleChange = (e) => {
    const v = e.target.value
    setText(v)
    setStatus('typing…')
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setDraft(v)
      setStatus('✓ saved')
      setTimeout(() => setStatus(''), 2000)
    }, 600)
  }

  const handleClear = () => {
    clearDraft()
    setText('')
    setStatus('')
  }

  return (
    <div className="card">
      <div className="card-label">localStorage · debounce</div>
      <h2>Auto-Save Draft</h2>
      <p>Saves 600 ms after you stop typing. Reload to restore.</p>
      <textarea value={text} onChange={handleChange} rows={4} placeholder="Start typing…" />
      <div className="row space-between">
        <span className="status-text">{status}</span>
        <button className="btn-ghost" onClick={handleClear}>
          Clear draft
        </button>
      </div>
    </div>
  )
}

// ─── 4. Cross-Tab Sync ────────────────────────────────────────────────────────
function CrossTabSync() {
  const [msg, setMsg, clearMsg] = useLocalStorage('poc:cross-tab', '')
  return (
    <div className="card">
      <div className="card-label">storage event · cross-tab</div>
      <h2>Cross-Tab Sync</h2>
      <p>
        Open this page in a <strong>second tab</strong> — edits here update there via the{' '}
        <code>storage</code> event.
      </p>
      <input value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Type something…" />
      <div className="pill-preview">{msg || <span className="muted">empty</span>}</div>
      <button className="btn-ghost" onClick={clearMsg}>
        Clear
      </button>
    </div>
  )
}

// ─── 5. sessionStorage ────────────────────────────────────────────────────────
function SessionDemo() {
  const [count, setCount] = useState(() => {
    const raw = sessionStorage.getItem('poc:session')
    return raw ? Number(raw) : 0
  })

  const update = (fn) => {
    setCount((prev) => {
      const next = fn(prev)
      sessionStorage.setItem('poc:session', String(next))
      return next
    })
  }

  return (
    <div className="card card--session">
      <div className="card-label">sessionStorage · tab-only</div>
      <h2>Session Storage</h2>
      <p>
        Same API as localStorage, but data is <strong>cleared when the tab closes</strong> and is
        never shared across tabs.
      </p>
      <div className="row">
        <button onClick={() => update((c) => c - 1)}>−</button>
        <span className="big-value">{count}</span>
        <button onClick={() => update((c) => c + 1)}>+</button>
      </div>
      <button
        className="btn-ghost"
        onClick={() => {
          sessionStorage.removeItem('poc:session')
          setCount(0)
        }}
      >
        Reset
      </button>
    </div>
  )
}

// ─── 6. Storage Inspector ────────────────────────────────────────────────────
function StorageInspector() {
  const [entries, setEntries] = useState([])

  const refresh = useCallback(() => {
    const list = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      const raw = localStorage.getItem(key)
      list.push({ key, raw, size: new Blob([raw]).size })
    }
    list.sort((a, b) => a.key.localeCompare(b.key))
    setEntries(list)
  }, [])

  useEffect(() => {
    refresh()
    window.addEventListener('storage', refresh)
    window.addEventListener('localStorageChange', refresh)
    return () => {
      window.removeEventListener('storage', refresh)
      window.removeEventListener('localStorageChange', refresh)
    }
  }, [refresh])

  const totalBytes = entries.reduce((sum, e) => sum + e.size, 0)

  return (
    <div className="inspector">
      <div className="inspector-header">
        <h2>Storage Inspector</h2>
        <span className="badge">
          {entries.length} key{entries.length !== 1 ? 's' : ''} · {totalBytes} B
        </span>
        <div className="row" style={{ marginLeft: 'auto' }}>
          <button className="btn-ghost btn-sm" onClick={refresh}>
            Refresh
          </button>
          <button
            className="btn-danger btn-sm"
            onClick={() => {
              localStorage.clear()
              refresh()
            }}
          >
            Clear all
          </button>
        </div>
      </div>

      {entries.length === 0 ? (
        <div className="inspector-empty">No keys in localStorage yet — interact with the demos above.</div>
      ) : (
        <div className="inspector-table">
          <div className="inspector-row inspector-row--head">
            <span>Key</span>
            <span>Value</span>
            <span>Size</span>
            <span />
          </div>
          {entries.map(({ key, raw, size }) => (
            <div key={key} className="inspector-row">
              <code>{key}</code>
              <code className="val-preview">{raw.length > 48 ? raw.slice(0, 48) + '…' : raw}</code>
              <span className="size-badge">{size} B</span>
              <button
                className="btn-danger btn-sm"
                onClick={() => {
                  localStorage.removeItem(key)
                  refresh()
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="poc-root">
      <header className="poc-header">
        <h1>localStorage PoC</h1>
        <p className="poc-subtitle">
          Web Storage API · <code>localStorage</code> · <code>sessionStorage</code> ·{' '}
          <code>storage</code> event
        </p>
      </header>

      <div className="poc-grid">
        <PersistCounter />
        <UserPrefs />
        <DraftSaver />
        <CrossTabSync />
        <SessionDemo />
      </div>

      <StorageInspector />
    </div>
  )
}

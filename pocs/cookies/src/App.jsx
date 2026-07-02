import { useState, useEffect, useCallback } from 'react'
import { useCookie, parseCookies } from './useCookie'
import './App.css'

// ─── 1. Session Cookie Counter ────────────────────────────────────────────────
function SessionCounter() {
  const [count, setCount, removeCount] = useCookie('poc:session-counter', '0')
  const n = Number(count)
  return (
    <div className="card">
      <div className="card-label">cookie · no expiry · session</div>
      <h2>Session Counter</h2>
      <p>
        No <code>Max-Age</code> or <code>Expires</code> set — the browser clears this cookie
        when the session ends (tab or browser closed).
      </p>
      <div className="row">
        <button onClick={() => setCount(String(n - 1))}>−</button>
        <span className="big-value">{n}</span>
        <button onClick={() => setCount(String(n + 1))}>+</button>
      </div>
      <button className="btn-ghost" onClick={() => removeCount()}>
        Delete cookie
      </button>
    </div>
  )
}

// ─── 2. Persistent Note ───────────────────────────────────────────────────────
const THIRTY_DAYS = 60 * 60 * 24 * 30

function PersistentNote() {
  const [note, setNote, removeNote] = useCookie('poc:note', '')
  const expiresAt = new Date(Date.now() + THIRTY_DAYS * 1000).toLocaleDateString()

  return (
    <div className="card">
      <div className="card-label">cookie · Max-Age 30 days · persistent</div>
      <h2>Persistent Note</h2>
      <p>
        Stored with <code>Max-Age={THIRTY_DAYS}</code> — survives browser restarts. Expires{' '}
        {expiresAt}.
      </p>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value, { maxAge: THIRTY_DAYS })}
        placeholder="Type a note… it survives page refresh"
        rows={3}
      />
      <button className="btn-ghost" onClick={() => removeNote()}>
        Delete cookie
      </button>
    </div>
  )
}

// ─── 3. Cookie Builder ────────────────────────────────────────────────────────
const SAMESITE_OPTIONS = ['Strict', 'Lax', 'None']

function buildRawString(name, value, { maxAge, path, sameSite }) {
  let s = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`
  if (maxAge !== '') s += `; Max-Age=${maxAge}`
  if (path) s += `; Path=${path}`
  if (sameSite) s += `; SameSite=${sameSite}`
  return s
}

function CookieBuilder() {
  const [name, setName] = useState('my-cookie')
  const [value, setValue] = useState('hello')
  const [maxAge, setMaxAge] = useState('')
  const [path, setPath] = useState('/')
  const [sameSite, setSameSite] = useState('Lax')
  const [status, setStatus] = useState('')

  const flash = (msg) => {
    setStatus(msg)
    setTimeout(() => setStatus(''), 3000)
  }

  const handleSet = () => {
    if (!name.trim()) return
    const raw = buildRawString(name, value, { maxAge, path, sameSite })
    document.cookie = raw
    flash(`Set → ${raw}`)
  }

  const handleDelete = () => {
    document.cookie = `${encodeURIComponent(name)}=; Max-Age=0; Path=${path}`
    flash(`Deleted: ${name}`)
  }

  return (
    <div className="card">
      <div className="card-label">cookie · attributes · builder</div>
      <h2>Cookie Builder</h2>
      <p>
        Construct a cookie with custom attributes and write it to <code>document.cookie</code>.
      </p>
      <div className="row wrap">
        <label className="field" style={{ flex: '1 1 120px' }}>
          Name
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="cookie-name" />
        </label>
        <label className="field" style={{ flex: '2 1 180px' }}>
          Value
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="cookie-value"
          />
        </label>
      </div>
      <div className="row wrap">
        <label className="field" style={{ flex: '1 1 100px' }}>
          Max-Age (s)
          <input
            type="number"
            min="0"
            value={maxAge}
            onChange={(e) => setMaxAge(e.target.value)}
            placeholder="session"
          />
        </label>
        <label className="field" style={{ flex: '1 1 80px' }}>
          Path
          <input value={path} onChange={(e) => setPath(e.target.value)} placeholder="/" />
        </label>
        <div className="field" style={{ flex: '1 1 160px' }}>
          SameSite
          <div className="row" style={{ marginTop: 4 }}>
            {SAMESITE_OPTIONS.map((opt) => (
              <button
                key={opt}
                className={sameSite === opt ? 'btn-active btn-sm' : 'btn-ghost btn-sm'}
                onClick={() => setSameSite(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="row">
        <button onClick={handleSet}>Set cookie</button>
        <button className="btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </div>
      {status && <p className="status-text code-block">{status}</p>}
    </div>
  )
}

// ─── 4. Cookie Inspector ──────────────────────────────────────────────────────
function CookieInspector() {
  const [cookies, setCookies] = useState({})

  const refresh = useCallback(() => setCookies(parseCookies()), [])

  useEffect(() => {
    refresh()
    const id = setInterval(refresh, 500)
    return () => clearInterval(id)
  }, [refresh])

  const entries = Object.entries(cookies)

  return (
    <div className="inspector">
      <div className="inspector-header">
        <h2>Cookie Inspector</h2>
        <span className="badge">{entries.length} cookies</span>
        <span className="muted" style={{ fontSize: 12 }}>
          JS-readable only — <code>HttpOnly</code> cookies are invisible here
        </span>
        <button className="btn-ghost btn-sm" onClick={refresh} style={{ marginLeft: 'auto' }}>
          Refresh
        </button>
      </div>
      {entries.length === 0 ? (
        <div className="inspector-empty">No cookies found for this path</div>
      ) : (
        <div className="inspector-table">
          <div className="inspector-row inspector-row--head" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <span>Name</span>
            <span>Value</span>
          </div>
          {entries.map(([key, val]) => (
            <div
              key={key}
              className="inspector-row"
              style={{ gridTemplateColumns: '1fr 1fr' }}
            >
              <code>{key}</code>
              <span className="val-preview">{val}</span>
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
        <h1>Cookies</h1>
        <p className="poc-subtitle">
          Browser cookies — written via <code>document.cookie</code>, with attributes controlling
          expiry, path, and cross-site behaviour.
        </p>
      </header>

      <div className="poc-grid">
        <SessionCounter />
        <PersistentNote />
        <CookieBuilder />
      </div>

      <CookieInspector />
    </div>
  )
}

import { useState, useEffect, useCallback, useRef } from 'react'
import { useSessionStorage } from './useSessionStorage'
import './App.css'

// ─── 1. Multi-Step Form ───────────────────────────────────────────────────────
const STEPS = ['Personal', 'Address', 'Review']
const FORM_INIT = { name: '', email: '', city: '', zip: '', newsletter: false }

function MultiStepForm() {
  const [step, setStep, resetStep] = useSessionStorage('poc:wizard:step', 0)
  const [form, setForm, resetForm] = useSessionStorage('poc:wizard:form', FORM_INIT)

  const update = (field) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm((f) => ({ ...f, [field]: val }))
  }

  const reset = () => {
    resetStep()
    resetForm()
  }

  return (
    <div className="card card--wide">
      <div className="card-label">sessionStorage · multi-step form</div>
      <h2>Checkout Wizard</h2>
      <p>
        Form data is preserved if you navigate away and come back —{' '}
        <strong>within this tab</strong>. Refresh without closing to restore.
      </p>

      <div className="stepper">
        {STEPS.map((s, i) => (
          <div key={s} className={`step ${i === step ? 'step--active' : ''} ${i < step ? 'step--done' : ''}`}>
            <span className="step-dot">{i < step ? '✓' : i + 1}</span>
            <span className="step-label">{s}</span>
          </div>
        ))}
      </div>

      {step === 0 && (
        <div className="form-group">
          <label className="field">
            Full name
            <input value={form.name} onChange={update('name')} placeholder="Jane Doe" />
          </label>
          <label className="field">
            Email
            <input type="email" value={form.email} onChange={update('email')} placeholder="jane@example.com" />
          </label>
        </div>
      )}

      {step === 1 && (
        <div className="form-group">
          <label className="field">
            City
            <input value={form.city} onChange={update('city')} placeholder="São Paulo" />
          </label>
          <label className="field">
            ZIP
            <input value={form.zip} onChange={update('zip')} placeholder="01310-100" />
          </label>
        </div>
      )}

      {step === 2 && (
        <div className="review-block">
          <div className="review-row"><span>Name</span><code>{form.name || '—'}</code></div>
          <div className="review-row"><span>Email</span><code>{form.email || '—'}</code></div>
          <div className="review-row"><span>City</span><code>{form.city || '—'}</code></div>
          <div className="review-row"><span>ZIP</span><code>{form.zip || '—'}</code></div>
          <label className="field field--row">
            <input type="checkbox" checked={form.newsletter} onChange={update('newsletter')} />
            Subscribe to newsletter
          </label>
        </div>
      )}

      <div className="row space-between">
        <button className="btn-ghost" onClick={reset}>Start over</button>
        <div className="row">
          {step > 0 && (
            <button className="btn-ghost" onClick={() => setStep((s) => s - 1)}>Back</button>
          )}
          {step < STEPS.length - 1 ? (
            <button onClick={() => setStep((s) => s + 1)}>Next →</button>
          ) : (
            <button onClick={reset}>Submit & reset</button>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── 2. Tab-Isolated Cart ─────────────────────────────────────────────────────
const PRODUCTS = [
  { id: 1, name: 'Laptop Stand', price: 49 },
  { id: 2, name: 'USB-C Hub', price: 35 },
  { id: 3, name: 'Mechanical Keyboard', price: 120 },
]

function TabIsolatedCart() {
  const [cart, setCart, clearCart] = useSessionStorage('poc:cart', [])

  const addItem = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id)
      if (existing) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...product, qty: 1 }]
    })
  }

  const removeItem = (id) => setCart((prev) => prev.filter((i) => i.id !== id))

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0)

  return (
    <div className="card">
      <div className="card-label">sessionStorage · tab-isolated</div>
      <h2>Tab-Isolated Cart</h2>
      <p>
        Open this page in a <strong>second tab</strong> — each tab has its own cart. Closing
        the tab clears it.
      </p>
      <div className="product-list">
        {PRODUCTS.map((p) => (
          <button key={p.id} className="product-btn" onClick={() => addItem(p)}>
            + {p.name} <span className="price">${p.price}</span>
          </button>
        ))}
      </div>
      {cart.length > 0 ? (
        <>
          <div className="cart-items">
            {cart.map((i) => (
              <div key={i.id} className="cart-row">
                <span>{i.name} ×{i.qty}</span>
                <span>${i.price * i.qty}</span>
                <button className="btn-danger btn-sm" onClick={() => removeItem(i.id)}>×</button>
              </div>
            ))}
          </div>
          <div className="row space-between">
            <strong>Total: ${total}</strong>
            <button className="btn-ghost" onClick={clearCart}>Clear cart</button>
          </div>
        </>
      ) : (
        <div className="empty-state">Cart is empty — click a product above.</div>
      )}
    </div>
  )
}

// ─── 3. Session Page History ──────────────────────────────────────────────────
const PAGES = ['Home', 'Products', 'Blog', 'Pricing', 'Contact']

function PageHistory() {
  const [history, setHistory, clearHistory] = useSessionStorage('poc:history', [])

  const navigate = (page) => {
    setHistory((h) => {
      const entry = { page, time: new Date().toLocaleTimeString() }
      return [entry, ...h].slice(0, 8)
    })
  }

  return (
    <div className="card">
      <div className="card-label">sessionStorage · navigation history</div>
      <h2>Session Page History</h2>
      <p>
        Tracks which "pages" were visited during this session. History is gone when the tab
        closes — no persistent footprint.
      </p>
      <div className="row wrap">
        {PAGES.map((p) => (
          <button key={p} className="btn-ghost" onClick={() => navigate(p)}>{p}</button>
        ))}
      </div>
      {history.length > 0 ? (
        <div className="history-list">
          {history.map((entry, i) => (
            <div key={i} className="history-row">
              <span className={`history-dot ${i === 0 ? 'history-dot--active' : ''}`} />
              <span className="history-page">{entry.page}</span>
              <span className="history-time">{entry.time}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">No pages visited yet — click a page above.</div>
      )}
      {history.length > 0 && (
        <button className="btn-ghost" onClick={clearHistory}>Clear history</button>
      )}
    </div>
  )
}

// ─── 4. Ephemeral Notes ───────────────────────────────────────────────────────
function EphemeralNotes() {
  const [notes, setNotes, clearNotes] = useSessionStorage('poc:notes', '')
  const [saved, setSaved] = useState(false)
  const timer = useRef(null)

  const handleChange = (e) => {
    setNotes(e.target.value)
    setSaved(false)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setSaved(true), 600)
  }

  return (
    <div className="card">
      <div className="card-label">sessionStorage · ephemeral</div>
      <h2>Scratch Notes</h2>
      <p>
        Notes persist through <strong>refreshes</strong> within this tab, but are{' '}
        <strong>wiped when the tab closes</strong>. Great for temporary clipboard content.
      </p>
      <textarea
        value={notes}
        onChange={handleChange}
        rows={5}
        placeholder="Jot something down…"
      />
      <div className="row space-between">
        <span className="status-text">
          {saved && notes ? '✓ saved to session' : notes ? 'typing…' : ''}
        </span>
        <button className="btn-ghost" onClick={() => { clearNotes(); setSaved(false) }}>
          Clear
        </button>
      </div>
      <div className="row">
        <span className="size-badge">{new Blob([notes]).size} B used</span>
      </div>
    </div>
  )
}

// ─── 5. Session Visit Counter ─────────────────────────────────────────────────
function VisitCounter() {
  const [visits, setVisits] = useSessionStorage('poc:visits', 0)
  const [startTime] = useSessionStorage('poc:startTime', new Date().toLocaleTimeString())

  useEffect(() => {
    setVisits((v) => v + 1)
  }, [setVisits])

  const elapsed = () => {
    const start = sessionStorage.getItem('poc:startTime')
    if (!start) return '—'
    return JSON.parse(start)
  }

  return (
    <div className="card card--accent">
      <div className="card-label">sessionStorage · lifecycle</div>
      <h2>Session Visit Counter</h2>
      <p>
        Counts how many times this page has been loaded <strong>in this tab</strong> (including
        refreshes). Resets to zero when the tab closes.
      </p>
      <div className="row" style={{ gap: 24 }}>
        <div className="stat-block">
          <span className="stat-value">{visits}</span>
          <span className="stat-label">page loads</span>
        </div>
        <div className="stat-block">
          <span className="stat-value" style={{ fontSize: 18 }}>{startTime}</span>
          <span className="stat-label">session started</span>
        </div>
      </div>
      <p style={{ fontSize: 13 }}>
        Refresh the page — the counter increments. Open a new tab — it starts from 1.
      </p>
    </div>
  )
}

// ─── 6. Session Inspector ─────────────────────────────────────────────────────
function SessionInspector() {
  const [entries, setEntries] = useState([])

  const refresh = useCallback(() => {
    const list = []
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i)
      const raw = sessionStorage.getItem(key)
      list.push({ key, raw, size: new Blob([raw]).size })
    }
    list.sort((a, b) => a.key.localeCompare(b.key))
    setEntries(list)
  }, [])

  useEffect(() => {
    refresh()
    // Poll for updates since sessionStorage has no cross-tab event and React
    // state changes don't emit native events
    const id = setInterval(refresh, 500)
    return () => clearInterval(id)
  }, [refresh])

  const totalBytes = entries.reduce((sum, e) => sum + e.size, 0)

  return (
    <div className="inspector">
      <div className="inspector-header">
        <h2>Session Inspector</h2>
        <span className="badge">
          {entries.length} key{entries.length !== 1 ? 's' : ''} · {totalBytes} B
        </span>
        <div className="row" style={{ marginLeft: 'auto' }}>
          <button className="btn-ghost btn-sm" onClick={refresh}>Refresh</button>
          <button
            className="btn-danger btn-sm"
            onClick={() => { sessionStorage.clear(); refresh() }}
          >
            Clear all
          </button>
        </div>
      </div>

      {entries.length === 0 ? (
        <div className="inspector-empty">No keys in sessionStorage yet — interact with the demos above.</div>
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
                onClick={() => { sessionStorage.removeItem(key); refresh() }}
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
        <h1>sessionStorage PoC</h1>
        <p className="poc-subtitle">
          Web Storage API · <code>sessionStorage</code> · tab-scoped · cleared on close
        </p>
      </header>

      <div className="poc-grid">
        <MultiStepForm />
        <TabIsolatedCart />
        <PageHistory />
        <EphemeralNotes />
        <VisitCounter />
      </div>

      <SessionInspector />
    </div>
  )
}

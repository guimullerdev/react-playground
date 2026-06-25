import { useServiceWorker } from './hooks/useServiceWorker'
import './App.css'

const STATUS_LABELS = {
  idle: { label: 'Not registered', color: '#6b6375' },
  installing: { label: 'Installing', color: '#f59e0b' },
  waiting: { label: 'Waiting', color: '#3b82f6' },
  activating: { label: 'Activating', color: '#a855f7' },
  activated: { label: 'Active', color: '#22c55e' },
  redundant: { label: 'Redundant', color: '#ef4444' },
  error: { label: 'Error', color: '#ef4444' },
}

const LIFECYCLE_STEPS = ['installing', 'waiting', 'activating', 'activated']

function StatusBadge({ status }) {
  const { label, color } = STATUS_LABELS[status] ?? STATUS_LABELS.idle
  return (
    <span className="sw-badge" style={{ '--badge-color': color }}>
      <span className="sw-badge-dot" />
      {label}
    </span>
  )
}

function UpdateBanner({ onApply }) {
  return (
    <div className="sw-update-banner">
      <span>A new version is available.</span>
      <button className="sw-update-btn" onClick={onApply}>
        Update now
      </button>
    </div>
  )
}

function LifecycleStep({ step, active, done }) {
  return (
    <div className={`lc-step ${active ? 'active' : ''} ${done ? 'done' : ''}`}>
      <div className="lc-dot" />
      <span>{STATUS_LABELS[step]?.label ?? step}</span>
    </div>
  )
}

export default function App() {
  const { status, updateAvailable, applyUpdate } = useServiceWorker('/sw.js')

  const currentIndex = LIFECYCLE_STEPS.indexOf(status)

  return (
    <>
      {updateAvailable && <UpdateBanner onApply={applyUpdate} />}

      <section id="center">
        <h1>Service Worker Lifecycle</h1>

        <div className="sw-status-row">
          <span className="sw-status-label">Current status</span>
          <StatusBadge status={status} />
        </div>

        <div className="lc-track">
          {LIFECYCLE_STEPS.map((step, i) => (
            <div key={step} className="lc-item">
              <LifecycleStep
                step={step}
                active={status === step}
                done={currentIndex > i}
              />
              {i < LIFECYCLE_STEPS.length - 1 && (
                <div className={`lc-connector ${currentIndex > i ? 'done' : ''}`} />
              )}
            </div>
          ))}
        </div>

        <p className="sw-hint">
          {status === 'waiting'
            ? 'A new SW is installed and waiting. Click "Update now" to activate it.'
            : status === 'activated'
            ? 'SW is active and controlling the page.'
            : status === 'idle'
            ? 'Registering service worker…'
            : `SW is ${STATUS_LABELS[status]?.label?.toLowerCase() ?? status}…`}
        </p>
      </section>

      <div className="ticks" />
    </>
  )
}

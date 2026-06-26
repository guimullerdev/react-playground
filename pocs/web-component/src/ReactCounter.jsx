import { useState } from 'react'

export function ReactCounter() {
  const [count, setCount] = useState(0)

  return (
    <div className="counter-card">
      <span className="counter-label">React Counter</span>
      <span className="counter-value">{count}</span>
      <div className="counter-actions">
        <button type="button" onClick={() => setCount((c) => c - 1)}>−</button>
        <button type="button" onClick={() => setCount(0)}>Reset</button>
        <button type="button" onClick={() => setCount((c) => c + 1)}>+</button>
      </div>
    </div>
  )
}

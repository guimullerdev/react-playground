import { useState, useEffect, useCallback } from 'react'

function dispatchLocalChange() {
  window.dispatchEvent(new Event('localStorageChange'))
}

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw !== null ? JSON.parse(raw) : initialValue
    } catch {
      return initialValue
    }
  })

  const set = useCallback(
    (newValue) => {
      setValue((prev) => {
        const next = typeof newValue === 'function' ? newValue(prev) : newValue
        try {
          localStorage.setItem(key, JSON.stringify(next))
          dispatchLocalChange()
        } catch (err) {
          if (err.name === 'QuotaExceededError') {
            console.warn('localStorage quota exceeded for key:', key)
          }
        }
        return next
      })
    },
    [key],
  )

  const remove = useCallback(() => {
    localStorage.removeItem(key)
    setValue(initialValue)
    dispatchLocalChange()
  }, [key, initialValue])

  // Sync state when another tab writes to the same key
  useEffect(() => {
    const sync = (e) => {
      if (e.key !== key) return
      try {
        setValue(e.newValue !== null ? JSON.parse(e.newValue) : initialValue)
      } catch {
        setValue(initialValue)
      }
    }
    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [key, initialValue])

  return [value, set, remove]
}

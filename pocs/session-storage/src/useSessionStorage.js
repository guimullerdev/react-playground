import { useState, useCallback } from 'react'

export function useSessionStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = sessionStorage.getItem(key)
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
          sessionStorage.setItem(key, JSON.stringify(next))
        } catch (err) {
          if (err.name === 'QuotaExceededError') {
            console.warn('sessionStorage quota exceeded for key:', key)
          }
        }
        return next
      })
    },
    [key],
  )

  const remove = useCallback(() => {
    sessionStorage.removeItem(key)
    setValue(initialValue)
  }, [key, initialValue])

  return [value, set, remove]
}

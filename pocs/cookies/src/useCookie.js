import { useState, useCallback } from 'react'

export function parseCookies() {
  if (!document.cookie) return {}
  return document.cookie.split('; ').reduce((acc, pair) => {
    const idx = pair.indexOf('=')
    const key = decodeURIComponent(pair.slice(0, idx))
    const val = decodeURIComponent(pair.slice(idx + 1))
    acc[key] = val
    return acc
  }, {})
}

function buildCookieString(name, value, { maxAge, path = '/', sameSite = 'Lax', secure } = {}) {
  let str = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`
  if (maxAge != null) str += `; Max-Age=${maxAge}`
  if (path) str += `; Path=${path}`
  if (sameSite) str += `; SameSite=${sameSite}`
  if (secure) str += `; Secure`
  return str
}

export function useCookie(name, defaultValue = '') {
  const read = () => {
    const all = parseCookies()
    return name in all ? all[name] : defaultValue
  }

  const [value, setValueState] = useState(read)

  const setValue = useCallback(
    (newValue, options = {}) => {
      const val = typeof newValue === 'function' ? newValue(read()) : newValue
      document.cookie = buildCookieString(name, val, options)
      setValueState(val)
    },
    [name],
  )

  const remove = useCallback(
    (options = {}) => {
      document.cookie = buildCookieString(name, '', { ...options, maxAge: 0 })
      setValueState(defaultValue)
    },
    [name, defaultValue],
  )

  return [value, setValue, remove]
}

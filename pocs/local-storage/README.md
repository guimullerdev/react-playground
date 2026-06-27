# localStorage PoC

A focused proof-of-concept exploring the **Web Storage API** in a React 19 + Vite app. It covers `localStorage`, `sessionStorage`, and the `storage` event — the three pillars of browser-native persistence.

## What's inside

| Demo | Key concept |
|---|---|
| **Persist Counter** | Stores a number in `localStorage`; survives page refresh |
| **User Preferences** | Serialises a plain object with `JSON.stringify` / `JSON.parse` |
| **Auto-Save Draft** | Debounced writes (600 ms) — reduces storage churn while typing |
| **Cross-Tab Sync** | Listens to the `storage` event to keep two tabs in sync |
| **Session Storage** | Same API as `localStorage` but cleared when the tab closes |
| **Storage Inspector** | Live table of all `localStorage` keys, values, and byte sizes |

## Core hook — `useLocalStorage`

`src/useLocalStorage.js` exposes a single hook:

```js
const [value, setValue, removeValue] = useLocalStorage(key, initialValue)
```

- Reads from `localStorage` on mount (falls back to `initialValue` if missing or unparseable).
- `setValue` accepts a value **or an updater function** (`(prev) => next`), mirrors `useState`.
- `removeValue` deletes the key and resets state to `initialValue`.
- Fires a custom `localStorageChange` event so the **Storage Inspector** stays in sync within the same tab.
- Listens to the native `storage` event to react to writes from **other tabs**.
- Catches `QuotaExceededError` and logs a warning instead of crashing.

## Stack

- React 19
- Vite 8
- Oxlint

## Running locally

```bash
yarn        # install deps
yarn dev    # start dev server
```

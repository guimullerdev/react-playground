# Service Worker Lifecycle — POC

A React + Vite proof-of-concept that demonstrates the full Service Worker lifecycle and offline fallback page.

## What this covers

- **SW registration** — registers `/sw.js` via the `useServiceWorker` hook on mount
- **Lifecycle states** — tracks `installing → waiting → activating → activated` and surfaces them in the UI with a visual step-track and color-coded badge
- **Update detection** — distinguishes a first install from a genuine update (checks `navigator.serviceWorker.controller` before flagging an update)
- **Manual update trigger** — posts `SKIP_WAITING` to the waiting worker; the page auto-reloads on `controllerchange`
- **Offline fallback** — the SW catches failed network requests and serves `public/offline.html` instead of a blank error screen
- **Old cache cleanup** — on `activate`, the SW deletes any cache whose key doesn't match the current `SW_VERSION`

## Project structure

```
src/
  App.jsx                 # UI: status badge, lifecycle step-track, update banner
  hooks/
    useServiceWorker.js   # Hook: registration, state tracking, applyUpdate()
public/
  sw.js                   # Service Worker: install, activate, fetch, message
  offline.html            # Fallback page shown when the user is offline
```

## Key concepts

| Concept | Where |
|---|---|
| Cache versioning | `SW_VERSION` constant in `sw.js` |
| Precaching | `PRECACHE_URLS` in `sw.js` (`/` and `/offline.html`) |
| Update vs first install | `navigator.serviceWorker.controller` check in `useServiceWorker.js:22` |
| Force activate | `SKIP_WAITING` message handler in `sw.js:23` |
| Page reload after swap | `controllerchange` listener in `useServiceWorker.js:43` |

## Running locally

```bash
yarn dev
```

> **Note:** Service Workers require HTTPS or `localhost`. The Vite dev server on `localhost` works out of the box.

To test the update flow, bump `SW_VERSION` in `public/sw.js`, then reload the page — the update banner will appear.

To test offline, open DevTools → Network → set throttle to **Offline**, then navigate to any route.

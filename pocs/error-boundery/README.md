# POC: Error Boundary

A proof-of-concept demonstrating how React **Error Boundaries** catch and isolate runtime errors so that a single broken component doesn't crash the entire application.

## What is an Error Boundary?

An Error Boundary is a React class component that implements one or both of:

- `static getDerivedStateFromError(error)` — updates state so the next render shows a fallback UI
- `componentDidCatch(error, errorInfo)` — logs the error (analytics, monitoring, etc.)

Only class components can be Error Boundaries. Functional components cannot be Error Boundaries themselves, but they can be *wrapped* by one.

> **Important caveat:** Error Boundaries do **not** catch errors thrown inside event handlers or asynchronous code (`setTimeout`, promises, `useEffect`). They only catch errors that happen during rendering, in lifecycle methods, and in constructors of child components.

## Project Structure

```
src/
├── App.jsx                        # Wraps each component in its own ErrorBoundary
└── components/
    ├── ErrorBoundary.tsx          # Reusable Error Boundary class component
    ├── BombInEffect.tsx           # Throws inside useEffect (async — NOT caught)
    ├── UserProfile.tsx            # Throws when accessing data before fetch resolves
    └── Dashboard.tsx              # Throws when required config props are missing
```

## Components Explained

### `ErrorBoundary`

Generic, reusable boundary that accepts a `fallback` prop rendered when an error is caught.

```tsx
<ErrorBoundary fallback={<p>Something went wrong</p>}>
  <SomeComponent />
</ErrorBoundary>
```

### `BombInEffect`

Throws an error inside `useEffect`. This demonstrates the **limitation** of Error Boundaries: errors in effects are *asynchronous* and happen after the render phase, so they are **not caught** by the boundary in React 18.

### `UserProfile`

Fetches user data from an API and immediately tries to read `user.name` before the fetch resolves (when `user` is still `null`). This causes a `TypeError` during rendering that *is* caught by the boundary.

### `Dashboard`

Receives a typed `config` prop with required nested fields (`title`, `settings.theme`). Passing an empty object `{}` causes a `TypeError` when the component tries to read `config.settings.theme`. This error *is* caught by the boundary.

## Key Takeaways

| Error location | Caught by Error Boundary? |
|---|---|
| During render | Yes |
| In a constructor | Yes |
| In a lifecycle method | Yes |
| Inside `useEffect` | No |
| Inside event handlers | No |
| In async code / promises | No |

## Running the Project

```bash
npm install
npm run dev
```

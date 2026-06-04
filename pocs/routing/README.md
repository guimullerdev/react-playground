# Routing POC — React Router DOM vs TanStack Router

Two parallel implementations of the same features using different routing libraries.

---

## General trade-offs

| | React Router DOM v7 | TanStack Router v1 |
|---|---|---|
| **Community** | Largest React router community, abundant examples | Smaller but growing community |
| **API simplicity** | Declarative JSX (`<Routes>`, `<Route>`) — minimal boilerplate | Verbose setup (`createRootRoute`, `createRoute`, `addChildren`) |
| **Type safety** | Untyped params/search params — runtime errors only | Fully type-safe routes, params and search params — broken links are compile errors |
| **Search params** | Manual parsing and serialization | Built-in parsing, serialization and validation via `validateSearch` |
| **Data loading** | Loaders and actions baked in (Remix-style) | Route-level `loader` with caching and invalidation |
| **File-based routing** | Requires Remix or a community plugin | Supported out of the box via `@tanstack/router-plugin` |
| **JavaScript support** | Works without TypeScript, no generated files | JS works but loses the main type-safety benefit |
| **Bundle size** | ~15 kB gzipped | ~47 kB gzipped |

---

## Protected routes trade-offs

| | React Router DOM v7 | TanStack Router v1 |
|---|---|---|
| **Auth check mechanism** | `loader` function reads localStorage before render | `beforeLoad` on each route receives typed `context.auth` |
| **Auth context access** | Not available in loaders — must read localStorage directly | Injected via `createRootRouteWithContext`, available in every `beforeLoad` |
| **Protected route pattern** | Layout route with `<ProtectedRoute>` component + `<Outlet />` | No wrapper component needed — `beforeLoad` handles the redirect |
| **Redirect to login** | `return redirect('/login?redirect=...')` inside loader | `throw redirect({ to: '/login', search: { redirect: location.pathname } })` |
| **Redirect after login** | `useSearchParams()` reads `?redirect`, `useNavigate()` to go back | `validateSearch` with zod parses `?redirect`, `useNavigate()` to go back |
| **Search param validation** | No built-in validation — raw string from `useSearchParams()` | Validated at route level with `z.object({ redirect: z.string().optional() })` |
| **Type safety** | Redirect paths are untyped strings | `beforeLoad` context is fully typed, `redirect({ to })` is type-checked |
| **Boilerplate** | `ProtectedRoute` component + `protectedLoader` function | Just `beforeLoad` on each protected route, no extra component |
| **Devtools** | React Router Devtools (browser extension) | `TanStackRouterDevtools` built-in component, zero config |

---

## When to choose which

| Scenario | Pick |
|---|---|
| Greenfield TypeScript app with complex navigation | TanStack Router |
| Quick prototype or JS-only project | React Router DOM |
| Already using Remix patterns (loaders/actions) | React Router DOM |
| Need type-safe search params (filters, pagination) | TanStack Router |
| Want auth context available directly in route guards | TanStack Router |
| Team is new to React routing | React Router DOM |
| Large app where broken links should be caught at build time | TanStack Router |

# Routing POC — React Router DOM vs TanStack Router

This project runs both routing libraries side by side on the same todo list app (data from [JSONPlaceholder](https://jsonplaceholder.typicode.com)). Use the selector bar at the top to switch between implementations at runtime.

## Structure

```
src/
  App.jsx                     # selector toggle (no router here)
  react-router/
    Router.jsx                # BrowserRouter + Routes setup
    pages/Home.jsx
    pages/TodoDetail.jsx
  tanstack-router/
    Router.jsx                # RouterProvider setup
    pages/Home.jsx
    pages/TodoDetail.jsx
```

---

## Trade-off: React Router DOM vs TanStack Router

| | React Router DOM v7 | TanStack Router v1 |
|---|---|---|
| **Community** | Largest React router community, abundant examples | Smaller but growing community |
| **API simplicity** | Declarative JSX (`<Routes>`, `<Route>`, `<Link>`) — minimal boilerplate | Verbose setup (`createRootRoute`, `createRoute`, `addChildren`) |
| **Type safety** | Untyped params/search params — runtime errors only | Fully type-safe routes, params and search params — broken links are compile errors |
| **Search params** | Manual parsing and serialization | Built-in parsing, serialization and validation |
| **Data loading** | Loaders and actions baked in (Remix-style) | Route-level `loader` with caching and invalidation |
| **File-based routing** | Requires Remix or a community plugin | Supported out of the box via `@tanstack/router-plugin` |
| **JavaScript support** | Works without TypeScript, no generated files | JS works but loses the main type-safety benefit |
| **Bundle size** | ~15 kB gzipped | ~47 kB gzipped |

---

## When to choose which

| Scenario | Pick |
|---|---|
| Greenfield TypeScript app with complex navigation | TanStack Router |
| Quick prototype or JS-only project | React Router DOM |
| Already using Remix patterns (loaders/actions) | React Router DOM |
| Need type-safe search params (filters, pagination) | TanStack Router |
| Team is new to React routing | React Router DOM |
| Large app where broken links should be caught at build time | TanStack Router |

import { createRouter, createRoute, createRootRoute, RouterProvider } from '@tanstack/react-router'
import Home from './pages/Home'
import TodoDetail from './pages/TodoDetail'

const rootRoute = createRootRoute()

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
})

const todoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/todos/$id',
  component: TodoDetail,
})

const routeTree = rootRoute.addChildren([homeRoute, todoRoute])

const router = createRouter({ routeTree })

export default function TanStackRouterApp() {
  return <RouterProvider router={router} />
}

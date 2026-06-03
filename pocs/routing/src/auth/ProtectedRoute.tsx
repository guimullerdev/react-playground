import { redirect, Outlet, type LoaderFunctionArgs } from 'react-router-dom'

const TOKEN_KEY = 'auth_token'

export function protectedLoader({ request }: LoaderFunctionArgs) {
  const token = localStorage.getItem(TOKEN_KEY)
  if (!token) {
    const url = new URL(request.url)
    return redirect(`/login?redirect=${encodeURIComponent(url.pathname)}`)
  }
  return null
}

export function ProtectedRoute() {
  return <Outlet />
}

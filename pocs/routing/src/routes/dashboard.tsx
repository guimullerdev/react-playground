import { createFileRoute, redirect, Link } from '@tanstack/react-router'
import { useAuth } from '../auth/AuthContext'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: { redirect: location.pathname },
      })
    }
  },
  component: Dashboard,
})

function Dashboard() {
  const { user, logout } = useAuth()

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, <strong>{user?.username}</strong></p>
      <nav>
        <Link to="/">Home</Link> · <Link to="/profile">Profile</Link>
      </nav>
      <br />
      <button onClick={logout}>Logout</button>
    </div>
  )
}

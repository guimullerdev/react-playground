import { createFileRoute, redirect, Link } from '@tanstack/react-router'
import { useAuth } from '../auth/AuthContext'

export const Route = createFileRoute('/profile')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: { redirect: location.pathname },
      })
    }
  },
  component: Profile,
})

function Profile() {
  const { user, logout } = useAuth()

  return (
    <div>
      <h1>Profile</h1>
      <p>Username: <strong>{user?.username}</strong></p>
      <p>Token: <code>{user?.token}</code></p>
      <nav>
        <Link to="/">Home</Link> · <Link to="/dashboard">Dashboard</Link>
      </nav>
      <br />
      <button onClick={logout}>Logout</button>
    </div>
  )
}

import { createFileRoute, Link } from '@tanstack/react-router'
import { useAuth } from '../auth/AuthContext'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const { isAuthenticated, user, logout } = useAuth()

  return (
    <div>
      <h1>Home</h1>
      {isAuthenticated ? (
        <p>
          Logged in as <strong>{user?.username}</strong>.{' '}
          <button onClick={logout}>Logout</button>
        </p>
      ) : (
        <p>
          <Link to="/login">Login</Link>
        </p>
      )}
      <nav>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
      </nav>
    </div>
  )
}

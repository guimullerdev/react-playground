import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export default function Home() {
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

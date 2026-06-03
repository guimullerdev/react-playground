import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export default function Dashboard() {
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

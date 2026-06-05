import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'

export default function Profile() {
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

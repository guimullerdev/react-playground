import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'

export default function Home() {
  const { isAuthenticated, user, logout } = useAuth()
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((res) => res.json())
      .then((data) => {
        setTodos(data)
        setLoading(false)
      })
  }, [])

  if (loading) return <p className="status">Loading...</p>

  return (
    <div className="page">
      <h1>Home</h1>
      {isAuthenticated ? (
        <p>
          Logged in as <strong>{user?.username}</strong>.{' '}
          <button onClick={logout}>Logout</button>
        </p>
      ) : (
        <p><Link to="/login">Login</Link></p>
      )}
      <nav>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
      </nav>
      <hr />
      <h2>Todo List</h2>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <Link to={`/todos/${todo.id}`}>
              <span className="todo-id">#{todo.id}</span>
              <span className="todo-title">{todo.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

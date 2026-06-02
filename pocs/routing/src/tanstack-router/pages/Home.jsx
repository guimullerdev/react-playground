import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'

export default function Home() {
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
      <h1>Todo List</h1>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <Link to="/todos/$id" params={{ id: String(todo.id) }}>
              <span className="todo-id">#{todo.id}</span>
              <span className="todo-title">{todo.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

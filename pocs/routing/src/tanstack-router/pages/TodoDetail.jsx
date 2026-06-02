import { useEffect, useState } from 'react'
import { useParams, Link } from '@tanstack/react-router'

export default function TodoDetail() {
  const { id } = useParams({ from: '/todos/$id' })
  const [todo, setTodo] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTodo(data)
        setLoading(false)
      })
  }, [id])

  if (loading) return <p className="status">Loading...</p>

  return (
    <div className="page">
      <Link to="/" className="back-link">← Back to list</Link>
      <div className="todo-detail">
        <h1>Todo #{todo.id}</h1>
        <p className="detail-title">{todo.title}</p>
        <p className="detail-status">
          Status: <span className={todo.completed ? 'completed' : 'pending'}>
            {todo.completed ? 'Completed' : 'Pending'}
          </span>
        </p>
        <p className="detail-user">User ID: {todo.userId}</p>
      </div>
    </div>
  )
}

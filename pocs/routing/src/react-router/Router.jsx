import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from '../auth/AuthContext'
import { ProtectedRoute, protectedLoader } from '../auth/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import TodoDetail from './pages/TodoDetail'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/todos/:id',
    element: <TodoDetail />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    element: <ProtectedRoute />,
    loader: protectedLoader,
    children: [
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/profile', element: <Profile /> },
    ],
  },
])

export default function ReactRouterApp() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

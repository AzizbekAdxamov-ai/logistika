import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Dashboard from '../pages/Dashboard'

export default function RoleHome() {
  const { user } = useAuth()
  if (user?.role === 'Fleet manager') return <Navigate to="/fleet" replace />
  return <Dashboard />
}

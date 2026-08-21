import { Routes, Route } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import RoleHome from './components/RoleHome'
import AppShell from './components/layout/AppShell'
import FleetShell from './components/layout/FleetShell'
import Login from './pages/Login'
import Register from './pages/Register'
import Tracking from './pages/Tracking'
import Loads from './pages/Loads'
import LoadDetail from './pages/LoadDetail'
import Alerts from './pages/Alerts'
import Documents from './pages/Documents'
import DispatchStatus from './pages/DispatchStatus'
import Settings from './pages/Settings'
import Drivers from './pages/Drivers'
import DriverDetail from './pages/DriverDetail'
import BrokerChat from './pages/BrokerChat'
import FleetDashboard from './pages/FleetDashboard'
import TruckDetail from './pages/TruckDetail'
import FleetMaintenance from './pages/FleetMaintenance'
import FleetAlerts from './pages/FleetAlerts'
import FleetDocuments from './pages/FleetDocuments'
import FleetSettings from './pages/FleetSettings'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppShell />
              </ProtectedRoute>
            }
          >
            <Route index element={<RoleHome />} />
            <Route path="loads" element={<Loads />} />
            <Route path="loads/:id" element={<LoadDetail />} />
            <Route path="tracking" element={<Tracking />} />
            <Route path="drivers" element={<Drivers />} />
            <Route path="drivers/:id" element={<DriverDetail />} />
            <Route path="broker-chat" element={<BrokerChat />} />
            <Route path="alerts" element={<Alerts />} />
            <Route path="documents" element={<Documents />} />
            <Route path="dispatch-status" element={<DispatchStatus />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route
            path="/fleet"
            element={
              <ProtectedRoute>
                <FleetShell />
              </ProtectedRoute>
            }
          >
            <Route index element={<FleetDashboard />} />
            <Route path="trucks/:id" element={<TruckDetail />} />
            <Route path="maintenance" element={<FleetMaintenance />} />
            <Route path="alerts" element={<FleetAlerts />} />
            <Route path="documents" element={<FleetDocuments />} />
            <Route path="settings" element={<FleetSettings />} />
          </Route>
        </Routes>
      </AuthProvider>
    </MotionConfig>
  )
}

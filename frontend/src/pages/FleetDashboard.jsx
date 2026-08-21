import { motion } from 'framer-motion'
import AlertStrip from '../components/dashboard/AlertStrip'
import TruckCard from '../components/fleet/TruckCard'
import { trucks, fleetAlerts } from '../data/fleetData'
import './FleetDashboard.css'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
}

const card = {
  hidden: { opacity: 0, y: 12, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
}

export default function FleetDashboard() {
  const activeCount = trucks.filter((t) => t.status === 'active').length
  const maintenanceCount = trucks.filter((t) => t.status === 'maintenance').length
  const idleCount = trucks.filter((t) => t.status === 'idle').length
  const avgFuel = Math.round(trucks.reduce((sum, t) => sum + t.fuel.pct, 0) / trucks.length)

  const alertItems = fleetAlerts.map((a) => ({ strong: a.truckId, text: a.title }))

  return (
    <>
      <AlertStrip items={alertItems} />

      <div className="page-head">
        <div>
          <div className="page-title">Fleet overview</div>
          <div className="page-sub">{trucks.length} ta truck — jonli holat va statistika</div>
        </div>
      </div>

      <div className="fleet-summary-row">
        <div className="fleet-summary-card">
          <div className="fleet-summary-label">Faol</div>
          <div className="fleet-summary-value green">{activeCount}</div>
        </div>
        <div className="fleet-summary-card">
          <div className="fleet-summary-label">Xizmatda</div>
          <div className="fleet-summary-value amber">{maintenanceCount}</div>
        </div>
        <div className="fleet-summary-card">
          <div className="fleet-summary-label">Bo'sh turibdi</div>
          <div className="fleet-summary-value">{idleCount}</div>
        </div>
        <div className="fleet-summary-card">
          <div className="fleet-summary-label">O'rtacha yoqilg'i</div>
          <div className="fleet-summary-value mono">{avgFuel}%</div>
        </div>
      </div>

      <motion.div className="truck-card-grid" variants={container} initial="hidden" animate="show">
        {trucks.map((truck) => (
          <TruckCard key={truck.id} truck={truck} variants={card} />
        ))}
      </motion.div>
    </>
  )
}

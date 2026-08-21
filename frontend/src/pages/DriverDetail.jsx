import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Phone, Envelope } from '@phosphor-icons/react'
import { drivers, loads } from '../data/mockData'
import '../components/dashboard/Panel.css'
import './DriverDetail.css'

const STATUS_CLASS = {
  'On route': 'ontime',
  'Available': 'ontime',
  'HOS limit': 'warn',
  'Off duty': 'neutral',
  'Home': 'neutral',
}

const listContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
}

const listItem = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.22, ease: 'easeOut' } },
}

function initials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export default function DriverDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const driver = drivers.find((d) => d.id === id)
  const currentLoad = driver?.currentLoad ? loads.find((l) => l.id === driver.currentLoad) : null
  const history = loads.filter((l) => l.driver?.name === driver?.name)

  if (!driver) {
    return (
      <div className="panel driver-detail-missing">
        <p>Driver not found.</p>
        <Link to="/drivers">← Back to Drivers</Link>
      </div>
    )
  }

  return (
    <div>
      <div className="driver-detail-crumbs">
        <button className="driver-detail-back" onClick={() => navigate('/drivers')}>← Drivers</button>
        <span className="driver-detail-sep">/</span>
        <span className="driver-detail-crumb-current">{driver.name}</span>
      </div>

      <div className="driver-detail-head">
        <div className="driver-detail-id-row">
          <div className="driver-detail-avatar">{initials(driver.name)}</div>
          <div>
            <div className="driver-detail-title-row">
              <div className="driver-detail-name">{driver.name}</div>
              <span className={'badge ' + (STATUS_CLASS[driver.status] ?? 'neutral')}>
                <span className="dot"></span>
                {driver.status}
              </span>
            </div>
            <div className="driver-detail-sub">{driver.cdl} &nbsp;·&nbsp; {driver.unit} &nbsp;·&nbsp; {driver.homeBase}</div>
          </div>
        </div>
        <div className="driver-detail-actions">
          <button className="driver-detail-btn">
            <Phone size={14} aria-hidden="true" /> Call
          </button>
          <button className="driver-detail-btn primary">
            <Envelope size={14} aria-hidden="true" /> Message
          </button>
        </div>
      </div>

      <div className="driver-detail-grid">
        <div>
          <div className="panel">
            <div className="panel-head"><div className="panel-title">Driver details</div></div>
            <div className="dd-detail-body">
              <div className="dd-detail-grid">
                <div><div className="dd-detail-label">Phone</div><div className="dd-detail-value mono">{driver.phone}</div></div>
                <div><div className="dd-detail-label">Email</div><div className="dd-detail-value">{driver.email}</div></div>
                <div><div className="dd-detail-label">CDL</div><div className="dd-detail-value mono">{driver.cdl}</div></div>
                <div><div className="dd-detail-label">License expires</div><div className="dd-detail-value">{driver.licenseExpiry}</div></div>
                <div><div className="dd-detail-label">Home base</div><div className="dd-detail-value">{driver.homeBase}</div></div>
                <div><div className="dd-detail-label">Assigned unit</div><div className="dd-detail-value">{driver.unit}</div></div>
                <div><div className="dd-detail-label">Total miles</div><div className="dd-detail-value mono">{driver.totalMiles}</div></div>
                <div><div className="dd-detail-label">Safety score</div><div className="dd-detail-value mono">{driver.safetyScore} / 100</div></div>
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-head"><div className="panel-title">Load history</div></div>
            {history.length > 0 ? (
              <motion.div variants={listContainer} initial="hidden" animate="show">
                {history.map((l) => (
                  <motion.div className="dd-history-row" key={l.id} variants={listItem}>
                    <div className="dd-history-id mono">#{l.id}</div>
                    <div className="dd-history-route">{l.origin} <span className="arrow">→</span> {l.destination}</div>
                    <div className="dd-history-broker">{l.broker}</div>
                    <div className="loads-chevron">›</div>
                    <Link to={'/loads/' + l.id} className="dd-stretched-link" aria-label={'Open load #' + l.id}></Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="dd-empty">No load history yet.</div>
            )}
          </div>
        </div>

        <div>
          <div className="panel">
            <div className="panel-head"><div className="panel-title">Hours of service</div></div>
            <div className="dd-hos-body">
              <div className={'dd-hos-val mono' + (driver.state === 'hos' ? ' amber' : '')}>{driver.hos}</div>
              <div className="dd-hos-lbl">{driver.hosLabel}</div>
              <div className="dd-hos-track">
                <div
                  className={'dd-hos-fill' + (driver.state === 'hos' ? ' amber' : '')}
                  style={{ width: driver.state === 'off' ? '0%' : driver.hos === '11h 00m' ? '100%' : driver.hos === '6h 20m' ? '58%' : '6%' }}
                />
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-head"><div className="panel-title">Current load</div></div>
            {currentLoad ? (
              <div className="dd-current-load">
                <div className="dd-current-load-id mono">#{currentLoad.id}</div>
                <div className="dd-history-route">{currentLoad.origin} <span className="arrow">→</span> {currentLoad.destination}</div>
                <div className="dd-current-load-eta">{currentLoad.eta}</div>
                <Link to={'/loads/' + currentLoad.id} className="dd-stretched-link" aria-label={'Open load #' + currentLoad.id}></Link>
              </div>
            ) : (
              <div className="dd-empty">Not currently on a load.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

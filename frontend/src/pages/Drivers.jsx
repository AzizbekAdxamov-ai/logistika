import { useMemo, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { MagnifyingGlass } from '@phosphor-icons/react'
import { drivers } from '../data/mockData'
import '../components/dashboard/Panel.css'
import '../components/dashboard/LoadBoard.css'
import './PageHeader.css'
import './Drivers.css'

const TABS = [
  { key: 'all', label: 'All', match: () => true },
  { key: 'on', label: 'On route', match: (d) => d.state === 'on' && d.status !== 'Available' },
  { key: 'available', label: 'Available', match: (d) => d.status === 'Available' },
  { key: 'hos', label: 'HOS limit', match: (d) => d.state === 'hos' },
  { key: 'off', label: 'Off / home', match: (d) => d.state === 'off' },
]

const STATUS_CLASS = {
  'On route': 'ontime',
  'Available': 'ontime',
  'HOS limit': 'warn',
  'Off duty': 'neutral',
  'Home': 'neutral',
}

function initials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export default function Drivers() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('all')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const activeTab = TABS.find((t) => t.key === tab)
    const q = query.trim().toLowerCase()
    return drivers.filter((d) => {
      if (!activeTab.match(d)) return false
      if (!q) return true
      return d.name.toLowerCase().includes(q) || d.homeBase.toLowerCase().includes(q) || d.unit.toLowerCase().includes(q)
    })
  }, [tab, query])

  return (
    <>
      <div className="page-head">
        <div>
          <div className="page-title">Drivers</div>
          <div className="page-sub">Fleet roster, hours of service and current assignments</div>
        </div>
      </div>

      <div className="page-tabs">
        {TABS.map((t) => (
          <button
            key={t.key}
            className={'page-tab' + (tab === t.key ? ' active' : '')}
            onClick={() => setTab(t.key)}
          >
            {t.label} <span className="page-tab-count">{drivers.filter(t.match).length}</span>
          </button>
        ))}
      </div>

      <div className="page-toolbar">
        <div className="page-search">
          <MagnifyingGlass size={15} aria-hidden="true" />
          <input
            type="text"
            placeholder="Driver name, home base or unit..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="page-toolbar-spacer" />
        <div className="page-result-count">{filtered.length} drivers</div>
      </div>

      <div className="panel load-board">
        <table>
          <thead>
            <tr>
              <th>Driver</th>
              <th>Status</th>
              <th>Home base</th>
              <th>Unit</th>
              <th>Current load</th>
              <th>HOS</th>
              <th>Safety score</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false}>
              {filtered.map((driver) => (
                <motion.tr
                  className="row"
                  key={driver.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  onClick={() => navigate('/drivers/' + driver.id)}
                >
                  <td>
                    <div className="drivers-name-chip">
                      <span className="loads-driver-dot">{initials(driver.name)}</span>
                      <div>
                        <Link to={'/drivers/' + driver.id} className="drivers-name row-primary-link">{driver.name}</Link>
                        <div className="drivers-name-sub">{driver.cdl}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={'badge ' + (STATUS_CLASS[driver.status] ?? 'neutral')}>
                      <span className="dot"></span>
                      {driver.status}
                    </span>
                  </td>
                  <td>{driver.homeBase}</td>
                  <td className="mono">{driver.unit}</td>
                  <td className="mono">{driver.currentLoad ? '#' + driver.currentLoad : '—'}</td>
                  <td className={'mono' + (driver.state === 'hos' ? ' drivers-hos-amber' : '')}>{driver.hos}</td>
                  <td className="mono">{driver.safetyScore}</td>
                  <td className="loads-chevron">›</td>
                </motion.tr>
              ))}
            </AnimatePresence>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="page-empty">No drivers match this filter.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

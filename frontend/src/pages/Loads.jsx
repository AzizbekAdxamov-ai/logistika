import { useMemo, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { MagnifyingGlass } from '@phosphor-icons/react'
import { loads, STATUS_LABEL } from '../data/mockData'
import { EQUIPMENT_TYPES, EQUIPMENT_ORDER, formatEquipment } from '../data/equipmentTypes'
import '../components/dashboard/Panel.css'
import '../components/dashboard/LoadBoard.css'
import './PageHeader.css'
import './Loads.css'

const TABS = [
  { key: 'all', label: 'All', match: () => true },
  { key: 'active', label: 'Active', match: (l) => ['ontime', 'warn', 'crit'].includes(l.status) },
  { key: 'pending', label: 'Pending', match: (l) => l.status === 'neutral' },
  { key: 'delivered', label: 'Delivered', match: (l) => l.status === 'done' },
  { key: 'delayed', label: 'Delayed', match: (l) => l.status === 'crit' },
]

function initials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export default function Loads() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('all')
  const [query, setQuery] = useState('')
  const [equip, setEquip] = useState('all')

  const filtered = useMemo(() => {
    const activeTab = TABS.find((t) => t.key === tab)
    const q = query.trim().toLowerCase()
    return loads.filter((l) => {
      if (!activeTab.match(l)) return false
      if (equip !== 'all' && l.equipmentType !== equip) return false
      if (!q) return true
      return (
        l.id.includes(q) ||
        l.broker.toLowerCase().includes(q) ||
        l.origin.toLowerCase().includes(q) ||
        l.destination.toLowerCase().includes(q)
      )
    })
  }, [tab, query, equip])

  return (
    <>
      <div className="page-head">
        <div>
          <div className="page-title">Loads</div>
          <div className="page-sub">All loads and their current status</div>
        </div>
      </div>

      <div className="page-tabs">
        {TABS.map((t) => (
          <button
            key={t.key}
            className={'page-tab' + (tab === t.key ? ' active' : '')}
            onClick={() => setTab(t.key)}
          >
            {t.label} <span className="page-tab-count">{loads.filter(t.match).length}</span>
          </button>
        ))}
      </div>

      <div className="page-toolbar">
        <div className="page-search">
          <MagnifyingGlass size={15} aria-hidden="true" />
          <input
            type="text"
            placeholder="Load ID, broker or city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="loads-equip-filter" role="group" aria-label="Filter by equipment type">
          <button
            className={'loads-equip-btn' + (equip === 'all' ? ' active' : '')}
            onClick={() => setEquip('all')}
            aria-pressed={equip === 'all'}
          >
            All
          </button>
          {EQUIPMENT_ORDER.map((key) => {
            const eq = EQUIPMENT_TYPES[key]
            const Icon = eq.icon
            return (
              <button
                key={key}
                className={'loads-equip-btn' + (equip === key ? ' active' : '')}
                onClick={() => setEquip(key)}
                aria-pressed={equip === key}
                title={eq.label}
              >
                <Icon size={14} aria-hidden="true" />
                {eq.label}
              </button>
            )
          })}
        </div>

        <div className="page-toolbar-spacer" />
        <div className="page-result-count">{filtered.length} loads</div>
      </div>

      <div className="panel load-board">
        <table>
          <thead>
            <tr>
              <th>Load</th>
              <th>Route</th>
              <th>Equipment</th>
              <th>Broker</th>
              <th>Rate</th>
              <th>Pickup</th>
              <th>Delivery</th>
              <th>Driver</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false}>
              {filtered.map((load) => (
                <motion.tr
                  className="row"
                  key={load.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  onClick={() => navigate('/loads/' + load.id)}
                >
                  <td className="load-id mono">
                    <Link to={'/loads/' + load.id} className="row-primary-link">#{load.id}</Link>
                  </td>
                  <td>
                    <div className="route">
                      {load.origin} <span className="arrow">→</span> {load.destination}
                    </div>
                    <div className="loads-route-sub">{load.distance}</div>
                  </td>
                  <td>
                    {(() => {
                      const eq = EQUIPMENT_TYPES[load.equipmentType]
                      const Icon = eq.icon
                      return (
                        <div className="loads-equip-chip" title={formatEquipment(load)}>
                          <Icon size={14} aria-hidden="true" />
                          {eq.label}
                        </div>
                      )
                    })()}
                  </td>
                  <td>{load.broker}</td>
                  <td className="rate mono">${load.rate.toLocaleString()}</td>
                  <td className="mono">{load.pickup}</td>
                  <td className="mono">{load.delivery}</td>
                  <td>
                    {load.driver ? (
                      <div className="loads-driver-chip">
                        <span className="loads-driver-dot">{initials(load.driver.name)}</span>
                        {load.driver.name}
                      </div>
                    ) : (
                      <div className="loads-driver-chip unassigned">
                        <span className="loads-driver-dot">—</span>
                        Unassigned
                      </div>
                    )}
                  </td>
                  <td>
                    <span className={'badge ' + load.status}>
                      <span className="dot"></span>
                      {STATUS_LABEL[load.status]}
                    </span>
                  </td>
                  <td className="loads-chevron">›</td>
                </motion.tr>
              ))}
            </AnimatePresence>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={10} className="page-empty">No loads match this filter.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

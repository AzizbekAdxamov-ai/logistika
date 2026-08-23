import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Wrench } from '@phosphor-icons/react'
import { maintenanceRecords, MAINTENANCE_STATUS_LABEL, trucks } from '../data/fleetData'
import '../components/dashboard/Panel.css'
import './PageHeader.css'
import './FleetMaintenance.css'

const TABS = [
  { key: 'all', label: 'All', match: () => true },
  { key: 'overdue', label: 'Overdue', match: (m) => m.status === 'overdue' },
  { key: 'due', label: 'Due soon', match: (m) => m.status === 'due' },
  { key: 'scheduled', label: 'Scheduled', match: (m) => m.status === 'scheduled' },
  { key: 'done', label: 'Completed', match: (m) => m.status === 'done' },
]

function truckMeta(truckId) {
  const truck = trucks.find((t) => t.id === truckId)
  return truck ? truck.make + ' ' + truck.model : truckId
}

export default function FleetMaintenance() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('all')

  const overdueCount = maintenanceRecords.filter((m) => m.status === 'overdue').length
  const dueCount = maintenanceRecords.filter((m) => m.status === 'due').length
  const scheduledCount = maintenanceRecords.filter((m) => m.status === 'scheduled').length
  const monthCost = maintenanceRecords
    .filter((m) => m.status === 'done' && typeof m.cost === 'number')
    .reduce((sum, m) => sum + m.cost, 0)

  const filtered = useMemo(() => {
    const activeTab = TABS.find((t) => t.key === tab)
    return maintenanceRecords.filter(activeTab.match)
  }, [tab])

  return (
    <div>
      <div className="page-head">
        <div>
          <div className="page-title">Maintenance</div>
          <div className="page-sub">Service schedule and completed work history</div>
        </div>
      </div>

      <div className="fleet-summary-row">
        <div className="fleet-summary-card">
          <div className="fleet-summary-label">Overdue</div>
          <div className="fleet-summary-value red">{overdueCount}</div>
        </div>
        <div className="fleet-summary-card">
          <div className="fleet-summary-label">Due soon</div>
          <div className="fleet-summary-value amber">{dueCount}</div>
        </div>
        <div className="fleet-summary-card">
          <div className="fleet-summary-label">Scheduled</div>
          <div className="fleet-summary-value">{scheduledCount}</div>
        </div>
        <div className="fleet-summary-card">
          <div className="fleet-summary-label">Spent this month</div>
          <div className="fleet-summary-value mono">${monthCost.toLocaleString()}</div>
        </div>
      </div>

      <div className="page-tabs">
        {TABS.map((t) => (
          <button
            key={t.key}
            className={'page-tab' + (tab === t.key ? ' active' : '')}
            onClick={() => setTab(t.key)}
          >
            {t.label} <span className="page-tab-count">{maintenanceRecords.filter(t.match).length}</span>
          </button>
        ))}
      </div>

      <div className="panel">
        {filtered.length === 0 && <div className="page-empty">No service records in this category.</div>}
        <AnimatePresence initial={false}>
          {filtered.map((m) => (
            <motion.button
              className="maint-row"
              key={m.id}
              layout
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              onClick={() => navigate('/fleet/trucks/' + m.truckId)}
            >
              <div className="maint-icon"><Wrench size={15} aria-hidden="true" /></div>
              <div className="maint-info">
                <div className="maint-service">{m.service}</div>
                <div className="maint-meta">{m.truckId} · {truckMeta(m.truckId)}</div>
              </div>
              <div className="maint-due">
                <div className="maint-due-label">Due</div>
                <div className="maint-due-value mono">
                  {m.dueDate}
                  {m.dueMileage ? <> · {m.dueMileage.toLocaleString()} mi</> : null}
                </div>
              </div>
              <div className="maint-last">
                <div className="maint-due-label">Last service</div>
                <div className="maint-due-value mono">{m.lastService}</div>
              </div>
              <div className="maint-cost mono">{typeof m.cost === 'number' ? '$' + m.cost.toLocaleString() : '—'}</div>
              <span className={'maint-status ' + m.status}>{MAINTENANCE_STATUS_LABEL[m.status]}</span>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

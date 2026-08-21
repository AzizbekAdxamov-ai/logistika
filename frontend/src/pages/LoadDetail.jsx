import { useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Envelope, Phone, FileText, Check, Warning } from '@phosphor-icons/react'
import { loads, STATUS_LABEL } from '../data/mockData'
import { EQUIPMENT_TYPES, formatEquipment } from '../data/equipmentTypes'
import { useTheme } from '../theme/ThemeProvider'
import '../components/dashboard/Panel.css'
import './LoadDetail.css'

gsap.registerPlugin(useGSAP)

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

export default function LoadDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const load = loads.find((l) => l.id === id)
  const pageRef = useRef(null)
  const { theme } = useTheme()

  useGSAP(() => {
    if (!load) return
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({ delay: 0.1 })
      tl.from('.ld-tl-step', {
        opacity: 0,
        y: 10,
        scale: 0.9,
        duration: 0.35,
        stagger: 0.12,
        ease: 'back.out(1.6)',
      })
      tl.from('.ld-progress-fill', { width: 0, duration: 0.6, ease: 'power2.out' }, '-=0.2')

      gsap.to('.ld-map-route', {
        strokeDashoffset: -12,
        duration: 1.2,
        repeat: -1,
        ease: 'none',
      })
    })
  }, { scope: pageRef, dependencies: [load?.id] })

  if (!load) {
    return (
      <div className="panel load-detail-missing">
        <p>Load #{id} not found.</p>
        <Link to="/loads">← Back to Loads</Link>
      </div>
    )
  }

  const equip = EQUIPMENT_TYPES[load.equipmentType]
  const EquipIcon = equip.icon
  const truckImg = theme === 'dark' ? equip.image.dark : equip.image.light

  return (
    <div ref={pageRef}>
      <div className="load-detail-crumbs">
        <button className="load-detail-back" onClick={() => navigate('/loads')}>← Loads</button>
        <span className="load-detail-sep">/</span>
        <span className="load-detail-crumb-current">#{load.id}</span>
      </div>

      <div className="load-detail-head">
        <div>
          <div className="load-detail-title-row">
            <div className="load-detail-id mono">Load #{load.id}</div>
            <span className={'badge ' + load.status + ' load-detail-status-pill'}>
              <span className="dot"></span>
              {STATUS_LABEL[load.status]}
            </span>
          </div>
          <div className="load-detail-route">
            {load.origin} <b>→</b> {load.destination} &nbsp;·&nbsp; <b>{load.distance}</b> &nbsp;·&nbsp; {load.broker}
          </div>
        </div>
        <div className="load-detail-actions">
          <button className="load-detail-btn" disabled={!load.driver}>
            <Envelope size={14} aria-hidden="true" /> Message driver
          </button>
          <button className="load-detail-btn primary">
            <Phone size={14} aria-hidden="true" /> Call broker
          </button>
        </div>
      </div>

      <div className="load-detail-timeline">
        {load.timeline.map((step, i) => (
          <div className={'ld-tl-step ' + step.state} key={i}>
            {i < load.timeline.length - 1 && <div className="ld-tl-line" />}
            <div className="ld-tl-dot">{step.state === 'done' ? <Check size={13} weight="bold" aria-hidden="true" /> : step.state === 'current' ? '●' : i + 1}</div>
            <div className="ld-tl-label">{step.label}</div>
            <div className="ld-tl-time">{step.time}</div>
          </div>
        ))}
      </div>

      <div className="load-detail-grid">
        <div>
          <div className="panel">
            <div className="panel-head"><div className="panel-title">Load details</div></div>
            <div className="ld-detail-body">
              <div className="ld-detail-grid">
                <div><div className="ld-detail-label">Broker</div><div className="ld-detail-value">{load.broker}</div></div>
                <div><div className="ld-detail-label">Rate</div><div className="ld-detail-value mono">${load.rate.toLocaleString()}</div></div>
                <div><div className="ld-detail-label">Pickup</div><div className="ld-detail-value">{load.pickup} — {load.origin}</div></div>
                <div><div className="ld-detail-label">Delivery</div><div className="ld-detail-value">{load.delivery} — {load.destination}</div></div>
                <div><div className="ld-detail-label">Weight</div><div className="ld-detail-value mono">{load.weight}</div></div>
                <div><div className="ld-detail-label">Equipment</div><div className="ld-detail-value">{formatEquipment(load)}</div></div>
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-head"><div className="panel-title">Documents</div></div>
            <motion.div variants={listContainer} initial="hidden" animate="show">
              {load.documents.map((doc) => (
                <motion.div className="ld-doc-row" key={doc.name} variants={listItem}>
                  <div className="ld-doc-icon"><FileText size={15} aria-hidden="true" /></div>
                  <div>
                    <div className="ld-doc-name">{doc.name}</div>
                    <div className="ld-doc-meta">{doc.meta}</div>
                  </div>
                  <div className={'ld-doc-action' + (doc.ready ? '' : ' disabled')}>{doc.ready ? 'View' : '—'}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="panel">
            <div className="panel-head"><div className="panel-title">Broker chat</div></div>
            <motion.div className="ld-chat-body" variants={listContainer} initial="hidden" animate="show">
              {load.chat.map((m, i) => (
                <motion.div className={'ld-msg ' + m.dir} key={i} variants={listItem}>
                  {m.text}
                  <div className="ld-msg-time">{m.time}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        <div>
          <div className="panel ld-vehicle-panel">
            <div className="panel-head">
              <div className="panel-title">
                Vehicle
                <span className="ld-equip-badge">
                  <EquipIcon size={13} aria-hidden="true" />
                  {equip.label}
                </span>
              </div>
            </div>
            <div className={'ld-vehicle-box' + (equip.themedImage ? ' themed' : '')}>
              <img className="ld-vehicle-img" src={truckImg} alt={equip.label + ' truck and trailer'} />
              <span className="ld-vehicle-type-tag">
                <EquipIcon size={12} aria-hidden="true" />
                {equip.label}
              </span>
            </div>
            <div className="ld-vehicle-spec">{formatEquipment(load)} · {load.weight}</div>
          </div>

          <div className="panel">
            <div className="panel-head"><div className="panel-title">Assigned driver</div></div>
            {load.driver ? (
              <div className="ld-driver-card">
                <div className="ld-driver-avatar">{initials(load.driver.name)}</div>
                <div>
                  <div className="ld-driver-name">{load.driver.name}</div>
                  <div className="ld-driver-meta">{load.driver.cdl} · {load.driver.hos}</div>
                </div>
                <div className="ld-driver-actions">
                  <button className="ld-icon-btn-sm" aria-label="Call driver"><Phone size={14} aria-hidden="true" /></button>
                  <button className="ld-icon-btn-sm" aria-label="Message driver"><Envelope size={14} aria-hidden="true" /></button>
                </div>
              </div>
            ) : (
              <div className="ld-driver-empty">No driver assigned yet.</div>
            )}
          </div>

          <div className="panel">
            <div className="panel-head"><div className="panel-title">Live tracking</div></div>
            <div className="ld-track-body">
              <div className="ld-track-route">
                {load.origin} <b>→</b> {load.destination} — <b>{load.progress}%</b> complete
              </div>
              <div className="ld-progress-track">
                <div className="ld-progress-fill" style={{ width: load.progress + '%' }} />
              </div>
              <svg viewBox="0 0 320 140" className="ld-map-svg">
                <defs>
                  <pattern id={'ldMapGrid' + load.id} width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--border-soft)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="320" height="140" fill={'url(#ldMapGrid' + load.id + ')'} />
                <path
                  className="ld-map-route"
                  d="M 30 115 C 80 90, 60 50, 130 45 S 230 30, 290 25"
                  fill="none"
                  stroke="var(--amber)"
                  strokeWidth="2.5"
                  strokeDasharray="6 6"
                />
                <circle cx="30" cy="115" r="5" fill="var(--green)" />
                <circle cx="290" cy="25" r="5" fill="var(--red)" />
              </svg>
              {load.hosAlert && (
                <div className="ld-hos-strip">
                  <Warning size={14} weight="fill" aria-hidden="true" /> {load.hosAlert}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

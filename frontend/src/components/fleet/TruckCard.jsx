import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { GasPump } from '@phosphor-icons/react'
import { FLEET_STATUS_LABEL } from '../../data/fleetData'
import './TruckCard.css'

const STATUS_BADGE = {
  active: 'ontime',
  maintenance: 'warn',
  idle: 'neutral',
}

function fuelBarClass(pct) {
  if (pct < 30) return 'red'
  if (pct < 55) return 'amber'
  return 'green'
}

export default function TruckCard({ truck, variants }) {
  return (
    <motion.div className="truck-card" variants={variants}>
      <div className="truck-card-top">
        <div className="truck-card-id mono">{truck.id}</div>
        <span className={'badge ' + STATUS_BADGE[truck.status]}>
          <span className="dot"></span>
          {FLEET_STATUS_LABEL[truck.status]}
        </span>
      </div>

      <div className="truck-card-meta">{truck.make} {truck.model} · {truck.year}</div>
      <div className="truck-card-location">{truck.location}</div>

      <div className="truck-card-driver">
        {truck.driver ? truck.driver : <span className="truck-card-unassigned">No driver assigned</span>}
      </div>

      <div className="truck-card-fuel">
        <div className="truck-card-fuel-row">
          <span className="truck-card-fuel-icon" aria-hidden="true"><GasPump size={13} /></span>
          <span className="truck-card-fuel-pct mono">{truck.fuel.pct}%</span>
          <span className="truck-card-fuel-gal mono">{truck.fuel.gallons} gal</span>
        </div>
        <div className="truck-card-fuel-track">
          <div className={'truck-card-fuel-fill ' + fuelBarClass(truck.fuel.pct)} style={{ width: truck.fuel.pct + '%' }} />
        </div>
      </div>

      <div className="truck-card-stats">
        <div>
          <div className="truck-card-stat-val mono">{truck.mileage.toLocaleString()}</div>
          <div className="truck-card-stat-lbl">mi total</div>
        </div>
        <div>
          <div className="truck-card-stat-val mono">{truck.weeklyDistance.value.toLocaleString()}</div>
          <div className="truck-card-stat-lbl">mi / week</div>
        </div>
      </div>

      <Link to={'/fleet/trucks/' + truck.id} className="truck-card-stretched-link" aria-label={'Open ' + truck.id + ' details'}></Link>
    </motion.div>
  )
}

import { useParams, useNavigate, Link } from 'react-router-dom'
import { Phone, Envelope } from '@phosphor-icons/react'
import { trucks, FLEET_STATUS_LABEL } from '../data/fleetData'
import WaveFuelGauge from '../components/fleet/WaveFuelGauge'
import CostDonut from '../components/fleet/CostDonut'
import TireRing from '../components/fleet/TireRing'
import FuelTrendChart from '../components/fleet/FuelTrendChart'
import WeeklyDistanceChart from '../components/fleet/WeeklyDistanceChart'
import '../components/fleet/FleetWidgets.css'
import './TruckDetail.css'

const STATUS_BADGE = {
  active: 'ontime',
  maintenance: 'warn',
  idle: 'neutral',
}

function Delta({ deltaPct, up, betterWhenUp = true }) {
  const good = up === betterWhenUp
  return (
    <div className={'truck-stat-delta' + (good ? ' good' : ' bad')}>
      {up ? '↑' : '↓'} {deltaPct}% {up ? 'oshdi' : 'pasaydi'} — o'tgan haftaga nisbatan
    </div>
  )
}

export default function TruckDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const truck = trucks.find((t) => t.id === id)

  if (!truck) {
    return (
      <div className="panel truck-detail-missing">
        <p>Truck topilmadi.</p>
        <Link to="/fleet">← Fleet ro'yxatiga qaytish</Link>
      </div>
    )
  }

  const costMonthTotal = truck.maintenanceCost.value + truck.fuel.gallons * 4 + 120

  return (
    <div>
      <div className="truck-detail-crumbs">
        <button className="truck-detail-back" onClick={() => navigate('/fleet')}>← Fleet</button>
        <span className="truck-detail-sep">/</span>
        <span className="truck-detail-crumb-current">{truck.id} → Statistika</span>
      </div>

      <div className="truck-detail-head">
        <div>
          <div className="truck-detail-id-row">
            <div className="truck-detail-id mono">{truck.id}</div>
            <span className={'badge ' + STATUS_BADGE[truck.status] + ' truck-detail-status-pill'}>
              <span className="dot"></span>
              {FLEET_STATUS_LABEL[truck.status]}
            </span>
          </div>
          <div className="truck-detail-meta">
            {truck.make} {truck.model} · {truck.year} · {truck.mileage.toLocaleString()} mi bosib o'tilgan
          </div>
        </div>
        <div className="truck-detail-actions">
          <button className="truck-detail-btn" disabled={!truck.driver}>
            <Envelope size={14} aria-hidden="true" /> Haydovchiga yozish
          </button>
          <button className="truck-detail-btn primary" disabled={!truck.driver}>
            <Phone size={14} aria-hidden="true" /> Qo'ng'iroq qilish
          </button>
        </div>
      </div>

      <div className="truck-stat-mini-row">
        <div className="truck-stat-mini">
          <div className="truck-stat-mini-label">Bu hafta bosilgan masofa</div>
          <div className="truck-stat-mini-value mono">{truck.weeklyDistance.value.toLocaleString()} mi</div>
          <Delta {...truck.weeklyDistance} betterWhenUp />
        </div>
        <div className="truck-stat-mini">
          <div className="truck-stat-mini-label">Yoqilg'i sarfi</div>
          <div className="truck-stat-mini-value mono">{truck.mpg.value} mpg</div>
          <Delta {...truck.mpg} betterWhenUp />
        </div>
        <div className="truck-stat-mini">
          <div className="truck-stat-mini-label">Bo'sh turgan vaqt</div>
          <div className="truck-stat-mini-value mono">{truck.idleHours.value} h</div>
          <Delta {...truck.idleHours} betterWhenUp={false} />
        </div>
        <div className="truck-stat-mini">
          <div className="truck-stat-mini-label">Xizmat harajati (oy)</div>
          <div className="truck-stat-mini-value mono">${truck.maintenanceCost.value.toLocaleString()}</div>
          <Delta {...truck.maintenanceCost} betterWhenUp={false} />
        </div>
      </div>

      <div className="widget-grid">
        <WaveFuelGauge
          pct={truck.fuel.pct}
          gallons={truck.fuel.gallons}
          capacity={truck.fuel.capacity}
          lastFueledDate={truck.fuel.lastFueledDate}
          lastFueledLocation={truck.fuel.lastFueledLocation}
        />

        <CostDonut
          segments={truck.costBreakdown}
          monthTotal={costMonthTotal}
          centerLabel={truck.costBreakdown[0].pct + '%'}
        />

        <TireRing front={truck.tires.front} rear={truck.tires.rear} />

        <FuelTrendChart data={truck.fuelTrend} />

        <WeeklyDistanceChart data={truck.weeklyDistanceTrend} />
      </div>
    </div>
  )
}

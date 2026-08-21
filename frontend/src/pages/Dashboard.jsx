import AlertStrip from '../components/dashboard/AlertStrip'
import StatCards from '../components/dashboard/StatCards'
import LoadBoard from '../components/dashboard/LoadBoard'
import DriverPanel from '../components/dashboard/DriverPanel'
import OnTimeChart from '../components/dashboard/OnTimeChart'
import UtilizationChart from '../components/dashboard/UtilizationChart'
import AlertQueue from '../components/dashboard/AlertQueue'
import ActivityFeed from '../components/dashboard/ActivityFeed'
import CargoLayout from '../components/dashboard/CargoLayout/CargoLayout'
import DriverBoard from '../components/drivers/DriverBoard'
import {
  alerts,
  stats,
  loads,
  drivers,
  onTimeTrend,
  utilizationTrend,
  alertQueue,
  activityFeed,
} from '../data/mockData'
import '../components/dashboard/Panel.css'

export default function Dashboard() {
  const activeLoads = loads.filter((l) => l.status !== 'done')

  return (
    <>
      <AlertStrip items={alerts} />
      <StatCards stats={stats} />
      <div className="grid-2">
        <LoadBoard loads={activeLoads} />
        <DriverPanel drivers={drivers} />
      </div>

      <div className="grid-2" style={{ marginTop: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <AlertQueue alerts={alertQueue} limit={3} />
          <ActivityFeed items={activityFeed} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <UtilizationChart data={utilizationTrend} />
          <OnTimeChart data={onTimeTrend} />
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <DriverBoard drivers={drivers} />
      </div>

      <div style={{ marginTop: 16 }}>
        <CargoLayout />
      </div>
    </>
  )
}

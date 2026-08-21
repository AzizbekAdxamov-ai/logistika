import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../theme/ThemeProvider'
import '../components/dashboard/Panel.css'
import './PageHeader.css'
import './Settings.css'

function initials(name) {
  return (name || '')
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function Toggle({ checked, onChange }) {
  return (
    <motion.button
      type="button"
      className={'settings-toggle' + (checked ? ' on' : '')}
      onClick={() => onChange(!checked)}
      aria-pressed={checked}
      whileTap={{ scale: 0.94 }}
    >
      <span className="settings-toggle-knob" />
    </motion.button>
  )
}

export default function FleetSettings() {
  const { user, login, logout } = useAuth()
  const { theme, setTheme } = useTheme()
  const navigate = useNavigate()

  const [name, setName] = useState(user?.name ?? '')
  const [company, setCompany] = useState(user?.company ?? '')
  const [saved, setSaved] = useState(false)

  const [thresholds, setThresholds] = useState({
    fuelPct: 30,
    idleHours: 12,
    tireWearPct: 40,
  })

  const [notif, setNotif] = useState({
    maintenanceDue: true,
    lowFuel: true,
    tireWear: true,
    idleTime: false,
    documentExpiry: true,
  })

  function handleSave(e) {
    e.preventDefault()
    login({ name, company, role: 'Fleet manager' })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div className="settings-page">
      <div className="page-head-plain">
        <div className="page-title">Settings</div>
        <div className="page-sub">Profil, ogohlantirish chegaralari va bildirishnomalarni boshqarish</div>
      </div>

      <div className="settings-grid">
        <div>
          <div className="panel">
            <div className="panel-head"><div className="panel-title">Profil</div></div>
            <form className="settings-body" onSubmit={handleSave}>
              <div className="settings-profile-row">
                <div className="settings-avatar">{initials(name)}</div>
                <div className="settings-profile-meta">
                  <div className="settings-profile-name">{name || 'Ism kiritilmagan'}</div>
                  <div className="settings-profile-role">Fleet manager{company ? ' · ' + company : ''}</div>
                </div>
              </div>

              <div className="settings-field">
                <label htmlFor="fs-name">To'liq ism</label>
                <input id="fs-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Aziz Karimov" />
              </div>
              <div className="settings-field">
                <label htmlFor="fs-company">Kompaniya nomi</label>
                <input id="fs-company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Nova Freight LLC" />
              </div>

              <div className="settings-save-row">
                <button type="submit" className="settings-save-btn">O'zgarishlarni saqlash</button>
                <AnimatePresence>
                  {saved && (
                    <motion.span
                      className="settings-saved-note"
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                    >
                      Saqlandi
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </div>

          <div className="panel">
            <div className="panel-head"><div className="panel-title">Parol</div></div>
            <div className="settings-body">
              <div className="settings-field">
                <label htmlFor="fs-current-pw">Joriy parol</label>
                <input id="fs-current-pw" type="password" placeholder="••••••••" />
              </div>
              <div className="settings-field">
                <label htmlFor="fs-new-pw">Yangi parol</label>
                <input id="fs-new-pw" type="password" placeholder="••••••••" />
              </div>
              <div className="settings-save-row">
                <button type="button" className="settings-save-btn">Parolni yangilash</button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="panel">
            <div className="panel-head"><div className="panel-title">Ko'rinish</div></div>
            <div className="settings-body">
              <div className="settings-row">
                <div>
                  <div className="settings-row-label">Theme</div>
                  <div className="settings-row-desc">Dark va light interfeys o'rtasida almashtirish</div>
                </div>
                <div className="settings-theme-switch">
                  <button className={theme === 'dark' ? 'active' : ''} onClick={() => setTheme('dark')}>Dark</button>
                  <button className={theme === 'light' ? 'active' : ''} onClick={() => setTheme('light')}>Light</button>
                </div>
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-head"><div className="panel-title">Ogohlantirish chegaralari</div></div>
            <div className="settings-body">
              <div className="settings-field">
                <label htmlFor="fs-fuel-th">Past yoqilg'i chegarasi (%)</label>
                <input
                  id="fs-fuel-th" type="number" min="0" max="100"
                  value={thresholds.fuelPct}
                  onChange={(e) => setThresholds((t) => ({ ...t, fuelPct: Number(e.target.value) }))}
                />
              </div>
              <div className="settings-field">
                <label htmlFor="fs-idle-th">Harakatsizlik chegarasi (soat)</label>
                <input
                  id="fs-idle-th" type="number" min="0"
                  value={thresholds.idleHours}
                  onChange={(e) => setThresholds((t) => ({ ...t, idleHours: Number(e.target.value) }))}
                />
              </div>
              <div className="settings-field" style={{ marginBottom: 0 }}>
                <label htmlFor="fs-tire-th">Shina holati chegarasi (%)</label>
                <input
                  id="fs-tire-th" type="number" min="0" max="100"
                  value={thresholds.tireWearPct}
                  onChange={(e) => setThresholds((t) => ({ ...t, tireWearPct: Number(e.target.value) }))}
                />
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-head"><div className="panel-title">Bildirishnomalar</div></div>
            <div className="settings-body">
              <div className="settings-row">
                <div>
                  <div className="settings-row-label">Texnik xizmat muddati</div>
                  <div className="settings-row-desc">Xizmat muddati yaqinlashganda yoki o'tganda ogohlantirish</div>
                </div>
                <Toggle checked={notif.maintenanceDue} onChange={(v) => setNotif((n) => ({ ...n, maintenanceDue: v }))} />
              </div>
              <div className="settings-row">
                <div>
                  <div className="settings-row-label">Past yoqilg'i</div>
                  <div className="settings-row-desc">Belgilangan chegaradan pastga tushganda xabar berish</div>
                </div>
                <Toggle checked={notif.lowFuel} onChange={(v) => setNotif((n) => ({ ...n, lowFuel: v }))} />
              </div>
              <div className="settings-row">
                <div>
                  <div className="settings-row-label">Shina holati</div>
                  <div className="settings-row-desc">Shina eskirishi chegaradan oshganda ogohlantirish</div>
                </div>
                <Toggle checked={notif.tireWear} onChange={(v) => setNotif((n) => ({ ...n, tireWear: v }))} />
              </div>
              <div className="settings-row">
                <div>
                  <div className="settings-row-label">Uzoq harakatsizlik</div>
                  <div className="settings-row-desc">Truck belgilangan soatdan ko'p harakatsiz tursa xabar berish</div>
                </div>
                <Toggle checked={notif.idleTime} onChange={(v) => setNotif((n) => ({ ...n, idleTime: v }))} />
              </div>
              <div className="settings-row">
                <div>
                  <div className="settings-row-label">Hujjat muddati</div>
                  <div className="settings-row-desc">Ro'yxatdan o'tish, sug'urta va boshqa hujjatlar muddati yaqinlashganda</div>
                </div>
                <Toggle checked={notif.documentExpiry} onChange={(v) => setNotif((n) => ({ ...n, documentExpiry: v }))} />
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-head"><div className="panel-title">Hisob</div></div>
            <div className="settings-body">
              <div className="settings-row">
                <div>
                  <div className="settings-row-label">Chiqish</div>
                  <div className="settings-row-desc">Shu qurilmadagi sessiyani tugatish</div>
                </div>
                <button type="button" className="settings-logout-btn" onClick={handleLogout}>Chiqish</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

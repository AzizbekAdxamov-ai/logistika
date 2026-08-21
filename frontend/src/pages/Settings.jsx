import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../theme/ThemeProvider'
import '../components/dashboard/Panel.css'
import './PageHeader.css'
import './Settings.css'

const ROLES = ['Dispatcher', 'HR', 'Moliyachi']

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

export default function Settings() {
  const { user, login, logout } = useAuth()
  const { theme, setTheme } = useTheme()
  const navigate = useNavigate()

  const [name, setName] = useState(user?.name ?? '')
  const [company, setCompany] = useState(user?.company ?? '')
  const [role, setRole] = useState(user?.role ?? 'Dispatcher')
  const [saved, setSaved] = useState(false)

  const [notif, setNotif] = useState({
    email: true,
    sms: false,
    push: true,
    brokerMessages: true,
  })

  function handleSave(e) {
    e.preventDefault()
    login({ name, company, role })
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
        <div className="page-sub">Manage your profile, preferences and account</div>
      </div>

      <div className="settings-grid">
        <div>
          <div className="panel">
            <div className="panel-head"><div className="panel-title">Profile</div></div>
            <form className="settings-body" onSubmit={handleSave}>
              <div className="settings-profile-row">
                <div className="settings-avatar">{initials(name)}</div>
                <div className="settings-profile-meta">
                  <div className="settings-profile-name">{name || 'Unnamed user'}</div>
                  <div className="settings-profile-role">{role}{company ? ' · ' + company : ''}</div>
                </div>
              </div>

              <div className="settings-field">
                <label htmlFor="settings-name">Full name</label>
                <input id="settings-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Aziz Karimov" />
              </div>
              <div className="settings-field">
                <label htmlFor="settings-company">Company / team name</label>
                <input id="settings-company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Nova Freight LLC" />
              </div>
              <div className="settings-field" role="radiogroup" aria-label="Role">
                <label>Role</label>
                <div className="settings-role-grid">
                  {ROLES.map((r) => (
                    <motion.button
                      key={r}
                      type="button"
                      role="radio"
                      aria-checked={role === r}
                      className={'settings-role-option' + (role === r ? ' selected' : '')}
                      onClick={() => setRole(r)}
                      whileTap={{ scale: 0.96 }}
                      animate={{ scale: role === r ? 1.03 : 1 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                    >
                      {r}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="settings-save-row">
                <button type="submit" className="settings-save-btn">Save changes</button>
                <AnimatePresence>
                  {saved && (
                    <motion.span
                      className="settings-saved-note"
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                    >
                      Saved
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </div>

          <div className="panel">
            <div className="panel-head"><div className="panel-title">Password</div></div>
            <div className="settings-body">
              <div className="settings-field">
                <label htmlFor="settings-current-pw">Current password</label>
                <input id="settings-current-pw" type="password" placeholder="••••••••" />
              </div>
              <div className="settings-field">
                <label htmlFor="settings-new-pw">New password</label>
                <input id="settings-new-pw" type="password" placeholder="••••••••" />
              </div>
              <div className="settings-save-row">
                <button type="button" className="settings-save-btn">Update password</button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="panel">
            <div className="panel-head"><div className="panel-title">Appearance</div></div>
            <div className="settings-body">
              <div className="settings-row">
                <div>
                  <div className="settings-row-label">Theme</div>
                  <div className="settings-row-desc">Switch between dark and light interface</div>
                </div>
                <div className="settings-theme-switch">
                  <button className={theme === 'dark' ? 'active' : ''} onClick={() => setTheme('dark')}>Dark</button>
                  <button className={theme === 'light' ? 'active' : ''} onClick={() => setTheme('light')}>Light</button>
                </div>
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-head"><div className="panel-title">Notifications</div></div>
            <div className="settings-body">
              <div className="settings-row">
                <div>
                  <div className="settings-row-label">Email alerts</div>
                  <div className="settings-row-desc">Delay, HOS and document alerts by email</div>
                </div>
                <Toggle checked={notif.email} onChange={(v) => setNotif((n) => ({ ...n, email: v }))} />
              </div>
              <div className="settings-row">
                <div>
                  <div className="settings-row-label">SMS alerts</div>
                  <div className="settings-row-desc">Critical alerts only, sent by text message</div>
                </div>
                <Toggle checked={notif.sms} onChange={(v) => setNotif((n) => ({ ...n, sms: v }))} />
              </div>
              <div className="settings-row">
                <div>
                  <div className="settings-row-label">Push notifications</div>
                  <div className="settings-row-desc">Real-time alerts inside the app</div>
                </div>
                <Toggle checked={notif.push} onChange={(v) => setNotif((n) => ({ ...n, push: v }))} />
              </div>
              <div className="settings-row">
                <div>
                  <div className="settings-row-label">Broker messages</div>
                  <div className="settings-row-desc">Notify when a broker sends a new message</div>
                </div>
                <Toggle checked={notif.brokerMessages} onChange={(v) => setNotif((n) => ({ ...n, brokerMessages: v }))} />
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-head"><div className="panel-title">Account</div></div>
            <div className="settings-body">
              <div className="settings-row">
                <div>
                  <div className="settings-row-label">Sign out</div>
                  <div className="settings-row-desc">End your session on this device</div>
                </div>
                <button type="button" className="settings-logout-btn" onClick={handleLogout}>Sign out</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

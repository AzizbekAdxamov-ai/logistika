import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import truckBg from '../assets/truck-bg.png'
import './Login.css'

const ROLES = ['Dispatcher', 'HR', 'Moliyachi', 'Fleet manager']

export default function Register() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('Dispatcher')

  function handleSubmit(e) {
    e.preventDefault()
    login({ name: name || email.split('@')[0], role, company })
    navigate(role === 'Fleet manager' ? '/fleet' : '/')
  }

  return (
    <div className="login-scene" style={{ '--login-bg-image': `url(${truckBg})` }}>
      <motion.div
        className="login-brand-row"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <div className="brand-mark">DS</div>
        <div>
          <div className="login-brand-text">DispatchSim</div>
          <div className="login-brand-sub">Dispatch operations</div>
        </div>
      </motion.div>

      <motion.div
        className="login-card wide"
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut', delay: 0.08 }}
      >
        <div className="login-card-title">Ro'yxatdan o'tish</div>
        <div className="login-card-sub">Jamoangiz uchun ish maydonini yarating</div>

        <form onSubmit={handleSubmit}>
          <div className="login-field">
            <label className="login-field-label" htmlFor="name">To'liq ism</label>
            <input
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Aziz Karimov"
            />
          </div>
          <div className="login-field">
            <label className="login-field-label" htmlFor="company">Kompaniya / jamoa nomi</label>
            <input
              id="company"
              required
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Nova Freight LLC"
            />
          </div>
          <div className="login-field">
            <label className="login-field-label" htmlFor="reg-email">Email</label>
            <input
              id="reg-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ism@kompaniya.com"
            />
          </div>
          <div className="login-field">
            <label className="login-field-label" htmlFor="reg-password">Parol</label>
            <input
              id="reg-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <div className="login-field" role="radiogroup" aria-label="Rol">
            <label className="login-field-label" id="role-label">Rol</label>
            <div className="login-role-grid">
              {ROLES.map((r) => (
                <motion.button
                  key={r}
                  type="button"
                  role="radio"
                  aria-checked={role === r}
                  className={'login-role-option' + (role === r ? ' selected' : '')}
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
          <button type="submit" className="login-btn">Hisob yaratish</button>
        </form>

        <div className="login-divider">yoki</div>

        <div className="login-signup-row">
          Hisobingiz bormi? <Link to="/login"><b>Kirish</b></Link>
        </div>
      </motion.div>
    </div>
  )
}

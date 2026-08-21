import { createContext, useContext, useEffect, useState } from 'react'
import './tokens.css'

const ThemeContext = createContext(null)
const STORAGE_KEY = 'dispatchsim.theme'

function loadTheme() {
  return localStorage.getItem(STORAGE_KEY) || 'dark'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(loadTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  function toggleTheme() {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}

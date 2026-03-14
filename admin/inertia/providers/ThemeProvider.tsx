import { useState, useEffect } from 'react'
import { ThemeContext, ThemeName } from '../context/ThemeContext'
import api from '~/lib/api'

const STORAGE_KEY = 'nomad:theme'
const VALID_THEMES: ThemeName[] = ['desert', 'sci-fi', 'kawaii', 'space', 'cyberpunk']

function getInitialTheme(): ThemeName {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && VALID_THEMES.includes(stored as ThemeName)) {
      return stored as ThemeName
    }
  } catch {}
  return 'desert'
}

function applyTheme(theme: ThemeName) {
  if (theme === 'desert') {
    document.body.removeAttribute('data-theme')
  } else {
    document.body.setAttribute('data-theme', theme)
  }
}

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<ThemeName>(getInitialTheme)

  // Apply theme on mount and sync from server
  useEffect(() => {
    applyTheme(theme)

    api.getSetting('ui.theme').then((result) => {
      if (result?.value && VALID_THEMES.includes(result.value as ThemeName)) {
        const serverTheme = result.value as ThemeName
        if (serverTheme !== theme) {
          setThemeState(serverTheme)
          applyTheme(serverTheme)
          try { localStorage.setItem(STORAGE_KEY, serverTheme) } catch {}
        }
      }
    }).catch(() => {})
  }, [])

  const setTheme = (newTheme: ThemeName) => {
    setThemeState(newTheme)
    applyTheme(newTheme)
    try { localStorage.setItem(STORAGE_KEY, newTheme) } catch {}
    api.updateSetting('ui.theme', newTheme).catch(() => {})
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider

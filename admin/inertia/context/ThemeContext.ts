import { createContext, useContext } from 'react'

export type ThemeName = 'desert' | 'sci-fi' | 'kawaii' | 'space' | 'cyberpunk'

export interface ThemeContextType {
  theme: ThemeName
  setTheme: (theme: ThemeName) => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

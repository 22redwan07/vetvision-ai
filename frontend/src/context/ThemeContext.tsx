import { createContext, useContext, useState, ReactNode } from 'react'
interface ThemeContextType { darkMode: boolean; toggleDarkMode: () => void }
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false)
  const toggleDarkMode = () => setDarkMode(prev => !prev)
  return <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}><div className={darkMode ? 'dark' : ''}>{children}</div></ThemeContext.Provider>
}
export const useTheme = () => { const ctx = useContext(ThemeContext); if (!ctx) throw new Error('useTheme must be used within ThemeProvider'); return ctx }

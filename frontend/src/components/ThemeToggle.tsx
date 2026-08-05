import { useEffect, useState } from 'react'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'

export default function ThemeToggle() {
  // Determine the initial theme preference from localStorage or system preference
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') {
      return false // Default if running on server side
    }
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      return savedTheme === 'dark'
    }
    // Fallback to system preference if no theme is saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  // Sync the DOM root class and localStorage whenever the state changes
  useEffect(() => {
    const root = window.document.documentElement
    if (isDark) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  return (
    <button onClick={() => setIsDark((prevIsDark) => !prevIsDark)} className="absolute cursor-pointer right-2 top-2">
      {isDark ? <SunIcon className="size-6" /> : <MoonIcon className="size-6" />}   
    </button>
  )
}

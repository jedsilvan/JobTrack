import { useEffect, useState } from 'react'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'

export default function Theme() {
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
    <div className="flex gap-1 bg-(--color-border) w-fit p-1 rounded-full h-fit mr-2">
      <SunIcon
        className={`size-6 p-1 cursor-pointer ${!isDark ? 'bg-(--color-card) rounded-full' : ''}`}
        onClick={() => setIsDark(false)}
        aria-label="Set light theme"
      />
      <MoonIcon
        className={`size-6 p-1 cursor-pointer ${isDark ? 'bg-(--color-card) rounded-full' : ''}`}
        onClick={() => setIsDark(true)}
        aria-label="Set dark theme"
      />
    </div>
  )
}

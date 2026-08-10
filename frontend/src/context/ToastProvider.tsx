import React, { useCallback, useState } from 'react'
import { ToastContext, type Toast, type ToastVariant } from './ToastContext'
import ToastContainer from '../components/toast/ToastContainer'

const DEFAULT_DURATION = 4000

export const ToastProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback(
    (
      message: string,
      variant: ToastVariant = 'info',
      duration: number = DEFAULT_DURATION,
    ) => {
      const id = crypto.randomUUID()
      setToasts((prev) => [...prev, { id, message, variant, duration }])

      if (duration > 0) {
        setTimeout(() => dismissToast(id), duration)
      }
    },
    [dismissToast],
  )

  return (
    <ToastContext.Provider value={{ toasts, showToast, dismissToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  )
}

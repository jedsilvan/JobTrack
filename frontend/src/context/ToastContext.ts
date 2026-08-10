import { createContext, useContext } from 'react'

export type ToastVariant = 'success' | 'error' | 'info' | 'warning'

export type Toast = {
  id: string
  message: string
  variant: ToastVariant
  duration: number
}

export type ToastContextType = {
  toasts: Toast[]
  showToast: (
    message: string,
    variant?: ToastVariant,
    duration?: number,
  ) => void
  dismissToast: (id: string) => void
}

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined,
)

export const useToastContext = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider')
  }
  return context
}

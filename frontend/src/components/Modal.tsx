import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}

export default function Modal(props: ModalProps) {
  const { isOpen, onClose, title, children } = props

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleEscape)

    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000]/80">
      <div className="bg-(--color-bg-main) border-1 border-border rounded-lg shadow-xl w-full max-w-sm transform transition-all duration-300 scale-100 py-3 px-4">
        <div className="flex justify-between items-center mb-3">
          <p className="text-sm font-medium text-secondary">{title}</p>
          <XMarkIcon
            className="size-5 inline cursor-pointer"
            onClick={onClose}
          />
        </div>
        {children}
      </div>
    </div>,
    document.body,
  )
}

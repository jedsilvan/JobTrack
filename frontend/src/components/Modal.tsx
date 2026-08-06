import React, { useEffect } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}

const Modal = (props: ModalProps) => {
  const { isOpen, onClose, title, children } = props

  if (!isOpen) return null

  // Handle closing on Escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000]/80">
      <div className="bg-(--color-bg-main) border-1 border-border rounded-lg shadow-xl w-full max-w-sm transform transition-all duration-300 scale-100 py-3 px-4">
        {children}
      </div>
    </div>
  )
}

export default Modal

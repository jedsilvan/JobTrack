import React from 'react'
import { ArrowPathIcon } from '@heroicons/react/24/outline'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
  isLoading?: boolean
  icon?: React.ReactNode
}

const Button = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  isLoading = false,
  icon,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={isLoading ? undefined : onClick}
      disabled={disabled}
      className={`border-1 border-border rounded-lg pt-1 pb-1.5 px-4 hover:bg-(--color-card)/50 hover:border-secondary focus:border-secondary
        ${disabled || isLoading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
        ${className}`}
    >
      {!isLoading && icon && icon}
      {isLoading && (
        <ArrowPathIcon className="animate-spin size-4 inline mb-0.5 mr-2" />
      )}
      {children}
    </button>
  )
}

export default Button

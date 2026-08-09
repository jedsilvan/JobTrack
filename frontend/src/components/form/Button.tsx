import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
}

const Button = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`border-1 border-border rounded-lg pt-1 pb-1.5 px-4 hover:bg-(--color-card)/50 hover:border-secondary focus:border-secondary
        ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        ${className}`}
    >
      {children}
    </button>
  )
}

export default Button

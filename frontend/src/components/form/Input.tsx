import React from 'react'

interface InputProps {
  label?: string
  placeholder?: string
  value: string | number
  onChange: React.ChangeEventHandler<HTMLInputElement>
  className?: string
  type?: 'text' | 'number'
}

const Input = ({
  label,
  value,
  onChange,
  placeholder,
  className,
  type = 'text',
}: InputProps) => {
  return (
    <div>
      {label && (
        <label className="block text-xs text-tertiary mb-1">{label}</label>
      )}
      <input
        type={type}
        value={String(value)}
        onChange={onChange}
        placeholder={placeholder}
        className={`${className} bg-(--color-card) border-1 border-border rounded-lg pt-1 pb-1.5 px-3 hover:border-secondary focus:border-secondary`}
      />
    </div>
  )
}

export default Input

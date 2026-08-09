import React from 'react'

interface InputProps {
  label?: string
  placeholder?: string
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  className?: string
}

const Input = ({
  label,
  value,
  onChange,
  placeholder,
  className,
}: InputProps) => {
  return (
    <div>
      {label && (
        <label className="block text-xs text-tertiary mb-1">{label}</label>
      )}
      <input
        type="text"
        value={String(value)}
        onChange={onChange}
        placeholder={placeholder}
        className={`${className} bg-(--color-card) border-1 border-border rounded-lg pt-1 pb-1.5 px-3 hover:border-secondary focus:border-secondary`}
      />
    </div>
  )
}

export default Input

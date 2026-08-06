import React from 'react'

interface TextAreaProps {
  label?: string
  placeholder?: string
  value: string
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>
  className?: string
}

const TextArea = ({
  label,
  value,
  onChange,
  placeholder,
  className,
}: TextAreaProps) => {
  return (
    <div>
      {label && (
        <label className="block text-xs text-tertiary mb-1">{label}</label>
      )}
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={3} // Set default to 3 rows
        className={`${className} bg-(--color-card) border-1 border-border rounded-lg pt-1 pb-1.5 px-3 hover:border-secondary focus:border-secondary`}
      />
    </div>
  )
}

export default TextArea

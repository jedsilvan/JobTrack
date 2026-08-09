interface CalendarProps {
  label?: string
  placeholder?: string
  value: string
  onChange: (date: string) => void
  className?: string
}

const Calendar = ({
  label,
  value,
  onChange,
  placeholder,
  className,
}: CalendarProps) => {
  return (
    <div className={`${className}`}>
      {label && (
        <label className="block text-xs text-tertiary mb-1">{label}</label>
      )}
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-(--color-card) w-full border-1 border-border rounded-lg pt-1 pb-1.5 px-3 hover:border-secondary focus:border-secondary"
      />
    </div>
  )
}

export default Calendar

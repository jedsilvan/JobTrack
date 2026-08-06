import { useState, useCallback } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

interface DropdownItem {
  value: string
  label: string
}

interface DropdownProps {
  options: DropdownItem[]
  selectedValue: string | null
  onChange: (value: string) => void
  className?: string
  label?: string
}

const Dropdown = ({
  options,
  selectedValue,
  onChange,
  className,
  label,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const handleSelect = (value: string) => {
    setIsOpen(false)
    onChange(value)
  }

  return (
    <>
      {label && (
        <label className="block text-xs text-tertiary mb-1">{label}</label>
      )}
      <div
        className={`${className} relative inline-block bg-(--color-card) border-1 border-border rounded-lg hover:border-secondary focus:border-secondary`}
      >
        <button
          onClick={toggleDropdown}
          className="pt-1 pb-1.5 px-3 cursor-pointer w-full text-left"
        >
          <div className="flex justify-between items-center">
            {selectedValue ? (
              selectedValue
            ) : (
              <span className="text-[#969695]">Select an option</span>
            )}
            <ChevronDownIcon className="size-4 inline ml-auto" />
          </div>
        </button>

        {isOpen && (
          <ul className="bg-(--color-border) border-1 border-secondary rounded-lg w-full absolute mt-1 z-10 shadow-[2px_2px_10px_rgba(0,0,0,0.1)] overflow-hidden">
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className="pt-1 pb-1.5 px-3 cursor-pointer hover:bg-(--color-secondary)/20"
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export default Dropdown
